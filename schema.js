// schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    role: String!
  }

  type Event {
    id: ID!
    title: String!
    description: String
    date: String!
    location: String!
    organizer: User!
    participants: [User!]!
    online: Boolean!
    maxParticipants: Int!
  }

  type Query {
    eventsByCity(city: String!, date: String): [Event!]!
    event(id: ID!): Event
    myEvents(userId: ID!): [Event!]!
    eventsByTitle(title: String!): [Event!]! # Adicionada para corresponder ao resolver
  }

  type Mutation {
    createEvent(
      title: String!
      description: String
      date: String!
      location: String!
      organizerId: ID!
      online: Boolean
      maxParticipants: Int!
    ): Event!
  }
`;

module.exports = typeDefs;