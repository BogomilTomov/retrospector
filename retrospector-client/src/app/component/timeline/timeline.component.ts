import { Component, Input } from '@angular/core';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent{
  @Input() public games: IRetroGame[] = [];

  constructor() { }

  trackByFn(index: number, game: IRetroGame): number {
    return game.id;
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