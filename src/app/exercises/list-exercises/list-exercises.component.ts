import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';

@Component({
  selector: 'app-list-exercises',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTable,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './list-exercises.component.html',
  styleUrl: './list-exercises.component.css'
})
export class ListExercisesComponent {
  // tableau des subjectes POUR AFFICHAGE
  displayedColumns: string[] = [];
  exercises: Exercise[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.displayedColumns = ['label', 'matiere', 'actions'];
    this.exerciseService.list().subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.exercises = response?.data.docs
        }
      })
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, _id: string): void {
    this.dialog.open(DeleteModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: "Confirmation suppression",
        content: `Voulez-vous vraiment le supprimer ?`,
        cancel: "annuler",
        validate: "Oui",
        onDelete: () => { this.onDelete(_id) }
      }
    });
  }

  openSnackBar(message: string, action: string, error?: boolean) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: !error ? ["success-snackbar"] : ["error-snackbar"],
      horizontalPosition: 'right'
    });
  }

  onDelete(_id: string) {
    // this.subjectService.delete({ _id }).subscribe({
    //   next: (response => {
    //     if (response?.status == "200") {
    //       this.openSnackBar("Matière a été supprimé avec succès", "ok");
    //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //         this.router.navigate(['/subjects']);
    //       });
    //     }
    //   })
    // })
  }
}
