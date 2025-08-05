import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="empty-state">
      <mat-icon class="empty-icon">inbox</mat-icon>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-description">{{ description }}</p>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
      min-height: 300px;
    }

    .empty-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #ccc;
      margin-bottom: 1rem;
    }

    .empty-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: #666;
      margin: 0 0 0.5rem 0;
    }

    .empty-description {
      font-size: 1rem;
      color: #999;
      margin: 0;
      max-width: 400px;
      line-height: 1.5;
    }
  `]
})
export class EmptyStateComponent {
  @Input() title = 'No hay datos disponibles';
  @Input() description = 'No se encontraron registros para mostrar.';
}
