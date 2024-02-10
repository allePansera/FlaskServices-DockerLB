import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private user_product_list_pagination = 'api/product/list';

  constructor(private http: HttpClient) { }

  getProductsPagination(): Observable<any> {
    return this.http.get(this.user_product_list_pagination);
  }
}
