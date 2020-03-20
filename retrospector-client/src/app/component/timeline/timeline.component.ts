import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetroGamesService } from 'src/app/services/retro-games.service';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  public games$: Observable<IRetroGame[]>;
  public games: IRetroGame[] = [];

  constructor(private readonly _gameService: RetroGamesService) { }

  ngOnInit(): void {
    this.games$ = this._gameService.getGames();
  }

  trackByFn(index: number, game: IRetroGame): number {
    return game.id;
  }
}