import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public teams: Team[];
  constructor(private _teamService: TeamsService) { }

  ngOnInit(): void {
    this.teams = this._teamService.getTeams();
  }
}
