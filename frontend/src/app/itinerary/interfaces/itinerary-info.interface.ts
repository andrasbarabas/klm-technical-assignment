import { ItineraryType } from 'src/app/itinerary/enums/itinerary-type.enum';
import { ItinerayConnection } from 'src/app/itinerary/interfaces/itinerary-connection.interface';

export interface ItineraryInfo {
  connections: ItinerayConnection[];
  type: ItineraryType;
}
