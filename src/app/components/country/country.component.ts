import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ApplicationRoute } from 'src/app/enums/application-route';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  name: string;
  country: Country;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private location: Location,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(result => {
      if (result.length) {
        this.getCountry();
      }
    });
  }

  getCountry(): void {
    this.name = this.route.snapshot.paramMap.get('name') || '';
    this.countryService.getCountry(this.name).subscribe(result => {
      if (result) {
        this.country = result;
      } else {
        this.router.navigate([ApplicationRoute.PageNotFound]);
      }
    });
  }

  deleteCountry(): void {
    this.countryService.deleteCountry(this.name);
    this.snackbarService.success(this.name + ': deleted');
    this.location.back();
  }
}
