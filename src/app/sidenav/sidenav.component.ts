import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  callLogout() {
    console.log("Call logout");

    this.userService.logout()
      .subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/login'])
          }
        }
      });
  }
}
