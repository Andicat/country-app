import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { ViewMode } from '../enums/view-mode.enum';

@Injectable()
export class ViewModeService {
  private value = this.initialValue;

  get mode(): ViewMode {
    return this.value;
  }

  set mode(value: ViewMode) {
    this.value = value;
    localStorage.setItem(LocalStorageKey.ViewMode, value);
  }

  private get initialValue(): ViewMode {
    return <ViewMode>localStorage.getItem(LocalStorageKey.ViewMode) || ViewMode.Cards;
  }
}