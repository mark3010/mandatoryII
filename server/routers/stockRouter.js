import db from "../database/connection_mongoDB.js";

import { Router } from "express";
const router = Router();

//API
router.get("/v1/stocks/:ticker", async (req, res) => {
    const genericError = "stock not in DB";
    const ticker = req.params.ticker.toUpperCase();
    //check if stock exists
    //TODO: fix repetition redundancy
    const stock = await db.stocks.findOne( { symbol : ticker } ) || null;
    if (stock === null) return res.status(404).send({ message: genericError });

    return res.json(stock);
});

router.get("/v1/stocks/:ticker/posts", async (req, res) => {
    const genericError = "stock not in DB";
    const ticker = req.params.ticker.toUpperCase();
    //check if stock exists
    //TODO: fix repetition redundancy
    const stock = await db.users.findOne( { symbol : ticker.toUpperCase } ) || null;
    if (stock === null) return res.status(404).send({ message: genericError });

    //const comments = await db.posts.find( { "ticker" : ticker } );

    //returns empty if empty
    return res.send(comments);
});

export default router;