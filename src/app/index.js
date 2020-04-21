const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const messages = [];

io.on('connection', socket => {

    socket.emit('getMessages', messages);

    socket.on('sendMessage', (data) => {
        messages.push(data);
        socket.broadcast.emit('getMessages', messages);
    });
});

http.listen(process.env.PORT || 4444);
