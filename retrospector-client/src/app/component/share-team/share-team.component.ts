import { Component, SimpleChanges, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/user.model';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'ret-share-team',
  templateUrl: './share-team.component.html',
  styleUrls: ['./share-team.component.css']
})
export class ShareTeamComponent implements OnInit {
  @ViewChild('closeModal') public closeModal: ElementRef;
  public selectedTeam: ITeamDetails;
  public ownerId: string;
  public clickedUserId: string;
  public email: string = '';
  public usersInTeam: IUser[] = [];
  public filteredUsers: IUser[] = [];
  public submitted: boolean = false;
  public emailPattern: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
  public backEndValidationErrorExists: boolean = false;
  public backEndValidationErrorMessage: string = '';
  public emailValidErrorMessage = "Please enter a valid email address."
  private _unsubscribe$ = new Subject<void>();
  
  constructor(private readonly _userService: UsersService,
              private readonly _teamService: TeamsService) { }

  ngOnInit(): void {
    this._teamService.selectedTeam$.pipe(takeUntil(this._unsubscribe$)).subscribe(res => {
      this.selectedTeam = res;
      this.ownerId = this.selectedTeam.ownerId;
      this._userService.getUsersInTeam(this.selectedTeam.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe(res => { this.usersInTeam = res; });
    });
  }

  onSubmitAddUser(form): void {
    this.submitted = true;
    
    if (form.valid) {
      this._userService.addUserToTeam(this.email, this.selectedTeam.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe(
          res => {
            this.submitted = false;
            this.usersInTeam.push(res);
            form.reset();
            },
            err => {
              this.backEndValidationErrorExists = true;
              this.backEndValidationErrorMessage = err.error.message;
            });
    }
  }

  getSuggestions(key: any): void {
    if (key.code !== 'ArrowDown' && key.code !== 'ArrowUp' 
      && key.code !== 'ArrowLeft' && key.code !== 'ArrowRight' 
      && key.code !== 'Enter') {
      this._userService.getUserSuggestions(this.email)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe(res => this.filteredUsers = res);
      
      this.submitted = false;
      this.backEndValidationErrorExists = false;
    }
  }
  
  onSubmitRemoveUser(): void {
    this.usersInTeam = this.usersInTeam.filter(u => u.id != this.clickedUserId);
    this._userService.removeUserFromTeam(this.clickedUserId, this.selectedTeam.id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
  }

  onSubmitTransferOwnership(): void {
    const newTeam = {
      ...this.selectedTeam,
      ownerId: this.clickedUserId,
      name: null
    };
    
    this._teamService.editTeam(newTeam).then(res => {
      this.closeModal.nativeElement.click();
    });
  }
  
  setUserId(e): void {
    this.clickedUserId = e.target.id;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
