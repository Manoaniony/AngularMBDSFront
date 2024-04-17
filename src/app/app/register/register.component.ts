import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading: boolean = false;
  submitted: boolean = false;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

  ) {
    this.registerForm = formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(8)],
      confirmPassword: ['', Validators.required, Validators.minLength(8)],
    });
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      lastName: new FormControl('Razafindrakoto', [Validators.required]),
      firstName: new FormControl('Manolotsoa', [Validators.required]),
      address: new FormControl('Lot II A B 22', [Validators.required]),
      phoneNumber: new FormControl('+261324001027', [Validators.required]),
      cin: new FormControl('102031023548', [Validators.required]),
      email: new FormControl('manolotsoadaniel@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('itu1506!', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('itu1506!', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.registerForm.setValidators(this.matchValidator());
  }

  getLastNameErrorMessage() {
    if (this.registerForm.get('lastName')?.touched && this.registerForm.get('lastName')?.hasError('required')) {
      return 'Vous devez entrer votre nom';
    }
    return this.registerForm.get('lastName')?.hasError('lastName')
      ? 'Vous devez entrer un nom valide'
      : '';
  }

  getFirstNameErrorMessage() {
    if (this.registerForm.get('firstName')?.touched && this.registerForm.get('firstName')?.hasError('required')) {
      return 'Vous devez entrer votre prénom';
    }
    return this.registerForm.get('firsName')?.hasError('firstName')
      ? 'Vous devez entrer un prénom valide'
      : '';
  }

  getAddressErrorMessage() {
    if (this.registerForm.get('address')?.touched && this.registerForm.get('address')?.hasError('required')) {
      return 'Vous devez entrer votre adresse';
    }
    return this.registerForm.get('address')?.hasError('address')
      ? 'Vous devez entrer une adresse valide'
      : '';
  }

  getPhoneNumberErrorMessage() {
    if (this.registerForm.get('phoneNumber')?.touched && this.registerForm.get('phoneNumber')?.hasError('required')) {
      return 'Vous devez entrer votre numéro téléphone';
    }
    return this.registerForm.get('phoneNumber')?.hasError('phoneNumber')
      ? 'Vous devez entrer un numéro téléphone valide'
      : '';
  }

  getCinErrorMessage() {
    if (this.registerForm.get('cin')?.touched && this.registerForm.get('cin')?.hasError('required')) {
      return 'Vous devez entrer votre CIN';
    }
    return this.registerForm.get('cin')?.hasError('cin')
      ? 'Vous devez entrer un numéro CIN valide'
      : '';
  }

  getEmailErrorMessage() {
    if (this.registerForm.get('email')?.touched && this.registerForm.get('email')?.hasError('required')) {
      return 'Vous devez entrer votre email';
    }
    return this.registerForm.get('email')?.hasError('email')
      ? 'Vous devez entrer un adresse email valide'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.get('password')?.touched && this.registerForm.get('password')?.hasError('required')) {
      return 'Vous devez entrer votre mot de passe';
    }
    return this.registerForm.get('password')?.hasError('password')
      ? 'Vous devez entrer un mot de passe valide'
      : '';
  }
  getConfirmPasswordErrorMessage() {
    // if (this.registerForm.get('confirmPassword')?.touched && this.registerForm.get('confirmPassword')?.hasError('required')) {
    //   return 'Vous devez entrer votre confirmation mot de passe';
    // }
    return this.registerForm.get('confirmPassword')?.touched && this.registerForm.get('confirmPassword')?.hasError('required') || this.registerForm.get('confirmPassword')?.hasError('confirmPassword') || this.registerForm.errors
      ? 'Mot de passe non identique'
      : '';
  }

  matchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { password, confirmPassword } = control.value;
      return password !== confirmPassword
        ? { mismatch: true }
        : null;
    };
  }

  openSnackBar(message: string, action: string, error?: boolean) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['bg-error'],
      horizontalPosition: 'right'
    });
  }

  onSubmit() { }
}
