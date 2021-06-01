import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Language } from 'src/app/enums/language.enum';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { CountryValidator } from 'src/app/services/country-form-validator';

@Component({
  selector: 'country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountryEditComponent {
  countryForm: FormGroup;
  name: string;
  country: Country;
  otherCountries: Country[];
  languages = Object.keys(Language);

  constructor(private route: ActivatedRoute, private countryService: CountryService, private location: Location) {}

  ngOnInit(): void {
    this.getCountry();
    this.getOtherCountries();
    this.initForm();
  }

  initForm(): void {
    this.countryForm = new FormGroup({
      capital: new FormControl(this.country.capital, [
        CountryValidator.requiredWithTrim,
        CountryValidator.words,
        CountryValidator.unique(this.otherCountries, 'capital'),
      ]),
      area: new FormControl(this.country.area, CountryValidator.positiveNumber),
      population: new FormControl(this.country.population, [
        CountryValidator.minNumber(1),
        CountryValidator.maxNumber(1500000000),
      ]),
      gdp: new FormControl(this.country.gdp, CountryValidator.positiveNumber),
      currency: new FormControl(this.country.currency, CountryValidator.words),
      languages: new FormControl(this.country.languages),
    });
  }

  getCountry(): void {
    this.name = this.route.snapshot.paramMap.get('name') || '';
    const country = this.countryService.getCountry(this.name);

    if (country) {
      this.country = country;
    }
  }

  getOtherCountries(): void {
    this.otherCountries = this.countryService.countries.filter(country => country !== this.country);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit(value: any): void {
    this.countryService.saveCountry(this.name, Object.assign(this.country, value));
  }

  goBack(): void {
    this.location.back();
  }
}
