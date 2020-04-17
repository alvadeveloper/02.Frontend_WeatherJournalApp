

const express = require('express');

const app = express();

const path = require('path');

app.use(express.static('website'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

let port = 8000;

const server = app.listen(port, listening);

function listening(){

	console.log(`running of port: ${port}`);
};


let data = [];

let projectData = {};

app.get('/all', sendData);

function sendData(req, res){

	res.send(data);

}

app.post('/add', callback);

function callback(req, res){
	projectData = {
	city: req.body.city,
	content: req.body.content,
	temp: req.body.temp,
	date: req.body.date,
	fav: req.body.fav	
	}
	data.push(projectData);
	console.log(data);
}


