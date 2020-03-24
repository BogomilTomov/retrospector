import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { AccountsService } from 'src/app/services/accounts.service';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';


@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public sharedTeams: ITeamDetails[] = [];
  public ownedTeams: ITeamDetails[] = [];
  public selectedTeamId: number; 

  constructor(private _teamService: TeamsService,
              private _accountService: AccountsService) { }

  ngOnInit(): void {
    const userId = this._accountService.getLoggedInUserId();
    this._teamService.getTeamData(userId)
      .subscribe(res => {
        const teams = res.teams;
        this.selectedTeamId = res.defaultTeam;
        if (this.selectedTeamId === 0 && teams.length > 0) {
          this.selectedTeamId = teams[0].id;
        }
        teams.forEach(team => {
          if (team.ownerId === userId) {
            this.ownedTeams.push(team);
          } else {
            this.sharedTeams.push(team);
          }
        });
      });
  }
}
