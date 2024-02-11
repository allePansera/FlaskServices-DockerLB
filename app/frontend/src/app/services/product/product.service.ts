import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {IDatasource, IServerSideGetRowsParams} from "ag-grid-community";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private product_list_pagination = 'api/product/list';

  constructor(private http: HttpClient) { }

  getProductsPagination(): { getRows: (params: IServerSideGetRowsParams) => void } {
    return {
      getRows: (params: IServerSideGetRowsParams) => {
        const url = this.product_list_pagination+`?startRow=${params.request.startRow}&endRow=${params.request.endRow}`;
        this.http.get<any[]>(url).subscribe(
          data => {
            params.successCallback(data, -1);
          },
          error => {
            console.error('Error fetching data:', error);
            params.failCallback();
          }
        );
      }
    };
  }
}
