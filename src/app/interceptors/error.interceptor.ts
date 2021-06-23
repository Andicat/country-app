import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';

export const errorInterceptorMessage = 'Server error occurred';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!err.status || err.status >= 500) {
          this.snackbarService.error(errorInterceptorMessage);
        }

        return throwError(err);
      }),
    );
  }
}
