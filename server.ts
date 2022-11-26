import express, { Express, Request, Response } from 'express';
import { Server } from "socket.io";
import http from "http"
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();

const port = process.env.PORT;
const app: Express = express();
const server = http.createServer(app)
const io = new Server(server)

app.use(cors({
    origin: 'http://127.0.0.1:5173'
}))

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

io.on("connection", (socket) => {
    console.log('Подключен к сокету on Server: ', socket.id)
})

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
