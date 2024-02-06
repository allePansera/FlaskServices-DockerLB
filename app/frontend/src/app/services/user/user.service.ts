import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private list_api = 'api/user/list';
  users: any[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): any[] {
    // Perform HTTP request
    this.http.get<any>(this.list_api)
      .subscribe({
          next: response => {
            console.log(response);
          },
          error: error => {
            console.log(error);
          }
        }
      );
    return this.users;
  }
}
