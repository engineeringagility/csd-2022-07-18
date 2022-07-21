import { createServer } from '@graphql-yoga/node';

const typeDefs = /* GraphQL */`
  type Message {
    id: ID!
    text: String!
  }

  type Query {
    messages: [Message!]!
  }

  type CreateMessageResult {
    success: Boolean
  }

  input CreateMessageInput {
    id: String!
    text: String!
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): CreateMessageResult!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    messages: () => [{ id: '1', text: 'hello, world' }]
  },
  Mutation: {
    createMessage: (_: any, { input }: any) => {
      console.log(input);

      return {
        success: true
      };
    }
  }
};

const server = createServer({ logging: true, port: 4001, schema: { typeDefs, resolvers } });

server.start().then(() => {
});
