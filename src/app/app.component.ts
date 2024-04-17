import { Component } from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Layouts } from './shared/layout.enum';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './pageError/forbidden/forbidden.component';
import { InternalServerComponent } from './pageError/internal-server/internal-server.component';
import { UnauthorizedComponent } from './pageError/unauthorized/unauthorized.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    AssignmentsComponent,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    // Component
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    InternalServerComponent,
    UnauthorizedComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Application de gestion des assignments';
  opened = false;
  Layouts = Layouts;
  layout: Layouts | undefined;

  constructor(private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private router: Router) { }

  login() {
    // on utilise le service d'autentification
    // pour se connecter ou se déconnecter
    if (!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }

  genererDonneesDeTest() {
    // on utilise le service
    /* VERSION NAIVE
    this.assignmentsService.peuplerBD();
    */

    // VERSION AVEC Observable
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("Données générées, on rafraichit la page pour voir la liste à jour !");
        window.location.reload();
        // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
        // this.router.navigate(['/home'], {replaceUrl:true});
      });
  }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.layout = data?.state?.root?.firstChild?.data['layout']
      }
      console.log('layout', this.layout);
    });
  }
}
