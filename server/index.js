import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import noteRoutes from './routes/note.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/note',noteRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT|| 5555;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
