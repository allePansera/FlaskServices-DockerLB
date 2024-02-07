import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionStorageService} from "../session-storage/session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private user__id: string | null = null;
  private username: string | null = null;
  private user_pwd: string | null = null;
  // 6 hours session
  private login_expiration_minute: number = 360;
  req_api_login: string = "/api/login/auth";
  req_api_logout: string = "/api/login/logout";

  constructor(private http: HttpClient, private session: SessionStorageService) {
    // Restore pre-saved information
    this.isLoggedInSubject.next(this.session.getItem('isLoggedInSubject') === 'true');
    this.user__id = this.session.getItem('user__id');
    this.username = this.session.getItem('username');
  }

  login(user__id: string, username: string, user_pwd: string): Observable<any> {
    // Build HTTP request payload
    const userData = {
      user__id: user__id,
      user_pwd: user_pwd
    }
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const body=JSON.stringify(userData);
    // HTTP req. execution
    return this.http
      .post<any>(this.req_api_login, body, {
        headers: headers}).pipe(
        map(response => {
          // Handle service variables
          this.isLoggedInSubject.next(true);
          this.user__id = user__id;
          this.username = username;
          this.user_pwd = user_pwd;
          // Store information inside web Storage
          this.session.setItemWithExpiration('isLoggedInSubject', 'true', this.login_expiration_minute);
          this.session.setItemWithExpiration('user__id', this.user__id, this.login_expiration_minute);
          this.session.setItemWithExpiration('username', this.username, this.login_expiration_minute);
          // Return statement for the component
          return {status: true, message: ''};
        }),
        catchError(res => {
          // Update services variables
          this.isLoggedInSubject.next(false);
          this.user__id = null;
          this.username = null;
          this.user_pwd = null;
          // Clear web Storage informations
          this.session.removeItem('isLoggedInSubject');
          this.session.removeItem('user__id');
          this.session.removeItem('username');
          return of({status: false, message: res.error.message});
        })
    );

  }

  logout() {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    // HTTP req. execution
    return this.http
      .post<any>(this.req_api_logout, null, {
        headers: headers}).pipe(
        map(response => {
          // Handle service variables
          this.isLoggedInSubject.next(false);
          this.user__id = null;
          this.username = null;
          this.user_pwd = null;
          // Store information inside web Storage
          this.session.removeItem('isLoggedInSubject');
          this.session.removeItem('user__id');
          this.session.removeItem('username');
          // Return statement for the component
          return {status: true, message: ''};
        }),
        catchError(res => {
          // Update services variables
          this.isLoggedInSubject.next(false);
          this.user__id = null;
          this.username = null;
          this.user_pwd = null;
          // Clear web Storage informations
          this.session.removeItem('isLoggedInSubject');
          this.session.removeItem('user__id');
          this.session.removeItem('username');
          return of({status: false, message: res.error.message});
        })
    );

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
