import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewMode } from 'src/app/enums/view-mode.enum';


@Component({
  selector: 'view-mode-button',
  templateUrl: './view-mode-button.component.html',
  styleUrls: ['./view-mode-button.component.scss'],
})
export class ViewModeComponent {
  @Input() mode: ViewMode;
  @Output() modeChange = new EventEmitter<ViewMode>();

  constructor() {}

  get cardsMode(): boolean {
    return this.mode === ViewMode.Cards;
  }

  onClick() {
    this.mode = this.cardsMode ? ViewMode.Table : ViewMode.Cards;
    this.modeChange.emit(this.mode);
  }
}
