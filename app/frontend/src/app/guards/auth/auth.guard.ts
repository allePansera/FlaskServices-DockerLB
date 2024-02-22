import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthPolicyGuard{
  /**
   * Retrieves whether or not an user is authorized to access a page. Therefore returns true/false.
   * To do so uses AuthService which calls necessary API.
   * @param authService used to access API for verifing if user is authenticated.
   * @param router used for redirecting unauthorized users to /login page.
   */
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if user is logged
    // For further application check the usage with roles
    if (this.authService.isAllowed()) {
      return true;
    }
    // If user is not auth then it's returned to specific page
    this.router.navigate(['/login']);
    return false;
    }
  }
