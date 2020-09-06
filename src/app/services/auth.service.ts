import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userModel } from '../models/user.model';

import { map } from 'rxjs/operators';
import { CONSTANTS } from '../app.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;

  constructor(private http: HttpClient, private route: Router) {
    this.readToken()
  }

  logOut() {
    localStorage.removeItem('token');
    this.route.navigateByUrl('/signin');
  }

  signIn(user: userModel) {
    const authData = { ...user }
    return this.http.post(`${CONSTANTS.endpoint}/signIn`, authData)
      .pipe(
        map(resp => {
          this.saveToken(resp['token']);
          return resp;
        })
      );
  }

  signUp(user: userModel) {
    const authData = { ...user };
    return this.http.post(`${CONSTANTS.endpoint}/signUp`, authData);
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  authenticationState(): boolean {
    return this.userToken.length > 2;
  }
}
