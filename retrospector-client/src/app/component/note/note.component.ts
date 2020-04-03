import { Component, Input } from '@angular/core';

@Component({
    selector: 'ret-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']
})
export class NoteComponent {
    @Input() public author: string;
    @Input() public content: string;
    @Input() public date: string | Date;
}