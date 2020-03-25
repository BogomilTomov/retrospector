import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'angularx-social-login';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit, OnDestroy {
  private loggedInSubs: Subscription;

  constructor(private readonly _accountsService: AccountsService, private readonly _router: Router) {}

  ngOnInit(): void {
    this.loggedInSubs = this._accountsService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.userFirstName = this._accountsService.getLoggedInUserFirstName();
      });
  }

  ngOnDestroy(): void {
    this.loggedInSubs.unsubscribe();
  }

  public title: string = 'Retrospector';

  public isLoggedIn: boolean;

  public userFirstName: string;

  public logout(): void {
    this._accountsService.logOut().pipe(take(1)).subscribe(
      () => {
        this._accountsService.removeLocalStorageInfo();
        this._router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
      }
    );
  }
}