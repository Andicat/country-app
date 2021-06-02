import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  name: string;
  country: Country | undefined;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private location: Location,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(): void {
    this.name = this.route.snapshot.paramMap.get('name') || '';
    this.country = this.countryService.getCountry(this.name);
  }

  deleteCountry(): void {
    this.countryService.deleteCountry(this.name);
    this.snackbarService.success(this.name + ': deleted');
    this.location.back();
  }
}
