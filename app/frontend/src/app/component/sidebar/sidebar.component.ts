import { Component } from '@angular/core';

import {registry} from '../utils/registry';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  registry = [...registry];
}
