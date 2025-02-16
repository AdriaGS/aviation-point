import mongoose from 'mongoose';
import { checkNotNull } from './extensions/checkNotNull';

const MONGODB_URI = checkNotNull(process.env.MONGODB_URI);

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  };
}

const cached =
  global.mongoose || (global.mongoose = { conn: null, promise: null });

const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000;

async function connectWithRetries(
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<typeof mongoose> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      });

      console.log('MongoDB connected successfully');
      return connection;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempt} failed:`,
        (error as Error).message
      );

      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      } else {
        console.error('Max retries reached. Could not connect to MongoDB.');
        throw error;
      }
    }
  }
  throw new Error('Failed to connect to MongoDB after multiple attempts.');
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectWithRetries();
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
