import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import { url } from '../utils/api.mjs';

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const CityType = new GraphQLObjectType({
  name: 'City',
  fields: () => ({
    IATACode: { type: GraphQLString },
    country: { type: CountryType },
    name: { type: GraphQLString }
  })
});

const AirportType = new GraphQLObjectType({
  name: 'Airport',
  fields: () => ({
    IATACode: { type: GraphQLString },
    city: { type: CityType },
    name: { type: GraphQLString }
  })
});

const ConnectionType = new GraphQLObjectType({
  name: 'Connection',
  fields: () => ({
    destination: { type: AirportType },
    id: { type: GraphQLInt },
    origin: { type: AirportType }
  })
});

const ItineraryInfoType = new GraphQLObjectType({
  name: 'ItineraryInfo',
  fields: () => ({
    connections: { type: new GraphQLList(ConnectionType) },
    type: { type: GraphQLString }
  })
});

const ItineraryInfoQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    itineraryInfo: {
      type: new GraphQLNonNull(ItineraryInfoType),
      resolve: async () => {
        const response = await fetch(url);
        const data = await response.json();

        return { connections: data.itinerary.connections, type: data.itinerary.type };
      }
    }
  }
});

export const itineraryInfoSchema = new GraphQLSchema({
  query: ItineraryInfoQuery
});
