import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject as SubjectApp } from '../subject.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-subject',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-subject.component.html',
  styleUrl: './form-subject.component.css'
})
export class FormSubjectComponent {
  subjectForm: FormGroup;
  @Input() subject?: SubjectApp;

  constructor(private formBuilder: FormBuilder) {
    this.subjectForm = this.formBuilder.group({
      label: ['', Validators.required],
      nomProf: ['', Validators.required],
      imgProf: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.subjectForm = new FormGroup({
      label: new FormControl(this.subject?.label || '', [Validators.required]),
      nomProf: new FormControl(this.subject?.nomProf || '', [Validators.required]),
      imgProf: new FormControl(this.subject?.imgProf || '', [Validators.required])
    });
  }

  getLabelErrorMessage() {
    if (this.subjectForm.get('label')?.touched && this.subjectForm.get('label')?.hasError('required')) {
      return 'Vous devez entrer le libellé de matière';
    }
    return '';
  }

  getNomProfErrorMessage() {
    if (this.subjectForm.get('nomProf')?.touched && this.subjectForm.get('nomProf')?.hasError('required')) {
      return 'Vous devez entrer le nom du professeur';
    }
    return '';
  }

  getImageErrorMessage() {
    if (this.subjectForm.get('imgProf')?.touched && this.subjectForm.get('imgProf')?.hasError('required')) {
      return 'Vous devez entrer l\'image du professeur';
    }
    return '';
  }

  onSubmit() { }
}
