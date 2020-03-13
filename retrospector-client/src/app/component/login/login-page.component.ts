import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ret-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
    providers: []
})
export class LoginPageComponent {
    constructor(private _authService: AuthService, private _router: Router) { }

    login() {
        this._authService.login();
        this._router.navigateByUrl('/');
    }
}