const finnhub = require('finnhub');
import { Request, Response } from 'express';
import Stocks from '../models/stocks-model';

const apiKey = process.env.FINHUB_API_KEY;
const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

export const getLiveStockPrices = async (): Promise<void> => {
  const stockPrices: any[] = [];
  const curTimeStamp: number = new Date().getTime();
  try {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = apiKey
    const finnhubClient = new finnhub.DefaultApi()

    const requests = symbols.map(symbol =>
      new Promise((resolve, reject) => {
        finnhubClient.quote(symbol, (error: any, data: unknown) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      })
    );

    const responses = await Promise.all(requests);

    responses.forEach((data: any, index: number) => {
      const latestPrice = data.c;
      const indvStockObj = { name: symbols[index], price: latestPrice, timeStamp: curTimeStamp }
      stockPrices.push(indvStockObj)
    });

    // save to MongoDB
    if (stockPrices.length) {
      const result = await Stocks.insertMany(stockPrices)
      console.log('Stock Data saved :', result)
    }
  } catch (error) {
    console.error('Error fetching stock prices:', error);
  }
};

export const fetchLast20Records = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    const stockRecords = await Stocks.find({ name }).sort({ timeStamp: -1 }).limit(20);
    res.status(200).json(stockRecords);
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};



