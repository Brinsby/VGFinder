import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

//We gotta import our models and routes 
import Game from './app/models/game';
import { getGames, getGame, postGame, deleteGame } from './app/routes/game';

const app = express();
const port = process.env.PORT || 8080;

//DB connection through Mongoose
const options = {
	server: {socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	replset: {socketOptions: { keepAlive: 1, connectTimeoutMS: 30000} }
}; //DB connection options
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:carbfreebreakfastbars@olympia.modulusmongo.net:27017/ixoviZ9y', options);
//##@!@#@!#!@#@!#!@#!@#!@##$%^&*(#$%^&*@!#)
//#######Place db URI in connect call
//!@#$%^&*()!@#$%^&*()!@#$%^&*()!@#$%^&*()_

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//BodyParser and Morgan Middleware Init
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Tell express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

//Enable CORS so that we can make HTTP requests from webpack-dev-server
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Origin', 'GET,POST,DELETE');
	res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//API routes 
app.route('/games')
	//create a game
	.post(postGame)
	//get all the games
	.get(getGames);
app.route('/games/:id')
	//get a single game
	.get(getGame)
	//delete a single game 
	.delete(deleteGame);

//For all the other requests just send back the homepage
app.route("*").get((req,res) => {
	res.sendFile('client/dist/index.html', {root: __dirname });
});

app.listen(port);

console.log('Listening on port ' + port);