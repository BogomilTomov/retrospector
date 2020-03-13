import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit{
  title = 'Retrospector';
  userFirstName = 'Placeholder';
  isLoggedIn$: Observable<boolean>;

  constructor(private readonly _router: Router, private readonly _authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn;
  }
}
