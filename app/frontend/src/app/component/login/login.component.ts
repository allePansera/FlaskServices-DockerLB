// login.component.ts
import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import {Router} from "@angular/router";


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
  login_error_status: boolean = false;
  login_error_descr: string = '';
  users: any[] = [];


  constructor(private fb: FormBuilder, private authService: AuthService,
              private http: HttpClient, private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    // Reset auth service -> logout
    this.authService.logout();
    // Define form items
    this.loginForm = this.fb.group({
      user__id: ['', Validators.required],
      user_pwd: ['', Validators.required]
    });
    // Get users to store them inside a select item
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    );

  }

  onSubmit() {
    // Read form values
    const form_user__id = this.loginForm.value.user__id;
    const form_username = this.loginForm.value.username;
    const form_user_pwd = this.loginForm.value.user_pwd;
    // Invoke login func.
    this.login(form_user__id, form_username, form_user_pwd);
  }

  login(user__id: string, username: string, user_pwd: string){
    this.authService.login(user__id, username, user_pwd).subscribe(response => {
      if (response.status) {
        // Update login var
        this.login_error_status = ! response.status;
        this.login_error_descr = response.message;
        // Login successful, navigate to home page
        this.router.navigate(["/"]);
      } else {
        // Login failed, display error message
        this.login_error_status = response.status;
        this.login_error_descr = response.message;
      }
    });
  }

}

