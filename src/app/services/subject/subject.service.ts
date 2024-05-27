import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArgsSubjectCreateTypes } from '../../shared/types/subject';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subject } from '../../subjects/subject.model';
import { ListTypes } from '../../shared/types/list';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient,
  ) { }

  list(args?: { page: number, limit: number }): Observable<any> {
    return this.http.get<ListTypes>(`${environment?.apiUrl}/subjects?page=${args?.page || 1}&limit=${args?.limit || 10}`);
  }

  create(args: ArgsSubjectCreateTypes): Observable<any> {
    return this.http.post(`${environment?.apiUrl}/subjects`, args);
  }
}
