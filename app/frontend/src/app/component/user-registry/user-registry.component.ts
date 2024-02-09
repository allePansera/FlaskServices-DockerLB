import {Component, Input} from '@angular/core';
import {IDatasource, IServerSideGetRowsParams} from 'ag-grid-community';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})

export class UserRegistryComponent {
  gridApi: any;
  gridColumnApi: any;
  gridOptions: any;
  columnDefs: any[];
  rowData: any[];

  constructor(private userService: UserService) {
    // Replace with specific field returned from HTML
    this.columnDefs = [
      { headerName: 'User ID', field: 'user__id', sortable: true, filter: true },
      { headerName: 'User Name', field: 'username', sortable: true, filter: true },
      { headerName: 'User Role', field: 'userrole', sortable: true, filter: true }
    ];
    // Data table structure
    this.gridOptions = {
      domLayout: 'autoHeight',
      autoHeight: true,
      rowSelection: 'single'
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // Set col width dynamically
    params.api.sizeColumnsToFit();
    this.userService.getUsersRegistry().subscribe(data => {
      this.rowData = data;
    });
  }

  onSelectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log("Selected row: ", selectedRows);
  }

  onCellClicked(event: any){
    const selectedCell = this.gridApi.getSelectedNodes();
    console.log("Selected cell:", selectedCell);
  }

}
