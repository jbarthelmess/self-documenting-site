import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/db/firebase.service';
import { Content, ContentType, isCode, isHeading, isImage, isLink, isText, Languages } from '../model/content.model';
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
  Languages = Languages;
  langs = Object.keys(Languages);

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.Languages);
    console.log(this.langs);
  }

  addContent(type: ContentType) {
    let content: Content;
    switch(type) {
      case ContentType.Text:
      case ContentType.Heading:
        content = {
          id: '',
          order: this.content.length,
          type: type,
          text:''
        };
        break;
      
      case ContentType.Image:
      case ContentType.Link:
        content = {
          id: '',
          order: this.content.length,
          type: type,
          url: ''
        };
        break;
      case ContentType.Code:
        content = {
          id: '',
          order: this.content.length,
          type: type,
          code: '',
          lang: 'javascript'
        };
        break;
    }
    this.content.push(content);
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

  addTabToTextArea(event:any) {
    if (event.key == 'Tab') {
        event.preventDefault();
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}

}
