import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CountryService } from 'src/app/services/country.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ViewModeService } from 'src/app/services/view-mode.service';

import { CountriesListComponent } from './countries-list.component';

describe('CountriesListComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CountriesListComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [CountryService, ViewModeService, LocalStorageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
