import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mergeSchemas } from '@graphql-tools/schema';

import { bookingDataSchema } from './schemas/bookingData.mjs';
import { itineraryInfoSchema } from './schemas/itinerary-info.mjs';
import { passengerSchema } from './schemas/passengers.mjs';
import { segmentSchema } from './schemas/segment.mjs';

const gqlPort = process.env.GRAPHQL_PORT || 4000;

const mergedSchema = mergeSchemas({
  schemas: [bookingDataSchema, itineraryInfoSchema, passengerSchema, segmentSchema]
});

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  schema: mergedSchema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: gqlPort }, resolve));
console.log(`🚀 Server ready at http://localhost:${gqlPort.toString()}`);
