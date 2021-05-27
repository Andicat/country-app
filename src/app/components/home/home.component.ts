import { Component, OnInit } from '@angular/core';

import { Country } from '../../country-data';
import { CountryService } from '../../country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  populatedCountries: Country[] = [];
  largestCountries: Country[] = [];
  gdpCountries: Country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.setPopulatedCountries();
    this.setLargestCountries();
    this.setGDPCountries();
  }

  setPopulatedCountries(): void {
    this.populatedCountries = this.countryService.getPopulatedCountries();
  }

  setLargestCountries(): void {
    this.largestCountries = this.countryService.getLargestCountries();
  }

  setGDPCountries(): void {
    this.gdpCountries = this.countryService.getGDPCountries();
  }
}
