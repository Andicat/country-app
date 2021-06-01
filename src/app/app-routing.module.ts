import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryComponent } from './components/country/country.component';
import { CountryEditComponent } from './components/country-edit/country-edit.component';
import { ApplicationRoute } from './enums/application-route';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: ApplicationRoute.Home, pathMatch: 'full' },
  { path: ApplicationRoute.PageNotFound, component: NotFoundPageComponent, pathMatch: 'full' },
  { path: ApplicationRoute.Home, component: HomeComponent },
  { path: 'countries', component: CountriesListComponent, pathMatch: 'full' },
  { path: 'countries/:name', component: CountryComponent },
  { path: 'countries/:name/edit', component: CountryEditComponent },
  { path: ApplicationRoute.PageNotFound, component: NotFoundPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: ApplicationRoute.Home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
