import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';

const typeDefs = gql`
  type CheckIn { id: ID! mood: String! date: String! }
  type Progress { week: Int! completedCheckIns: Int! }
  type Message { id: ID! text: String! sender: String! }
  type Query { progress: [Progress!]!, messages: [Message!]! }
  type Mutation {
    submitCheckIn(mood: String!): CheckIn!
    sendMessage(text: String!): Message!
  }
`;

interface CheckIn {
  id: string;
  mood: string;
  date: string;
}

interface Message {
  id: string;
  text: string;
  sender: string;
}

const state = {
  checkins: [] as CheckIn[],
  messages: [
    { id: uuidv4(), text: 'Welcome — try daily check-ins!', sender: 'system' }
  ] as Message[],
};

const resolvers = {
  Query: {
    progress: (): { week: number; completedCheckIns: number }[] => {
      return [{ week: 1, completedCheckIns: state.checkins.length }];
    },
    messages: (): Message[] => state.messages,
  },
  Mutation: {
    submitCheckIn: (_: unknown, { mood }: { mood: string }): CheckIn => {
      const entry: CheckIn = { id: uuidv4(), mood, date: new Date().toISOString() };
      state.checkins.push(entry);
      state.messages.push({ id: uuidv4(), text: `Nice — you checked in with ${mood}!`, sender: 'system' });
      return entry;
    },
    sendMessage: (_: unknown, { text }: { text: string }): Message => {
      const msg: Message = { id: uuidv4(), text, sender: 'user' };
      state.messages.push(msg);
      state.messages.push({ id: uuidv4(), text: 'Thanks! Support will reply soon (mock).', sender: 'support' });
      return msg;
    }
  }
};

async function start() {
  const app = express();
  app.use(cors()); // allow requests from Expo Go / device

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const port = 4000;
  const host = '0.0.0.0'; // Important: bind to all interfaces so device can reach the server
  app.listen({ port, host }, () => {
    console.log(`Mock GraphQL server running at http://${host}:${port}${server.graphqlPath}`);
  });
}

start().catch(console.error);
