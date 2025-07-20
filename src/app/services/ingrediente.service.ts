import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingrediente } from '../interfaces/ingrediente.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IngredienteService {
  private ingredientesSubject = new BehaviorSubject<Ingrediente[]>([]);
  ingredientes$: Observable<Ingrediente[]> = this.ingredientesSubject.asObservable();

  private API_URL = environment.apiUrl;
  private TOKEN = environment.apiToken;

  constructor(private http: HttpClient) {
    this.fetchIngredientes();
  }

  fetchIngredientes() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`
    });

    this.http.get<any[]>(this.API_URL, { headers }).pipe(
      map(data => data.map(item => ({
        id: item.id,
        nombre: item.name,
        unidad: item.unit,
        valor: item.unit_value,
        sitioCompra: item.purchase_place,
        imagen: item.image_url,
        creado: item.createdAt,
        actualizado: item.updatedAt
      })))
    ).subscribe((ingredientes) => {
      this.ingredientesSubject.next(ingredientes);
    });
  }

  crearIngrediente(ingrediente: any): Observable<Ingrediente> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`
    });
    return this.http.post<Ingrediente>(this.API_URL, ingrediente, { headers });
  }
}
