import db from "../database/connection_mongoDB.js";
import {hash, compare, createUUID, } from "../security/encryption.js"

import { Router } from "express";
const router = Router();

//MIDDLEWARE
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        return res.status(401).json({ message: "Access denied" })
    }
}

//API

//unauthorized
router.post("/v1/register", async (req, res) => {

    //check form data
    if (!req.body.name || !req.body.username || !req.body.password) return res.status(400).json({ message: "Missing form data" });

    //check if user does not existsgg
    const user = await db.users.findOne( { "username" : req.body.username } ) || null;
    if (user !== null) return res.status(409).send({ message: "E-mail already registrered" });

    const newUser = {
        name: req.body.name || "undefined",
        username: req.body.username,
        password: await hash(req.body.password),
        UUID: await createUUID(),
        admin: false,
        ghost: false,
        createdAt: new Date().toDateString()
    }

    await db.users.insertOne(newUser);

    return res.sendStatus(200)
});

router.post("/v1/login", async (req, res) => {
    const genericError = "Either username or password is incorrect";

    //check if user exists
    const user = await db.users.findOne( { "username" : req.body.username } ) || null;
    if (user === null) return res.status(400).send({ message: genericError });

    //verify password
    compare(req.body.password,user.password).then((response) => {
        if (response) {
            req.session.authenticated = true;
            req.session.username = user.username;
            //req.session.name = user.name;
            req.session.admin = user.admin;

            response = {
                name: user.name,
                username: user.username,
                UUID: user.UUID,
                admin: user.admin,
                ghost: user.ghost,
                createdAt: user.createdAt
            }   

            return res.status(200).send(response);
        } else {
            return res.status(400).send({ message: genericError });
        }
    });
});

router.get("/v1/users", async (req, res) => {
    const users = await db.users.find().toArray();
    return res.json({ users });
});

router.get("/v1/users/:UUID", async (req, res) => {
    const genericError = "User does not exist";
    const userId = req.params.UUID;

    //check if user exists
    const user = await db.users.findOne( {UUID: userId} ) || null;
    if (user === null) return res.status(404).send({ message: genericError });

    const response = {
        name: user.name,
        UUID: user.UUID,
        admin: user.admin,
        ghost: user.ghost,
        createdAt: user.createdAt
    }   
    return res.send(response);
})

//authorized
router.post("/v1/logout",isAuthenticated, async (req, res) => {
    req.session.destroy()

    return res.sendStatus(200)
});

export default router;