import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  private isInitializedSubject = new BehaviorSubject<boolean>(false);
  isInitialized$ = this.isInitializedSubject.asObservable();

  constructor() {
    setTimeout(() => {
      this.isInitializedSubject.next(true);
    }, 100);
  }

  setInitialized(): void {
    this.isInitializedSubject.next(true);
  }

  get isInitialized(): boolean {
    return this.isInitializedSubject.value;
  }
}
