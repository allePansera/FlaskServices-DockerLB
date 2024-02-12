import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PaginationService } from '../../component/composable/datatable-section/pagination-service-abs'


@Injectable({
  providedIn: 'root'
})

export class ProductService extends PaginationService{

  private productListPagination = 'api/product/list';

  constructor(private http: HttpClient) {
    super();
  }

  getRowsPaginated(offset: number, limit: number, like_index: string[], like_search: string,
                        columns: string[], sorting_direction: string, sorting_col: string): Observable<any> {

    return this.http.get<any>(this.productListPagination, {
          params: {
            limit: limit,
            offset: offset,
            like_index: like_index,
            like_search: like_search,
            sorting_col: sorting_col,
            sorting_direction: sorting_direction,
          }
        })
  }
}
