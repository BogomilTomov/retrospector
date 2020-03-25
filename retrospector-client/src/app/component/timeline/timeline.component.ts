import { Component, Input } from '@angular/core';

import { RetroGamesService } from 'src/app/services/retro-games.service';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent{
  @Input() public games: IRetroGame[] = [];

  constructor(private readonly _gameService: RetroGamesService) { }

  trackByFn(index: number, game: IRetroGame): number {
    return game.id;
  }
  
  addRetrospective(newGame: IRetroGame): void { 
    this._gameService.createGame(newGame).toPromise().then(res => {
      this.games = [res, ...this.games].slice(0, 20);
    }).catch(err => console.log(err))
  }

  private calculateGamesNotesCount(): void {
    for (const game of this.games) {
      if (game.notes == null || game.notes?.length == 0) {
        game.notesCount = 0;
      } else {
        game.notesCount = game.notes.length;
      }
    }
  }
}