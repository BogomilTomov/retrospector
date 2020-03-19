import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm }   from '@angular/forms';
import { Team } from '../../models/team';
import * as moment from 'moment';
import { TeamService } from '../../services/team.service';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'ret-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  @ViewChild('nameInput') private inputField : ElementRef;
  public name: string = '';
  constructor(private _teamService: TeamService,
              private _accountService: AccountsService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let newTeam = new Team();
    newTeam.name = this.name;
    newTeam.creationDate = moment().add(2, 'h').toDate(); //getting current UTC +2 time
    newTeam.ownerId = localStorage.getItem('userId');
    this._teamService.createTeam(newTeam).subscribe();
  }
}