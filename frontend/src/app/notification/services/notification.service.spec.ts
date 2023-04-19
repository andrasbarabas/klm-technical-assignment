import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationType } from 'src/app/notification/enums/notification-type.enum';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatSnackBar, NotificationService]
    });

    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar with a sample success message', () => {
    const message = 'You have successfully logged in!';

    spyOn(snackBar, 'open');

    service.showNotification(message, NotificationType.SUCCESS);

    expect(snackBar.open).toHaveBeenCalledWith(message, 'Close', { duration: 3000 });
  });

  it('should call MatSnackBar with a sample error message', () => {
    const message = 'An unexpected error occurred!';
    const duration = 30000;

    spyOn(snackBar, 'open');

    service.showNotification(message, NotificationType.ERROR);

    expect(snackBar.open).toHaveBeenCalledWith(message, 'Close', { duration });
  });
});
