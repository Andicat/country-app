import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationRoute } from '../enums/application-route';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { Country } from '../interfaces/country';
import { countriesData } from '../mocks/country-data';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class CountryService {
  private countriesValue = this.initialValue;

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  get countries(): Country[] {
    return this.countriesValue;
  }

  getCountry(name: string): Country | undefined {
    const countryValue = this.countries.find(country => country.name === name);

    if (!countryValue) {
      this.router.navigate([ApplicationRoute.PageNotFound]);
    }

    return countryValue;
  }

  getPopulatedCountries(): Country[] {
    return this.getSliced(
      this.countriesValue.sort((a, b) => b.population - a.population),
      3,
    );
  }

  getLargestCountries(): Country[] {
    return this.getSliced(
      this.countriesValue.sort((a, b) => b.area - a.area),
      3,
    );
  }

  getBestGDPCountries(): Country[] {
    return this.getSliced(
      this.countriesValue.sort((a, b) => b.gdp - a.gdp),
      3,
    );
  }

  saveCountry(name: string, value: Country): void {
    this.countriesValue = this.countriesValue.map((country: Country) => {
      if (country.name === name) {
        return value;
      }

      return country;
    });
    this.localStorageService.setItem(LocalStorageKey.CountriesData, this.countriesValue);
  }

  addCountry(value: Country): void {
    this.countriesValue.push(value);
    this.localStorageService.setItem(LocalStorageKey.CountriesData, this.countriesValue);
  }

  deleteCountry(name: String): void {
    this.countriesValue = this.countriesValue.filter(country => country.name !== name);
  }

  private get initialValue(): Country[] {
    return this.localStorageService.getItem(LocalStorageKey.CountriesData) || countriesData;
  }

  private getSliced(arr: Country[], nmb: number): Country[] {
    return arr.slice(0, nmb);
  }
}
