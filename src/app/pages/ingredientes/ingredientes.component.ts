import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../interfaces/ingrediente.model';
import { IngredienteDialogComponent } from '../../components/ingrediente-dialog/ingrediente-dialog.component';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-ingredientes',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, IngredienteDialogComponent, ButtonModule, DialogModule, CardComponent],
  templateUrl: './ingredientes.component.html',
  standalone: true,
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {
  displayedColumns = ['nombre', 'unidad', 'valor', 'sitioCompra', 'imagen', 'creado'];
  ingredientes$!: Observable<Ingrediente[]>;
  dialogVisible = false;
  ingredienteSeleccionado: any = null;
  visible = false;

  openDialog() {
    this.ingredienteSeleccionado = null;
    this.dialogVisible = true;
    this.visible = true;
  }

  guardarIngrediente(ingrediente: any) {
    const payload = {
      name: ingrediente.nombre,
      unit: ingrediente.unidad,
      unit_value: ingrediente.valor,
      purchase_place: ingrediente.sitioCompra,
      image_url: ingrediente.imagen?.trim() || 'https://via.placeholder.com/150'
    };

    this.service.crearIngrediente(payload).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.service.fetchIngredientes();
      },
      error: (e) => {
        console.error('Error al crear ingrediente', e);
        if (e.error) {
          console.error('Detalles backend:', e.error);
        }
      }
    });
  }
  constructor(
    private service: IngredienteService,
  ) { }

  ngOnInit() {
    this.ingredientes$ = this.service.ingredientes$;
  }

  agregar() {
    this.ingredienteSeleccionado = null;
    this.dialogVisible = true;
  }


}
