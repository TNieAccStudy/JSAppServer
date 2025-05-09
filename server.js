import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const port = 8100;
const app = express();

const server = createServer(app);
const io_server = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io_server.on('connection', (socket) => {
    console.log('User connected: ', socket.id);

    socket.on('socket_message', (msg) => {
        io_server.emit('server_message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });
});

server.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));