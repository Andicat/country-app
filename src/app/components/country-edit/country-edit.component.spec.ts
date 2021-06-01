import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';

import { CountryEditComponent } from './country-edit.component';

const mockCountry: Country = {
  name: 'Russia',
  capital: 'Moscow',
  area: 17098246,
  population: 144463451,
  currency: 'Russian Ruble',
  gdp: 1283162,
};

const mockCountryForm: FormGroup = new FormGroup({
  capital: new FormControl(mockCountry.capital),
  area: new FormControl(mockCountry.area),
  population: new FormControl(mockCountry.population),
  gdp: new FormControl(mockCountry.gdp),
  currency: new FormControl(mockCountry.currency),
  languages: new FormControl(mockCountry.languages),
});

describe('CountryEditComponent', () => {
  let component: CountryEditComponent;
  let fixture: ComponentFixture<CountryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: CountryService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                name: 'Russia',
              }),
            },
          },
        },
      ],
      declarations: [CountryEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('countryForm should to equal new Form with params', () => {
    component.ngOnInit();
    expect(component.countryForm.value).toEqual(mockCountryForm.value);
  });
});
