import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArgsNoteCreateTypes } from '../../shared/types/note/ArgsNoteCreate.types';
import { ArgsNoteUpdateTypes } from '../../shared/types/note/ArgsNoteUpdate.types';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  detail(args?: { _id: string, matricule: string }): Observable<any> {
    return this.http.get<any>(`${environment?.apiUrl}/assignment/${args?._id}/notes/${args?.matricule}`);
  }

  delete(args?: { _id: string, matricule: string }): Observable<any> {
    return this.http.delete<any>(`${environment?.apiUrl}/assignment/${args?._id}/notes/${args?.matricule}`);
  }

  create(args: ArgsNoteCreateTypes): Observable<any> {
    return this.http.post<any>(`${environment?.apiUrl}/assignments/${args?._id}/eleves`, { eleve: args?.note })
  }

  update(args: ArgsNoteUpdateTypes): Observable<any> {
    return this.http.put<any>(`${environment?.apiUrl}/assignment/${args?._id}/notes/${args?.matricule}/update`, { eleve: args?.note })
  }
}
