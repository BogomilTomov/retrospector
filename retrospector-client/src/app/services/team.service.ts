import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teams: Team[] = [];
  constructor(private _http: HttpClient) { 
  }

  getTeams() {
    var team = new Team();
    team.name = "Team 1";
    this.teams.push(team);
    var team = new Team();
    team.name = "Team 1";
    this.teams.push(team);
    var team = new Team();
    team.name = "Team 1";
    this.teams.push(team);
    return this.teams;

  }

  createTeam(team: Team): Observable<Team> {
    return this._http.post<Team>('https://localhost:44372/api/team',
    team);
  }

}
