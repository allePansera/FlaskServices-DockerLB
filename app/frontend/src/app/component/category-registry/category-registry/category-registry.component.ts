import { Component } from '@angular/core';
import {IDatasource, IServerSideGetRowsParams, GridOptions} from 'ag-grid-community';
import {CategoryService} from "../../../services/category/category.service";

@Component({
  selector: 'app-category-category-registry',
  templateUrl: './category-registry.component.html',
  styleUrls: ['./category-registry.component.css']
})

export class CategoryRegistryComponent {
  gridApi: any;
  gridColumnApi: any;
  gridOptions: any;
  columnDefs: any[];
  rowData: any[];

  constructor(private categoryService: CategoryService) {
    // Replace with specific field returned from HTML
    this.columnDefs = [
      { headerName: 'Category ID', field: 'cate__id', sortable: true, filter: true },
      { headerName: 'Category Name', field: 'catename', sortable: true, filter: true }
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
    this.categoryService.getCategories().subscribe(data => {
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
