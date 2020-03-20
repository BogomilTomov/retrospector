import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AccountsService } from 'src/app/services/accounts.service';
import { UserViewModel } from 'src/app/models/userViewModel.model';

@Component({
    selector: 'ret-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
    providers: []
})
export class LoginPageComponent {
    public user: SocialUser;

    constructor(private readonly _authService: AuthService, private readonly _accountsService: AccountsService,
                private readonly _router: Router) { }

    public login() {
        var provider: string = GoogleLoginProvider.PROVIDER_ID;

        this._authService.signIn(provider).then(
            (success: SocialUser) => {
                this.user = success;
                this._accountsService.login(this.user).pipe(take(1)).subscribe(
                    (result: UserViewModel) => {
                        this._accountsService.setLocalStorageInfo(success.firstName, success.authToken, result.role);
                        this._router.navigateByUrl('/');
                    },
                    error => {
                        console.log(error);
                    }
                );
            },
            (error) => {
                console.log(error);
            }
        );

    }
}