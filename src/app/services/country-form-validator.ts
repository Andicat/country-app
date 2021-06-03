import { DecimalPipe } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidationMessages } from '../enums/validation-messages';
import { Country } from '../interfaces/country';

export class CountryValidator {
  static decimalPipe: DecimalPipe = new DecimalPipe('en-us');

  static requiredWithTrim(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || String(control.value).trim().length === 0) {
      return { invalidValue: ValidationMessages.Required };
    }

    return null;
  }

  static unique(array: Country[], name: keyof Country): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl) => {
      const notUnique = array.find(item => item[name] === control.value);

      if (notUnique) {
        return { invalidValue: ValidationMessages.Unique };
      }

      return null;
    };
  }

  static number(control: AbstractControl): ValidationErrors | null {
    const value = CountryValidator.toNumber(control);

    return value && isNaN(Number(value)) ? { invalidValue: ValidationMessages.Number } : null;
  }

  static positiveNumber(control: AbstractControl): ValidationErrors | null {
    const value = CountryValidator.toNumber(control);

    return !CountryValidator.number(control) && value > 0 ? null : { invalidValue: ValidationMessages.PositiveNumber };
  }

  static minNumber(minValue: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = this.toNumber(control);

      if (!CountryValidator.number(control) && value >= minValue) {
        return null;
      }

      return { invalidValue: ValidationMessages.MinValue + minValue };
    };
  }

  static maxNumber(maxValue: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = this.toNumber(control);

      if (!CountryValidator.number(control) && value <= maxValue) {
        return null;
      }

      return { invalidValue: `${ValidationMessages.MaxValue} ${this.decimalPipe.transform(maxValue)}` };
    };
  }

  static words(control: AbstractControl): ValidationErrors | null {
    const pattern = `^[a-zA-Z,. ]+$`;
    const regex = new RegExp(pattern);

    if (regex.test(control.value)) {
      return null;
    }

    return { invalidValue: ValidationMessages.Words };
  }

  static toNumber(control: AbstractControl) {
    return control.value && !Number(control.value) ? control.value.replace(/\D/g, '') : control.value;
  }
}
