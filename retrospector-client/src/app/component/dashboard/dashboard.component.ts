import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { IRetrospective } from 'src/app/models/retrospective.model';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() public selectedTeam: ITeamDetails;
  @Input() public userId: string;
  @Output() retroGameCreatedChange = new EventEmitter<IRetrospective>();
  @Output() teamCreatedChange = new EventEmitter<ITeamDetails>();

  constructor() { }

  retroGameAdded(newGame: IRetrospective): void {
    this.retroGameCreatedChange.emit(newGame)
  }

  teamAdded(newTeam: ITeamDetails): void {
    this.teamCreatedChange.emit(newTeam)
  }
}
