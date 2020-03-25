import { Component, OnInit } from '@angular/core';
import { ITeam } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public teams: ITeam[];
  
  constructor(private _teamService: TeamsService) { }

  ngOnInit(): void {
  }
}