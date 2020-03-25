import { Component, OnInit } from '@angular/core';

import { RetroGamesService } from 'src/app/services/retro-games.service';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  public games: IRetroGame[] = [];

  constructor(private readonly _gameService: RetroGamesService) { }

  ngOnInit(): void {
    this._gameService.getGames().toPromise().then(result => {
      this.games = result.data;
    }).catch(err => console.log(err));
  }

  trackByFn(index: number, game: IRetroGame): number {
    return game.id;
  }
  
  addRetrospective(newGame: IRetroGame): void { 
    this._gameService.createGame(newGame).toPromise().then(res => {
      this.games = [res, ...this.games].slice(0, 20);
    }).catch(err => console.log(err))
  }
}