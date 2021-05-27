import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent } from './components/home/home.component';
import { AllCountriesComponent } from './components/all-countries/all-countries.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:name', component: CountryDetailComponent },
  { path: 'all-countries', component: AllCountriesComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule { }
