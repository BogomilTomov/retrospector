import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { warningMessages } from 'src/environments/literals';
import { TeamsService } from 'src/app/services/teams.service';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'ret-play-game',
    templateUrl: 'play-game.component.html',
    styleUrls: ['../../../styles/modal.css', './play-game.component.css']
})
export class PlayGameComponent implements OnInit, OnDestroy {
    public nameWarning: string = '';
    public username: string = '';
    public teamName: string = '';
    public teamOwnerId;
    @ViewChild('nameInput') public nameInput: ElementRef;
    @ViewChild('nicknameModal') public nicknameModal: ElementRef;
    private _unsubscribe$ = new Subject<void>();

    constructor(private readonly _accountsService: AccountsService,
                private readonly _teamsService: TeamsService) { }

    ngOnInit(): void {
        this._accountsService.loggedIn$.pipe(takeUntil(this._unsubscribe$)).subscribe(loggedIn => {
            if(loggedIn) {
                this.username = this._accountsService.getLoggedInUserFirstName();
                this._teamsService.selectedTeam$.pipe(take(1)).subscribe(team => {
                        this.teamName = team.name;
                        this.teamOwnerId = team.ownerId;
                });
            }
        })
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    play(): void {
        if(this.formIsValid()) {
            this.nicknameModal.nativeElement.classList.remove('show');
        }
    }

    formIsValid(): boolean {
        let isValid = true;

        if (!this.nameInput.nativeElement.value) {
            this.nameWarning = warningMessages.name;
            isValid = false;
        }
        else {
            this.nameWarning = '';
        }

        return isValid;
    }
}