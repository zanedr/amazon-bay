require('babel-register')({
    presets: ['react', 'es2015']
});

var express = require('express');
var app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', function(request, response) {
    response.sendFile('index.html');
});

var PORT = 3000;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});