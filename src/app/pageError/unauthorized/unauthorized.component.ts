import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit() {
    console.log("User in the userService ", this.userService.currentUser);
  }

}
