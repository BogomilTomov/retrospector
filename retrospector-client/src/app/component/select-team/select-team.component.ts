import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models/team';
import { ITeamDetails } from 'src/app/models/team-details.model';

@Component({
  selector: 'ret-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.css']
})
export class SelectTeamComponent implements OnInit {
  @Input() public selectedTeamId: number;
  @Input() public sharedTeams: ITeamDetails[];
  @Input() public ownedTeams: ITeamDetails[];

  constructor() { }

  ngOnInit(): void {
  }

  selected(value) {
    console.log(value);
  }
}
