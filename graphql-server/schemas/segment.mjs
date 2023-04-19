import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import { url } from '../utils/api.mjs';

const SegmentMarketingFlightCarrierType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightCarrierType',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const SegmentMarketingFlightStatusType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightStatusType',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const SegmentMarketingFlightSellingClassType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightSellingClassType',
  fields: () => ({
    code: { type: GraphQLString }
  })
});

const SegmentMarketingFlightOperatingFlightArrivalTerminalType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightOperatingFlightArrivalTerminalType',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

const SegmentMarketingFlightOperatingFlightCabinType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightOperatingFlightCabinType',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

const SegmentMarketingFlightOperatingFlightEquipmentType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightOperatingFlightEquipmentType',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

const SegmentMarketingFlightOperatingFlightType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightOperatingFlightType',
  fields: () => ({
    duration: { type: GraphQLString },
    checkInStart: { type: GraphQLString },
    localCheckInStart: { type: GraphQLString },
    checkInEnd: { type: GraphQLString },
    localCheckInEnd: { type: GraphQLString },
    scheduledArrival: { type: GraphQLString },
    localScheduledArrival: { type: GraphQLString },
    scheduledDeparture: { type: GraphQLString },
    localScheduledDeparture: { type: GraphQLString },
    arrivalTerminal: { type: SegmentMarketingFlightOperatingFlightArrivalTerminalType },
    cabin: { type: SegmentMarketingFlightOperatingFlightCabinType },
    equipment: { type: SegmentMarketingFlightOperatingFlightEquipmentType }
  })
});

const SegmentMarketingFlightType = new GraphQLObjectType({
  name: 'SegmentMarketingFlightType',
  fields: () => ({
    carrier: { type: SegmentMarketingFlightCarrierType },
    number: { type: GraphQLString },
    numberOfStops: { type: GraphQLInt },
    operatingFlight: { type: SegmentMarketingFlightOperatingFlightType },
    sellingClass: { type: SegmentMarketingFlightSellingClassType },
    status: { type: SegmentMarketingFlightStatusType }
  })
});

const SegmentLocationCountryType = new GraphQLObjectType({
  name: 'SegmentLocationCountryType',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const SegmentLocationCityType = new GraphQLObjectType({
  name: 'SegmentLocationCityType',
  fields: () => ({
    country: { type: SegmentLocationCountryType },
    name: { type: GraphQLString }
  })
});

const SegmentLocationType = new GraphQLObjectType({
  name: 'SegmentLocationType',
  fields: () => ({
    IATACode: { type: GraphQLString },
    city: { type: SegmentLocationCityType }
  })
});

const SegmentType = new GraphQLObjectType({
  name: 'SegmentType',
  fields: () => ({
    arriveOn: { type: SegmentLocationType },
    departFrom: { type: SegmentLocationType },
    id: { type: GraphQLInt },
    marketingFlight: { type: SegmentMarketingFlightType }
  })
});

const SegmentsQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    segments: {
      args: {
        connectionId: { type: GraphQLInt }
      },
      type: new GraphQLNonNull(new GraphQLList(SegmentType)),
      resolve: async (parent, args) => {
        const response = await fetch(url);
        const data = await response.json();
        const connection = data.itinerary.connections.find((c) => c.id === args.connectionId);

        return connection.segments.map((s) => {
          const segment = {
            arriveOn: {
              IATACode: s.arriveOn.IATACode,
              city: {
                country: {
                  code: s.arriveOn.city.country.code,
                  name: s.arriveOn.city.country.name
                },
                name: s.arriveOn.city.name
              }
            },
            departFrom: {
              IATACode: s.departFrom.IATACode,
              city: {
                country: {
                  code: s.departFrom.city.country.code,
                  name: s.departFrom.city.country.name
                },
                name: s.departFrom.city.name
              }
            },
            id: s.id,
            marketingFlight: {
              number: s.marketingFlight.number,
              carrier: {
                code: s.marketingFlight.carrier.code,
                name: s.marketingFlight.carrier.name
              },
              status: {
                code: s.marketingFlight.status.code,
                name: s.marketingFlight.status.name
              },
              numberOfStops: s.marketingFlight.numberOfStops,
              sellingClass: {
                code: s.marketingFlight.sellingClass.code
              },
              operatingFlight: {
                duration: s.marketingFlight.operatingFlight.duration,
                checkInStart: s.marketingFlight.operatingFlight.checkInStart,
                localCheckInStart: s.marketingFlight.operatingFlight.localCheckInStart,
                checkInEnd: s.marketingFlight.operatingFlight.checkInEnd,
                localCheckInEnd: s.marketingFlight.operatingFlight.localCheckInEnd,
                scheduledArrival: s.marketingFlight.operatingFlight.scheduledArrival,
                localScheduledArrival: s.marketingFlight.operatingFlight.localScheduledArrival,
                scheduledDeparture: s.marketingFlight.operatingFlight.scheduledDeparture,
                localScheduledDeparture: s.marketingFlight.operatingFlight.localScheduledDeparture,
                arrivalTerminal: {
                  name: s.marketingFlight.operatingFlight.arrivalTerminal.name
                },
                cabin: {
                  name: s.marketingFlight.operatingFlight.cabin.name
                },
                equipment: {
                  name: s.marketingFlight.operatingFlight.equipment.name
                }
              }
            }
          };

          return segment;
        });
      }
    }
  }
});

export const segmentSchema = new GraphQLSchema({
  query: SegmentsQuery
});
