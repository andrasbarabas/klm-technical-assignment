import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { ItineraryInfoQueryResult } from 'src/app/itinerary/interfaces/itinerary-info-query-result.interface';
import { ItineraryInfo } from 'src/app/itinerary/interfaces/itinerary-info.interface';

@Injectable({ providedIn: 'root' })
export class ItineraryService {
  constructor(private readonly apollo: Apollo) {}

  getItineraryInfo(): Observable<ItineraryInfo> {
    return this.apollo
      .watchQuery<ItineraryInfoQueryResult>({
        query: gql`
          query {
            itineraryInfo {
              connections {
                destination {
                  IATACode
                }
                id
                origin {
                  IATACode
                }
              }
              type
            }
          }
        `,
        fetchPolicy: 'no-cache'
      })
      .valueChanges.pipe(
        map((result: FetchResult<ItineraryInfoQueryResult>): ItineraryInfo => (result.data as ItineraryInfoQueryResult).itineraryInfo)
      );
  }
}
