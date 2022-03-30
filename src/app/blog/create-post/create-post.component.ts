import { Component, OnInit } from '@angular/core';
import { ContentType } from '../model/content-type';
import { Content, isCode, isImage, isText } from '../model/content.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  content: Content[] = [];

  isText = isText;
  isCode = isCode;
  isImage = isImage;

  constructor() { }

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

  post() {
    console.log(this.content);
  }

}
