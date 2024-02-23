import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {PaginationService} from "../../component/composable/datatable-section/pagination-service-abs";


@Injectable({
  providedIn: 'root'
})
export class UserService extends PaginationService {

  private user_login_list = 'api/user/list/login';
  private user_registry_list = 'api/user/list/category-registry';
  private userListPagination = 'api/user/list'

  constructor(private http: HttpClient) {
    super();
  }

  getUsersLogin(): Observable<any> {
    return this.http.get(this.user_login_list);
  }

  getUsersRegistry(): Observable<any> {
    return this.http.get(this.user_registry_list);
  }

  override getRowsPaginated(offset: number, limit: number, like_index: string[], like_search: string, columns: string[], sorting_direction: string, sorting_col: string): Observable<any> {
    return this.http.get<any>(this.userListPagination, {
        params: {
          limit: limit,
          offset: offset,
          like_index: like_index,
          like_search: like_search,
          sorting_col: sorting_col,
          sorting_direction: sorting_direction,
        }
      }
    );
  }
}
