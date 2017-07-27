require('babel-register')({
    presets: ['react', 'es2015']
});

var express = require('express');
var app = express();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Main = require('./components/Main.jsx')

app.get('/', function(request, response) {
    // var html = ReactDOMServer.renderToString(
    //     React.createElement(Main)
    // );
    response.send(Main);
});

var PORT = 3000;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});