// login.component.ts
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user__id: string = '';
  username: string = '';
  user_pwd: string = '';
  loginerr: boolean = false;
  errdescr: string = '';
  users: any[] = [];
  req__api: string = "/api/login/auth";

  constructor(private fb: FormBuilder, private loginService: AuthService,
              private http: HttpClient, private UserService: UserService
              ) { }

  ngOnInit() {
    // Define form items
    this.loginForm = this.fb.group({
      user__id: ['', Validators.required],
      user_pwd: ['', Validators.required]
    });
    // Get users to store them inside a select item
    this.users = this.UserService.getUsers()
  }

  onSubmit() {
    // HTTP req structure
    const userData = {
      user__id: this.loginForm.value.user__id,
      user_pwd: this.loginForm.value.user_pwd
    }
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const body=JSON.stringify(userData);
    // HTTP req. execution
    this.http
      .post<any>(this.req__api, body, {
        headers: headers})
      .subscribe({
          next: response => {
            this.loginerr = response.status;
            this.errdescr = response.msg;
          },
          error: error => {
            this.loginerr = true;
            this.errdescr = error;
          }
        }
      );
  }

}

