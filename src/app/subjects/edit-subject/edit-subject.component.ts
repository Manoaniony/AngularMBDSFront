import { Component } from '@angular/core';
import { FormSubjectComponent } from '../form-subject/form-subject.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject as SubjectApp } from '../subject.model';
import { SubjectService } from '../../services/subject/subject.service';
import { BehaviorSubject } from 'rxjs';
import { ArgsSubjectUpdateTypes } from '../../shared/types/subject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-subject',
  standalone: true,
  imports: [
    FormSubjectComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.css'
})
export class EditSubjectComponent {
  currentSubject?: BehaviorSubject<SubjectApp | undefined>;
  state: "none" | "pending" | "done" = "none";
  constructor(
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.currentSubject = new BehaviorSubject<SubjectApp | undefined>(undefined);
  }

  ngOnInit() {
    const _id = this.activatedRoute.snapshot.params['id'];
    this.subjectService.detail({ _id }).subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.currentSubject?.next(response?.data);
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

  onSubmit(subjectSubmited?: SubjectApp & { image?: any }) {
    if (subjectSubmited) {
      this.state = "pending";
      console.log("isSubmitted from Edit ", subjectSubmited);
      this.subjectService.update(subjectSubmited as ArgsSubjectUpdateTypes).subscribe({
        next: (response => {
          if (response?.status == "200") {
            this.openSnackBar("Matière a été mise à jour avec succès", "ok");
            this.state = "done";
            this.router.navigate(["/subjects"]);
            if (subjectSubmited?.image) {
              console.log(subjectSubmited?.image);
              this.subjectService.upload({ image: subjectSubmited?.image }).subscribe((responseUpload: any) => {
                console.log("responseUpload ", responseUpload?.data[0]);
                this.subjectService?.update({ ...response?.data, imgProf: responseUpload?.data[0]?.url }).subscribe((responseUpdate) => {
                  console.log("update done! ", responseUpdate);
                })
              })
            }
          }
        })
      })
    }
  }
}
