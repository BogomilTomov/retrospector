import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public teams: Team[] = [];
  public sharedTeams: Team[] = [];
  public ownedTeams: Team[] = [];
  public selectedTeam;

  constructor(private _teamService: TeamsService,
              private _accountService: AccountsService) { }

  ngOnInit(): void {
    const userId = this._accountService.getLoggedInUserId();
    this._teamService.getTeams(userId).subscribe(res => {
      this.teams = res;
      this.teams.forEach(team => {
        if (team.ownerId === userId) {
          this.ownedTeams.push(team);
        } else {
          this.sharedTeams.push(team);
        }
      });
    });
  }

  selected(value) {
    console.log(value);
  }
}
