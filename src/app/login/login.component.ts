import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LocalService } from '../services/local/local.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../services/auth/auth.service';
import { ResponseLoginTypes } from '../shared/types/login';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean = false;
  submitted: boolean = false;
  loginForm: FormGroup;
  userConnected: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private localService: LocalService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['manolotsoadaniel@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', Validators.required]
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser()?.subscribe((user: any) => {
      this.userConnected = user;
    })
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Ce champ est requis!';
    }
    return this.loginForm.get('email')?.hasError('email')
      ? 'Entrez un email valide'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Ce champ est requis';
    }

    return this.loginForm.get('password')?.hasError('password')
      ? 'Mot de passe incorrecte'
      : '';
  }

  // callApiInternalServer() {
  //   this.http.post('http://localhost:8010/api/internal-server', undefined).subscribe((res) => {
  //     console.log("UNAUTHORIZED ", res);
  //   },)
  // }
  // callApiForbiden() {
  //   this.http.post('http://localhost:8010/api/forbidden', undefined).subscribe({
  //     next: (data) => {
  //       console.log('Received data:', data);
  //     },
  //     error: (error) => {
  //       console.log('Error data:', error);
  //     },
  //     complete: () => {
  //       console.log('When Complete Received data:');
  //     }
  //   })
  // }
  // callApiUnauthorized() {
  //   this.http.post('http://localhost:8010/api/unauthorized', undefined).subscribe({
  //     next: (data) => {
  //       console.log('Received data:', data);
  //     },
  //     error: (error) => {
  //       console.log('Error data:', error);
  //     },
  //     complete: () => {
  //       console.log('When Complete Received data:');
  //     }
  //   })
  // }
  // callApiOk() {
  //   console.log("USER CONNECTED ", this.userConnected);
  //   this.authService.login({ email: "manolotsoadaniel@gmail.com", password: "12345678" }).subscribe({
  //     next: (response: ResponseLoginTypes) => {
  //       const { email, firstName, lastName, role } = response.data;
  //       console.log('Received data:', response);
  //       this.userService.setCurrentUser({
  //         email,
  //         firstName,
  //         lastName,
  //         role
  //       });
  //       this.localService.saveData("accessToken", response?.data?.token);
  //     },
  //     error: (error) => {
  //       console.log('Error data:', error);
  //     },
  //     complete: () => {
  //       console.log('When Complete Received data:');
  //     }
  //   })
  // }

  // callLogout() {
  //   this.userService.logout()
  //     .subscribe({
  //       next: (response) => {
  //         console.log("response LOGOUT", response);
  //       }
  //     });
  // }


  onSubmit() {
    const {
      email,
      password
    } = this.loginForm?.value;

    this.authService.login({ email, password }).subscribe({
      next: (response: ResponseLoginTypes) => {
        const { email, firstName, lastName, role } = response.data;
        console.log('Received data:', response);
        this.userService.setCurrentUser({
          email,
          firstName,
          lastName,
          role
        });
        this.localService.saveData("accessToken", response?.data?.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Error data:', error);
      },
      complete: () => {
        console.log('When Complete Received data:');
      }
    })
  }
}
