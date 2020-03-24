import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _url = `${baseUrl}/users`;

  constructor(private readonly _http: HttpClient) { }
  
  setSelectedTeam(userId: string, teamId: number): Observable<string> {
    return this._http.post<string>(this._url + '/setSelected', {userId, teamId});
  }
}
