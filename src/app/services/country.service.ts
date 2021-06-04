import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../interfaces/country';

@Injectable()
export class CountryService {
  private url = `https://run.mocky.io/v3/27f16b93-631b-4edc-a634-2cb0c9598f5f`;

  private countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) {
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

  getCountry(name: string): Observable<Country | undefined> {
    return this.countries$.pipe(map(countries => countries.find(country => country.name == name)));
  }

  getPopulatedCountries(): Observable<Country[]> {
    return this.countries$.pipe(
      map(countries => {
        return this.getSliced(
          countries.sort((a, b) => b.population - a.population),
          3,
        );
      }),
    );
  }

  getLargestCountries(): Observable<Country[]> {
    return this.countries$.pipe(
      map(countries => {
        return this.getSliced(
          countries.sort((a, b) => b.area - a.area),
          3,
        );
      }),
    );
  }

  getBestGDPCountries(): Observable<Country[]> {
    return this.countries$.pipe(
      map(countries => {
        return this.getSliced(
          countries.sort((a, b) => b.gdp - a.gdp),
          3,
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
