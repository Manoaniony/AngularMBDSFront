import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../note.model';
import { FormNoteComponent } from '../form-note/form-note.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-notes',
  standalone: true,
  imports: [
    FormNoteComponent
  ],
  templateUrl: './add-notes.component.html',
  styleUrl: './add-notes.component.css'
})
export class AddNotesComponent {
  state: "none" | "pending" | "done" = "none";
  extraError?: Observable<{ duplicate: boolean }>;

  constructor(
    private noteService: NoteService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  openSnackBar(message: string, action: string, error?: boolean) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: !error ? ["success-snackbar"] : ["error-snackbar"],
      horizontalPosition: 'right'
    });
  }

  onSubmit(notes: Note) { }
}
