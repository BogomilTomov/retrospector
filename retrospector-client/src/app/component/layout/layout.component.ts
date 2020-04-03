import { Component } from '@angular/core';
import { ITeamDetails } from 'src/app/models/team-details.model';

@Component({
  selector: 'ret-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  public teams: ITeamDetails[] = [];
  public title: string = 'Retrospector';
}
