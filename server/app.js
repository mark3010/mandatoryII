//USE ENVIRONMENT CONFIG
import * as dotenv from 'dotenv'
dotenv.config()

//EXPRESS
import express from "express";
const app = express();

//EXPRESS SECURITY
/*
import helmet from "helmet";
app.use(helmet());

import rateLimit from "express-rate-limit";
const generalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 80
});
app.use(generalLimiter);*/

//EXPRESS SESSIONS
import session from "express-session";
const sessionTimeLimit= 1000 * 60 * 60; // one hour
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: sessionTimeLimit, secure: false }
}));

//OTHER...
import path from "path";
app.use(express.static(path.resolve("../client/dist")));

app.use(express.json());

import cors from "cors";
app.use(cors());

//ROUTERS
import userRouter from "./routers/userRouter.js";
app.use(userRouter);

import contactRouter from "./routers/contactRouter.js";
app.use(contactRouter);

import stockRouter from "./routers/stockRouter.js";
app.use(stockRouter);


//SERVE FRONTEND
import fs from "fs";

const page = fs.readFileSync("../client/dist/index.html").toString();
app.get("*", (req, res) => {
    res.send(page);
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log("Server is running on port", PORT));
