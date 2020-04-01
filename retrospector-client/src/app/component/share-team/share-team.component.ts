import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'ret-share-team',
  templateUrl: './share-team.component.html',
  styleUrls: ['./share-team.component.css']
})
export class ShareTeamComponent implements OnInit {
  @ViewChild('closeModal') public closeModal: ElementRef;
  public email: string = '';
  public users: string[] = ["a", "ab", "ac", "abc"];
  public filteredUsers: IUser[] = [];

  constructor(private _userService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(x): void {
    console.log(x)
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
