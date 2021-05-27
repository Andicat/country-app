import { Component, OnInit } from '@angular/core';
 
import { Country } from '../../country-data';
import { CountryService } from '../../country.service';
import { ViewMode } from '../view-mode/view-mode.enum';

 
@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.scss']
})
export class AllCountriesComponent implements OnInit {
  countries: Country[] = [];
  fields: string[] = [];  
  viewMode:ViewMode = ViewMode.Table;

  constructor(private countryService: CountryService) { }

  get tableView(): boolean {
    return this.viewMode === ViewMode.Table;
  }

  ngOnInit() {
    this.getCountries();
    this.getFields();
  }

  getCountries(): void {
    this.countries = this.countryService.getCountries();
  }

  getFields(): void {
    this.fields = this.countryService.getFields();
  }

  getField(country:Country,field:string) {
    return country[field as keyof typeof country]
  }
}
