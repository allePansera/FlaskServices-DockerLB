import {Component, Input} from '@angular/core';
import {IDatasource, IServerSideGetRowsParams, GridOptions} from 'ag-grid-community';
import {ProductService} from "../../../services/product/product.service";


@Component({
  selector: 'app-product-category-registry',
  templateUrl: './product-registry.component.html',
  styleUrls: ['./product-registry.component.css']
})

export class ProductRegistryComponent {
  gridApi: any;
  gridColumnApi: any;
  gridOptions: any;
  columnDefs: any[];
  rowData: any[];

  constructor(private productService: ProductService) {
    // Replace with specific field returned from HTML
    this.columnDefs = [
      { headerName: 'Product ID', field: 'prod__id', sortable: true, filter: true },
      { headerName: 'Product Name', field: 'prodname', sortable: true, filter: true },
      { headerName: 'Product Description', field: 'proddesc', sortable: true, filter: true },
      { headerName: 'Product Category', field: 'prodcate', sortable: true, filter: true }
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
    this.productService.getProductsPagination().subscribe(data => {
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
