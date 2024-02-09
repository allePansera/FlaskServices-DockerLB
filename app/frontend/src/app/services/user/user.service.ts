import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user_login_list = 'api/user/list/login';
  private user_registry_list = 'api/user/list/registry';

  constructor(private http: HttpClient) { }

  getUsersLogin(): Observable<any> {
    return this.http.get(this.user_login_list);
  }

  getUsersRegistry(): Observable<any> {
    return this.http.get(this.user_registry_list);
  }
}
