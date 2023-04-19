import { ItinerarySegmentLocationCountry } from 'src/app/itinerary/interfaces/itinerary-segment-location-country.interface';

export interface ItinerarySegmentLocationCity {
  country: ItinerarySegmentLocationCountry;
  name: string;
}
