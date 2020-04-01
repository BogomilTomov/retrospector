import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ret-share-team',
  templateUrl: './share-team.component.html',
  styleUrls: ['./share-team.component.css']
})
export class ShareTeamComponent implements OnInit {
  @ViewChild('closeModal') public closeModal: ElementRef;
  public email: string = '';
  public users: string[] = ["a", "ab", "ac", "abc"];
  public filteredUsers: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(x): void {
    console.log(x)
  }

  getSuggestions(): void {
    if (this.email.length > 0) {
      this.filteredUsers = this.users.filter(u => u.includes(this.email));
    } else {
      this.filteredUsers = [];
    }
    console.log(this.filteredUsers)
  }
}
