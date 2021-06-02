import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  private readonly SNACK_DURATION: number = 3000;
  private readonly SNACK_CLASSES: {
    [key: string]: string;
  } = {
    error: 'bg-danger',
    success: 'bg-success',
    warning: 'bg-warning',
  };
  
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.openSnackBar(message, 'success');
  }

  warning(message: string) {
    this.openSnackBar(message, 'warning');
  }

  error(message: string) {
    this.openSnackBar(message, 'error');
  }

  openSnackBar(message: string, status: string): void {
    this.snackBar.open(message,'',
    {
      duration: this.SNACK_DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [this.SNACK_CLASSES[status]],
    });
  }
}
