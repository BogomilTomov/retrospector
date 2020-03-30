import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { warningMessages } from '../../../environments/literals';
import { IRetrospective } from 'src/app/models/retrospective.model';
import { RetroGamesService } from 'src/app/services/retro-games.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    public validationErrorExists: boolean = false;
    public validationErrorMessage: string = '';
    @ViewChild('closeModal') public closeModal: ElementRef;
    public dropdownToggle = new EventEmitter();
    @Output() newRetrospective = new EventEmitter<IRetrospective>();
    @Input() selectedTeamId: number;
    private unsubscribe$ = new Subject<void>();

    constructor(private _gameService: RetroGamesService) { }

    chooseTemplate(template: string): void {
        this.newRetrospectiveTemplate = template;
        this.dropdownText = template;
    }

    resetTemplate(): void {
        this.dropdownText = 'Template';
        this.newRetrospectiveTemplate = '';
    }

    createNewRetrospective(): void {
        if (this.formIsValid()) {            
            const game: IRetrospective = {
                name: this.newRetrospectiveName,
                template: this.newRetrospectiveTemplate,
                teamId: this.selectedTeamId
            };
            
            this._gameService.createGame(game)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              res => {
                this.closeModal.nativeElement.click();
                //form.reset();
                this.newRetrospective.emit(res);
              },
              err => {
                this.validationErrorExists = true;
                this.validationErrorMessage = err.error.message;
                setTimeout (() => {
                  this.validationErrorExists = false;
                }, 3000)
              });
            // this.newRetrospective.emit(game);
            // this.closeModal.nativeElement.click();
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
    
    ngOnDestroy(){
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
  }
}