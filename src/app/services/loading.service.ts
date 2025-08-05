import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  show(): void {
    this.isLoadingSubject.next(true);
  }

  hide(): void {
    this.isLoadingSubject.next(false);
  }

  withLoading<T>(operation: Promise<T> | Observable<T>): Observable<T> {
    this.show();

    if (operation instanceof Promise) {
      return from(operation).pipe(
        finalize(() => this.hide())
      );
    } else {
      return operation.pipe(
        finalize(() => this.hide())
      );
    }
  }
}
