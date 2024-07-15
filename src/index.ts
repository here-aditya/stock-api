import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import stockRoutes from './routes/stock-routes';
import connectDB from './config/db';
import { getLiveStockPrices } from './controllers/stocks-controller';
import cors from 'cors';

const interval: number = Number(process.env.API_THRESHOLD_INTERVAL) || 150000;
const port: number = Number(process.env.EXPRESS_PORT) || 3001;
const app = express();

app.use(cors())

// Connect to database
connectDB();

app.use(express.json());

// Routes
app.use('/api', stockRoutes);

// Poll latest stock price
const pollStockPrices = () => {
    setInterval(getLiveStockPrices, interval);
};

pollStockPrices();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
