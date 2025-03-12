require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const connectDB = require('./db/conexao');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Importar os modelos para garantir que sejam registrados
const User = require('./models/User');
const Event = require('./models/Event');

async function startServer() {
  // Conectar ao MongoDB
  await connectDB();

  // Configurar o servidor Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Adicione o contexto aqui, se necessário
    },
  });

  // Iniciar o servidor
  server.listen().then(({ url }) => {
    console.log(`🚀 Servidor GraphQL rodando em ${url}`);
  });
}

startServer().catch((error) => {
  console.error('Erro ao iniciar o servidor:', error);
});