import { Component, ViewChild, ElementRef } from '@angular/core';
import { ITeam } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'ret-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['../../../styles/modal.css', './create-team.component.css']
})
export class CreateTeamComponent {
  public name: string = '';
  public validationErrorExists: boolean = false;
  public validationErrorMessage: string = '';
  public submitted: boolean = false;
  @ViewChild('closeModal') public closeModal: ElementRef;
  public teamNameRequiredErrorMessage = "Team name is required.";

  constructor(private readonly _teamService: TeamsService,
              private readonly _accountService: AccountsService) { }

  onSubmit(form): void {
    this.submitted = true;

    if (form.valid) {
    const newTeam: ITeam = { 
      name: this.name,
      ownerId: this._accountService.getLoggedInUserId()
    };

    this._teamService.createTeam(newTeam)
                     .then(res => {
                      this.closeModal.nativeElement.click();
                     })
                     .catch(err => {
                      this.validationErrorExists = true;
                      this.validationErrorMessage = err.error.message;
                     });
    }
  }

  inputChange(): void {
    this.submitted = false;
    this.validationErrorExists = false;
  }
}
