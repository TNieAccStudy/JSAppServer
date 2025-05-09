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

app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Assemble</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .header {
                background: url('https://res.cloudinary.com/duiwbkm7z/image/upload/v1734510770/wodqv6b99gj0wpmwpw4f.gif') no-repeat center center/cover;
                color: white;
                padding: 100px 20px;
            }
            .menu {
                display: flex;
                justify-content: center;
                gap: 20px;
                padding: 10px;
                background: linear-gradient(#ffcac9a6, #737cfea3);
            }
            .menu a {
                text-decoration: none;
                color: black;
                font-weight: bold;
            }
            .content {
                padding: 50px;
                height: 203px;
                background: linear-gradient(#737cfea3, #ffcac9a6);
            }
            .btn {
                background: black;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <nav class="menu">
            <a href="#">Home</a>
            <a href="#">Pages</a>
            <a href="#">Portfolio</a>
            <a href="#">Blog</a>
            <a href="#">Shop</a>
            <a href="#">Elements</a>
        </nav>
        <header class="header">
            <h1>ASSEMBLE</h1>
            <p>Beautiful templates for your awesome portfolio projects</p>
            <a href="#" class="btn">PURCHASE NOW</a>
        </header>
        
        <div class="content">
            <h2>18 Beautiful Homepages</h2>
            <p>With Assemble, you can choose from a stunning collection of 18 carefully designed and distinct homepage examples.</p>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

server.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
