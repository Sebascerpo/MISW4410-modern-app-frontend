import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NotificationConfig {
  message: string;
  action?: string;
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action?: string, duration: number = 3000): void {
    this.showNotification({ message, action, duration, type: 'success' });
  }

  showError(message: string, action?: string, duration: number = 5000): void {
    this.showNotification({ message, action, duration, type: 'error' });
  }

  showInfo(message: string, action?: string, duration: number = 3000): void {
    this.showNotification({ message, action, duration, type: 'info' });
  }

  showWarning(message: string, action?: string, duration: number = 4000): void {
    this.showNotification({ message, action, duration, type: 'warning' });
  }

  private showNotification(config: NotificationConfig): void {
    const panelClass = this.getPanelClass(config.type);

    this.snackBar.open(config.message, config.action || 'Cerrar', {
      duration: config.duration,
      panelClass: panelClass,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  private getPanelClass(type?: string): string[] {
    switch (type) {
      case 'success':
        return ['success-snackbar'];
      case 'error':
        return ['error-snackbar'];
      case 'warning':
        return ['warning-snackbar'];
      case 'info':
        return ['info-snackbar'];
      default:
        return [];
    }
  }
}
