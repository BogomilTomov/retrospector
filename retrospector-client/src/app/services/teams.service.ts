import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ITeamData } from '../models/teams-data.model';
import { ITeamDetails } from '../models/team-details.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private readonly _url = `${baseUrl}/teams`;

  constructor(private readonly _http: HttpClient) { 
  }

  createTeam(team: Team): Observable<ITeamDetails> {
    return this._http.post<ITeamDetails>(this._url + '/create',
    team);
  }

  getTeamData(userId: string): Observable<ITeamData> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this._http.get<ITeamData>(this._url, {params: params})
      .pipe(map((data: ITeamData) => {
          return data;
      })
    );
  }
}
