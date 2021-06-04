import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  populatedCountries: Country[] = [];
  largestCountries: Country[] = [];
  gdpCountries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(() => {
      this.setPopulatedCountries();
      this.setLargestCountries();
      this.setGDPCountries();
    });
  }

  setPopulatedCountries(): void {
    this.countryService.getPopulatedCountries().subscribe(result => (this.populatedCountries = result));
  }

  setLargestCountries(): void {
    this.countryService.getLargestCountries().subscribe(result => (this.largestCountries = result));
  }

  setGDPCountries(): void {
    this.countryService.getBestGDPCountries().subscribe(result => (this.gdpCountries = result));
  }
}
