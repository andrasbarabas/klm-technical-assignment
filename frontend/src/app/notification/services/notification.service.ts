import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from 'src/app/notification/enums/notification-type.enum';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  showNotification(message: string, notificationType: NotificationType): void {
    this.snackBar.open(message, 'Close', {
      duration: notificationType === NotificationType.SUCCESS ? 3000 : 30000
    });
  }
}
