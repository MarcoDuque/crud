import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private route: Router) {

  }

  canActivate(): boolean {
    if (this.auth.authenticationState()) {
      return true;
    } else {
      this.route.navigateByUrl('/signin');
    }
  }
}
