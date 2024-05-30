import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Note } from '../note.model';
import { NoteService } from '../../services/note/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormNoteComponent } from '../form-note/form-note.component';

@Component({
  selector: 'app-edit-notes',
  standalone: true,
  imports: [
    FormNoteComponent
  ],
  templateUrl: './edit-notes.component.html',
  styleUrl: './edit-notes.component.css'
})
export class EditNotesComponent {
  currentNote?: BehaviorSubject<Note | undefined>;
  state: "none" | "pending" | "done" = "none";
  extraError?: Observable<{ duplicate: boolean }>;

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.currentNote = new BehaviorSubject<Note | undefined>(undefined);
  }

  ngOnInit() {
    const _id = this.activatedRoute.snapshot.params['id'];
    const matricule = this.activatedRoute.snapshot.params['matricule'];
    this.noteService.detail({ _id, matricule }).subscribe({
      next: (response => {
        console.log("response Edit ", response);

        if (response?.status == "200") {
          this.currentNote?.next(response?.data);
        }
      })
    })
  }

  openSnackBar(message: string, action: string, error?: boolean) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: !error ? ["success-snackbar"] : ["error-snackbar"],
      horizontalPosition: 'right'
    });
  }

  onSubmit(noteSubmitted?: Note) {
    const _id = this.activatedRoute.snapshot.params['id'];
    const matricule = this.activatedRoute.snapshot.params['matricule'];
    if (noteSubmitted) {
      this.state = "pending";
      this.noteService.update({ _id, matricule, note: noteSubmitted }).subscribe({
        next: (response => {
          if (response?.status == "200") {
            this.openSnackBar("Note a été mise à jour avec succès", "ok");
            this.state = "done";
            this.router.navigate([`/exercise/${_id}/notes`]);
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
}
