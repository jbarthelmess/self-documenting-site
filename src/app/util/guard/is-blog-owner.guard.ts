import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/db/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class IsBlogOwnerGuard implements CanActivate {

  constructor(private firebaseService: FirebaseService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.firebaseService.getUser();
    return user !== null && user.email === "joshbarthelmess3@gmail.com";
  }
  
}
