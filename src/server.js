import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from '../src/routes/contactsRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const app = express();

app.use(cors());
app.use(pino());
app.use(express.json());

app.use('/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.send({ message: 'API is working!' });
});

app.use(notFoundHandler);
app.use(errorHandler);

const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
