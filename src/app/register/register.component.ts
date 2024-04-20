import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { User } from '../models/user/user';
import { UserService } from '../services/user/user.service';

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
    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(8)],
      confirmPassword: ['', Validators.required, Validators.minLength(8)],
    });
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      lastName: new FormControl('Razafindrakoto', [Validators.required]),
      firstName: new FormControl('Manolotsoa', [Validators.required]),
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

  getEmailErrorMessage() {
    if (this.registerForm.get('email')?.touched && this.registerForm.get('email')?.hasError('required')) {
      return 'Vous devez entrer votre email';
    }
    return this.registerForm.get('email')?.hasError('email')
      ? 'Vous devez entrer un adresse email valide'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.get('password')?.hasError('required')) {
      return 'Vous devez entrer votre mot de passe';
    }
    else if (this.registerForm.get('password')?.hasError('minlength')) {
      return 'Le mot de passe doit etre au moin 8 caracteres';
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
      duration: 36000000,
      verticalPosition: 'top',
      panelClass: ["success-snackbar"],
      horizontalPosition: 'right'
    });
  }

  onSubmit() {
    const {
      lastName,
      firstName,
      email,
      password
    } = this.registerForm?.value;

    if (this.registerForm?.valid) {
      const userToCreate: User = {
        lastName,
        firstName,
        email,
        password
      }
      console.log("userToCreate ", userToCreate);
      this.openSnackBar("Compte créé avec succes", "ok")
    }
    else {
      console.log("Form not invalid");
    }


  }
}
