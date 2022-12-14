import {} from 'dotenv/config';
import * as mongoDb from 'mongodb';

const uri = process.env.DATABASE_URL; // Atlas connexion
let client;
let db;

export async function connect(url = uri, dbName = 'todolist') {
	client = new mongoDb.MongoClient(url);
	await client.connect();
	console.log(`Connected to ${dbName} (${url})`);
	db = client.db(dbName);
}

/* export async function close() {
    await client.close();
} */

///////////////////////////////////////////////

export async function getItems() {
	return await db.collection('items').find().toArray();
}

export async function getItem(id) {
	return await db.collection('items').findOne({ _id: mongoDb.ObjectId(id) });
}

export async function createItem(item) {
	const result = await db.collection('items').insertOne(item);
	return result.insertedId;
}

export async function updateItem(id, fields = {}) {
	const result = await db.collection('items').findOneAndUpdate({ _id: mongoDb.ObjectId(id) }, fields);
	return result;
}
