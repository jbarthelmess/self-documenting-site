import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './blog/homepage/homepage.component';
import { ToolbarBufferComponent } from './util/toolbar-buffer/toolbar-buffer.component';
import { PostComponent } from './blog/post/post.component';
import { GuardTypePipe } from './util/pipe/guard-type.pipe';
import { PostPreviewComponent } from './blog/post-preview/post-preview.component';
import { CreatePostComponent } from './blog/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ToolbarBufferComponent,
    PostComponent,
    GuardTypePipe,
    PostPreviewComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
