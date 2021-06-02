import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
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
import { ViewModeService } from './services/view-mode.service';
import { DecimalPipe } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { SnackbarService } from './services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from './services/local-storage.service';

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
  providers: [CountryService, ViewModeService, DecimalPipe, SnackbarService, MatSnackBar, LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
