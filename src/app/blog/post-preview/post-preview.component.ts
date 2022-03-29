import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostPreview } from '../model/post-preview.model';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  @Input()
  postPreview: PostPreview = new PostPreview(0, "Filler Title", new Date());

  @Output()
  postId: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitId() {
    this.postId.emit(this.postPreview.id);
  }

}
