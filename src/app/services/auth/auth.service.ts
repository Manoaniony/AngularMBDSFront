import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ArgsLoginTypes } from '../../shared/types';
import { ArgsRegisterTypes } from '../../shared/types/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  login(args: ArgsLoginTypes): Observable<any> {
    return this.http.post(`${environment?.apiUrl}/auth`, args);
  }

  me(): Observable<any> {
    return this.http.post(`${environment?.apiUrl}/me`, undefined);
  }

  register(args: ArgsRegisterTypes): Observable<any> {
    return this.http.post(`${environment?.apiUrl}/users`, args)
  }

}
