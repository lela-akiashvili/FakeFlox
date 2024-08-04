import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../../types/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);
  register(
    email: string,
    userName: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: userName })
    );
    return from(promise);
  }
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }
  anonymousLogin(): Observable<UserCredential> {
    const promise = signInAnonymously(this.firebaseAuth);
    return from(promise);
  }
  logOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
