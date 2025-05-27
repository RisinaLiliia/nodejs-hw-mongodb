import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';



const app = express();

app.use(cors());
app.use(pino());
app.use(express.json());
app.use(cookieParser());

app.use('/', router);


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
