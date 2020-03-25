import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITeam } from '../../models/team.model';
import * as moment from 'moment';
import { TeamsService } from '../../services/teams.service';
import { AccountsService } from '../../services/accounts.service';


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
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService, private readonly _accountService: AccountsService) { }

  onSubmit(): void {
    const newTeam: ITeam = { 
      name: this.name,
      creationDate: moment().add(2, 'h').toDate(),
      ownerId: this._accountService.getLoggedInUserId()
    }; 

    this._teamService.createTeam(newTeam).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res: ITeam) => {
          this.closeModal.nativeElement.click();
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