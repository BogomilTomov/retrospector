import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { warningMessages } from 'src/environments/literals';
import { INote } from 'src/app/models/note.model';

@Component({
    selector: 'ret-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['../../../styles/modal.css', './add-note.component.css']
})
export class AddNoteComponent {
    public noteContent: string = '';
    public noteWarning: string = '';
    @Input() public username: string;
    @Output() newNote = new EventEmitter<INote>();
    @ViewChild('noteInput') public noteInput: ElementRef;
    @ViewChild('closeModal') public closeModal: ElementRef;

    addNote(): void {
        if(this.validateForm()) {
            const note: INote = {
                author: this.username,
                content: this.noteContent,
                date: null
            };
            this.newNote.emit(note);
            this.closeModal.nativeElement.click()
        }
    }

    resetFields(): void {
        this.noteContent = '';
        this.noteWarning = '';
    }

    validateForm(): boolean {
        let isValid = true;

        if (!this.noteInput.nativeElement.value) {
            this.noteWarning = warningMessages.noteContent;
            isValid = false;
        }
        else {
            this.noteWarning = '';
        }

        return isValid;
    }
}