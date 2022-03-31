import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/db/firebase.service';
import { PostPreview } from '../model/post-preview.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  postPreviews: PostPreview[] = [];
  postFeed: Subscription = new Subscription();
  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.postFeed = this.firebaseService.postsLoaded.subscribe((posts) => {
      this.postPreviews = posts;
      
      // we want to sort by date posted and show the most recent first
      // later we'll add an option for the user to sort newest first or oldest first
      this.postPreviews.sort((a, b) => a.createdDate < b.createdDate ? 1 : -1);
    });
  }

  ngOnDestroy() {
    this.postFeed.unsubscribe();
  }

  navigateOnClick(id: string) {
    // eventually this will use the id release of the post clicked on to navigate to the correct post
    this.router.navigateByUrl(`/home/post?postId=${id}`);
  }
}
