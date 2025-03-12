require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const connectDB = require('./db/conexao');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const User = require('./models/User');
const Event = require('./models/Event');

async function startServer() {
  await connectDB();

  // Configurar o servidor Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
    },
  });

  // Iniciar o servidor
  server.listen().then(({ url }) => {
    console.log(`Servidor GraphQL rodando em ${url}`);
  });
}

startServer().catch((error) => {
  console.error('Erro ao iniciar o servidor:', error);
});