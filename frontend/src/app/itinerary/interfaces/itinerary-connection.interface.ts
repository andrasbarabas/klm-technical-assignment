import { ItineraryConnectionLocation } from 'src/app/itinerary/interfaces/itinerary-connection-location.interface';

export interface ItinerayConnection {
  destination: ItineraryConnectionLocation;
  id: number;
  origin: ItineraryConnectionLocation;
}
