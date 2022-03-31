import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/db/firebase.service';
import { isCode, isHeading, isImage, isLink, isText } from '../model/content.model';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post = new Post('', [], '', new Date());

  isCode = isCode;
  isText = isText;
  isImage = isImage;
  isHeading = isHeading;
  isLink = isLink;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const id: string = params['postId'];
      const postPreview = this.firebaseService.getPost(id);
      if(postPreview) {
        const postCheck = this.firebaseService.getPostContent(postPreview);
        if(postCheck) {
          this.post = postCheck;
        } else {
          this.router.navigateByUrl("/home");
        }
      } else {
        this.router.navigateByUrl("/home");
      }
    });
  }

}
