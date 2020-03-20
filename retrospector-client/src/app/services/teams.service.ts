import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { baseUrl } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  public teams: Team[] = [];
  
  constructor(private readonly _http: HttpClient) { 
  }

  createTeam(team: Team): Observable<Team> {
    return this._http.post<Team>(baseUrl + '/teams',
    team);
  }  
}
