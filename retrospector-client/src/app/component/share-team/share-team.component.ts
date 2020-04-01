import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ret-share-team',
  templateUrl: './share-team.component.html',
  styleUrls: ['./share-team.component.css']
})
export class ShareTeamComponent implements OnInit {
  @ViewChild('closeModal') public closeModal: ElementRef;
  @Input() public selectedTeamId: number;
  public email: string = '';
  public users: string[] = ["a", "ab", "ac", "abc"];
  public filteredUsers: IUser[] = [];
  private unsubscribe$ = new Subject<void>();
  public validationErrorExists: boolean = false;
  public validationErrorMessage: string = '';
  public emailRequiredErrorMessage = "Email is required."

  constructor(private _userService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(form): void {
    console.log(this.email, this.selectedTeamId)
    this._userService.addUserToTeam(this.email, this.selectedTeamId)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      res => {
        this.closeModal.nativeElement.click();
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
}
