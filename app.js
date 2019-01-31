const express = require('express');
const bodyparser = require('body-parser');
const routes = require(__dirname + '/routes/routes');

var app = express();

app.use(bodyparser.json({limit: "5mb"}));
app.use(bodyparser.urlencoded({limit: "5mb", extended: false}));

app.disable('x-powered-by');

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('X-XSS-Protection', '1; mode=block');
	res.header('X-Frame-Options', 'DENY');
	res.header('X-Content-Type-Options', 'nosniff');
	next();
}

app.use(function(req, res, next) {
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "*";
	headers["Access-Control-Allow-Credentials"] = true;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["X-XSS-Protection"] = "1; mode=block";
	headers["Access-Control-Allow-Headers"] = "Authorization, authorization, key";
	headers["X-XSS-Protection"] = "1; mode=block";
	headers["X-Frame-Options"] = "DENY";
	headers["X-Content-Type-Options"] = "nosniff";
	next();
});

app.use(allowCrossDomain);

app.use('/', routes);

var server = app.listen(4007, () => {
    console.log("Server listening on port " + server.address().port);
})