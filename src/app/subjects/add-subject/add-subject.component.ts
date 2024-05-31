import { Component } from '@angular/core';
import { FormSubjectComponent } from '../form-subject/form-subject.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Subject as SubjectApp } from '../subject.model';
import { SubjectService } from '../../services/subject/subject.service';
import { ArgsSubjectCreateTypes } from '../../shared/types/subject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [
    FormSubjectComponent,
    MatCardModule,
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent {
  state: "none" | "pending" | "done" = "none";
  constructor(
    private subjectService: SubjectService,
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

  onSubmit(subjectSubmited: SubjectApp & { image?: any }) {
    this.state = "pending";
    this.subjectService.create(subjectSubmited as ArgsSubjectCreateTypes).subscribe({
      next: (response => {
        if (response?.status == "201") {
          this.openSnackBar("Matière a été créé avec succès", "ok");
          this.router.navigate(["/subjects"]);
          this.state = "done";
          console.log("creation response ", response?.data);
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
