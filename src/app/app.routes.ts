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
// import { authenticationGuard } from './shared/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: AssignmentsComponent },
  { path: "add", component: AddAssignmentComponent },
  { path: "assignment/:id", component: AssignmentDetailComponent },
  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  },
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
