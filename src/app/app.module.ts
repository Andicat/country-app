import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryComponent } from './components/country/country.component';
import { ViewModeComponent } from './components/view-mode-button/view-mode-button.component';
import { CountryEditComponent } from './components/country-edit/country-edit.component';
import { ListPipe } from './pipes/list.pipe';
import { CountryService } from './services/country.service';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { DecimalPipe } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { SnackbarService } from './services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from './services/local-storage.service';
import { LanguageService } from './services/language.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ChartComponent } from './components/chart/chart.component';
import { ColorThemeDirective } from './directives/color-theme.directive';
import { ColorThemeService } from './services/color-theme.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesListComponent,
    CountryComponent,
    ViewModeComponent,
    CountryEditComponent,
    ListPipe,
    NotFoundPageComponent,
    ChartComponent,
    ColorThemeDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    OverlayModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CountryService,
    LanguageService,
    DecimalPipe,
    SnackbarService,
    MatSnackBar,
    ColorThemeService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
