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
    eventsByTitle(title: String!): [Event!]! 
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
    updateEvent(
      id: ID!
      title: String
      description: String
      date: String
      location: String
      online: Boolean
      maxParticipants: Int
    ): Event!
    deleteEvent(id: ID!): Event!
  }
`;

module.exports = typeDefs;