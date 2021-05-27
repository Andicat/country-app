import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Language } from '../../country-data';

@Component({
  selector: 'language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss'],
})

export class FormComponent {
  @Input() selectedLanguages: Language[];
  @Output() change = new EventEmitter<Language[]>();

  languages = Object.keys(Language);
  selectTitle: string = 'Select languages...';

  onSelect(): void {
    this.change.emit(this.selectedLanguages);
  }
}
