import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthPolicyGuard{
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
