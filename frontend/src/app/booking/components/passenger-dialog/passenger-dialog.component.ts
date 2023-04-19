import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Passenger } from 'src/app/booking/interfaces/passenger.interface';
import { PassengerService } from 'src/app/booking/services/passenger.service';
import { NotificationType } from 'src/app/notification/enums/notification-type.enum';
import { NotificationService } from 'src/app/notification/services/notification.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatDividerModule, MatProgressSpinnerModule],
  selector: 'app-passenger-dialog',
  standalone: true,
  templateUrl: './passenger-dialog.component.html'
})
export class PassengerDialogComponent implements OnInit {
  passengers: Passenger[] | undefined;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    public readonly dialogRef: MatDialogRef<PassengerDialogComponent>,
    private readonly notificationService: NotificationService,
    private readonly passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    this.queryPassengers();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private queryPassengers(): void {
    this.passengerService.getPassengers().subscribe({
      next: (response: Passenger[]): void => {
        this.passengers = response;
        this.changeDetectorRef.detectChanges();
      },
      error: (e: HttpErrorResponse): void => {
        this.dialogRef.close();

        this.notificationService.showNotification(e.message, NotificationType.ERROR);
      }
    });
  }
}
