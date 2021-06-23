import { Directive, ElementRef } from '@angular/core';
import { ColorTheme } from '../enums/themes.enum';
import { ColorThemeService } from '../services/color-theme.service';

@Directive({
  selector: '[color-theme]',
})
export class ColorThemeDirective {
  private lastThemeClass: string;
  private defaultTheme: ColorTheme;

  constructor(private colorThemeService: ColorThemeService, private elementRef: ElementRef) {
    this.colorThemeService.getTheme().subscribe(result => {
      this.setThemeClass(this.elementRef.nativeElement.classList, result);
    });
    this.defaultTheme = colorThemeService.getDefaultTheme();
  }

  private setThemeClass(classList: DOMTokenList, theme: ColorTheme): void {
    const themeClass = theme + '-theme';

    if (this.lastThemeClass === themeClass) {
      return;
    }

    if (this.lastThemeClass) {
      classList.remove(this.lastThemeClass);
    }

    if (!classList.contains(themeClass) && theme != this.defaultTheme) {
      classList.add(themeClass);
    }

    this.lastThemeClass = themeClass;
  }
}
