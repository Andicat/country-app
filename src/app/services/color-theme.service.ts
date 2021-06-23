import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { ColorTheme } from '../enums/themes.enum';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ColorThemeService {
  private theme$: BehaviorSubject<ColorTheme> = new BehaviorSubject<ColorTheme>(this.initialValue);
  private themes = [ColorTheme.Light, ColorTheme.Dark];
  private defaultTheme = ColorTheme.Light;

  constructor(private localStorageService: LocalStorageService) {}

  getTheme(): BehaviorSubject<ColorTheme> {
    return this.theme$;
  }

  setTheme(value: ColorTheme) {
    this.theme$.next(value);
    this.localStorageService.setItem(LocalStorageKey.Theme, value);
  }

  getThemes(): ColorTheme[] {
    return this.themes;
  }

  getDefaultTheme(): ColorTheme {
    return this.defaultTheme;
  }

  private get initialValue(): ColorTheme {
    return <ColorTheme>this.localStorageService.getItem(LocalStorageKey.Theme) || ColorTheme.Light;
  }
}
