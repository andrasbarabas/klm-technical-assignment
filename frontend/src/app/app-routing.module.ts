import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingComponent } from 'src/app/booking/components/booking/booking.component';
import { BookingGuard } from 'src/app/booking/guards/booking.guard';
import { CheckInComponent } from 'src/app/check-in/components/check-in/check-in.component';
import { CheckInGuard } from 'src/app/check-in/guards/check-in.guard';
import { LayoutComponent } from 'src/app/layout/components/layout/layout.component';

const routes: Routes = [
  {
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'check-in'
      },
      {
        component: BookingComponent,
        canActivate: [() => inject(BookingGuard).canActivate()],
        data: {
          title: 'Booking'
        },
        path: 'booking'
      },
      {
        component: CheckInComponent,
        canActivate: [() => inject(CheckInGuard).canActivate()],
        data: {
          title: 'Check-in'
        },
        path: 'check-in'
      }
    ],
    component: LayoutComponent,
    path: ''
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
