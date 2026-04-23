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



console.log('=== ENVIRONMENT CHECK ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.API_KEY ? 'LOADED' : 'MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.API_SECRET ? 'LOADED' : 'MISSING');
console.log('========================');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
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