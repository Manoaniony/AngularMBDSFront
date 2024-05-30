import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    MatDatepickerModule,
    MatSlideToggleModule
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
      rendu: [false, undefined]
    })
  }
  // this.renduControl = new FormControl(false);

  ngOnInit(): void {
    this.note?.subscribe((noteToEdit: any) => {
      this.noteValue = noteToEdit;
      this.noteForm = new FormGroup({
        nom: new FormControl(noteToEdit?.nom || '', [Validators.required]),
        matricule: new FormControl(noteToEdit?.matricule || '', [Validators.required]),
        note: new FormControl(noteToEdit?.note, [Validators.required, Validators.min(0), Validators.max(20)]),
        remarque: new FormControl(noteToEdit?.remarque),
        dateDeRendu: new FormControl(noteToEdit?.dateDeRendu),
        rendu: new FormControl(noteToEdit?.rendu || false)
      });
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes as any)?.extraError) {
      console.log("MATRICULE ALREADY EXIST ", (changes as any)?.extraError);
      this.extraError?.subscribe((error) => {
        this.noteForm.get('matricule')?.setErrors(error);
      })
    }
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
    const errors: any = this.noteForm.get('matricule')?.errors;
    delete errors?.duplicate;
    this.noteForm.get('matricule')?.setErrors(errors);
    // console.log(this.noteForm);

  }

  onSubmitForm() {
    this.resetExtraError();
    const noteSubmitted = this.noteForm?.value as Note;
    if (this.noteForm?.valid) {
      console.log("NoteSubmitted ", noteSubmitted);
      this.onSubmit.emit({
        ...noteSubmitted,
        _id: this.noteValue?._id
      })
    }
    else {
      console.log("Form not valid");
    }
  }

}
