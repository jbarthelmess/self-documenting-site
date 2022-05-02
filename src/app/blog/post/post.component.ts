import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/db/firebase.service';
import { HighlightService } from 'src/app/util/highlight.service';
import { ContentType, isCode, isHeading, isImage, isLink, isText } from '../model/content.model';
import { PostPreview } from '../model/post-preview.model';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post = new Post('', [], '', new Date());
  postPreview: PostPreview = new PostPreview('', '', new Date(), []);
  previousPreview: PostPreview | null = null;
  nextPreview: PostPreview | null = null;

  isCode = isCode;
  isText = isText;
  isImage = isImage;
  isHeading = isHeading;
  isLink = isLink;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const id: string = params['postId'];
      const postPreview = this.firebaseService.getPost(id);
      if(postPreview) {
        this.postPreview = postPreview;
        this.firebaseService.getPostContent(postPreview).then(postCheck => {
          if(postCheck) {
            //this.post = postCheck;
            this.post = this.processPost(postCheck);
          } else {
            this.router.navigateByUrl("/home");
          }
          this.getNeighboringPosts();
        });
      }
    });
  }

  processPost(recievedPost: Post): Post {
    for (let content of recievedPost.content) {
      if (content.type === ContentType.Code) {
        content.code = this.highlightService.highlightCode(content.code, 'typescript');
      }
    }
    return recievedPost;
  }

  getNeighboringPosts() {
    this.nextPreview = null;
    this.previousPreview = null;
    const previews = this.firebaseService.getNeighboringPosts(this.postPreview);
    previews.forEach(preview => {
      if (preview.createdDate < this.postPreview.createdDate) {
        this.previousPreview = preview;
      } else if (preview.createdDate > this.postPreview.createdDate) {
        this.nextPreview = preview;
      }
    });
  }

  updatePostDisplay(newId: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {postId: newId},
        queryParamsHandling: 'merge'
      }
    )
  }

}
