import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CheckInRequest } from 'src/app/check-in/interfaces/check-in-request.interface';
import { CheckInResponse } from 'src/app/check-in/interfaces/check-in-response.interface';
import { CheckInService } from 'src/app/check-in/services/check-in.service';
import { NotificationType } from 'src/app/notification/enums/notification-type.enum';
import { NotificationService } from 'src/app/notification/services/notification.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  selector: 'app-check-in',
  standalone: true,
  templateUrl: './check-in.component.html'
})
export class CheckInComponent {
  checkInForm: FormGroup = this.formBuilder.group({
    bookingCode: [null, [Validators.minLength(5), Validators.pattern('^[a-zA-Z2-9]+$'), Validators.required]],
    familyName: [null, [Validators.minLength(2), Validators.required]]
  });

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly checkInService: CheckInService,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    if (this.checkInForm.valid) {
      this.checkIn(this.checkInForm.value as CheckInRequest);
    }
  }

  private handleCheckInErrors(e: HttpErrorResponse): void {
    if (e.status === HttpStatusCode.Unauthorized) {
      this.setInvalidCredentialErrors();
    } else {
      this.notificationService.showNotification('An unexpected error occurred!', NotificationType.ERROR);
    }
  }

  private handleSuccessfulCheckIn(checkInResponse: CheckInResponse): void {
    localStorage.setItem('klm-token', checkInResponse.token);

    this.notificationService.showNotification('You have successfully logged in!', NotificationType.SUCCESS);

    this.router.navigate(['/booking']);
  }

  private checkIn(checkInRequest: CheckInRequest): void {
    this.checkInService.checkIn(checkInRequest).subscribe({
      next: (checkInResponse: CheckInResponse) => {
        this.handleSuccessfulCheckIn(checkInResponse);
      },
      error: (e: HttpErrorResponse) => {
        this.handleCheckInErrors(e);
      }
    });
  }

  private setInvalidCredentialErrors(): void {
    this.checkInForm.controls['bookingCode'].setErrors({ invalidCredentials: true });
    this.checkInForm.controls['familyName'].setErrors({ invalidCredentials: true });

    this.changeDetectorRef.detectChanges();
  }
}
