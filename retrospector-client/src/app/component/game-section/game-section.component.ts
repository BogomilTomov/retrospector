import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INote } from 'src/app/models/note.model';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
    selector: 'ret-game-section',
    templateUrl: './game-section.component.html',
    styleUrls: ['../../../styles/modal.css', '../../../styles/box-shadow.css', './game-section.component.css']
})
export class GameSectionComponent implements OnInit {
    public notes: INote[] = [];
    public userIsAdminOrOwner: boolean;
    @Input() public sectionName: string;
    @Input() public username: string;
    @Input() private teamOwnerId: string;
    @Output() sectionToRemove = new EventEmitter<string>();
    private _userId: string;
    private _userRole: string;

    constructor(private readonly _accountService: AccountsService) { }

    ngOnInit() {
        this._userId = this._accountService.getLoggedInUserId();
        this._userRole = this._accountService.getLoggedInUserRole();
        this.userIsAdminOrOwner = this._userRole === "Admin" || this.teamOwnerId === this._userId;
    }

    addNote(newNote): void {
        this.notes.push(newNote);
    }

    removeSection(): void {
        this.sectionToRemove.emit(this.sectionName);
    }
}