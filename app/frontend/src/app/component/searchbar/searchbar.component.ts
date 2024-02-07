import {Component} from '@angular/core';
import {anagrafiche, Anagrafiche} from "../utils/anagrafiche";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  anagrafiche = [...anagrafiche]

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
