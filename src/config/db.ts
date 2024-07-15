import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conStr: any = process.env.MONGODB_URL;
    await mongoose.connect(conStr);
    console.log('MongoDB connected...');
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
