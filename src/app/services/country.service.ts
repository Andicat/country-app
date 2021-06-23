import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../interfaces/country';

@Injectable()
export class CountryService {
  private url = 'https://restcountries.eu/rest/v2/all';
  private countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) { }

  loadCountries(): Observable<Country[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any[]>(this.url).pipe(
      map(data => {
        return data.map(country => {
          return {
            name: country.name,
            capital: country.capital,
            area: country.area,
            population: country.population,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            currency: country.currencies.map((item: any) => item.name).join(', '),
            region: country.region,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            languages: country.languages.map((item: any) => item.name),
            flag: country.flag,
          };
        });
      }),
    );
  }

  getCountries(): BehaviorSubject<Country[]> {
    return this.countries$;
  }

  setCountries(countries: Country[]): void {
    this.countries$.next(countries);
  }

  getCountry(name: string): Observable<Country | undefined> {
    return this.countries$.pipe(map(countries => countries.find(country => country.name == name)));
  }

  getPopulatedCountries(count: number): Observable<Country[]> {
    return this.countries$.pipe(
      map(countries => {
        return this.getSliced(
          countries.slice().sort((a, b) => b.population - a.population),
          count,
        );
      }),
    );
  }

  getLargestCountries(count: number): Observable<Country[]> {
    return this.countries$.pipe(
      map(countries => {
        return this.getSliced(
          countries.slice().sort((a, b) => b.area - a.area),
          count,
        );
      }),
    );
  }

  getMultiLanguagesCountries(count: number): Observable<Country[]> {
    return this.countries$.pipe(
      map(countries => {
        return this.getSliced(
          countries.slice().sort((a, b) => b.languages.length - a.languages.length),
          count,
        );
      }),
    );
  }

  saveCountry(name: string, countryToSave: Country): void {
    this.countries$.next(
      this.countries$.getValue().map((country: Country) => {
        if (country.name === name) {
          return countryToSave;
        }

        return country;
      }),
    );
  }

  addCountry(countryNew: Country): void {
    this.countries$.next([...this.countries$.getValue(), countryNew]);
  }

  deleteCountry(name: string): void {
    this.countries$.next(this.countries$.getValue().filter(country => country.name !== name));
  }

  private getSliced(array: Country[], countToSlice: number): Country[] {
    return array.slice(0, countToSlice);
  }
}
