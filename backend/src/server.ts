import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
dotenv.config(); 
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDB } from './config/db';
import userRoutes from './routes/user.routes';
import errorHandler from './middleware/errorHandler'
import kycRoutes from './routes/kyc.routes';


console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use("/api", kycRoutes);

app.get('/', (req,res) => {
    res.send('✅ MERN Auth + KYC API is running');
});

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();