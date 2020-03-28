import { Component, Input, ElementRef, ViewChild, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { pipe, Subject } from 'rxjs';
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
  public name: string;
  public validationErrorExists: boolean = false;
  public validationErrorMessage: string = '';
  public teamNameRequiredErrorMessage = "Team name is required."
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService) { }

  ngOnChanges(teamChanges: SimpleChanges): void {
    this.name = teamChanges.selectedTeam.currentValue.name;
  }

  onSubmit(form): void {
    this.selectedTeam.name = this.name;
    this._teamService.editTeam(this.selectedTeam)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          this.closeModal.nativeElement.click();
          this.onClose();
          this.selectedTeamChange.emit(this.selectedTeam);
        },
        err => {
          this.validationErrorExists = true;
          this.validationErrorMessage = err.error.message;
          setTimeout (() => {
            this.validationErrorExists = false;
          }, 3000)
        });
  }

  onClose(): void {
    this.name = this.selectedTeam.name;
  }
}
