import { Component, OnInit } from '@angular/core';
import { LocalStorageKey } from 'src/app/enums/local-storage-key.enum';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ViewMode } from '../../enums/view-mode.enum';

@Component({
  selector: 'countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  viewMode: ViewMode = this.initialViewMode;
  viewModes: ViewMode[] = [ViewMode.Table, ViewMode.Cards];
  countries: Country[] = [];
  fields: string[] = [];

  constructor(private countryService: CountryService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(result => {
      this.countries = result;
    });
  }

  get tableView(): boolean {
    return this.viewMode === ViewMode.Table;
  }

  get initialViewMode(): ViewMode {
    return <ViewMode>this.localStorageService.getItem(LocalStorageKey.ViewModeList) || ViewMode.Cards;
  }

  modeChanged() {
    this.localStorageService.setItem(LocalStorageKey.ViewModeList, this.viewMode);
  }
}
