import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, combineLatest } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { map } from 'rxjs/operators';

// Shared imports
import {
  IngredienteService,
  NotificationService,
  LoadingService,
  AppInitService,
  Ingrediente,
  IngredienteDialogComponent,
  CardComponent,
  LoadingComponent,
  EmptyStateComponent,
  SkeletonComponent
} from '../../shared';

@Component({
  selector: 'app-ingredientes',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule, IngredienteDialogComponent, ButtonModule, DialogModule, CardComponent, LoadingComponent, EmptyStateComponent, SkeletonComponent],
  templateUrl: './ingredientes.component.html',
  standalone: true,
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {
  displayedColumns = ['nombre', 'unidad', 'valor', 'sitioCompra', 'imagen', 'creado'];
  ingredientes$!: Observable<Ingrediente[]>;
  shouldShowContent$!: Observable<boolean>;
  dialogVisible = false;
  ingredienteSeleccionado: Partial<Ingrediente> | null = null;

  constructor(
    private service: IngredienteService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private appInitService: AppInitService
  ) {}

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  ngOnInit(): void {
    this.ingredientes$ = this.service.ingredientes$;

    this.shouldShowContent$ = combineLatest([
      this.appInitService.isInitialized$,
      this.ingredientes$
    ]).pipe(
      map(([isInitialized, ingredientes]) => isInitialized && ingredientes !== null)
    );
  }

  abrirDialogo(): void {
    this.ingredienteSeleccionado = null;
    this.dialogVisible = true;
  }

  guardarIngrediente(ingrediente: Partial<Ingrediente>): void {
    const payload = {
      name: ingrediente.nombre,
      unit: ingrediente.unidad,
      unit_value: ingrediente.valor,
      purchase_place: ingrediente.sitioCompra,
      image_url: ingrediente.imagen?.trim() || 'https://via.placeholder.com/150'
    };

    this.service.crearIngrediente(payload as any).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.service.fetchIngredientes();
        this.notificationService.showSuccess('Ingrediente creado exitosamente');
      },
      error: (e) => {
        console.error('Error al crear ingrediente', e);
        this.notificationService.showError('Error al crear ingrediente: ' + (e.error?.message || e.message || 'Error desconocido'));
      }
    });
  }
}
