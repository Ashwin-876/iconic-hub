import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iconichub';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    const db = client.db();
    
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed, fallback to local state:', error.message);
    throw error;
  }
}
