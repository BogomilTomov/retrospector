import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRetroGame } from '../models/retro-game.model';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetroGamesService {
  private readonly _url = `${baseUrl}/Retrogame`;

  constructor(private readonly _http: HttpClient) { }

  public getGames(): Observable<IRetroGame[]> {
    return this._http.get<IRetroGame[]>(this._url);
  }
}