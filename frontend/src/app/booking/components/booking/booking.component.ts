import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { BookingData } from 'src/app/booking/interfaces/booking-data.interface';
import { BookingService } from 'src/app/booking/services/booking.service';
import { FlightStatus } from 'src/app/booking/enums/flight-status.enum';
import { ItineraryType } from 'src/app/itinerary/enums/itinerary-type.enum';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { NotificationType } from 'src/app/notification/enums/notification-type.enum';
import { PassengerDialogComponent } from 'src/app/booking/components/passenger-dialog/passenger-dialog.component';
import { ItineraryInfo } from 'src/app/itinerary/interfaces/itinerary-info.interface';
import { ItinerarySegment } from 'src/app/itinerary/interfaces/itinerary-segment.interface';
import { ItineraryService } from 'src/app/itinerary/services/itinerary.service';
import { ItinerarySegmentService } from 'src/app/itinerary/services/itinerary-segment.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule],
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  bookingData: BookingData | undefined;
  itineraryInfo: ItineraryInfo | undefined;
  flightStatus: typeof FlightStatus = FlightStatus;
  itineraryType: typeof ItineraryType = ItineraryType;
  segments: ItinerarySegment[] | undefined;

  constructor(
    private readonly bookingService: BookingService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly itinerarySegmentService: ItinerarySegmentService,
    private readonly itineraryService: ItineraryService,
    private readonly matDialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.queryBookingData();
    this.queryItineraryInfo();
  }

  onLogout(): void {
    this.clearToken();

    this.notificationService.showNotification('You have successfully logged out!', NotificationType.SUCCESS);
    this.router.navigate(['/']);
  }

  onQueryItinerarySegments(connectionId: number): void {
    this.itinerarySegmentService.getSegments(connectionId).subscribe({
      next: (response: ItinerarySegment[]): void => {
        this.segments = response;
        this.changeDetectorRef.detectChanges();
      },
      error: (e: HttpErrorResponse): void => {
        this.notificationService.showNotification(e.message, NotificationType.ERROR);
      }
    });
  }

  onShowPassengersDialog(): void {
    this.matDialog.open(PassengerDialogComponent, {
      panelClass: 'dialog'
    });
  }

  private clearToken(): void {
    localStorage.removeItem('klm-token');
  }

  private queryBookingData(): void {
    this.bookingService.getBookingData().subscribe({
      next: (response: BookingData): void => {
        this.bookingData = response;
        this.changeDetectorRef.detectChanges();
      },
      error: (e: HttpErrorResponse): void => {
        this.notificationService.showNotification(e.message, NotificationType.ERROR);
      }
    });
  }

  private queryItineraryInfo(): void {
    this.itineraryService.getItineraryInfo().subscribe({
      next: (response: ItineraryInfo): void => {
        this.itineraryInfo = response;
        this.changeDetectorRef.detectChanges();
      },
      error: (e: HttpErrorResponse): void => {
        this.notificationService.showNotification(e.message, NotificationType.ERROR);
      }
    });
  }
}
