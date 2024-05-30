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
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';


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
    MatPaginatorModule
  ],
  templateUrl: './list-exercises.component.html',
  styleUrl: './list-exercises.component.css'
})
export class ListExercisesComponent {
  // tableau des exercices POUR AFFICHAGE
  displayedColumns: string[] = [];
  exercises: Exercise[] = [];
  page?: number
  limit?: number
  totalDocs?: number
  totalPages?: number
  nextPage?: number | null
  prevPage?: number | null
  hasNextPage?: number
  hasPrevPage?: number
  pagingCounter?: number

  constructor(
    private exerciseService: ExerciseService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.exerciseService.list({ page: event.pageIndex + 1, limit: this.limit }).subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.exercises = response?.data.docs
          // pagination
          this.totalDocs = response?.data?.totalDocs
          this.totalPages = response?.data?.totalPages
          this.pagingCounter = response?.data?.pagingCounter
          this.hasPrevPage = response?.data?.hasPrevPage
          this.prevPage = response?.data?.prevPage
          this.nextPage = response?.data?.nextPage
        }
      })
    })
  }

  ngOnInit() {
    this.displayedColumns = ['label', 'matiere', 'actions'];
    this.exerciseService.list().subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.exercises = response?.data.docs
          // pagination
          this.totalDocs = response?.data?.totalDocs
          this.limit = response?.data?.limit
          this.page = 0
          this.totalPages = response?.data?.totalPages
          this.pagingCounter = response?.data?.pagingCounter
          this.hasPrevPage = response?.data?.hasPrevPage
          this.prevPage = response?.data?.prevPage
          this.nextPage = response?.data?.nextPage
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
