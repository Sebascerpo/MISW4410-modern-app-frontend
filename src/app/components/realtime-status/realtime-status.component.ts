import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RealtimeService } from '../../services/realtime.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-realtime-status',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="realtime-status" *ngIf="isConnected$ | async">
      <mat-icon class="status-icon connected">wifi</mat-icon>
      <span class="status-text">Tiempo real activo</span>
    </div>
    <div class="realtime-status" *ngIf="!(isConnected$ | async)">
      <mat-icon class="status-icon disconnected">wifi_off</mat-icon>
      <span class="status-text">Sin conexión en tiempo real</span>
    </div>
  `,
  styles: [`
    .realtime-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .status-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .status-icon.connected {
      color: #4caf50;
    }

    .status-icon.disconnected {
      color: #f44336;
    }

    .status-text {
      color: #666;
      font-weight: 500;
    }
  `]
})
export class RealtimeStatusComponent implements OnInit {
  isConnected$!: Observable<boolean>;

  constructor(private realtimeService: RealtimeService) {}

  ngOnInit(): void {
    this.isConnected$ = this.realtimeService.getConnectionStatus();
  }
}
