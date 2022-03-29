import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostPreview } from '../model/post-preview.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  postPreviews: PostPreview[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.postPreviews = [
      new PostPreview(0, "The First Blog Entry", new Date()),
      new PostPreview(1, "Uploading to Firebase", new Date(2021, 11, 17, 3, 24, 0)),
      new PostPreview(2, "This is just to check to see if they are put in order", new Date(2022, 0, 22, 5, 15, 0)),
    ]

    // this call to sort should stay even after I switch out the fake data for real data.
    // we want to sort by date posted and show the most recent first

    this.postPreviews.sort((a, b) => a.createdDate < b.createdDate ? 1 : -1);
  }

  navigateOnClick(id: number) {
    // eventually this will use the id release of the post clicked on to navigate to the correct post
    // for now we'll console.log it to verify that it is accepting the value correctly
    this.router.navigateByUrl('/home/post');
  }
}
