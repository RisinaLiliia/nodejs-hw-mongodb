import dotenv from 'dotenv';
import setupServer from './server.js'; 
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const bootstrap = async () => {
  await initMongoConnection();
  setupServer(); 
};

bootstrap();






