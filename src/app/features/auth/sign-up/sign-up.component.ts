import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  errorMessage: string | null = null;
  signUpForm = this.fb.group({
    userName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(this.passwordPattern)],
    ],
    confirmPassword: ['', [Validators.required]],
  });

  get controls() {
    return this.signUpForm.controls;
  }
  onSubmit(): void {
    const signUpData = this.signUpForm.getRawValue();
    // console.log(signUpData);
    this.authService
      .register(signUpData.email, signUpData.userName,signUpData.password, )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },error:(err)=>{this.errorMessage = err.code;
          console.log(err.message)
        }
      });
  }
  ngOnInit(): void {
    this.signUpForm.addValidators(this.passwordsMatchValidator());
  }
  passwordsMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.password === control.value.confirmPassword
        ? null
        : {
            passwordsMatch: 'Passwords do not match!',
          };
    };
  }
}
