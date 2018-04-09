const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloEngine } = require('apollo-engine');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const depthLimit = require('graphql-depth-limit');

app.use(bodyParser.json());

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

app.use('/graphql', graphqlExpress({
	schema,
	validationRules: [ depthLimit(3) ],
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const engine = new ApolloEngine({
	apiKey: process.env.APOLLO_API_KEY
});

engine.listen({
	port: 7000,
	expressApp: app,
});

console.log('GraphiQL: http://localhost:7000/graphiql');