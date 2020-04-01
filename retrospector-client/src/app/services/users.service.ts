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
  
  setSelectedTeam(userId: string, teamId: number): Observable<string> {
    return this._http.post<string>(`${this._url}/${userId}/select-team/${teamId}`, {});
  }

  getUserSuggestions(email: string): Observable<IUser[]> {
    const params = { email: email };
    return this._http.get<IUser[]>(this._url, {params: params});
  } 
}
