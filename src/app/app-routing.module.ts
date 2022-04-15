import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './blog/create-post/create-post.component';
import { HomepageComponent } from './blog/homepage/homepage.component';
import { PostComponent } from './blog/post/post.component';
import { BoardComponent } from './minesweeper-world/board/board.component';
import { IsBlogOwnerGuard } from './util/guard/is-blog-owner.guard';

const routes: Routes = [
  {
    path: 'home',
    component: AppComponent, 
    children: [
      {
        path: '', 
        component: HomepageComponent
      },
      {
        path: 'post',
        component: PostComponent
      },
      {
        path: 'create',
        component: CreatePostComponent,
        canActivate: [IsBlogOwnerGuard]
      }
    ]
  },
  {
    path: 'minesweeper',
    component: BoardComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
