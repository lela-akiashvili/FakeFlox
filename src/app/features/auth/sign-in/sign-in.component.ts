import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { validatePassword } from 'firebase/auth';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  errorMessage: string | null = null;
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  get controls() {
    return this.signInForm.controls;
  }
  onSubmit(): void {
    const signInData = this.signInForm.getRawValue();
    this.authService.login(signInData.email, signInData.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },error:(err)=>{
        this.errorMessage=err.code;
      }
    });
  }
}
