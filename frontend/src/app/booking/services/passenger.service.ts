import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

import { Passenger } from 'src/app/booking/interfaces/passenger.interface';

interface PassengersQueryResult {
  passengers: Passenger[];
}

@Injectable({ providedIn: 'root' })
export class PassengerService {
  constructor(private readonly apollo: Apollo) {}

  getPassengers(): Observable<Passenger[]> {
    return this.apollo
      .watchQuery<PassengersQueryResult>({
        query: gql`
          query PassengersQuery {
            passengers {
              firstName
              lastName
              title
            }
          }
        `,
        fetchPolicy: 'no-cache'
      })
      .valueChanges.pipe(
        map((result: FetchResult<PassengersQueryResult>): Passenger[] => (result.data as PassengersQueryResult).passengers)
      );
  }
}
