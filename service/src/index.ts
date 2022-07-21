import { createServer } from '@graphql-yoga/node';

const typeDefs = /* GraphQL */`
  type Message {
    id: ID!
    text: String!
  }

  type Query {
    messages: [Message!]!
  }

  schema {
    query: Query
  }
`;

const resolvers = {
  Query: {
    messages: () => [{ id: '1', text: 'hello, world' }]
  }
};

const server = createServer({ schema: { typeDefs, resolvers } });

server.start().then(() => {
});
