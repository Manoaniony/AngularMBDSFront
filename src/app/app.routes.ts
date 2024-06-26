import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { Layouts } from './shared/layout.enum';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './pageError/forbidden/forbidden.component';
import { InternalServerComponent } from './pageError/internal-server/internal-server.component';
import { UnauthorizedComponent } from './pageError/unauthorized/unauthorized.component';
import { ListSubjectComponent } from './subjects/list-subject/list-subject.component';
import { AddSubjectComponent } from './subjects/add-subject/add-subject.component';
import { EditSubjectComponent } from './subjects/edit-subject/edit-subject.component';
import { DetailSubjectComponent } from './subjects/detail-subject/detail-subject.component';
import { ListExercisesComponent } from './exercises/list-exercises/list-exercises.component';
import { AddExercisesComponent } from './exercises/add-exercises/add-exercises.component';
import { EditExercisesComponent } from './exercises/edit-exercises/edit-exercises.component';
import { ListNotesComponent } from './notes/list-notes/list-notes.component';
import { EditNotesComponent } from './notes/edit-notes/edit-notes.component';
import { AddNotesComponent } from './notes/add-notes/add-notes.component';
// import { authenticationGuard } from './shared/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: ListExercisesComponent },
  // { path: "add", component: AddAssignmentComponent },
  // { path: "assignment/:id", component: AssignmentDetailComponent },
  // {
  //   path: "assignment/:id/edit",
  //   component: EditAssignmentComponent,
  //   canActivate: [authGuard]
  // },
  {
    path: "subjects",
    component: ListSubjectComponent,
    data: { layout: Layouts.Subjects }
  },
  {
    path: "subject/add",
    component: AddSubjectComponent,
    data: { layout: Layouts.Subjects }
  },
  {
    path: "subject/:id/edit",
    component: EditSubjectComponent,
    data: { layout: Layouts.Subjects }
  },
  {
    path: "subject/:id",
    component: DetailSubjectComponent,
    data: { layout: Layouts.Subjects }
  },
  {
    path: "exercises",
    component: ListExercisesComponent,
    data: { layout: Layouts.Exercise }
  },
  {
    path: "exercises/add",
    component: AddExercisesComponent,
    data: { layout: Layouts.Exercise }
  },
  {
    path: "exercise/:id/edit",
    component: EditExercisesComponent
  },
  {
    path: "exercise/:id/notes",
    component: ListNotesComponent
  },
  {
    path: "exercise/:id/notes/:matricule/edit",
    component: EditNotesComponent
  },
  {
    path: "exercise/:id/note/new",
    component: AddNotesComponent
  },
  // {
  //   path: "assignment/:id/edit",
  //   component: EditAssignmentComponent,
  //   canActivate: [authGuard]
  // },
  {
    path: "login",
    component: LoginComponent,
    data: { layout: Layouts.Login },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: { layout: Layouts.Register },
  },
  {
    path: "forbidden",
    component: ForbiddenComponent,
    data: { layout: Layouts.Forbidden },
  },
  {
    path: "internal-server",
    component: InternalServerComponent,
    data: { layout: Layouts.InternalServer },
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent,
    data: { layout: Layouts.Unauthorized },
  }
];
