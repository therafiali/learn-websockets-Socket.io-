const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React dev server port
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.emit('welcome', 'Welcome to the server');
    
    socket.on('message', (message) => {
        console.log('message from', socket.id, ':', message);
        // Broadcast the message to all connected clients with sender info
        io.emit('message', `User ${socket.id.slice(0, 8)}: ${message}`);
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});


