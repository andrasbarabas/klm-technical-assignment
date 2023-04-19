import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { BookingGuard } from './booking.guard';

describe('BookingGuard', () => {
  let guard: BookingGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [BookingGuard]
    });

    guard = TestBed.inject(BookingGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when canActivate is called with a token', (): void => {
    spyOn(localStorage, 'getItem').and.returnValue('klm-token');

    const result: boolean = guard.canActivate();

    expect(result).toBe(true);
  });

  it('should navigate to `/` and return with false value', (): void => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const routerSpy = spyOn(router, 'navigate');
    const result: boolean = guard.canActivate();

    expect(routerSpy).toHaveBeenCalledWith(['/']);
    expect(result).toBe(false);
  });
});
