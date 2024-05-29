import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListTypes } from '../../shared/types/list';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ArgsExerciseCreateTypes, ArgsExerciseDeleteTypes, ArgsExerciseUpdateTypes } from '../../shared/types/exercise';

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

  create(args: ArgsExerciseCreateTypes): Observable<any> {
    return this.http.post(`${environment?.apiUrl}/assignments`, args);
  }

  delete(args: ArgsExerciseDeleteTypes): Observable<any> {
    return this.http.delete(`${environment?.apiUrl}/assignment/${args?._id}`);
  }

  detail(args?: { _id: string }): Observable<any> {
    return this.http.get<any>(`${environment?.apiUrl}/assignment/${args?._id}`);
  }

  update(args: ArgsExerciseUpdateTypes): Observable<any> {
    return this.http.put(`${environment?.apiUrl}/assignment/${args?._id}/update`, args, {});
  }

}
