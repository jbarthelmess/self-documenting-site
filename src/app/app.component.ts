import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'self-documenting-site';

  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigateByUrl('/home')
  }
}
