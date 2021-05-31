import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
 
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  name: string;
  country: Country;
  
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(): void {
    this.name = this.route.snapshot.paramMap.get('name')||'';
    this.country = this.countryService.getCountry(this.name)!;
  }
}
