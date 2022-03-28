import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './blog/homepage/homepage.component';
import { ToolbarBufferComponent } from './util/toolbar-buffer/toolbar-buffer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ToolbarBufferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
