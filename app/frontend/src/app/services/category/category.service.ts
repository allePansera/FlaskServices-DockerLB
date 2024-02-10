import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private category_list = 'api/category/list';
  private category_key_value_list = 'api/category/KEY/VALUE';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.category_list);
  }

  getCategoryByKeyValue(key: string, value: string): Observable<any> {
    this.category_key_value_list = this.category_key_value_list.replace("KEY", key);
    this.category_key_value_list = this.category_key_value_list.replace("VALUE", value);
    return this.http.get(this.category_key_value_list);
  }
}
