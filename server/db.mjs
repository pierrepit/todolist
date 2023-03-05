import * as mongoDb from 'mongodb';

const uri = process.env.DATABASE_PRODURL || process.env.DATABASE_DEVURL;
let client;
let db;

export async function connect(url = uri, dbName = 'todolist') {
	client = new mongoDb.MongoClient(url);
	await client.connect();
	console.log(`Connected to ${dbName}`);
	db = client.db(dbName);
}

/* export async function close() {
    await client.close();
} */

///////////////////////////////////////////////

export async function getItems() {
	return await db.collection('items').find().toArray();
}

/* export async function getItem(id) {
	return await db.collection('items').findOne({ _id: mongoDb.ObjectId(id) });
} */

export async function createItem(item) {
	const mongoDate = new Date(item.deadline);
	item.deadline = mongoDate;
	const result = await db.collection('items').insertOne(item);
	return result.insertedId;
}

export async function updateItem(id, fields = {}) {
	const result = await db.collection('items').findOneAndUpdate({ _id: mongoDb.ObjectId(id) }, { $set: fields });
	return result;
}

export async function deleteItem(id) {
	const result = await db.collection('items').deleteOne({ _id: mongoDb.ObjectId(id) });
	return { success: result.deletedCount === 1 };
}
