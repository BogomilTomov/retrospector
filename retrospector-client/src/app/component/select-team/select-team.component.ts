import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'ret-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.css']
})
export class SelectTeamComponent implements OnInit {
  public selectedTeam;
  @Input() public sharedTeams: Team[] = [];
  @Input() public ownedTeams: Team[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  selected(value) {
    console.log(value);
  }
}
