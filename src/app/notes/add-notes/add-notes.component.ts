import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NoteService } from '../../services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../note.model';
import { FormNoteComponent } from '../form-note/form-note.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArgsNoteCreateTypes } from '../../shared/types/note/ArgsNoteCreate.types';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  onSubmit(noteSubmitted: Note) {
    this.state = "pending";
    const _id = this.activatedRoute.snapshot.params['id'];
    this.noteService.create({ _id, note: noteSubmitted }).subscribe({
      next: (response => {
        if (response?.status == "201") {
          this.openSnackBar("Note a été créé avec succès", "ok");
          this.router.navigate([`/exercise/${_id}/notes`]);
          this.state = "done"
        }
      }),
      error: (responseError => {
        if (responseError?.error?.error?.code == "11000") {
          this.extraError = of({ duplicate: true })
          this.state = "none";
        }
      })
    })
  }
}
