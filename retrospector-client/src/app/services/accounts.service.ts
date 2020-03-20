import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly _url = `${baseUrl}/Accounts`;

  private readonly loggedIn = new BehaviorSubject<boolean>(this.authTokenExists());

  get loggedIn$(): Observable<boolean> {
    return this.loggedIn;
    }

  constructor(private readonly _http: HttpClient) { }

  public login(user: SocialUser): Observable<SocialUser> {
    return this._http.post<SocialUser>(this._url + '/login', user);
  }

  public logOut() {
    return this._http.post(this._url + '/logout', '');
  }

  public removeLocalStorageInfo(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('role');
    this.loggedIn.next(this.authTokenExists());
  }

  public getLoggedInUserFirstName(): string {
    return localStorage.getItem('firstname');
  }

  public setLocalStorageInfo(firstName: string, authToken: string, role: string): void {
    localStorage.setItem('firstname', firstName);
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('role', role);
    this.loggedIn.next(this.authTokenExists());
  }

  private authTokenExists(): boolean {
    return localStorage.getItem('auth_token') != null && localStorage.getItem('auth_token') != undefined;
  }
}