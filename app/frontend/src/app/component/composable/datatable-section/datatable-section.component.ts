import {Component, Inject, Input, NgModule, OnInit} from '@angular/core';
import {PaginationService} from "./pagination-service-abs";

@Component({
  selector: 'app-datatable-section',
  templateUrl: './datatable-section.component.html',
  styleUrls: ['./datatable-section.component.css']
})


export class DatatableSectionComponent {
  @Input() columnDefs: any[];
  @Input() paginationService: PaginationService;
  @Input() buttons: string[] = [];
  @Input() selection: string = "single";
  dtOptions: any;

  constructor() { }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      buttons: this.buttons,
      select: {style: this.selection},
      ajax: (dataTablesParameters: any, callback: any) => {
        // Build params for pagination
        let columns: any = dataTablesParameters.columns;
        let offset: any = dataTablesParameters.start;
        let limit: any = dataTablesParameters.length;
        let sorting_col: any = dataTablesParameters.order.map((order: any) => order.column);
        let sorting_direction: any = dataTablesParameters.order.map((order: any) => order.dir);
        let like_search: any = dataTablesParameters.search.value;
        let like_index: string[] = dataTablesParameters.columns
                              .filter((column: any) => column.searchable)
                              .map((column: any) => column.data);
        // Process paginated http get request
        this.paginationService.getRowsPaginated(offset, limit, like_index, like_search,
          columns, sorting_direction, sorting_col).
        subscribe(resp => {
          callback({
            recordsTotal: resp.rowCount,
            recordsFiltered: resp.rowFilteredRecords,
            data: resp.rowData
          });
        });
      },
      columns: this.columnDefs
    };
  }
}
