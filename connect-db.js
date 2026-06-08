/**
 * ICONIC HUB - MongoDB Connection Diagnostic and Seeding Tool
 * 
 * Run this file using: node connect-db.js
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iconichub';

console.log('====================================================');
console.log('📡 Iconic Hub - Backend Connection Diagnostic');
console.log('====================================================');
console.log(`Target MongoDB URI: ${MONGODB_URI}\n`);

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    const client = await MongoClient.connect(MONGODB_URI, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    
    console.log('✅ Connected successfully!');
    const db = client.db();
    
    // Print existing collections
    const collections = await db.listCollections().toArray();
    console.log(`\nDatabase name: "${db.databaseName}"`);
    console.log('Existing collections:', collections.map(c => c.name));
    
    // Print simple counts
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(` - ${col.name}: ${count} document(s)`);
    }

    await client.close();
    console.log('\n🎉 Database is ready to receive requests!');
    console.log('You can now run "npm run dev" to launch the application.');
    console.log('====================================================');
  } catch (err) {
    console.error('\n❌ Connection failed:', err.message);
    console.log('\n----------------------------------------------------');
    console.log('💡 Diagnostics & Setup Instructions:');
    console.log('----------------------------------------------------');
    console.log('Option A: Start local MongoDB');
    console.log('   If you have MongoDB installed via Homebrew, run:');
    console.log('   brew services start mongodb-community');
    console.log('   Or run the daemon directly:');
    console.log('   mongod --dbpath=/usr/local/var/mongodb');
    console.log('\nOption B: Use Docker');
    console.log('   If you have Docker installed, run:');
    console.log('   docker run -d -p 27017:27017 --name iconichub-mongo mongo:latest');
    console.log('\nOption C: Use MongoDB Atlas (Cloud)');
    console.log('   Set the MONGODB_URI environment variable before running the app:');
    console.log('   export MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/iconichub"');
    console.log('   npm run dev');
    console.log('====================================================');
  }
}

testConnection();
