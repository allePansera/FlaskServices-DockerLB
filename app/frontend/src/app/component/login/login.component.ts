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
  loginerr: boolean = false;
  errdescr: string = '';
  users: any[] = [];
  req__api: string = "/api/login/auth";

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
    // HTTP req structure
    const userData = {
      user__id: this.loginForm.value.user__id,
      user_pwd: this.loginForm.value.user_pwd
    }
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const body=JSON.stringify(userData);
    // HTTP req. execution
    /* TODO: Mettere dentro al service la chiamata e qua dentro tenere solamente
        la redirect e aggiornamento delle variabili del form */
    this.http
      .post<any>(this.req__api, body, {
        headers: headers})
      .subscribe({
          next: response => {
            this.loginerr = response.status;
            this.errdescr = response.msg;
            if(response.status) {
              this.authService.login(this.user__id, this.username, this.user_pwd);
              this.router.navigate(['/'])
            }
            else{
              this.authService.logout();
            }
          },
          error: error => {
            this.loginerr = true;
            this.errdescr = error;
            this.authService.logout();
          }
        }
      );
  }

}

