import { Language } from '../enums/language.enum';

export interface Country {
  name: string;
  capital: string;
  area: number;
  population: number;
  currency: string;
  gdp: number;
  languages?: Language[];
}
