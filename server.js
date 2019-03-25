// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const log = console.log;
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// app.get('/', function(request, response) {
// 	log(`/views/${request.params.step}`);
//   response.sendFile(__dirname + `/views/${request.params.step}`);//'/views/index.html');
// });

// http://expressjs.com/en/starter/basic-routing.html
app.get('/checkout/:step', function(request, response) {
	log(`/views/${request.params.step}`);
  response.sendFile(__dirname + `/views/${request.params.step}`);//'/views/index.html');
});

app.get('/partials/:step', function(request, response) {
	log(`/partials/${request.params.step}`);
  response.sendFile(__dirname + `/partials/${request.params.step}`);//'/views/index.html');
});

// listen for requests :)
process.env.PORT = 8855;
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
