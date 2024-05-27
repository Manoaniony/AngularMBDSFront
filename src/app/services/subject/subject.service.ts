import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArgsSubjectCreateTypes, ArgsSubjectUpdateTypes } from '../../shared/types/subject';
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

  detail(args?: { _id: string }): Observable<any> {
    return this.http.get<any>(`${environment?.apiUrl}/subject/${args?._id}`);
  }

  create(args: ArgsSubjectCreateTypes): Observable<any> {
    return this.http.post(`${environment?.apiUrl}/subjects`, args);
  }

  update(args: ArgsSubjectUpdateTypes): Observable<any> {
    return this.http.put(`${environment?.apiUrl}/subject/${args?._id}/update`, args, {});
  }
}
