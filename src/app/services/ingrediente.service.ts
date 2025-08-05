import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, combineLatest } from 'rxjs';
import { Ingrediente } from '../interfaces/ingrediente.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, finalize, tap, filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';
import { LoadingService } from './loading.service';
import { AppInitService } from './app-init.service';
import { RealtimeService, RealtimeUpdate } from './realtime.service';

@Injectable({ providedIn: 'root' })
export class IngredienteService {
  private ingredientesSubject = new BehaviorSubject<Ingrediente[]>([]);
  ingredientes$: Observable<Ingrediente[]> = this.ingredientesSubject.asObservable();

  private API_URL = environment.apiUrl;
  private TOKEN = environment.apiToken;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private appInitService: AppInitService,
    private realtimeService: RealtimeService
  ) {
    this.fetchIngredientes();
    this.setupRealtimeUpdates();
  }

    fetchIngredientes(): void {
    const headers = this.getAuthHeaders();

    // Solo mostrar loading si la app ya está inicializada
    if (this.appInitService.isInitialized) {
      this.loadingService.show();
    }

    this.http.get<any[]>(this.API_URL, { headers }).pipe(
      map(data => data.map(item => this.mapIngrediente(item))),
      catchError(this.handleError.bind(this)),
      finalize(() => {
        if (this.appInitService.isInitialized) {
          this.loadingService.hide();
        }
      })
    ).subscribe({
      next: (ingredientes) => {
        this.ingredientesSubject.next(ingredientes);
        if (this.appInitService.isInitialized) {
          this.notificationService.showSuccess('Ingredientes cargados correctamente');
        }
      },
      error: (error) => {
        if (this.appInitService.isInitialized) {
          this.notificationService.showError('Error al cargar ingredientes: ' + this.getErrorMessage(error));
        }
      }
    });
  }

    crearIngrediente(ingrediente: Partial<Ingrediente>): Observable<Ingrediente> {
    const headers = this.getAuthHeaders();
    this.loadingService.show();

    return this.http.post<Ingrediente>(this.API_URL, ingrediente, { headers }).pipe(
      tap(response => {
        this.realtimeService.notifyLocalChange('CREATE', response);
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.loadingService.hide())
    );
  }

    private handleError(error: HttpErrorResponse): Observable<never> {
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

    if (this.appInitService.isInitialized) {
      this.notificationService.showError(errorMessage);
    }
    return throwError(() => new Error(errorMessage));
  }

  private getErrorMessage(error: any): string {
    if (error.error instanceof ErrorEvent) {
      return error.error.message;
    } else if (error.status) {
      return `Error ${error.status}: ${error.message}`;
    } else {
      return error.message || 'Error desconocido';
    }
  }

  private setupRealtimeUpdates(): void {
    this.realtimeService.getUpdates().pipe(
      filter(update => update !== null),
      tap(update => {
        if (update) {
          this.handleRealtimeUpdate(update);
        }
      })
    ).subscribe();
  }

  private handleRealtimeUpdate(update: RealtimeUpdate): void {
    const currentIngredientes = this.ingredientesSubject.value;

    switch (update.type) {
      case 'CREATE':
        const newIngrediente = this.mapIngrediente(update.data);
        this.ingredientesSubject.next([...currentIngredientes, newIngrediente]);
        this.notificationService.showSuccess('Nuevo ingrediente agregado en tiempo real');
        break;

      case 'UPDATE':
        const updatedIngrediente = this.mapIngrediente(update.data);
        const updatedList = currentIngredientes.map(item =>
          item.id === updatedIngrediente.id ? updatedIngrediente : item
        );
        this.ingredientesSubject.next(updatedList);
        this.notificationService.showInfo('Ingrediente actualizado en tiempo real');
        break;

      case 'DELETE':
        const filteredList = currentIngredientes.filter(item => item.id !== update.data.id);
        this.ingredientesSubject.next(filteredList);
        this.notificationService.showWarning('Ingrediente eliminado en tiempo real');
        break;
    }
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`
    });
  }

  private mapIngrediente(item: any): Ingrediente {
    return {
      id: item.id,
      nombre: item.name,
      unidad: item.unit,
      valor: item.unit_value,
      sitioCompra: item.purchase_place,
      imagen: item.image_url,
      creado: item.createdAt,
      actualizado: item.updatedAt
    };
  }
}
