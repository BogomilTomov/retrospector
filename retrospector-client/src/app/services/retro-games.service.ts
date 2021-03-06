import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRetroGame } from '../models/retro-game.model';
import { baseUrl, gamesLoaded } from 'src/environments/environment';
import { IRetrospective } from '../models/retrospective.model';

@Injectable({
  providedIn: 'root'
})
export class RetroGamesService {
  private readonly _url = `${baseUrl}/RetroGames`;

  constructor(private readonly _http: HttpClient) { }

  public getGamesByTeamId(teamId: number): Observable<IRetroGame[]> {
    const params = { gamesCount: gamesLoaded.toString() };
    return this._http.get<IRetroGame[]>(`${baseUrl}/teams/${teamId}/retroGames`, { params: params });
  }

  public createGame(game: IRetrospective): Promise<IRetroGame> {
    return this._http.post<IRetroGame>(this._url, game).toPromise();
  }
}