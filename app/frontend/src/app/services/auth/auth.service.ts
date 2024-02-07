import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Replaced with observable pattern
  // private isLoggedIn: boolean = false;
  private user__id: string | null = null;
  private username: string | null = null;
  private user_pwd: string | null = null;

  constructor() {
    // Restore pre-saved information
    this.isLoggedInSubject.next(sessionStorage.getItem('isLoggedInSubject') === 'true');
    this.user__id = sessionStorage.getItem('user__id');
    this.username = sessionStorage.getItem('username');

  }

  login(user__id: string, username: string, user_pwd: string) {

    this.isLoggedInSubject.next(true);
    this.user__id = user__id;
    this.username = username;
    this.user_pwd = user_pwd;
    // Store information inside web Storage
    sessionStorage.setItem('isLoggedInSubject', 'true');
    sessionStorage.setItem('user__id', this.user__id);
    sessionStorage.setItem('username', this.username);
  }

  logout() {

    this.isLoggedInSubject.next(false);
    this.user__id = null;
    this.username = null;
    this.user_pwd = null;
    // Store information inside web Storage
    sessionStorage.removeItem('isLoggedInSubject');
    sessionStorage.removeItem('user__id');
    sessionStorage.removeItem('username');
  }

  isLoggedInUserObservable() {
    return this.isLoggedInSubject.asObservable();
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

  hasPermission(){
    return true;
  }

  isAllowed(){
    return this.hasPermission() && this.isLoggedInSubject.value;
  }
}
