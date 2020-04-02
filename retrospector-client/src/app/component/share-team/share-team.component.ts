import { Component, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'ret-share-team',
  templateUrl: './share-team.component.html',
  styleUrls: ['./share-team.component.css']
})
export class ShareTeamComponent {
  @ViewChild('closeModal') public closeModal: ElementRef;
  @Input() public selectedTeam: ITeamDetails;
  @Input() public isAdminOrOwner: boolean;
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
        .subscribe(res => this.filteredUsers = res);
    }
  }
  
  onSubmitRemoveUser() {
    
  }
  
  getUserId(e) {
    this.clickedUserId = e.target.id;
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
