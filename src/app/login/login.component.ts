import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean = false;
  submitted: boolean = false;
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getEmailErrorMessage() {
    console.log(this.loginForm);
    
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


  onSubmit() { }
}
