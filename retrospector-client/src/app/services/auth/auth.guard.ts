import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountsService } from '../accounts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private readonly _router: Router, private readonly _accountsService: AccountsService) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    

    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {    
    return this._accountsService.loggedIn$.pipe(
      tap(isLogged => {
        if (!isLogged) {
          this._router.navigateByUrl('/login');
        }
      })
    );
  }
}