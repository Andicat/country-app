import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { ViewModeService } from 'src/app/services/view-mode.service';
import { ViewMode } from '../../enums/view-mode.enum';

@Component({
  selector: 'countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  countries: Country[] = [];
  fields: string[] = [];

  constructor(private countryService: CountryService, public viewModeService: ViewModeService) {}

  get tableView(): boolean {
    return this.viewModeService.mode === ViewMode.Table;
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(result => {
      this.countries = result;
    });
  }
}
