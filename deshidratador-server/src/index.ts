import Server from './config/server.config';

import { sequelize } from './config/database.config';
import { SERVER_PORT } from './config/env.config';
import { initSocketServer } from './modules/sockets/io';
import { createServer } from 'http'
import { initializeAdmin } from './utils/bootstrap';

async function connectWithRetry() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    setTimeout(connectWithRetry, 5000);
  }
}


async function startServer () {
  try {
    await connectWithRetry()
    // await sequelize.authenticate();
    // console.log('Database connected');
    await sequelize.sync();
    // await sequelize.sync({ force: true });

    await initializeAdmin();
    
    const server = createServer(Server);
    initSocketServer(server);

    server.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Error starting server', error);
  }
}

startServer();
