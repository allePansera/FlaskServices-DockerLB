import { Component } from '@angular/core';

import {anagrafiche, Anagrafiche} from '../utils/anagrafiche';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  anagrafiche = [...anagrafiche]

}
