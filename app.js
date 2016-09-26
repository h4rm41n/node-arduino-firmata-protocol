var express = require('express')();
var app = require('http').Server(express);
var socket = require('socket.io')(app);
var five = require('johnny-five');
var board = new five.Board();

app.listen(5000, function(){
	console.log('Server is running...');
});

express.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

board.on('ready', function(){
	console.log('Board is ready!');
	var led = new five.Led(13);

	this.repl.inject({
		led:led
	});

	//led.blink(50);

    socket.on('connection', function(socket){
    	// socket.emit('cuap', 'data-ku-ini');
		socket.on('on', function(){
			console.log("on");
			led.on();
		});

		socket.on('off', function(){
			console.log("off");
			led.off();
		});

		socket.on('ready', function(){
			console.log("ready");
			led.off();
		});
    });
})
