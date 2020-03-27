import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ITeamDetails } from 'src/app/models/team-details.model';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() public selectedTeam: ITeamDetails;
  @Input() public userId: string;

  constructor() { }

  teamCreated(newTeam): void {
    // this.teams.push(newTeam);
    // this.ownedTeams.push(newTeam);
    // this.ownedTeams.sort((a, b) => a.name.localeCompare(b.name));
    // this.selectedTeamIdChange.emit(newTeam.id);
    // this._userService.setSelectedTeam(this.userId, newTeam.id)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe();
  }

  // ngOnChanges(teamSelectChanges: SimpleChanges) {
  //   if(!teamSelectChanges.selectedTeamId.isFirstChange()) {
  //     this.selectedTeamId = teamSelectChanges.selectedTeamId.currentValue;
  //     this.selectedTeam = this.teams.find(t => t.id == this.selectedTeamId);
  //     this._userService.setSelectedTeam(this.userId, this.selectedTeamId)
  //       .pipe(takeUntil(this.unsubscribe$))
  //       .subscribe();
  //   }
  // }

  addRetrospective(newGame: IRetroGame): void { 
    // newGame.teamId = this.selectedTeamId;
    // this._gameService.createGame(newGame).toPromise().then(res => {
    //   this.selectedTeam.retroGames = [res, ...this.selectedTeam.retroGames].slice(0, 20);
    // }).catch(err => console.log(err))
  }
}
