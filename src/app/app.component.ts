import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { user } from '@angular/fire/auth';
// import { User } from './types/users';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'fake';
 public readonly authService = inject(AuthService);
 private router = inject(Router);
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          userName: user.displayName!,
        });
      }else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    });
  }
  logOut():void{
    this.authService.logOut();
    this.router.navigateByUrl('/auth/sign-in')
  }
}
