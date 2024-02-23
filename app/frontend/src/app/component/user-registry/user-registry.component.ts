import {Component, Input} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PaginationService} from "../composable/datatable-section/pagination-service-abs";

@Component({
  selector: 'app-user-category-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})

export class UserRegistryComponent {
  datatablesColumnDefs: any[] = [];
  datatableButtons: any[] = [];
  datatableSelection: string;
  datatablePaginationService: PaginationService;

  constructor(private userService: UserService) {
    this.datatablesColumnDefs = [
      {data: 'user__id', name: 'user__id', sortable: true, filter: true, description: 'User ID'},
      {data: 'username', name: 'username', sortable: true, filter: true, description: 'User Name'},
      {data: 'userrole', name: 'userrole', sortable: true, filter: true, description: 'User Role'},
    ]
    this.datatableSelection = 'single';
    this.datatableButtons = [
      {
        text: '<i class="tf-icons bx bx-user-plus"></i>', // bx-add-to-queue
        titleAttr: 'nuovo',
        className: 'btn-primary',
        action: function (e: any, dt: any, node: any, config: any) {
          console.log('pressed');
        }
      },
    ]
    this.datatablePaginationService = this.userService as PaginationService;
  }
}
