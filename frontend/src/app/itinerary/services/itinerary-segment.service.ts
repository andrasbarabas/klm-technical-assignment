import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { ItinerarySegmentQueryResult } from 'src/app/itinerary/interfaces/itinerary-segment-query-result.interface';
import { ItinerarySegment } from 'src/app/itinerary/interfaces/itinerary-segment.interface';

@Injectable({ providedIn: 'root' })
export class ItinerarySegmentService {
  constructor(private readonly apollo: Apollo) {}

  getSegments(connectionId: number): Observable<ItinerarySegment[]> {
    return this.apollo
      .watchQuery<ItinerarySegmentQueryResult>({
        query: gql`
          query SegmentsQuery($connectionId: Int) {
            segments(connectionId: $connectionId) {
              arriveOn {
                IATACode
                city {
                  country {
                    code
                    name
                  }
                  name
                }
              }
              departFrom {
                IATACode
                city {
                  country {
                    code
                    name
                  }
                  name
                }
              }
              id
              marketingFlight {
                carrier {
                  code
                  name
                }
                number
                numberOfStops
                operatingFlight {
                  arrivalTerminal {
                    name
                  }
                  cabin {
                    name
                  }
                  checkInEnd
                  checkInStart
                  duration
                  equipment {
                    name
                  }
                  localCheckInEnd
                  localCheckInStart
                  localScheduledArrival
                  localScheduledDeparture
                  scheduledArrival
                  scheduledDeparture
                }
                sellingClass {
                  code
                }
                status {
                  code
                  name
                }
              }
            }
          }
        `,
        variables: {
          connectionId
        },
        fetchPolicy: 'no-cache'
      })
      .valueChanges.pipe(
        map((result: FetchResult<ItinerarySegmentQueryResult>): ItinerarySegment[] => (result.data as ItinerarySegmentQueryResult).segments)
      );
  }
}
