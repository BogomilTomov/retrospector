import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { UsersService } from 'src/app/services/users.service';
import { RetroGamesService } from 'src/app/services/retro-games.service';

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


  constructor(private readonly _router: Router,
              private readonly _teamService: TeamsService,
              private readonly _accountService: AccountsService,
              private readonly _userService: UsersService,
              private readonly _gameService: RetroGamesService) {}

  ngOnInit(): void {
    this.loggedInSubs = this._accountService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.userFirstName = this._accountService.getLoggedInUserFirstName();
      });

      this.userId = this._accountService.getLoggedInUserId();
      this._teamService.getTeamData(this.userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.teams = res.teams;
          let selectedTeamId = res.defaultTeam;
          if (selectedTeamId === 0 && this.teams.length > 0) {
            selectedTeamId = this.teams[0].id;
          }
          
          this.selectedTeam = this.teams.find(t => t.id == selectedTeamId);       
          this.teams.forEach(team => {
            if (team.ownerId === this.userId) {
              this.ownedTeams.push(team);
            } else {
              this.sharedTeams.push(team);
            }
          });

          this._gameService.getGamesByTeamId(selectedTeamId)
            .subscribe(res => { this.selectedTeam.retroGames = res });
            console.log(this.selectedTeam.retroGames)
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

 
  newTeamSelected(selectedTeamId) {
    this.selectedTeamId = selectedTeamId;
    this.selectedTeam = this.teams.find(t => t.id === selectedTeamId);
  }

  trackByFn(index: number, team: ITeamDetails): number {
    return team.id;
  }
}
