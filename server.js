var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var storeRoutes = require('./Routes/routes');


var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method}: ${req.url}`

	fs.appendFile('server.log', log +'\n', (err) =>{
		if(err){
			console.log("cannot Create the log file.")
		}
	});
	next();
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use("/api/store", storeRoutes);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
});