import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface RealtimeUpdate {
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnectedSubject.asObservable();

  private updateSubject = new BehaviorSubject<RealtimeUpdate | null>(null);
  updates$ = this.updateSubject.asObservable();

  private pollingInterval = 3000; // 3 segundos
  private lastUpdateTime = new Date().toISOString();

  constructor(private http: HttpClient) {
    this.startPolling();
  }

  private startPolling(): void {
    interval(this.pollingInterval).pipe(
      switchMap(() => this.checkForUpdates()),
      catchError(error => {
        console.error('Error en polling:', error);
        return [];
      })
    ).subscribe();
  }

  private checkForUpdates(): Observable<any> {
    const url = `${environment.apiUrl}/changes?since=${this.lastUpdateTime}`;
    return this.http.get<any[]>(url).pipe(
      tap(updates => {
        if (updates && updates.length > 0) {
          this.lastUpdateTime = new Date().toISOString();
          updates.forEach(update => {
            this.updateSubject.next(update);
          });
          this.isConnectedSubject.next(true);
        }
      })
    );
  }

  simulateUpdate(type: 'CREATE' | 'UPDATE' | 'DELETE', data: any): void {
    const update: RealtimeUpdate = {
      type,
      data,
      timestamp: new Date().toISOString()
    };
    this.updateSubject.next(update);
  }

  notifyLocalChange(type: 'CREATE' | 'UPDATE' | 'DELETE', data: any): void {
    this.simulateUpdate(type, data);
  }

  getConnectionStatus(): Observable<boolean> {
    return this.isConnected$;
  }

  getUpdates(): Observable<RealtimeUpdate | null> {
    return this.updates$;
  }


}
