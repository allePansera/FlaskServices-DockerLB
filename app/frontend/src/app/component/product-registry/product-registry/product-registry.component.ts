import {Component, Inject} from '@angular/core';
import {DatatableSectionComponent} from "../../composable/datatable-section/datatable-section.component";
import {ProductService} from "../../../services/product/product.service";
import {PaginationService} from "../../composable/datatable-section/pagination-service-abs";


@Component({
  selector: 'app-product-category-registry',
  templateUrl: './product-registry.component.html',
  styleUrls: ['./product-registry.component.css'],
})
export class ProductRegistryComponent {
  /**
   * Class extends PaginationService which is used to populate DataTable using Pagination.
   */
  datatatableColumnDefs: any[] = [];
  datatatableButtons: string[] = [];
  datatatableSelection: string;
  datatablePaginationService: PaginationService;


  constructor(private productService: ProductService) {
    // Init DataTable properties
    this.datatatableColumnDefs = [
      {data: 'prod__id', name: 'prod__id', sortable: true, filter: true, description: "Product ID"},
      {data: 'prodname', name: 'prodname', sortable: true, filter: true, description: "Product Name"},
      {data: 'proddesc', name: 'proddesc', sortable: true, filter: true, description: "Product Description"},
      {data: 'prodcate', name: 'prodcate', sortable: true, filter: true, description: "Product Category"}
    ];
    this.datatatableButtons = ["excel"];
    this.datatatableSelection = "single";
    this.datatablePaginationService = this.productService as PaginationService;
  }

}
