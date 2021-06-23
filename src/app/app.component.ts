import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ColorTheme } from './enums/themes.enum';
import { ColorThemeService } from './services/color-theme.service';
import { CountryService } from './services/country.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Facts About Countries';
  themes: ColorTheme[];
  theme: ColorTheme;

  constructor(private colorThemeService: ColorThemeService, private languageService: LanguageService, private countryService: CountryService) {
    colorThemeService.getTheme().subscribe(result => (this.theme = result));
    this.themes = colorThemeService.getThemes();
    forkJoin([this.countryService.loadCountries(), this.languageService.loadLanguages()]).subscribe(result => {
      this.countryService.setCountries(result[0]);
      this.languageService.setLanguages(result[1]);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectTheme(option: any): void {
    this.colorThemeService.setTheme(option.value);
  }
}
