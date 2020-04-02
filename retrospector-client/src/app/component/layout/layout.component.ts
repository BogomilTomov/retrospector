import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { UsersService } from 'src/app/services/users.service';
import { RetroGamesService } from 'src/app/services/retro-games.service';
import { IRetroGame } from 'src/app/models/retro-game.model';
import { gamesLoaded } from 'src/environments/environment';

@Component({
  selector: 'ret-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public sharedTeams: ITeamDetails[] = [];
  public ownedTeams: ITeamDetails[] = [];
  public teams: ITeamDetails[] = [];
  public selectedTeam: ITeamDetails;
  public selectedTeamId: number;
  private loggedInSubs: Subscription;
  public title: string = 'Retrospector';
  public isLoggedIn: boolean;
  public userFirstName: string;
  private unsubscribe$ = new Subject<void>();
  public userId: string;
  public isAdminOrOwner: boolean;

  constructor(private readonly _router: Router,
              private readonly _teamService: TeamsService,
              private readonly _accountService: AccountsService,
              private readonly _userService: UsersService,
              private readonly _gameService: RetroGamesService) {}

  ngOnInit(): void {
    this.initializeLoginData();
    this.userId = this._accountService.getLoggedInUserId();
    if (this.userId !== null) {
      this.initializeAppData();
    }
  }

  initializeLoginData() {
    this.loggedInSubs = this._accountService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.userFirstName = this._accountService.getLoggedInUserFirstName();
      });
  }

  initializeAppData() {
    this._teamService.getTeamData(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.teams = res.teams;
        this.selectedTeamId = res.defaultTeam;
        if (this.selectedTeamId === 0 && this.teams.length > 0) {
          this.selectedTeamId = this.teams[0].id;
        }
        
        this.selectedTeam = this.teams.find(t => t.id == this.selectedTeamId);
        this.isAdminOrOwner = this.userIsAdminOrOwner();
        this.teams.forEach(team => {
          if (team.ownerId === this.userId) {
            this.ownedTeams.push(team);
          } else {
            this.sharedTeams.push(team);
          }
        });

        if (this.selectedTeamId !== 0) {
          this._gameService.getGamesByTeamId(this.selectedTeamId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => { this.selectedTeam.retroGames = res; });
        }
      });
  }

  ngOnDestroy(): void {
    this.loggedInSubs.unsubscribe();
  }

  public logout(): void {
    this._accountService.logOut().pipe(take(1)).subscribe(
      () => {
        this._accountService.removeLocalStorageInfo();
        this._router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
      }
    );
  }
  
  createRetroGame(newGame: IRetroGame): void {
    if (this.selectedTeam.retroGames.length >= gamesLoaded) {
      this.selectedTeam.retroGames.pop();
    }

    this.selectedTeam.retroGames.unshift(newGame);
  }

  createTeam(newTeam: ITeamDetails): void {
    this.teams.push(newTeam);
    this.ownedTeams.push(newTeam);
    this.ownedTeams.sort((a, b) => a.name.localeCompare(b.name));
    this.selectedTeam = newTeam;
    this.selectedTeam.retroGames = [];
    this.selectTeam(this.selectedTeam);
  }
 
  newTeamSelected(selectedTeamId): void {
    this.selectedTeam = this.teams.find(t => t.id == selectedTeamId);
    this.selectTeam(this.selectedTeam)
    this._gameService.getGamesByTeamId(selectedTeamId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => { this.selectedTeam.retroGames = res });
  }

  selectTeam(team: ITeamDetails) {
    this.selectedTeamId = team.id;
    this.isAdminOrOwner = this.userIsAdminOrOwner();
    this._userService.setSelectedTeam(this.userId, team.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  trackByFn(index: number, team: ITeamDetails): number {
    return team.id;
  }

  userIsAdminOrOwner(): boolean {
    return this._accountService.getLoggedInUserRole() === "Admin" 
        || this.selectedTeam.ownerId === this.userId;
  }
}
