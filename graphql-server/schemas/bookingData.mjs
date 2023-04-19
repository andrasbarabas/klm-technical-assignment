import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import { url } from '../utils/api.mjs';

const BookingDataType = new GraphQLObjectType({
  name: 'BookingData',
  fields: {
    bookingCode: { type: GraphQLString },
    email: {
      resolve: (parent) => {
        const contactDetails = parent.contactDetails;

        if (Array.isArray(contactDetails) && contactDetails.length > 0) {
          return contactDetails[0].address;
        }

        return null;
      },
      type: GraphQLString
    }
  }
});

const BookingDataQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    bookingData: {
      type: new GraphQLNonNull(BookingDataType),
      resolve: async () => {
        const response = await fetch(url);
        const data = await response.json();

        return { bookingCode: data.bookingCode, contactDetails: data.contactDetails };
      }
    }
  }
});

export const bookingDataSchema = new GraphQLSchema({
  query: BookingDataQuery
});
