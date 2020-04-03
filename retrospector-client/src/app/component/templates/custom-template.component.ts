import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { warningMessages } from 'src/environments/literals';
import { ISection } from 'src/app/models/section.model';

@Component({
    selector: 'ret-custom-template',
    templateUrl: './custom-template.component.html',
    styleUrls: ['../../../styles/modal.css', './custom-template.component.css']
})
export class CustomTemplateComponent {
    public sectionNameWarning: string = '';
    public newSectionName: string;
    public sections: ISection[] = [];
    public retrospectiveName: string ;
    @Input() public teamOwnerId: string;
    @Input() public username: string;    
    @Input() public teamName: string;    
    @ViewChild('sectionNameInput') public sectionNameInput: ElementRef;
    @ViewChild('closeModal') public closeModal: ElementRef;

    addSection(): void {
        if(this.validateForm()) {
            const newSection = {
                name: this.newSectionName,
                notes: []
            };

            this.sections.push(newSection);
            this.closeModal.nativeElement.click();
        }
    }

    removeSection(sectionToRemove: string): void {
        this.sections = this.sections.filter(sect => sect.name !== sectionToRemove);
    }

    validateForm(): boolean {
        let isValid = true;

        if (!this.sectionNameInput.nativeElement.value) {
            this.sectionNameWarning = warningMessages.sectionName;
            isValid = false;
        }
        else {
            this.sectionNameWarning = '';
        }

        return isValid;
    }

    resetFields(): void {
        this.newSectionName = '';
        this.sectionNameWarning = '';
    }
}