import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  public getCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return null;
    }
  }

  public getUserDetail() {
    const user = this.getCurrentUser();
    if (user) {
      return user.User;
    }
    return null;
  }

  public getAccessToken(): string {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return 'Bearer ' + currentUser.AccessToken;
    }
    return '';
  }

  public getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  public setCurrentUser(token) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(token));
  }

  public removeLogin() {
    localStorage.removeItem('currentUser');
  }
}
