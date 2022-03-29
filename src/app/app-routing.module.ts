import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './blog/homepage/homepage.component';
import { PostComponent } from './blog/post/post.component';

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
      }
    ]
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
