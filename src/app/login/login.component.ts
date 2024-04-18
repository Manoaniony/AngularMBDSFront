import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { LocalService } from '../services/local/local.service';

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


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private localService: LocalService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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

  callApiInternalServer() {
    this.http.post('http://localhost:8010/api/internal-server', undefined).subscribe((res) => {
      console.log("UNAUTHORIZED ", res);
    },)
  }
  callApiForbiden() {
    this.http.post('http://localhost:8010/api/forbidden', undefined).subscribe({
      next: (data) => {
        console.log('Received data:', data);
      },
      error: (error) => {
        console.log('Error data:', error);
      },
      complete: () => {
        console.log('When Complete Received data:');
      }
    })
  }
  callApiUnauthorized() {
    this.http.post('http://localhost:8010/api/unauthorized', undefined).subscribe({
      next: (data) => {
        console.log('Received data:', data);
      },
      error: (error) => {
        console.log('Error data:', error);
      },
      complete: () => {
        console.log('When Complete Received data:');
      }
    })
  }
  callApiOk() {
    this.http.post('http://localhost:8010/api/ok', undefined).subscribe({
      next: (data) => {
        console.log('Received data:', data);
        this.localService.saveData("accessToken", "TOKEN_ACCESS");
      },
      error: (error) => {
        console.log('Error data:', error);
      },
      complete: () => {
        console.log('When Complete Received data:');
      }
    })
  }


  onSubmit() { }
}
