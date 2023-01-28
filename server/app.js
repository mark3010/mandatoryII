import express from "express";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

//SESSIONS
import session from "express-session";
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
});

app.use(sessionMiddleware);

//SECURITY
import rateLimit from "express-rate-limit";
const generalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, //minutes
    max: 500
});

app.use(generalLimiter);

//ROUTES
import userRouter from "./routers/userRouter.js";
import stockRouter from "./routers/stockRouter.js";
import contactRouter from "./routers/contactRouter.js";

app.use(userRouter);
app.use(stockRouter);
app.use(contactRouter);

//SOCKET
import { randomInt } from "crypto";

io.on("connection", (socket) => {
    //TODO: use data from client to determine which stock to send
    //socket.data.ticker

    const tickerPrice = randomInt(300) + 20;

    socket.emit('stockprice', tickerPrice + randomInt(10));

    setInterval(function() {    
        socket.emit('stockprice', tickerPrice + randomInt(10));
    },10000/25);
});

//SERVE FRONTEND
import path from "path";

const distFolderPath = path.resolve("../client/dist/");

app.use(express.static(distFolderPath));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(distFolderPath, "index.html"));
});

const PORT = Number(process.env.SERVER_PORT) || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));
