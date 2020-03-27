import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRetroGame } from '../models/retro-game.model';
import { baseUrl } from 'src/environments/environment';
import { IResultData } from '../models/result-data.model';

@Injectable({
  providedIn: 'root'
})
export class RetroGamesService {
  private readonly _url = `${baseUrl}/RetroGames`;

  constructor(private readonly _http: HttpClient) { }

  public getGamesByTeamId(teamId: number): Observable<IRetroGame[]> {
    return this._http.get<IRetroGame[]>(`${this._url}/${teamId}`);
  }

  public createGame(game: IRetroGame): Observable<IRetroGame> {
      return this._http.post<IRetroGame>(this._url, game);
  }
}