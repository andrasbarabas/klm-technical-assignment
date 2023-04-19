import { ItinerarySegmentLocation } from 'src/app/itinerary/interfaces/itinerary-segment-location.interface';
import { ItinerarySegmentMarketingFlight } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight.interface';

export interface ItinerarySegment {
  arriveOn: ItinerarySegmentLocation;
  departFrom: ItinerarySegmentLocation;
  id: number;
  marketingFlight: ItinerarySegmentMarketingFlight;
}
