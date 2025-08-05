import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-container" *ngIf="isLoading">
      <div class="skeleton-header">
        <div class="skeleton-title"></div>
        <div class="skeleton-divider"></div>
      </div>

      <div class="skeleton-table">
        <div class="skeleton-row" *ngFor="let item of [1,2,3,4,5]">
          <div class="skeleton-cell"></div>
          <div class="skeleton-cell"></div>
          <div class="skeleton-cell"></div>
          <div class="skeleton-cell"></div>
          <div class="skeleton-cell"></div>
          <div class="skeleton-cell"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-container {
      padding: 1rem;
    }

    .skeleton-header {
      margin-bottom: 2rem;
    }

    .skeleton-title {
      height: 2rem;
      width: 60%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .skeleton-divider {
      height: 4px;
      width: 80px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 2px;
    }

    .skeleton-table {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .skeleton-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 2fr 1fr 1.5fr;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .skeleton-row:first-child {
      background-color: #f5f5f5;
      font-weight: bold;
    }

    .skeleton-cell {
      height: 1rem;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 2px;
    }

    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `]
})
export class SkeletonComponent {
  @Input() isLoading = false;
}
