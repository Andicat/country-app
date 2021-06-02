import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe, Location } from '@angular/common';

import { Language } from 'src/app/enums/language.enum';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { CountryValidator } from 'src/app/services/country-form-validator';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountryEditComponent {
  isAdding: boolean;
  countryForm: FormGroup;
  name: string;
  country: Country;
  otherCountries: Country[];
  languages = Object.keys(Language);

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private location: Location,
    private decimalPipe: DecimalPipe,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.isAdding = data.mode === 'add' ? true : false;
    });
    this.getCountry();
    this.getOtherCountries();
    this.initForm();
  }

  initForm(): void {
    this.countryForm = new FormGroup({
      name: new FormControl(this.country.name, [
        CountryValidator.requiredWithTrim,
        CountryValidator.words,
        CountryValidator.unique(this.otherCountries, 'name'),
      ]),
      capital: new FormControl(this.country.capital, [
        CountryValidator.requiredWithTrim,
        CountryValidator.words,
        CountryValidator.unique(this.otherCountries, 'capital'),
      ]),
      area: new FormControl(this.country.area, [CountryValidator.minNumber(1), CountryValidator.maxNumber(100000000)]),
      population: new FormControl(this.country.population, [
        CountryValidator.minNumber(1),
        CountryValidator.maxNumber(1500000000),
      ]),
      gdp: new FormControl(this.country.gdp, CountryValidator.positiveNumber),
      currency: new FormControl(this.country.currency, CountryValidator.words),
      languages: new FormControl(this.country.languages),
    });

    this.countryForm.valueChanges.subscribe(form => {
      if (form.area) {
        this.countryForm.patchValue(
          { area: this.decimalPipe.transform(this.toNumber(form.area)) },
          { emitEvent: false },
        );
      }

      if (form.population) {
        this.countryForm.patchValue(
          { population: this.decimalPipe.transform(this.toNumber(form.population)) },
          { emitEvent: false },
        );
      }

      if (form.gdp) {
        this.countryForm.patchValue({ gdp: this.decimalPipe.transform(this.toNumber(form.gdp)) }, { emitEvent: false });
      }
    });
    this.countryForm.updateValueAndValidity();
  }

  getCountry(): void {
    if (this.isAdding) {
      this.country = <Country>{};

      return;
    }

    this.name = this.activatedRoute.snapshot.paramMap.get('name') || '';

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
    value.area = this.toNumber(value.area);
    value.population = this.toNumber(value.population);
    value.gdp = this.toNumber(value.gdp);
    if (this.isAdding) {
      this.countryService.addCountry(Object.assign(this.country, value));
    } else {
      this.countryService.saveCountry(this.name, Object.assign(this.country, value));
    }

    this.snackbarService.success(this.country.name + ': ' + (this.isAdding ? 'added' : 'saved'));
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  private toNumber(value: number) {
    return Number(value.toString().replace(/\D/g, ''));
  }
}
