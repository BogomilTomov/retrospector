import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { UsersService } from 'src/app/services/users.service';
import { RetroGamesService } from 'src/app/services/retro-games.service';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public teams: ITeamDetails[] = [];
  public sharedTeams: ITeamDetails[] = [];
  public ownedTeams: ITeamDetails[] = [];
  public selectedTeam: ITeamDetails;
  @Output() public sharedTeamsChange = new EventEmitter<ITeamDetails[]>();
  @Output() public ownedTeamsChange = new EventEmitter<ITeamDetails[]>();
  @Output() public selectedTeamIdChange = new EventEmitter<number>();
  @Input() public selectedTeamId: number;
  private userId: string;
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService,
              private readonly _accountService: AccountsService,
              private readonly _userService: UsersService,
              private readonly _gameService: RetroGamesService) { }

  ngOnInit(): void {
    this.userId = this._accountService.getLoggedInUserId();
    this._teamService.getTeamData(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.teams = res.teams;
        let selectedTeamId = res.defaultTeam;
        if (selectedTeamId === 0 && this.teams.length > 0) {
          selectedTeamId = this.teams[0].id;
        }
        
        this.selectedTeam = this.teams.find(t => t.id == this.selectedTeamId);       
        this.teams.forEach(team => {
          if (team.ownerId === this.userId) {
            this.ownedTeams.push(team);
          } else {
            this.sharedTeams.push(team);
          }
        });
        
        this.ownedTeamsChange.emit(this.ownedTeams);
        this.sharedTeamsChange.emit(this.sharedTeams);
        this.selectedTeamIdChange.emit(selectedTeamId);
      });
  }

  teamCreated(newTeam): void {
    this.teams.push(newTeam);
    this.ownedTeams.push(newTeam);
    this.ownedTeams.sort((a, b) => a.name.localeCompare(b.name));
    this.selectedTeamIdChange.emit(newTeam.id);
    this._userService.setSelectedTeam(this.userId, newTeam.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnChanges(teamSelectChanges: SimpleChanges) {
    if(!teamSelectChanges.selectedTeamId.isFirstChange()) {
      this.selectedTeamId = teamSelectChanges.selectedTeamId.currentValue;
      this.selectedTeam = this.teams.find(t => t.id == this.selectedTeamId);
      this._userService.setSelectedTeam(this.userId, this.selectedTeamId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }

  addRetrospective(newGame: IRetroGame): void { 
    newGame.teamId = this.selectedTeamId;
    this._gameService.createGame(newGame).toPromise().then(res => {
      this.selectedTeam.retroGames = [res, ...this.selectedTeam.retroGames].slice(0, 20);
    }).catch(err => console.log(err))
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
