import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject as SubjectApp } from '../subject.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


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
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './form-subject.component.html',
  styleUrl: './form-subject.component.css'
})
export class FormSubjectComponent {
  subjectForm: FormGroup;
  @Input() subject?: BehaviorSubject<SubjectApp | undefined>;
  @Input() state?: "none" | "pending" | "done";
  subjectValue?: SubjectApp;
  @Output() onSubmit = new EventEmitter<SubjectApp & { image?: any }>();
  loading: boolean = false;
  blobUrl?: string;
  imageBlob?: Blob;

  toggleLoading(): void {

    console.log("Toggle run ", this.loading);

    this.loading = !this.loading;
  }

  constructor(private formBuilder: FormBuilder) {
    this.subjectForm = this.formBuilder.group({
      label: ['', Validators.required],
      nomProf: ['', Validators.required],
      // imgProf: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    console.log("data TO EDIT ", this.subject);
    this.subject?.subscribe((currentSubject: any) => {
      this.subjectValue = currentSubject;
      this.subjectForm = new FormGroup({
        label: new FormControl(this.subjectValue?.label || '', [Validators.required]),
        nomProf: new FormControl(this.subjectValue?.nomProf || '', [Validators.required]),
        // imgProf: new FormControl(this.subjectValue?.imgProf || '', [Validators.required])
      });
    })
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

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(typeof inputNode.files[0]);
        this.imageBlob = inputNode.files[0];
        const imageTemp = new Blob([e.target.result]);
        this.blobUrl = URL.createObjectURL(imageTemp);
        // Process the selected file (e.target.result contains file data)
        // For example, you can display the file content or upload it to a server.
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  onSubmitForm() {
    const { label, nomProf, imgProf } = this.subjectForm?.value as SubjectApp;
    if (this.subjectForm?.valid) {
      this.onSubmit.emit({
        _id: this.subjectValue?._id,
        label,
        nomProf,
        imgProf: this.subjectValue?.imgProf,
        image: this.imageBlob
      })
    }
    else {
      console.log("Form not valid");
    }
  }

}
