import {Observable} from "rxjs";

export abstract class PaginationService{

  abstract getRowsPaginated(offset: number, limit: number, like_index: string[], like_search: string,
          columns: string[], sorting_direction: string, sorting_col: string): Observable<any>;

}
