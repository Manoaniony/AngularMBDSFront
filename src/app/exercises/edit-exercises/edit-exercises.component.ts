import { Component } from '@angular/core';
import { Exercise } from '../exercise.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArgsExerciseUpdateTypes } from '../../shared/types/exercise';
import { FormExerciseComponent } from '../form-exercise/form-exercise.component';

@Component({
  selector: 'app-edit-exercises',
  standalone: true,
  imports: [
    FormExerciseComponent
  ],
  templateUrl: './edit-exercises.component.html',
  styleUrl: './edit-exercises.component.css'
})
export class EditExercisesComponent {
  currentExercise?: BehaviorSubject<Exercise | undefined>;
  state: "none" | "pending" | "done" = "none";
  extraError?: Observable<{ duplicate: boolean }>;

  constructor(
    private exerciseService: ExerciseService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.currentExercise = new BehaviorSubject<Exercise | undefined>(undefined);
  }

  ngOnInit() {
    const _id = this.activatedRoute.snapshot.params['id'];
    this.exerciseService.detail({ _id }).subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.currentExercise?.next(response?.data);
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

  onSubmit(exerciseSubmited?: Exercise) {
    if (exerciseSubmited) {
      this.state = "pending";
      console.log("isSubmitted from Edit ", exerciseSubmited);
      this.exerciseService.update(exerciseSubmited as ArgsExerciseUpdateTypes).subscribe({
        next: (response => {
          if (response?.status == "200") {
            this.openSnackBar("Exercice a été mise à jour avec succès", "ok");
            this.state = "done";
            this.router.navigate(["/exercises"]);
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
