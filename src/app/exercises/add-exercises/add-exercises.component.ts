import { Component } from '@angular/core';
import { FormExerciseComponent } from '../form-exercise/form-exercise.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exercise } from '../exercise.model';
import { ArgsExerciseCreateTypes } from '../../shared/types/exercise';

@Component({
  selector: 'app-add-exercises',
  standalone: true,
  imports: [
    FormExerciseComponent,
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
  templateUrl: './add-exercises.component.html',
  styleUrl: './add-exercises.component.css'
})
export class AddExercisesComponent {
  state: "none" | "pending" | "done" = "none";
  constructor(
    private exerciseService: ExerciseService,
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

  onSubmit(subjectSubmited: Exercise) {
    this.state = "pending";
    this.exerciseService.create(subjectSubmited as ArgsExerciseCreateTypes).subscribe({
      next: (response => {
        if (response?.status == "201") {
          this.openSnackBar("Exercice a été créé avec succès", "ok");
          this.router.navigate(["/exercises"]);
          this.state = "done"
        }
      })
    })
  }
}
