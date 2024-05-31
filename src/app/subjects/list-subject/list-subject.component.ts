import { Component, SimpleChanges } from '@angular/core';
import { Subject as SubjectApp } from '../subject.model';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubjectService } from '../../services/subject/subject.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-subject',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTable,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  templateUrl: './list-subject.component.html',
  styleUrl: './list-subject.component.css'
})
export class ListSubjectComponent {
  // tableau des subjectes POUR AFFICHAGE
  displayedColumns: string[] = [];
  subjects: SubjectApp[] = [];
  page?: number
  limit?: number
  totalDocs?: number
  totalPages?: number
  nextPage?: number | null
  prevPage?: number | null
  hasNextPage?: number
  hasPrevPage?: number
  pagingCounter?: number
  selectRepresentation: "Table" | "Liste" = "Table";

  onRepresentationChange(represent: "Table" | "Liste") {
    console.log("represent ", represent);

    this.selectRepresentation = represent
  }
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.subjectService.list({ page: event.pageIndex + 1, limit: this.limit }).subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.subjects = response?.data.docs
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
  constructor(
    private subjectService: SubjectService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.displayedColumns = ['label', 'nomProf', 'actions'];
    this.subjectService.list().subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.subjects = response?.data.docs
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
    this.subjectService.delete({ _id }).subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.openSnackBar("Matière a été supprimé avec succès", "ok");
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/subjects']);
          });
        }
      })
    })
  }
}
