import { ItinerarySegmentMarketingFlightOperatingFlightArrivalTerminal } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight-operating-flight-arrival-terminal.interface';
import { ItinerarySegmentMarketingFlightOperatingFlightCabin } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight-operating-flight-cabin.interface';
import { ItinerarySegmentMarketingFlightOperatingFlightEquipment } from 'src/app/itinerary/interfaces/itinerary-segment-marketing-flight-operating-flight-equipment.interface';

export interface ItinerarySegmentMarketingFlightOperatingFlight {
  arrivalTerminal: ItinerarySegmentMarketingFlightOperatingFlightArrivalTerminal;
  cabin: ItinerarySegmentMarketingFlightOperatingFlightCabin;
  checkInEnd: string;
  checkInStart: string;
  duration: string;
  equipment: ItinerarySegmentMarketingFlightOperatingFlightEquipment;
  localCheckInEnd: string;
  localCheckInStart: string;
  localScheduledArrival: string;
  localScheduledDeparture: string;
  scheduledArrival: string;
  scheduledDeparture: string;
}
