import express from 'express';
import * as db from './db.mjs';

export const router = express.Router();

//Getting all
router.get('/', async (req, res) => {
	try {
		const items = await db.getItems();
		res.json(items);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

//Getting one
/* router.get('/:id', async (req, res) => {
	try {
		const itemId = req.params.id;
		if (itemId === undefined) res.status(500).send('no item id');
		else {
			const item = await db.getItem(itemId);
			if (item === undefined) res.status(403).send();
			else res.json(item);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
}); */

//Creating one
router.post('/add', async (req, res) => {
	try {
		const itemId = await db.createItem(req.body);
		const item = req.body;
		item._id = itemId.toHexString();
		res.json(itemId);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/* //Updating one
router.post('/update/:id', async (req, res) => {
	try {
		const item = await db.updateItem(req.params.id, req.body);
		res.json(item);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
}); */

//Deleting one
router.delete('/delete/:id', async (req, res) => {
	const result = await db.deleteItem(req.params.id);
	if (result.success) {
		res.json({ ok: true });
	} else res.status(500).send('Failed to delete deck ' + req.params.id);
});
