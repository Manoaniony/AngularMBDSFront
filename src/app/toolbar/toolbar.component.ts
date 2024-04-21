import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { User } from '../models/user/user';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, RouterLink,
    MatMenuModule, MatDivider],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  title: string = "Application de gestion des assignments";
  userConnected: User | undefined;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser()?.subscribe((user: any) => {
      this.userConnected = user;
    })
  }
  @Output()
  open = new EventEmitter<void>();

  menuOpen() {
    this.open.emit();
  }

}
