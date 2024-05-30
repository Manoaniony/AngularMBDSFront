import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
}
