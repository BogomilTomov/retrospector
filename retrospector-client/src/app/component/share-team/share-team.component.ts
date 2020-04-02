import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/user.model';
import { ITeamDetails } from 'src/app/models/team-details.model';

@Component({
  selector: 'ret-share-team',
  templateUrl: './share-team.component.html',
  styleUrls: ['./share-team.component.css']
})
export class ShareTeamComponent {
  @Input() public selectedTeam: ITeamDetails;
  @Output() public ownershipTransfered = new EventEmitter<string>();
  @Output() public userRemoved  = new EventEmitter<string>();
  public ownerId: string;
  public clickedUserId: string;
  public email: string = '';
  public usersInTeam: IUser[] = [];
  public filteredUsers: IUser[] = [];
  public validationErrorExists: boolean = false;
  public submitted: boolean = false;
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public validationErrorMessage: string = '';
  public emailRequiredErrorMessage = "Email is required."
  private unsubscribe$ = new Subject<void>();
  
  constructor(private readonly _userService: UsersService) { }

  ngOnChanges(teamChange: SimpleChanges) {
    this.ownerId = teamChange.selectedTeam.currentValue.ownerId;
    this._userService.getUsersInTeam(this.selectedTeam.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => { this.usersInTeam = res; });
  }

  onSubmitAddUser(form): void {
    this.submitted = true;
    this._userService.addUserToTeam(this.email, this.selectedTeam.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      res => {
        this.usersInTeam.push(res);
        form.reset();
        },
        err => {
          this.validationErrorExists = true;
          this.validationErrorMessage = err.error.message;
          setTimeout (() => {
            this.validationErrorExists = false;
          }, 3000)
        });
  }

  getSuggestions(key: any): void {
    if (key.code !== 'ArrowDown' && key.code !== 'ArrowUp' 
     && key.code !== 'ArrowLeft' && key.code !== 'ArrowRight' 
     && key.code !== 'Enter') {
      this._userService.getUserSuggestions(this.email)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => this.filteredUsers = res);
    }
  }
  
  onSubmitRemoveUser() {
    this.usersInTeam = this.usersInTeam.filter(u => u.id != this.clickedUserId);
    this.userRemoved.emit(this.clickedUserId)
  }

  onSubmitTransferOwnership() {
    this.ownershipTransfered.emit(this.clickedUserId)
    this.ownerId = this.clickedUserId;
  }
  
  setUserId(e) {
    this.clickedUserId = e.target.id;
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
