import mongoose, { Schema, Document } from 'mongoose';

interface IStock extends Document {
  name: string;
  price: Number;
  timeStamp: Number;
}

const StockSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  timeStamp: { type: Number, required: true }
});

const Stocks = mongoose.model<IStock>('Stocks', StockSchema);

export default Stocks;
