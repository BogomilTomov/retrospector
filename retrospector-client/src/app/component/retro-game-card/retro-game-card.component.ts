import { Component, Input } from '@angular/core';
import { IRetroGame } from 'src/app/models/retro-game.model';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'ret-retro-game-card',
  templateUrl: './retro-game-card.component.html',
  styleUrls: ['./retro-game-card.component.css']
})
export class RetroGameCardComponent {
  @Input() public game: IRetroGame;

  private get gameId(): string {
    return this.game.id.toString()
  }

  constructor(private readonly ngxSmartModalService: NgxSmartModalService) {}

  openUrlModal() {
    this.ngxSmartModalService.getModal(this.gameId).open();
  }
}