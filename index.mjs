import express from 'express';
//import * as path from 'path';
import * as api from './api.mjs';
import * as db from './db.mjs';
import {} from 'dotenv/config'; //similar to : import * as dotenv from 'dotenv' then dotenv.config() -or dotenv/config ?
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001; // PORT set by Heroku at deployment
const HOST = process.env.HOST || 'localhost'; // same ??

await db.connect();
app.use(cors());
//app.use(express.urlencoded({ extended: true })); //useful for POST/PUT requests. Recognize incoming req as a String/Array. If extended, you can post nested objects.
app.use(express.json()); //useful for POST/PUT requests. Recognize incoming req as a JSON
//app.use(express.static(path.join(__dirname, 'public'))); //public = the front file where all the statics (including index.html) are
app.use('/items', api.router); //before to put it after the router because it would cause a 404 ?? should items go before express.static ?

//starts the Express server
const server = app.listen(PORT, HOST, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log(`Server listening at http://${host}:${port}`);
});
