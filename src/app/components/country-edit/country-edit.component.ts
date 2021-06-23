import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe, Location } from '@angular/common';

import { Country } from 'src/app/interfaces/country';
import { CountryValidator } from 'src/app/services/country-form-validator';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ApplicationRoute } from 'src/app/enums/application-route';
import { CountryService } from 'src/app/services/country.service';
import { LanguageService } from 'src/app/services/language.service';

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
  languages: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private languageService: LanguageService,
    private location: Location,
    private decimalPipe: DecimalPipe,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data.mode === 'add') {
        this.isAdding = true;
        this.country = <Country>{};
      }
    });
    this.languageService.getLanguages().subscribe(data => {
      this.languages = data.sort();
    });
    this.countryService.getCountries().subscribe(result => {
      if (result.length) {
        if (!this.isAdding) {
          this.getCountry();
        }

        this.otherCountries = result.filter(country => country !== this.country);
        if (this.country) {
          this.initForm();
        }
      }
    });
  }

  getCountry(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name') || '';
    this.countryService.getCountry(this.name).subscribe(result => {
      if (result) {
        this.country = result;
      } else {
        this.router.navigate([ApplicationRoute.PageNotFound]);
      }
    });
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
      region: new FormControl(this.country.region, CountryValidator.words),
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
    });
    this.countryForm.updateValueAndValidity();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit(value: any): void {
    value.area = this.toNumber(value.area);
    value.population = this.toNumber(value.population);
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
