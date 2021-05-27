import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { Country, Language } from '../../country-data';
import { CountryService } from '../../country.service';
 
@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  name: string;
  country!: Country;
  isChanging: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(): void {
    this.name = this.route.snapshot.paramMap.get('name')!;
    this.country = this.countryService.getCountry(this.name)!;
  }

  goBack(): void {
    this.location.back();
  }

  toggleChangingMode(): void {
    this.isChanging = !this.isChanging;
  }
}
