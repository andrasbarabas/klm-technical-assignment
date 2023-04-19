import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BookingDataQueryResult } from 'src/app/booking/interfaces/booking-data-query-result.interface';
import { BookingData } from 'src/app/booking/interfaces/booking-data.interface';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private readonly apollo: Apollo) {}

  getBookingData(): Observable<BookingData> {
    return this.apollo
      .watchQuery<BookingDataQueryResult>({
        query: gql`
          query {
            bookingData {
              bookingCode
              email
            }
          }
        `,
        fetchPolicy: 'no-cache'
      })
      .valueChanges.pipe(
        map((result: FetchResult<BookingDataQueryResult>): BookingData => (result.data as BookingDataQueryResult).bookingData)
      );
  }
}
