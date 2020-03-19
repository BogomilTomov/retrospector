import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public teams: Team[];
  constructor(private _teamService: TeamService) { }

  ngOnInit(): void {
    this.teams = this._teamService.getTeams();
  }
}
