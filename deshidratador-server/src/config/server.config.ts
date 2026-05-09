import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import AppRoutes from './server.routes';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json())
app.use('/api', AppRoutes);

export default app;
