import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  
  login() {
    AuthService._isLoggedIn$.next(true);
  }

  logout() {
    AuthService._isLoggedIn$.next(false);
  }

  get isLoggedIn(): Observable<boolean> {
    return AuthService._isLoggedIn$;
  }
}