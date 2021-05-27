export enum Language {
  English = 'English',
  Russian = 'Russian',
  French = 'French',
  German = 'German',
  Spanish = 'Spanish',
  Portuguese = 'Portuguese',
  Chinese = 'Chinese',
  Arabic = 'Arabic',
  Hindi = 'Hindi',
  Italian = 'Italian',
};

export class Country {
  name: string = '';
  capital: string = '';
  area: number = 0;
  population: number = 0;
  currency: string = '';
  gdp: number = 0;
  languages: Language[] = []; 
}
 
export const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    capital: 'Moscow',
    area: 17098246,
    population: 144463451,
    currency: 'Russian Ruble',
    gdp: 1283162,
    languages: []
  },
  {
    name: 'Canada',
    capital: 'Ottawa',
    area: 9984670,
    population: 35151728,
    currency: 'Canadian Dollar',
    gdp: 159760,
    languages: [Language.English, Language.Russian]
  },
  {
    name: 'China',
    capital: 'Beijing',
    area: 9596961,
    population: 1403500365,
    currency: 'Renminbi (Yuan)',
    gdp: 11199145,
    languages: []
  },
  {
    name: 'United States',
    capital: 'Washington, D.C.',
    area: 9525067,
    population: 325365189,
    currency: 'United States Dollar',
    gdp: 18569100,
    languages: []
  },
  {
    name: 'Japan',
    capital: 'Tokyo',
    area: 377972,
    population: 12676200,
    currency: 'Yen',
    gdp: 4939384,
    languages: []
  }
];