import { Component, Input } from '@angular/core';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-retro-game-card',
  templateUrl: './retro-game-card.component.html',
  styleUrls: ['./retro-game-card.component.css']
})
export class RetroGameCardComponent {
  @Input()
  public game: IRetroGame;
}