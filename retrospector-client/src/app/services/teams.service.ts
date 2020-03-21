import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { baseUrl } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private readonly _http: HttpClient) { 
  }

  createTeam(team: Team): Observable<Team> {
    return this._http.post<Team>(baseUrl + '/teams',
    team);
  }

  getTeams(userId: string): Observable<Team[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this._http.get<Team[]>(baseUrl + '/teams', {params: params});
  } 
}
