import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import { url } from '../utils/api.mjs';

const PassengerType = new GraphQLObjectType({
  name: 'Passenger',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    title: {
      resolve: (parent) => parent.title.name,
      type: GraphQLString
    }
  }
});

const PassengersQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    passengers: {
      type: new GraphQLNonNull(new GraphQLList(PassengerType)),
      resolve: async () => {
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data.passengers)) {
          return data.passengers.map((passenger) => ({
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            title: passenger.title
          }));
        }

        return [
          {
            firstName: data.passengers.firstName,
            lastName: data.passengers.lastName,
            title: data.passengers.title
          }
        ];
      }
    }
  }
});

export const passengerSchema = new GraphQLSchema({
  query: PassengersQuery
});
