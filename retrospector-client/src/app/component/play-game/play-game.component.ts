import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { warningMessages } from 'src/environments/literals';

@Component({
    selector: 'ret-play-game',
    templateUrl: 'play-game.component.html',
    styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {
    public nameWarning: string = '';
    public name: string;
    @ViewChild('nameInput') public nameInput: ElementRef;
    @ViewChild('nicknameModal') public nicknameModal: ElementRef;
    public tryToPlay: boolean;

    constructor(private readonly _accountsService: AccountsService) { }

    ngOnInit(): void {
        this.name = this._accountsService.getLoggedInUserFirstName();
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

        return isValid;
    }
}