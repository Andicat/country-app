import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewMode } from './view-mode.enum';

@Component({
  selector: 'view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss'],
})
export class ViewModeComponent {
  @Input() mode: ViewMode;
  @Output() modeChange = new EventEmitter<ViewMode>();

  get cardsMode(): boolean {
    return this.mode === ViewMode.Cards;
  }

  onClick() {
    this.mode = this.cardsMode ? ViewMode.Table : ViewMode.Cards;
    this.modeChange.emit(this.mode);
  }
}
