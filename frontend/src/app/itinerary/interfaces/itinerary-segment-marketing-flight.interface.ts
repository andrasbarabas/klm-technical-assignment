import { ItinerarySegmentMarketingFlightCarrier } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight-carrier.interface';
import { ItinerarySegmentMarketingFlightOperatingFlight } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight-operating-flight.interface';
import { ItinerarySegmentMarketingFlightSellingClass } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight-selling-class.interface';
import { ItinerarySegmentMarketingFlightStatus } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight-status.interface';

export interface ItinerarySegmentMarketingFlight {
  carrier: ItinerarySegmentMarketingFlightCarrier;
  number: string;
  numberOfStops: number;
  operatingFlight: ItinerarySegmentMarketingFlightOperatingFlight;
  sellingClass: ItinerarySegmentMarketingFlightSellingClass;
  status: ItinerarySegmentMarketingFlightStatus;
}
