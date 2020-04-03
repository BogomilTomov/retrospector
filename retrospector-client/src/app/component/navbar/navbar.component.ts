import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { AccountsService } from 'src/app/services/accounts.service';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'ret-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean;
  public userFirstName: string;
  public userId: string;
  public ownedTeams: ITeamDetails[] = [];
  public sharedTeams: ITeamDetails[] = [];
  public selectedTeam: ITeamDetails;
  public selectedTeamId: number;
  private _unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService,
              private readonly _accountService: AccountsService,
              private readonly _router: Router,
              private readonly _userService: UsersService) { }

  ngOnInit() {
    this._accountService.loggedIn$.pipe(takeUntil(this._unsubscribe$)).subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.userFirstName = this._accountService.getLoggedInUserFirstName();
        this.userId = this._accountService.getLoggedInUserId();
        this._teamService.fetchTeamData(this.userId);
      
        this._teamService.ownedTeams$.pipe(takeUntil(this._unsubscribe$)).subscribe(teams => this.ownedTeams = teams);
        this._teamService.sharedTeams$.pipe(takeUntil(this._unsubscribe$)).subscribe(teams => this.sharedTeams = teams);
        this._teamService.selectedTeam$.pipe(takeUntil(this._unsubscribe$)).subscribe(team => {
          this.selectedTeam = team;
          this.selectedTeamId = team.id;
        });
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
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

  userIsAdminOrOwner(): boolean {
    return this._accountService.getLoggedInUserRole() === "Admin"
      || this.selectedTeam.ownerId === this.userId;
  }

  selectTeam(id: number): void {
    this._teamService.selectTeam(id);
    this._userService.setSelectedTeam(this.userId, id);
  }

  trackByFn(index: number, team: ITeamDetails): number {
    return team.id;
  }
}