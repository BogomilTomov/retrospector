import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { TeamsService } from 'src/app/services/teams.service';
import { RetroGamesService } from 'src/app/services/retro-games.service';
import { IRetroGame } from 'src/app/models/retro-game.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userId: string;
  public selectedTeamId: number;
  public hasTeams: boolean;
  public games: IRetroGame[];
  private _unsubscribe$ = new Subject<void>();

  constructor(private readonly _accountService: AccountsService,
              private readonly _teamService: TeamsService,
              private readonly _gameService: RetroGamesService) { }

  ngOnInit(): void {
    this.userId = this._accountService.getLoggedInUserId();
    this._teamService.selectedTeam$.pipe(takeUntil(this._unsubscribe$)).subscribe(team =>{
      this.selectedTeamId = team.id;
      this._gameService.getGamesByTeamId(team.id).toPromise().then(games => this.games = games);
    });
    this._teamService.teams$.pipe(takeUntil(this._unsubscribe$)).subscribe(teams => this.hasTeams = !!teams?.length);
  }
  
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  createNewRetrospective(newGame: IRetroGame): void {
    this.games = [newGame, ...this.games].slice(0, 20); 
  }
}
