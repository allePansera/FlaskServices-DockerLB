import {Component} from '@angular/core';
import {registry, Registry} from "../utils/registry";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  anagrafiche = [...registry]

  /**
   * The class is used to show or hide (toggle) sidebar.
   */
  toggleSidebar() {
    if (!$('body').hasClass('toggle-sidebar')) {
      $('body').addClass('toggle-sidebar');
    } else {
      $('body').removeClass('toggle-sidebar')
    }
  }
}
