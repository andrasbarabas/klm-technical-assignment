import { ItinerarySegmentLocationCity } from 'src/app/itinerary/interfaces/itinerary-segment-location-city.interface';

export interface ItinerarySegmentLocation {
  IATACode: string;
  city: ItinerarySegmentLocationCity;
}
