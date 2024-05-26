import { Component } from '@angular/core';
import { Subject as SubjectApp } from '../subject.model';
import { MatTable, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-subject',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTable,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './list-subject.component.html',
  styleUrl: './list-subject.component.css'
})
export class ListSubjectComponent {
  // tableau des assignments POUR AFFICHAGE
  displayedColumns: string[] = [];
  subjects: SubjectApp[] = [];

  ngOnInit() {
    console.log('ngOnInit assignments, appelée AVANT affichage du composant');
    this.displayedColumns = ['label', 'nomProf', 'imgProf', 'actions'];
    this.subjects = [
      { label: "Grails", nomProf: "Galli", _id: "1", imgProf: "img_prof_1" },
      { label: "Big Data", nomProf: "Mopolo", _id: "2", imgProf: "img_prof_2" },
    ]
  }
}
