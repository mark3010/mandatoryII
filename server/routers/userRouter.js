import db from "../database/connection_mongoDB.js";
import { hash, compare, createUUID } from "../security/encryption.js"
import { Router } from "express";
import {isAuthenticated, isAuthorized, isAdmin} from  "../security/middleware.js"

const router = Router();

//API
router.get("/api/v1/users", isAuthenticated, isAdmin, async (req, res) => {
    const users = await db.users.find().toArray();

    //map to safe response
    const response = [];
    users.forEach( (user) => {
        const userSafe = {  
            name: user.name,
            UUID: user.UUID,
            ghost: user.ghost,
            admin: user.admin                
            }
        response.push(userSafe)
    })

    return res.send(response);
});

router.post("/api/v1/users", async (req, res) => {
    //check form data
    if (!req.body.name || !req.body.username || !req.body.password) return res.status(400).json({ message: "Missing form data" });

    //check if user does not exists
    const user = await db.users.findOne( { "username" : req.body.username.toString() } ) || null;
    if (user !== null) return res.status(409).send({ message: "E-mail already registrered" });

    const newUser = {
        name: req.body.name.toString(),
        username: req.body.username.toString(),
        password: await hash(req.body.password),
        UUID: await createUUID(),
        admin: false,
        ghost: false,
        createdAt: new Date().toDateString()
    };

    await db.users.insertOne(newUser);

    return res.sendStatus(200);
});

router.post("/api/v1/login", async (req, res) => {
    const genericError = "Either username or password is incorrect";

    //check if user exists
    const user = await db.users.findOne( { username : req.body.username.toString() } ) || null;

    if (user === null) return res.status(400).send({ message: genericError });

    //verify password
    compare(req.body.password,user.password).then((response) => {
        if (response) {
            req.session.authenticated = true;
            req.session.username = user.username;
            req.session.uuid = user.UUID;
            req.session.admin = user.admin;

            //strip out sensitive user information
            response = {
                name: user.name,
                username: user.username,
                UUID: user.UUID,
                admin: user.admin,
                ghost: user.ghost,
                createdAt: user.createdAt
            };   

            return res.status(200).send(response);
        } else {
            return res.status(400).send({ message: genericError });
        }
    });
});

router.get("/api/v1/users/:UUID", isAuthenticated, async (req, res) => {
    const genericError = "User does not exist";

    //check if user exists
    const user = await db.users.findOne( {UUID: req.params.UUID.toString()} ) || null;
    if (user === null) return res.status(404).send({ message: genericError });

    //strip out sensitive user information
    const response = {
        name: user.name,
        UUID: user.UUID,
        admin: user.admin,
        ghost: user.ghost,
        createdAt: user.createdAt
    }   
    return res.send(response);
})

router.post("/api/v1/logout", async (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
});

router.delete("/api/v1/users/:UUID",isAuthenticated, isAuthorized, async (req, res) => {
    const genericError = "active user does not exist";

    //check if user exists
    const user = await db.users.findOne( { UUID : req.params.UUID.toString(), ghost : false} ) || null;
    if (user === null) return res.status(404).send({ message: genericError });

    //init ghost
    const ghost = {
        name: user.name,
        UUID: user.UUID,
        createdAt: user.createdAt,
        ghost: true,
        admin: user.admin
      };

    //delete user
    await db.users.deleteOne(user);
    
    //create ghost
    await db.users.insertOne(ghost);

    if (!req.session.admin) {
        req.session.destroy();
    }
   
    return res.sendStatus(200);
});

router.get("/api/v1/users/:UUID/posts", isAuthenticated, async (req, res) => {
    const genericError = "User does not exist";

    //check if user exists
    const user = await db.users.findOne( {UUID: req.params.UUID.toString()} ) || null;
    if (user === null) return res.status(404).send({ message: genericError });

    //get all messages
    let posts = await db.posts.find( { UUID : req.params.UUID.toString() } ).toArray() || null;
    if (posts === null) return res.status(404).send({message: "user has no posts to be found" });

    //apply query filters
    if (req.query !=={}) {
        if (req.query.seen === 'false') {
            posts = posts.filter(posts => posts.seen === false);
        }
        if (req.query.sortBy === 'new') {
            posts = posts.reverse();
        }
    }
    return res.send(posts);
})

router.patch("/api/v1/users/:UUID/posts", isAuthenticated, isAuthorized, async (req, res) => {
    const genericError = "User does not exist";

    //check if user exists
    const user = await db.users.findOne( {UUID: req.params.UUID.toString()} ) || null;
    if (user === null) return res.status(404).send({ message: genericError });

    //get all messages, where seen is false
    let posts = await db.posts.find( { UUID : req.params.UUID.toString() , seen : false} ).toArray() || null;
    if (posts === null) return res.status(404).send({message: "user has no posts to be found" });

    const response = await db.posts.updateMany({UUID : req.params.UUID, seen : false},
    {
        $set: {
            seen : true
        }
    })

    return res.send(response);
})


export default router;