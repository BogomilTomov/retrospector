import { Component, ElementRef, ViewChild, EventEmitter, Output, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'ret-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit, OnDestroy {
  public selectedTeam: ITeamDetails;
  public name: string;
  public validationErrorExists: boolean = false;
  public submitted: boolean = false;
  public validationErrorMessage: string = '';
  public teamNameRequiredErrorMessage = "Team name is required.";
  @ViewChild('closeModal') public closeModal: ElementRef;
  private _unsubscribe$ = new Subject<void>();

  constructor(private readonly _teamService: TeamsService) { }

  ngOnInit(): void {
    this._teamService.selectedTeam$.pipe(takeUntil(this._unsubscribe$)).subscribe(res => {
      this.selectedTeam = res;
      this.name = this.selectedTeam.name;
    });    
  }

  ngOnChanges(teamChanges: SimpleChanges): void {
    this.name = teamChanges.selectedTeam.currentValue.name;
  }

  editTeam(form): void {
    this.submitted = true;

    if (form.valid) {
      if (this.name != this.selectedTeam.name) {
        const newTeam: ITeamDetails = {
        ...this.selectedTeam,
        name: this.name,
        ownerId: null
    };

    this._teamService.editTeam(newTeam)
                     .then(res => this.closeModal.nativeElement.click())
                     .catch(err => {
                        this.validationErrorExists = true;
                        this.validationErrorMessage = err.error.message;
                     });
      } else {
        this.closeModal.nativeElement.click();
      }
    }
  }

  onClose(): void {
    this._teamService.selectedTeam$.pipe(take(1)).subscribe(res => this.name = res.name);
    this.clearErrors();
  }
  
  inputChange(): void {
    this.clearErrors();
  }
  
  clearErrors(): void {
    this.submitted = false;
    this.validationErrorExists = false;
  }
  
  ngOnDestroy(): void{
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
