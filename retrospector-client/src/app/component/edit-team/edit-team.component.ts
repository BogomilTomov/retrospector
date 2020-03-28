import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ret-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  @ViewChild('closeModal') public closeModal: ElementRef;
  @Input() public selectedTeam: ITeamDetails;
  @Output() public teamNameEdited = new EventEmitter<string>();
  public initialName: string;
  public name: string;
  public validationErrorExists: boolean = false;
  public validationErrorMessage: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService) { }

  ngOnInit(): void {
    this.name = this.selectedTeam.name;
    this.initialName = this.selectedTeam.name;
  }

  onSubmit(form): void {
    this.selectedTeam.name = this.name;
    this._teamService.editTeam(this.name)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          form.reset();
          this.closeModal.nativeElement.click();
          this.teamNameEdited.emit(this.name);
        },
        err => {
          this.validationErrorExists = true;
          this.validationErrorMessage = err.error.message;
          setTimeout (() => {
            this.validationErrorExists = false;
          }, 3000)
        });
    }; 
}
