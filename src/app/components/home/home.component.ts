import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { LocalStorageKey } from 'src/app/enums/local-storage-key.enum';
import { ViewMode } from 'src/app/enums/view-mode.enum';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ChartConfig } from '../chart/chart.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  populatedCountries: Country[] = [];
  populatedCountriesChartData: typeof ChartConfig;
  largestCountries: Country[] = [];
  largestCountriesChartData: typeof ChartConfig;
  multiLanguagesCountries: Country[] = [];
  itemsCount: number = 8;
  viewMode: ViewMode = this.initialViewMode;
  viewModes: ViewMode[] = [ViewMode.Charts, ViewMode.Cards];

  constructor(private countryService: CountryService, private localStorageService: LocalStorageService) {}

  get chartsView(): boolean {
    return this.viewMode === ViewMode.Charts;
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(result => {
      if (result.length > 0) {
        this.countries = result;
        this.setPopulatedCountries(this.itemsCount);
        this.setLargestCountries(this.itemsCount);
        this.setMultiLanguagesCountries(this.itemsCount);
      }
    });
  }

  setPopulatedCountries(count: number): void {
    this.countryService.getPopulatedCountries(count).subscribe(result => {
      this.populatedCountries = result;
      this.populatedCountriesChartData = cloneDeep(ChartConfig);
      this.populatedCountriesChartData.chart.type = 'column';
      this.populatedCountriesChartData.header = 'Populated countries';
      this.populatedCountriesChartData.series = [
        {
          name: 'Population',
          data: this.populatedCountries.map(country => {
            return [country.name, country.population / 1000000];
          }),
        },
      ];
      this.populatedCountriesChartData.title.text = 'Most populated countries';
      this.populatedCountriesChartData.xAxis.title.text = 'Countries';
      this.populatedCountriesChartData.yAxis.title.text = 'Population, millions';
      this.populatedCountriesChartData.tooltip.pointFormat = 'Population: <b>{point.y:.1f} millions</b>';
      this.populatedCountriesChartData.legend = false;
    });
  }

  setLargestCountries(count: number): void {
    this.countryService.getLargestCountries(count).subscribe(result => {
      this.largestCountries = result;
      const data = this.largestCountries.map(country => {
        return { name: country.name, y: country.area };
      });
      const otherArea =
        this.countries.reduce((area, country) => {
          return area + country.area;
        }, 0) -
        this.largestCountries.reduce((area, country) => {
          return area + country.area;
        }, 0);

      data.push({ name: 'Others', y: otherArea });

      this.largestCountriesChartData = cloneDeep(ChartConfig);
      this.largestCountriesChartData.chart.type = 'pie';
      this.largestCountriesChartData.header = 'Largest countries';
      this.largestCountriesChartData.series = [{ name: 'Area', data: data }];
      this.largestCountriesChartData.title.text = 'The largest countries';
      this.largestCountriesChartData.xAxis.title.text = 'Countries';
      this.largestCountriesChartData.yAxis.title.text = 'Area, km2';
      this.largestCountriesChartData.tooltip.pointFormat = '{series.name}: <b>{point.percentage:.1f}%</b>';
    });
  }

  setMultiLanguagesCountries(count: number): void {
    this.countryService.getMultiLanguagesCountries(count).subscribe(result => (this.multiLanguagesCountries = result));
  }

  modeChanged() {
    this.localStorageService.setItem(LocalStorageKey.ViewModeHome, this.viewMode);
  }

  private get initialViewMode(): ViewMode {
    return <ViewMode>this.localStorageService.getItem(LocalStorageKey.ViewModeHome) || ViewMode.Charts;
  }
}
