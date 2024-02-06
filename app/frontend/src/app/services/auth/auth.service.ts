import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;
  private user_id: number | null = null;
  private username: string | null = null;
  private userrole: string | null = null;

  constructor() { }

  login(user_id: number, username: string, userrole: string) {
    this.isLoggedIn = true;
    this.user_id = user_id;
    this.username = username;
    this.userrole = userrole;
  }

  logout() {
    this.isLoggedIn = false;
    this.user_id = null;
    this.username = null;
    this.userrole = null;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  getUserId(): number | null {
    return this.user_id;
  }

  getUsername(): string | null {
    return this.username;
  }

  getUserRole(): string | null {
    return this.userrole;
  }
}
