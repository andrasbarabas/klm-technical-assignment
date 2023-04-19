import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CheckInGuard {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    const isCheckedIn = !!localStorage.getItem('klm-token');

    if (isCheckedIn) {
      this.router.navigate(['/booking']);
    }

    return !isCheckedIn;
  }
}
