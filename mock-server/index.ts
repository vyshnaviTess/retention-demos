import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type CheckIn { id: ID!, date: String!, mood: String! }
  type Progress { week: Int!, completedCheckIns: Int! }
  type Query { progress: [Progress!]! }
  type Mutation { submitCheckIn(mood: String!): CheckIn! }
`;

const resolvers = {
  Query: { progress: () => [{ week: 1, completedCheckIns: 3 }] },
  Mutation: { submitCheckIn: (_: any, { mood }: any) => ({ id: `${Date.now()}`, date: new Date().toISOString(), mood }) },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 4000 }).then(({ url }) => console.log(`GraphQL: ${url}`));
