import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewMode } from 'src/app/enums/view-mode.enum';

@Component({
  selector: 'view-mode-button',
  templateUrl: './view-mode-button.component.html',
  styleUrls: ['./view-mode-button.component.scss'],
})
export class ViewModeComponent {
  @Input() mode: ViewMode;
  @Input() modes: ViewMode[];
  @Output() modeChange = new EventEmitter<ViewMode>();
  private nextMode: ViewMode;

  get modeTitle(): string {
    return this.nextMode + ' view';
  }

  ngOnInit() {
    this.setNextMode();
  }

  onClick(): void {
    this.mode = this.nextMode;
    this.setNextMode();
    this.modeChange.emit(this.mode);
  }

  private setNextMode(): void {
    let nextModeIndex: number = this.modes.findIndex((item: ViewMode) => item === this.mode) + 1;

    if (nextModeIndex > this.modes.length - 1) {
      nextModeIndex = 0;
    }

    this.nextMode = this.modes[nextModeIndex];
  }
}
