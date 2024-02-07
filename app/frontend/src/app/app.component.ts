import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "./services/auth/auth.service";
import {SessionStorageService} from "./services/session-storage/session-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular';
  path: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionStorageCleanupService: SessionStorageService,
    public authService: AuthService) {
  }

  ngOnInit(): void {
    // Clean previous sessionStorage values
    this.sessionStorageCleanupService.cleanExpiredData();

    // Every 5 minute clean expired data
    setInterval(() => {
      this.sessionStorageCleanupService.cleanExpiredData();
    }, 5 * 60 * 1000);
  }
}
