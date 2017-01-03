// Initializing express 
var express = require('express');
var app = express();
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port= process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server = app.listen(port, ip);
// initalizing completed


// -- start sockets
 var io = require('socket.io')(server);
 var other_server = require('socket.io-client')('http://localhost:3001');
io.on('connection',function(sockets){
	sockets.on('message',function(msg){
		console.log(msg);
		other_server.emit("message",msg);
	});
});
// -- end sockets

// -- start path module
var path = require('path');
// -- end path module

// Setting app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//move to index.js page in routes
var index = require('./routes/index');
app.use('/index',index);
app.use('/',index);

//Runs for static pages like javascript,css
app.use(express.static(path.join(__dirname, 'public')));
