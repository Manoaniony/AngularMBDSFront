import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note } from '../../notes/note.model';
import { ArgsNoteCreateTypes } from '../../shared/types/note/ArgsNoteCreate.types';

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

  create(args: ArgsNoteCreateTypes): Observable<any> {
    return this.http.post<any>(`${environment?.apiUrl}/assignments/${args?._id}/eleves`, { eleve: args?.note })
  }
}
