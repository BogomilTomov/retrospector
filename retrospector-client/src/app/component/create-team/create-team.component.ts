import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormsModule, NgForm }   from '@angular/forms';
import { Team } from '../../models/team';
import * as moment from 'moment';
import { TeamsService } from '../../services/teams.service';
import { AccountsService } from '../../services/accounts.service';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ret-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef
  public name: string = '';
  public validationErrorExists: boolean = false;
  public validationErrorMessage: string = '';
  public teamChanges: Subscription;
  constructor (private readonly _teamService: TeamsService, private readonly _accountService: AccountsService) { }

  onSubmit(): void {
    const newTeam: Team = { 
      name: this.name,
      creationDate: moment().add(2, 'h').toDate(),
      ownerId: this._accountService.getLoggedInUserId()
    }; 

    this._teamService.createTeam(newTeam).subscribe(
      res => {
        this.closeModal.nativeElement.click();
      },
      err => {
        this.validationErrorExists = true;
        this.validationErrorMessage = err.error.message;
        setTimeout (() => {
          this.validationErrorExists = false;
        }, 3000)
      }
      );
    
    
  }

  ngOnDestroy() {
    //this.teamChanges.unsubscribe();
  }
}
