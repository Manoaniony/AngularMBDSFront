import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListTypes } from '../../shared/types/list';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private http: HttpClient,
  ) { }

  list(args?: { page: number, limit: number }): Observable<any> {
    return this.http.get<ListTypes>(`${environment?.apiUrl}/assignments?page=${args?.page || 1}&limit=${args?.limit || 10}`);
  }
}
