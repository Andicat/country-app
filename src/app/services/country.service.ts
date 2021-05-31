import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationRoute } from '../enums/application-route';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { Country } from '../interfaces/country';
import { countriesData } from '../mocks/country-data';

@Injectable()
export class CountryService {
  private countriesValue = this.initialValue;
    
  constructor(
    private router: Router
  ) {}

  get countries(): Country[] {
    return this.countriesValue;
  }

  getCountry(name: string): Country|undefined {
    let countryValue = this.countries.find(country => country.name === name);
    if (!countryValue) {
      this.router.navigate([ApplicationRoute.PageNotFound]);
    }
    return countryValue;
  }

  getPopulatedCountries(): Country[] {
    return this.getSliced(this.countriesValue.sort((a, b) => b.population - a.population), 3);
  }

  getLargestCountries(): Country[] {
    return this.getSliced(this.countriesValue.sort((a, b) => b.area - a.area), 3);
  }

  getBestGDPCountries(): Country[] {
    return this.getSliced(this.countriesValue.sort((a, b) => b.gdp - a.gdp), 3);
  }

  saveCountry(countryForChange:Country,value:any) {
    this.countriesValue = this.countriesValue.map( (country:Country) => {
      if (country === countryForChange) {
        return Object.assign(country, value);
      }
      return country;
    });
    this.saveInLocalStorage();
  }
  
  private get initialValue(): Country[] {
    let localValue =  localStorage.getItem(LocalStorageKey.CountryData);
    if (localValue) {
      return JSON.parse(localValue);
    }
    return countriesData;
  }

  private getSliced(arr:Country[], nmb:number): Country[] {
    return arr.slice(0, nmb);
  }

  private saveInLocalStorage():void {
    localStorage.setItem(LocalStorageKey.CountryData, JSON.stringify(this.countriesValue));
  }
}
