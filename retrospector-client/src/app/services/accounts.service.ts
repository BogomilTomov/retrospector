import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialUser } from 'angularx-social-login';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly _baseUrl = 'https://localhost:44372/api/Accounts';

  private readonly loggedIn = new BehaviorSubject<boolean>(this.authTokenExists());

  get loggedIn$(): Observable<boolean> {
    return this.loggedIn;
    }

  constructor(private readonly _http: HttpClient) { }

  public login(user: SocialUser): Observable<SocialUser> {
    return this._http.post<SocialUser>(this._baseUrl + '/login', user);
  }

  public logOut() {
    return this._http.post(this._baseUrl + '/logout', '');
  }

  public removeLocalStorageInfo(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.loggedIn.next(this.authTokenExists());
  }

  public getLoggedInUserFirstName(): string {
    return localStorage.getItem('firstname');
  }

  public getLoggedInUserId(): string {
    return localStorage.getItem('userId');
  }

  public static getLoggedInUserToken(): string {
    return localStorage.getItem('auth_token');
  }

  public setLocalStorageInfo(firstName: string, authToken: string, role: string, userId: string): void {
    localStorage.setItem('firstname', firstName);
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    this.loggedIn.next(this.authTokenExists());
  }

  private authTokenExists(): boolean {
    return localStorage.getItem('auth_token') != null && localStorage.getItem('auth_token') != undefined;
  }
}