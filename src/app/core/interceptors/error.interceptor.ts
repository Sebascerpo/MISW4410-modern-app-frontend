import { HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

export function ErrorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const notificationService = inject(NotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Error desconocido';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        errorMessage = `Error ${error.status}: ${error.message}`;
        if (error.error && error.error.message) {
          errorMessage += ` - ${error.error.message}`;
        }
      }

      notificationService.showError(errorMessage);
      return throwError(() => error);
    })
  );
}
