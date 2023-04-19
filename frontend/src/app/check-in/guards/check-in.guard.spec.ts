import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { CheckInGuard } from 'src/app/check-in/guards/check-in.guard';

describe('CheckInGuard', () => {
  let guard: CheckInGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CheckInGuard]
    });

    guard = TestBed.inject(CheckInGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false and navigate to `/booking` when user has a token', (): void => {
    spyOn(localStorage, 'getItem').and.returnValue('klm-token');

    const routerSpy = spyOn(router, 'navigate');
    const result: boolean = guard.canActivate();

    expect(routerSpy).toHaveBeenCalledWith(['/booking']);
    expect(result).toBe(false);
  });

  it('should not navigate to `/booking` and return true if user has no token', (): void => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const routerSpy = spyOn(router, 'navigate');
    const result: boolean = guard.canActivate();

    expect(routerSpy).not.toHaveBeenCalledWith(['/booking']);
    expect(result).toBe(true);
  });
});
