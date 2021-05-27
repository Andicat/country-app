import { Injectable } from '@angular/core';

import { Country, COUNTRIES, Language } from './country-data';
 
@Injectable()
export class CountryService {
 
  constructor() { }
 
  getCountries(): Country[] {
    return COUNTRIES;
  }

  getFields(): string[] {
    return Object.keys(new Country);
  }
 
  getPopulatedCountries(): Country[] {
    return COUNTRIES.sort((a, b) => b.population - a.population).slice(0, 3);
  }
 
  getLargestCountries(): Country[] {
    return COUNTRIES.sort((a, b) => b.area - a.area).slice(0, 3);
  }
 
  getGDPCountries(): Country[] {
    return COUNTRIES.sort((a, b) => b.gdp - a.gdp).slice(0, 3);
  }
 
  getCountry(name: string): Country|undefined {
    return COUNTRIES.find(country => country.name === name);
  }

  setLanguages(name: string, value: Language[]) {
    let country = COUNTRIES.find(country => country.name === name);
    if (country) {
      country.languages = value;
    }
  }
}
