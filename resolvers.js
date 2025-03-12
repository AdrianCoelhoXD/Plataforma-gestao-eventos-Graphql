// resolvers.js
const Event = require('./models/Event');
const User = require('./models/User');

const resolvers = {
  Query: {
    eventsByCity: async (_, { city, date }) => {
      const query = { location: city };
      if (date) query.date = { $gte: new Date(date) };
      return await Event.find(query).populate('organizer').populate('participants');
    },
    event: async (_, { id }) => {
      return await Event.findById(id).populate('organizer').populate('participants');
    },
    myEvents: async (_, { userId }) => {
      return await Event.find({
        $or: [{ organizer: userId }, { participants: userId }],
      }).populate('organizer').populate('participants');
    },
    eventsByTitle: async (_, { title }) => {
      return await Event.find({ title: { $regex: title, $options: 'i' } })
        .populate('organizer')
        .populate('participants');
    },
  },
  Mutation: {
    createEvent: async (_, args) => {
      const newEvent = new Event({
        title: args.title,
        description: args.description,
        date: new Date(args.date),
        location: args.location,
        organizer: args.organizerId,
        participants: [],
        online: args.online || false,
        maxParticipants: args.maxParticipants,
      });
      await newEvent.save();
      return await Event.findById(newEvent._id).populate('organizer').populate('participants');
    },
  },
};

module.exports = resolvers;