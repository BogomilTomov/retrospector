import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Team } from '../../models/team';
import { AccountsService } from 'src/app/services/accounts.service';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public sharedTeams: ITeamDetails[] = [];
  public ownedTeams: ITeamDetails[] = [];
  public selectedTeamId: number;
  @Output() public sharedTeamsChange = new EventEmitter<ITeamDetails[]>();
  @Output() public ownedTeamsChange = new EventEmitter<ITeamDetails[]>();
  @Output() public selectedTeamChange = new EventEmitter<number>();
  @Input() public selectedTeam;
  private userId: string;
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService,
              private readonly _accountService: AccountsService,
              private readonly _userService: UsersService) { }

  ngOnInit(): void {
    this.userId = this._accountService.getLoggedInUserId();
    this._teamService.getTeamData(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        const teams = res.teams;
        this.selectedTeamId = res.defaultTeam;
        if (this.selectedTeamId === 0 && teams.length > 0) {
          this.selectedTeamId = teams[0].id;
        }
               
        teams.forEach(team => {
          if (team.ownerId === this.userId) {
            this.ownedTeams.push(team);
          } else {
            this.sharedTeams.push(team);
          }
        });
        
        this.ownedTeamsChange.emit(this.ownedTeams);
        this.sharedTeamsChange.emit(this.sharedTeams);
        this.selectedTeamChange.emit(this.selectedTeamId);
      });
  }

  teamCreated(newTeam): void {
    this.ownedTeams.push(newTeam);
    this._userService.setSelectedTeam(this.userId, newTeam.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnChanges(teamSelectChanges: SimpleChanges) {
    if(!teamSelectChanges.selectedTeam.isFirstChange()) {
      const teamId = teamSelectChanges.selectedTeam.currentValue;
      console.log(3)
      this._userService.setSelectedTeam(this.userId, teamId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
