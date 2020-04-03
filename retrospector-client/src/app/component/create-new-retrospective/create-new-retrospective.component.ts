import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { warningMessages } from '../../../environments/literals';
import { IRetrospective } from 'src/app/models/retrospective.model';
import { RetroGamesService } from 'src/app/services/retro-games.service';
import { IRetroGame } from 'src/app/models/retro-game.model';

@Component({
  selector: 'ret-create-new-retrospective',
  templateUrl: 'create-new-retrospective.component.html',
  styleUrls: ['../../../styles/modal.css', './create-new-retrospective.component.css']
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
  @Input() public selectedTeamId: number;
  @Output() newRetrospective = new EventEmitter<IRetroGame>();
  @ViewChild('closeModal') public closeModal: ElementRef;
  @ViewChild('newRetroName') public newRetroName: ElementRef;

  constructor(private _gameService: RetroGamesService) { }

  chooseTemplate(template: string): void {
    this.newRetrospectiveTemplate = template;
    this.dropdownText = template;
    this.validateForm();
  }

  resetTemplate(): void {
    this.dropdownText = 'Template';
    this.newRetrospectiveTemplate = '';
    this.validateForm();
  }

  createNewRetrospective(): void {
    if (this.validateForm()) {
      const game: IRetrospective = {
        name: this.newRetrospectiveName,
        template: this.newRetrospectiveTemplate,
        teamId: this.selectedTeamId
      };

      this._gameService.createGame(game)
        .then(res => {
          this.newRetrospective.emit(res);
          this.closeModal.nativeElement.click();
        })
        .catch(err => {
          this.validationErrorExists = true;
          this.validationErrorMessage = err.error.message;
          setTimeout(() => {
            this.validationErrorExists = false;
          }, 3000)
        });
    }
  }

  validateForm(): boolean {
    let isValid = true;

    if (!this.newRetroName.nativeElement.value) {
      this.nameWarning = warningMessages.retrospectiveName;
      isValid = false;
    }
    else {
      this.nameWarning = '';
    }

    if (!this.newRetrospectiveTemplate) {
      this.templateWarning = warningMessages.template;
      isValid = false;
    }
    else {
      this.templateWarning = '';
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