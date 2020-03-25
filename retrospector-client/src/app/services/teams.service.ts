import { Injectable } from '@angular/core';
import { ITeam } from '../models/team.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  public teams: ITeam[] = [];
  
  constructor(private readonly _http: HttpClient) { 
  }

  createTeam(team: ITeam): Observable<ITeam> {
    return this._http.post<ITeam>(baseUrl + '/teams',
    team);
  }  
}