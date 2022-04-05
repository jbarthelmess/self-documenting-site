import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/db/firebase.service';
import { Content, ContentType, isCode, isHeading, isImage, isLink, isText } from '../model/content.model';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  content: Content[] = [];
  title: string = '';

  isText = isText;
  isCode = isCode;
  isImage = isImage;
  isHeading = isHeading;
  isLink = isLink;
  ContentType = ContentType;

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  addText() {
    console.log("Adding Text Area");
    this.content.push({
      id: '',
      order: this.content.length,
      type: ContentType.Text,
      text:''
    });
  }

  addImage() {
    console.log("Adding Image");
    this.content.push({
      id: '',
      order: this.content.length,
      type: ContentType.Image,
      url:''
    });
  }

  addCode() {
    console.log("Adding Code");
    this.content.push({
      id: '',
      order: this.content.length,
      type: ContentType.Code,
      code:''
    });
  }

  addLink() {
    console.log("Adding Link");
    this.content.push({
      id: '',
      order: this.content.length,
      type: ContentType.Link,
      url: ''
    });
  }

  addHeading() {
    console.log("Adding Heading");
    this.content.push({
      id: '',
      order: this.content.length,
      type: ContentType.Heading,
      text: ''
    })
  }

  post() {
    console.log(this.content);
    const post = new Post(
      '',
      this.content,
      this.title,
      new Date()
    );
    this.firebaseService.createPost(post);
    this.router.navigateByUrl('/home');
  }

  removeContent(id: number) {
    this.content.splice(id, 1);
  }

}
