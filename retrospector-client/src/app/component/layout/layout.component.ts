import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ITeamDetails } from 'src/app/models/team-details.model';

@Component({
  selector: 'ret-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public sharedTeams: ITeamDetails[] = [];
  public ownedTeams: ITeamDetails[] = [];
  public selectedTeamId: number;
  private loggedInSubs: Subscription;

  constructor(private readonly _accountsService: AccountsService, private readonly _router: Router) {}

  ngOnInit(): void {
    this.loggedInSubs = this._accountsService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.userFirstName = this._accountsService.getLoggedInUserFirstName();
      });
  }

  ngOnDestroy(): void {
    this.loggedInSubs.unsubscribe();
  }

  public title: string = 'Retrospector';

  public isLoggedIn: boolean;

  public userFirstName: string;

  public logout(): void {
    this._accountsService.logOut().pipe(take(1)).subscribe(
      () => {
        this._accountsService.removeLocalStorageInfo();
        this._router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
      }
    );
  }

  ownedTeamsChange(ownedTeams) {
    console.log(ownedTeams)
    this.ownedTeams = ownedTeams;
  }

  sharedTeamsChange(sharedTeams) {
    console.log(sharedTeams)
    this.sharedTeams = sharedTeams;
  }
  
  selectedTeam(selectedTeamId) {
    this.selectedTeamId = selectedTeamId;
    console.log(1)
  }

  selectedTeamChange(teamId) {
    console.log(2)
    this.selectedTeamId = teamId;
  }
}
