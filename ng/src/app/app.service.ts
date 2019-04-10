import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class AppService {

  private userApi = 'api/v1/user';

  constructor(
    private http: HttpClient,
  ) {}

  count(): Observable<number> {
    return this.http.post<number>(this.userApi + '/count', {}, httpOptions);
  }

  list(): Observable<any> {
    return this.http.post<any>(this.userApi + '/list', {}, httpOptions);
  }

}
