import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _url = `${baseUrl}/users`;

  constructor(private readonly _http: HttpClient) { }
  
  setSelectedTeam(userId: string, teamId: number): void {
    this._http.post<string>(`${this._url}/${userId}/select-team/${teamId}`, {}).toPromise().then(res => console.log(res));
  }

  getUserSuggestions(email: string): Observable<IUser[]> {
    const params = { email: email };
    return this._http.get<IUser[]>(this._url, {params: params});
  }
  
  getUsersInTeam(teamId: number): Observable<IUser[]> {
    const params = { id: teamId.toString() };
    return this._http.get<IUser[]>(`${baseUrl}/teams/${teamId}/users`, {params: params});
  }

  addUserToTeam(email: string, teamId: number): Observable<IUser> {
    const data = {'email': email}; 
    return this._http.post<IUser>(`${baseUrl}/teams/${teamId}/users`, data);
  }

  removeUserFromTeam(userId: string, teamId: number): Observable<IUser> {
    const options = {
      body: {
        id: userId
      }
    };

    return this._http.request<IUser>('delete', `${baseUrl}/teams/${teamId}/users`, options)
  }
}
