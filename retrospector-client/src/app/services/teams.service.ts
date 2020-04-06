import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITeam } from '../models/team.model';
import { baseUrl } from 'src/environments/environment';
import { ITeamData } from '../models/teams-data.model';
import { ITeamDetails } from '../models/team-details.model';
import { AccountsService } from './accounts.service';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private readonly _url = `${baseUrl}/Teams`;
  private _selectedTeam$ = new BehaviorSubject<ITeamDetails>(null)
  private _selectedTeam: ITeamDetails = {
    id: null,
    name: '',
    creationDate: null,
    retroGames: null,
    ownerId: null
  };
  private _teams$ = new BehaviorSubject<ITeamDetails[]>(null);

  constructor(private readonly _http: HttpClient,
              private readonly _accountsService: AccountsService) { 
  }

  public get selectedTeam$(): Observable<ITeamDetails> {
    return this._selectedTeam$.pipe(
      filter(team => team !== null)
    );
  }

  public get teams$(): BehaviorSubject<ITeamDetails[]> {
    return this._teams$;
  }

  public get ownedTeams$(): Observable<ITeamDetails[]> {
    return this.teams$.pipe(
      filter(teams => teams !== null),
      map(teams => {
      const userId = this._accountsService.getLoggedInUserId();
      return teams.filter(team => team.ownerId === userId);
      })
    )
  }

  public get sharedTeams$(): Observable<ITeamDetails[]> {
    return this.teams$.pipe(
      filter(teams => teams !== null),
      map(teams => {
      const userId = this._accountsService.getLoggedInUserId();
      return teams.filter(team => team.ownerId !== userId);
      })
    )
  }

  createTeam(team: ITeam): Promise<void> {
    return this._http.post<ITeamDetails>(this._url, team).toPromise().then(res => {
      this._teams$.next([...this._teams$.value, res]);
    });
  }

  editTeam(team: ITeamDetails): Promise<void> {
    return this._http.put<ITeamDetails>(this._url, team).toPromise().then(res => {
      this._selectedTeam = {...res};
      this._selectedTeam$.next(this._selectedTeam);
    });
  }
  
  fetchTeamData(userId: string): void {
    this._http.get<ITeamData>(`${baseUrl}/users/${userId}/teams`).toPromise().then(res => {
      this._selectedTeam.id = res.defaultTeam;

      if (this._selectedTeam.id === 0 && res.teams.length > 0) {
        this._selectedTeam.id = res.teams[0].id;
      }

      this._selectedTeam = res.teams.find(t => t.id == this._selectedTeam.id);
      this._selectedTeam$.next(this._selectedTeam);
      this._teams$.next(res.teams);
    });
  }

  selectTeam(selectedTeamId: number): void {
    this._selectedTeam = this._teams$.value.find(t => t.id == selectedTeamId);
    this._selectedTeam$.next(this._selectedTeam);
  }
}
