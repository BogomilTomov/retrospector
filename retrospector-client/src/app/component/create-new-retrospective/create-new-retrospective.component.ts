import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { warningMessages } from '../../../environments/literals';
import { IRetrospective } from 'src/app/models/retrospective.model';

@Component({
    selector: 'ret-create-new-retrospective',
    templateUrl: 'create-new-retrospective.component.html',
    styleUrls: ['create-new-retrospective.component.css']
})
export class CreateNewRetrospectiveComponent {
    public templateWarning: string = '';
    public nameWarning: string = '';
    public newRetrospectiveName: string = '';
    public newRetrospectiveTemplate: string = '';
    public dropdownText = 'Template';
    public retroGameOptions: string[] = ['Start/Stop/Continue', 'Mad/Sad/Glad', '4Ls', 'Quick', 'Starfish'];
    @ViewChild('closeModal') public closeModal: ElementRef;
    public dropdownToggle = new EventEmitter();
    @Output() newRetrospective = new EventEmitter<IRetrospective>();

    chooseTemplate(template: string): void {
        this.newRetrospectiveTemplate = template;
        this.dropdownText = template;
    }

    resetTemplate(): void {
        this.dropdownText = 'Template';
        this.newRetrospectiveTemplate = '';
    }

    createNewRetrospective(): void {
        if(this.formIsValid()) {            
            const game: IRetrospective = {
                name: this.newRetrospectiveName,
                template: this.newRetrospectiveTemplate,
            };
            
            this.newRetrospective.emit(game);
            this.closeModal.nativeElement.click();
        }
    }

    formIsValid(): boolean {
        let isValid = true;

        if (!this.newRetrospectiveName) {
            this.nameWarning = warningMessages.retrospectiveName;
            isValid = false;
        }

        if (!this.newRetrospectiveTemplate) {
            this.templateWarning = warningMessages.template;
            isValid = false;
        }

        return isValid;
    }

    resetFields() {
        this.newRetrospectiveName = '';
        this.newRetrospectiveTemplate = '';
        this.nameWarning = '';
        this.templateWarning = '';
        this.dropdownText = 'Template';
    }
}