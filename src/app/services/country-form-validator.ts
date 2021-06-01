import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidationMessages } from '../enums/validation-messages';
import { Country } from '../interfaces/country';

export class CountryValidator {
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
    return control.value && isNaN(Number(control.value)) ? { invalidValue: ValidationMessages.Number } : null;
  }

  static positiveNumber(control: AbstractControl): ValidationErrors | null {
    return !CountryValidator.number(control) && control.value > 0
      ? null
      : { invalidValue: ValidationMessages.PositiveNumber };
  }

  static minNumber(minValue: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!CountryValidator.number(control) && control.value >= minValue) {
        return null;
      }

      return { invalidValue: ValidationMessages.MinValue + minValue };
    };
  }

  static maxNumber(maxValue: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!CountryValidator.number(control) && control.value <= maxValue) {
        return null;
      }

      return { invalidValue: ValidationMessages.MaxValue + maxValue };
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

  /*static nonEmptyList(control: AbstractControl): ValidationErrors | null {
    if (Array.isArray(control.value) && control.value.length > 0) {
      return null;
    }

    return { [ValidationType.NonEmptyList]: true };
  }

  static minListLength(minLength: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (Array.isArray(control.value) && control.value.length >= minLength) {
        return null;
      }

      return { [ValidationType.MinListLength]: { minLength } };
    };
  }

  static valueLength(length: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length === length) {
        return null;
      }

      return { [ValidationType.ValueLength]: { length } };
    };
  }

  static number(control: AbstractControl): ValidationErrors | null {
    return control.value && isNaN(Number(control.value)) ? { [ValidationType.Number]: true } : null;
  }

  static positiveNumber(control: AbstractControl): ValidationErrors | null {
    return !ApolloValidators.number(control) && control.value > 0 ? null : { [ValidationType.PositiveNumber]: true };
  }

  static notificationLimit(control: AbstractControl): ValidationErrors | null {
    return !control.value || (!ApolloValidators.number(control) && control.value > 0)
      ? null
      : { [ValidationType.PositiveNumber]: true };
  }

  static requiredWithTrim(control: AbstractControl): ValidationErrors | null {
    return control.value == null || String(control.value).trim().length === 0
      ? { [ValidationType.Required]: true }
      : null;
  }

  */
}
