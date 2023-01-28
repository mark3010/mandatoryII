import db from "../database/connection_mongoDB.js";
import { ObjectId} from "mongodb";
import { Router } from "express";

import {isAuthenticated, isAuthorized, isAdmin} from  "../security/middleware.js";
const router = Router();

 //API
router.get("/api/v1/stocks/:ticker",isAuthenticated, async (req, res) => {
    const genericError = `the stock ${req.params.ticker.toUpperCase()} could not be found in the database, make sure your input is correct`;
    const ticker = req.params.ticker.toUpperCase();

    //check if stock exists
    //TODO: fix repetition redundancy
    const stock = await db.stocks.findOne( { symbol : ticker.toString() } ) || null;
    if (stock === null) return res.status(404).send({ message: genericError });

    return res.send(stock);
});

router.post("/api/v1/stocks/:ticker/posts",isAuthenticated,isAuthorized, async (req, res) => {
    const genericError = "something went wrong, malformed request";
    
    //check if user exists
    const user = await db.users.findOne( { UUID : req.body.UUID.toString() } ) || null;
    if (user === null) return res.status(400).send({ message: genericError });

    
    const newPost = {
        ticker: req.body.ticker.toUpperCase().toString(),
        content: req.body.content.toString(),
        createdAt: new Date().toDateString(),
        score: 0,
        UUID: user.UUID,
        name: user.name,
        seen: true,
        replies: []
      };

    await db.posts.insertOne(newPost);

    const response = {
        message: "post created succesfully",
        postId: newPost._id.toString(),
        post: newPost
    };

    return res.send(response);
});

router.patch("/api/v1/stocks/:ticker/posts/:postId",isAuthenticated,isAuthorized, async (req, res) => {
    const genericError = "post does not exist";

    const post = await db.posts.findOne( { _id : ObjectId(req.params.postId)} ) || null;
    
    if (post === null) return res.status(404).send({ message: genericError });

    const reply = {
        content: req.body.content.toString(),
        createdAt: new Date().toDateString(),
        UUID: req.body.UUID.toString(),
        name: req.body.name.toString()
      };

    post.replies.unshift(reply);
    post.seen = false;
    
    await db.posts.updateOne(
        {_id: ObjectId(req.params.postId)},
        {
            $set: post
        });

    return res.send({post});
});


router.get("/api/v1/stocks/:ticker/posts",isAuthenticated, async (req, res) => {
    const genericError = "no posts for stock yet";
    const _ticker = req.params.ticker.toUpperCase();

    //check if stock exists
    //TODO: fix repetition redundancy
    let posts = await db.posts.find( { ticker : _ticker } ).toArray() || null;
    if (posts === null) return res.status(404).send({ message: genericError });

    //apply query filters
    if (req.query !=={}) {
        if (req.query.sortBy === "new") {
            posts = posts.reverse();
        }
    }

    return res.send({posts});
});

router.get("/api/v1/stocks/:ticker/posts/:postId", isAuthenticated, async (req, res) => {
    const genericError = "post does not exist";
    const postId = req.params.postId

    //check if post exists
    //TODO: fix repetition redundancy
    const post = await db.posts.find( { _id : ObjectId(postId)} ).toArray() || null;
    if (post === null) return res.status(404).send({ message: genericError });

    return res.send({post});
});
 
export default router;