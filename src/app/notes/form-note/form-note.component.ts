import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../note.model';
import { NoteService } from '../../services/note/note.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-form-note',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './form-note.component.html',
  styleUrl: './form-note.component.css'
})
export class FormNoteComponent {
  noteForm: FormGroup;
  @Input() note?: BehaviorSubject<Note | undefined>;
  @Input() state?: "none" | "pending" | "done";
  @Input() extraError?: Observable<{ duplicate: boolean }>;
  noteValue?: Note;
  @Output() onSubmit = new EventEmitter<Note>();
  loading: boolean = false;
  notes: Note[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
  ) {
    this.noteForm = this.formBuilder.group({
      nom: ['', Validators.required],
      matricule: ['', Validators.required],
      note: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
      remarque: ['', undefined],
      dateDeRendu: ['', undefined],
    })
  }

  ngOnInit(): void {
    this.note?.subscribe((note: any) => {
      this.noteValue = note;
      this.noteForm = new FormGroup({
        nom: note?.nom || '',
        matricule: note?.matricule || '',
        note: note?.note,
        remarque: note?.remarque,
        dateDeRendu: note?.dateDeRendu,
      });
    })
  }

  getNomErrorMessage() {
    if (this.noteForm.get('nom')?.hasError('required')) {
      return 'Vous devez entrer le nom de l\'etudiant';
    }
    return '';
  }

  getMatriculeErrorMessage() {
    if (this.noteForm.get('matricule')?.hasError('required')) {
      return 'Vous devez entrer le matricule de l\'étudiant';
    }
    else if (this.noteForm.get('matricule')?.hasError('duplicate')) {
      return 'Cet etudiant a déjà une note dans cette matière';
    }
    return '';
  }

  getNoteErrorMessage() {
    console.log("this.noteForm.get('note') ", this.noteForm.get('note')?.touched);
    if (this.noteForm.get('note')?.hasError('required')) {
      return 'Vous devez entrer la note de l\'étudiant';
    }
    else if (this.noteForm.get('note')?.hasError('min') || this.noteForm.get('note')?.hasError('max')) {
      return 'La note doit être entre 0 et 20';
    }
    return ''
  }

  resetExtraError() {
    this.extraError = undefined;
    this.noteForm.get('matricule')?.setErrors({ ...this.noteForm.get('matricule')?.errors, duplicate: false });
    // console.log(this.noteForm);

  }

  onSubmitForm() {
    this.resetExtraError();
  }

}
