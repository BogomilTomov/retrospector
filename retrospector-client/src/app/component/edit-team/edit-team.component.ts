import { Component, Input, ElementRef, ViewChild, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ret-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent {
  @ViewChild('closeModal') public closeModal: ElementRef;
  @Input() public selectedTeam: ITeamDetails;
  @Output() public selectedTeamChange = new EventEmitter<ITeamDetails>();
  public submitted: boolean = false;
  public name: string;
  public backEndValidationErrorExists: boolean = false;
  public backEndValidationErrorMessage: string = '';
  public teamNameRequiredErrorMessage = "Team name is required."
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService) { }

  ngOnChanges(teamChanges: SimpleChanges): void {
    this.name = teamChanges.selectedTeam.currentValue.name;
  }

  onSubmit(form): void {
    this.submitted = true;

    if (form.valid) {
      if (this.name != this.selectedTeam.name) {
        const newTeam = {... this.selectedTeam};
        newTeam.name = this.name;
        newTeam.ownerId = null;

        this._teamService.editTeam(newTeam)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            res => {
              this.selectedTeam.name = this.name;
              this.closeModal.nativeElement.click();
              this.onClose();
              },
              err => {
                this.backEndValidationErrorExists = true;
                this.backEndValidationErrorMessage = err.error.message;
              });
      } else {
        this.closeModal.nativeElement.click();
      }
    }
  }

  onClose(): void {
    this.name = this.selectedTeam.name;
    this.clearErrors();
  }
  
  inputChange(): void {
    this.clearErrors();
  }
  
  clearErrors(): void {
    this.submitted = false;
    this.backEndValidationErrorExists = false;
  }
  
  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
