import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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
    private router: Router) {
  }

  ngOnInit() {
    this.path = $('#path').text();

    this.route.params.subscribe(params => {
      // Trigger the route based on the path value
      // You can add your logic here to navigate to the desired route
      // For example:
      if (this.path !== '/') {
        // Navigate to the AnagraficaBaseComponent
        this.router.navigate([this.path]);
      }
    });
  }
}
