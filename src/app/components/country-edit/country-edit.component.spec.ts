import { Overlay } from '@angular/cdk/overlay';
import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

import { CountryEditComponent } from './country-edit.component';

const mockCountry: Country = {
  name: 'Russia',
  capital: 'Moscow',
  area: 17098246,
  population: 144463451,
  currency: 'Russian Ruble',
  region: 1283162,
};

const countryServiceStub = {
  getCountries: () => {
    return of([]);
  },
  getCountry: () => {
    return {};
  },
};

const activatedRouteStub = {
  snapshot: {
    paramMap: convertToParamMap({ name: 'Russia' }),
  },
  data: of({}),
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const mockCountryForm: FormGroup = new FormGroup({
  capital: new FormControl(mockCountry.capital),
  area: new FormControl(mockCountry.area),
  population: new FormControl(mockCountry.population),
  region: new FormControl(mockCountry.region),
  currency: new FormControl(mockCountry.currency),
  languages: new FormControl(mockCountry.languages),
});

describe('CountryEditComponent', () => {
  let component: CountryEditComponent;
  let fixture: ComponentFixture<CountryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: CountryService, useValue: countryServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        DecimalPipe,
        SnackbarService,
        MatSnackBar,
        Overlay,
      ],
      declarations: [CountryEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryEditComponent);
    component = fixture.componentInstance;
    component.otherCountries = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
