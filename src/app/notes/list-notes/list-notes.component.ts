import { Component } from '@angular/core';
import { Note } from '../note.model';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Exercise } from '../../exercises/exercise.model';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTable,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './list-notes.component.html',
  styleUrl: './list-notes.component.css'
})
export class ListNotesComponent {
  displayedColumns: string[] = [];
  notes: Note[] = [];
  currentAssignment?: Exercise;

  constructor(
    private exerciseService: ExerciseService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    const _id = this.activatedRoute.snapshot.params['id'];
    this.displayedColumns = ['matricule', 'nom', 'note', 'rendu', 'remarque', 'dateDeRendu', 'actions'];
    this.exerciseService.detail({ _id }).subscribe({
      next: (response => {
        if (response?.status == "200") {
          console.log("response?.data?.eleves ", response?.data?.eleves);
          this.currentAssignment = response?.data;
          this.notes = response?.data?.eleves
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
    this.exerciseService.delete({ _id }).subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.openSnackBar("Exercice a été supprimé avec succès", "ok");
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/exercises']);
          });
        }
      })
    })
  }

}
