import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApplicationRoute } from '../enums/application-route';
import { Country } from '../interfaces/country';

@Injectable()
export class CountryService {
  private url = `https://run.mocky.io/v3/bc8c37ef-20b8-4b00-8437-9548a8477307`;

  private countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);

  constructor(private router: Router, private http: HttpClient) {
    this.loadCountries();
  }

  loadCountries() {
    this.http.get(this.url).subscribe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data: any) => {
        this.countries$.next(data);
      },
    );
  }

  getCountries(): BehaviorSubject<Country[]> {
    return this.countries$;
  }

  getCountry(name: string): Country | undefined {
    const countryValue = this.countries$.getValue().find(country => country.name === name);

    if (!countryValue) {
      this.router.navigate([ApplicationRoute.PageNotFound]);
    }

    return countryValue;
  }

  getPopulatedCountries(): Country[] {
    return this.getSliced(
      this.countries$.getValue().sort((a, b) => b.population - a.population),
      3,
    );
  }

  getLargestCountries(): Country[] {
    return this.getSliced(
      this.countries$.getValue().sort((a, b) => b.area - a.area),
      3,
    );
  }

  getBestGDPCountries(): Country[] {
    return this.getSliced(
      this.countries$.getValue().sort((a, b) => b.gdp - a.gdp),
      3,
    );
  }

  saveCountry(name: string, value: Country): void {
    this.countries$.next(
      this.countries$.getValue().map((country: Country) => {
        if (country.name === name) {
          return value;
        }

        return country;
      }),
    );
  }

  addCountry(value: Country): void {
    this.countries$.next([...this.countries$.getValue(), value]);
  }

  deleteCountry(name: string): void {
    this.countries$.next(this.countries$.getValue().filter(country => country.name !== name));
  }

  private getSliced(arr: Country[], nmb: number): Country[] {
    return arr.slice(0, nmb);
  }
}
