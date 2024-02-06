import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;
  private user__id: string | null = null;
  private username: string | null = null;
  private user_pwd: string | null = null;

  constructor() { }

  login(user__id: string, username: string, user_pwd: string) {
    this.isLoggedIn = true;
    this.user__id = user__id;
    this.username = username;
    this.user_pwd = user_pwd;
  }

  logout() {
    this.isLoggedIn = false;
    this.user__id = null;
    this.username = null;
    this.user_pwd = null;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  getUserId(): string | null {
    return this.user__id;
  }

  getUsername(): string | null {
    return this.username;
  }

  getUserPwd(): string | null {
    return this.user_pwd;
  }
}
