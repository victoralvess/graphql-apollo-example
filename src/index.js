const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

app.use(bodyParser.json());

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.listen(7000, () => {
	console.log('GraphiQL: http://localhost:7000/graphiql');
});