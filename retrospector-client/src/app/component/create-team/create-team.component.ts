import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
//import { Team } from '../../team';
import * as moment from 'moment';
// import { TeamService } from '../team.service';
// import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  public name: string = '';
  constructor(private _teamService: TeamService,
              private _accountService: AccountsService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // let newTeam = new Team();
    // newTeam.name = this.name;
    // newTeam.creationDate = moment().add(2, 'h').toDate();
    // newTeam.ownerId = localStorage.getItem('userId');
    // this._teamService.createTeam(newTeam).subscribe();
  }