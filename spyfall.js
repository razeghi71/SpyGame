var server = require('http').createServer();
var io = require('socket.io')(server);

var kalamat = ["هواپیما",
"بانک",
"ساحل",
"کلیسا",
"چادر سیرک",
"مهمانی سازمانی",
"لشکر جنگجویان صلیبی",
"کازینو",
"سالن ماساژ",
"سفارت‌خانه",
"بیمارستان",
"هتل",
"پایگاه نظامی",
"استودیو فیلمسازی",
"کشتی اقیانوس‌پیما",
"قطار مسافربری",
"کشتی دزدان دریایی",
"پایگاه قطبی",
"پاسگاه پلیس",
"رستوران",
"مدرسه",
"تعمیرگاه",
"ایستگاه فضایی",
"زیردریایی",
"سوپرمارکت",
"تئاتر",
"دانشگاه",
"ارتش جنگ جهانی دوم"];

var clients = [];
var clientSocket = [];

// var express = require('express');
// var app = express();
// var path = require('path');

// // viewed at http://localhost:8080
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/client/index.html'));
// });

// app.listen(8080);


io.on('connection', function(client){
    console.log('SomeOne Connected');
    client.on('name', function(name) {
        clientSocket.push(client);
        for (var i = 0 ; i < clients.length ; i++) {
            client.emit('newName', clients[i]);
        }
        
        clients.push(name);
        io.emit("newName", name);
    });

    client.on('start', function(){
        io.emit('start');
        var starter = Math.floor(clients.length * Math.random());
        var spy =  Math.floor(clients.length * Math.random());
        var place = Math.floor(kalamat.length * Math.random());
        for (var i = 0 ; i < clients.length ; i++) {
            if (i == starter)
                io.emit('startPlayer', "Start: " + clients[i]);
            else 
                io.emit('startPlayer', clients[i]);

            if ( i == spy)
                clientSocket[i].emit("role", "spy");
            else
                clientSocket[i].emit("role", kalamat[place]);
        }   
    });

    client.on('end', function(){
        io.emit("end");
    });

});
server.listen(3000);