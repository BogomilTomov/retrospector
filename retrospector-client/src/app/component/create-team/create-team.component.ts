import { Component, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm }   from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { ITeam } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';
import { AccountsService } from '../../services/accounts.service';
import { ITeamDetails } from 'src/app/models/team-details.model';

@Component({
  selector: 'ret-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnDestroy {
  @ViewChild('closeModal') public closeModal: ElementRef;
  public name: string = '';
  public validationErrorExists: boolean = false;
  public validationErrorMessage: string = '';
  public teamNameRequiredErrorMessage = "Team name is required."
  @Output() public teamCreated = new EventEmitter<ITeamDetails>();

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService, 
              private readonly _accountService: AccountsService) { }

  onSubmit(form): void {
    const newTeam: ITeam = { 
      name: this.name,
      creationDate: moment().add(2, 'h').toDate(),
      ownerId: this._accountService.getLoggedInUserId()
    };

    this._teamService.createTeam(newTeam)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          this.closeModal.nativeElement.click();
          form.reset();
          this.teamCreated.emit(res);
        },
        err => {
          this.validationErrorExists = true;
          this.validationErrorMessage = err.error.message;
          setTimeout (() => {
            this.validationErrorExists = false;
          }, 3000)
        });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
