import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { ViewMode } from '../enums/view-mode.enum';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ViewModeService {
  private value = this.initialValue;

  constructor(private localStorageService: LocalStorageService) {}

  get mode(): ViewMode {
    return this.value;
  }

  set mode(value: ViewMode) {
    this.value = value;
    this.localStorageService.setItem(LocalStorageKey.ViewMode, value);
  }

  private get initialValue(): ViewMode {
    return <ViewMode>this.localStorageService.getItem(LocalStorageKey.ViewMode) || ViewMode.Cards;
  }
}
