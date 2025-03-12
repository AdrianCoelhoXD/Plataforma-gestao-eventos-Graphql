const mongoose = require('mongoose');
//MONGODB_URI=mongodb://localhost:27017/gerenciador-eventos 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado ao MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado ao banco de dados!');
});

mongoose.connection.on('error', (error) => {
  console.log('Erro ao conectar ao banco de dados:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado do banco de dados!');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Conexão com MongoDB fechada devido ao encerramento da aplicação.');
  process.exit(0);
});

module.exports = connectDB;