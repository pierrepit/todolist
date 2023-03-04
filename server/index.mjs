import express from 'express';
import {} from 'dotenv/config'; //similar to : import * as dotenv from 'dotenv' then dotenv.config() -or dotenv/config ?
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as api from './api.mjs';
import * as db from './db.mjs';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001; // PORT set at deployment
const HOST = process.env.HOST || 'localhost'; // same

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await db.connect();
app.use(cors());
//app.use(express.urlencoded({ extended: true })); //useful for POST/PUT requests. Recognize incoming req as a String/Array. If extended, you can post nested objects.
app.use(express.json()); //useful for POST/PUT requests. Recognize incoming req as a JSON
app.use('/items', api.router); //router before static files
app.use(express.static(path.join(__dirname, '/front/build'))); //public = the front file where all the statics (including index.html) are
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/front/build/index.html')));

//starts the Express server
const server = app.listen(PORT, HOST, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log(`Server listening at http://${host}:${port}`);
});
