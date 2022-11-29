import express, { Express, Request, Response } from 'express';
import {Server, Socket} from "socket.io";
import http from "http"
import dotenv from 'dotenv';
import cors from "cors"
import {Runtime} from "inspector";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();
const server = http.createServer(app)
const connectedPeers: Array<getProperty<Socket, 'id'>> = []

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

io.on("connection", (socket: Socket) => {
    connectedPeers.push(socket.id)
    socket.on('disconnect', () => {
        const foundPeers = connectedPeers.findIndex(connectedPeerId => connectedPeerId === socket.id)
        connectedPeers.splice(foundPeers, 1)
    })
})

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
