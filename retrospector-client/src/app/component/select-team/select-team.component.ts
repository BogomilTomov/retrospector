import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ret-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.css']
})
export class SelectTeamComponent {
  @Input() public selectedTeamId: number;
  @Input() public sharedTeams: ITeamDetails[];
  @Input() public ownedTeams: ITeamDetails[];
  private unsubscribe$ = new Subject<void>();
  @Output() teamSelected = new EventEmitter<number>();

  constructor(private _usersService: UsersService,
              private _accountsService: AccountsService) { }

  selected(teamId) {
    const userId = this._accountsService.getLoggedInUserId();
    this._usersService.setSelectedTeam(userId, teamId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.teamSelected.emit(teamId);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}