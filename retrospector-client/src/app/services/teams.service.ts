import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ITeam } from '../models/team.model';
import { baseUrl } from 'src/environments/environment';
import { ITeamData } from '../models/teams-data.model';
import { ITeamDetails } from '../models/team-details.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private readonly _url = `${baseUrl}/teams`;

  constructor(private readonly _http: HttpClient) { 
  }

  createTeam(team: ITeam): Observable<ITeamDetails> {
    return this._http.post<ITeamDetails>(this._url,
    team);
  }
  
  getTeamData(userId: string): Observable<ITeamData> {
    return this._http.get<ITeamData>(`${baseUrl}/users/${userId}/teams`)
      .pipe(map((data: ITeamData) => {
          return data;
      })
    );
  }
}
