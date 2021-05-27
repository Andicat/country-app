import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryService } from './country.service';
import { HomeComponent } from './components/home/home.component';
import { AllCountriesComponent } from './components/all-countries/all-countries.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { ViewModeComponent } from './components/view-mode/view-mode.component';
import { FormComponent } from './components/language-form/language-form.component';
import { ListPipe} from './list.pipe';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, AllCountriesComponent, CountryDetailComponent, ViewModeComponent, FormComponent, ListPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
