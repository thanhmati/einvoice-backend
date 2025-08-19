const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function processFile(filePath, mode, db) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const seed = JSON.parse(raw);

  const collection = db.collection(seed.collection);

  if (mode === 'prune') {
    await collection.deleteMany({});
    if (seed.data.length > 0) {
      await collection.insertMany(seed.data);
    }
    console.log(`✅ [${seed.collection}] pruned & inserted ${seed.data.length} docs`);
  } else if (mode === 'migrate') {
    for (const doc of seed.data) {
      const exists = await collection.findOne(doc);
      if (!exists) {
        await collection.insertOne(doc);
        console.log(`➕ Inserted into [${seed.collection}] ->`, doc);
      }
    }
    console.log(`✅ [${seed.collection}] migration completed`);
  } else {
    console.error('❌ Invalid mode, use "prune" or "migrate"');
  }
}

async function bootstrap() {
  const dirPath = process.argv[2]; // ví dụ: apps/user-access/seeder
  const mode = process.argv[3] || 'migrate'; // prune | migrate

  if (!dirPath) {
    console.error('❌ Please provide a seeder directory path');
    process.exit(1);
  }

  const absoluteDir = path.resolve(dirPath);
  if (!fs.existsSync(absoluteDir)) {
    console.error(`❌ Seeder directory not found: ${absoluteDir}`);
    process.exit(1);
  }

  // lấy connection string từ ENV service
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();

    const files = fs.readdirSync(absoluteDir).filter((f) => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(absoluteDir, file);
      await processFile(filePath, mode, db);
    }

    console.log('🎉 All seeders executed successfully!');
  } catch (err) {
    console.error('❌ Error while seeding:', err);
  } finally {
    await client.close();
  }
}

bootstrap();
