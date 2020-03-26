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
}
