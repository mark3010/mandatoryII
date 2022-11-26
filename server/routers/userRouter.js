import db from "../database/connection_sqlite.js";
import {hash, compare} from "../security/encryption.js"

import { Router } from "express";
const router = Router();

//MIDDLEWARE
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.status(403).send('Access denied')
    }
}

//API
router.get("/api/users",isAuthenticated, async (req, res) => {
    const data = await db.all("SELECT name, username FROM user;");
    res.send({ data });
});

router.post("/api/register", async (req, res) => {
    const name = req.body.name || "undefined";
    const username = req.body.username;
    const password = req.body.password;
    
    if (!name || !username || !password) return res.status(400).send({ message: "Missing form data" });

    hash(password).then((response) => {
        const hashedPassword = response;
        const result = db.run(`INSERT INTO user (name, username, password) VALUES (?, ?, ?)`, [name, username, hashedPassword]);

        console.log("user has been created: ", username);
        
        res.send({ changes: result.changes });
    })
});

router.post("/api/login", async (req, res) => {
    const genericError = "Either username or password is incorrect"

    const sqlSearch = await db.all("SELECT * FROM user WHERE username = (?);", [req.body.username]).then(
        (response) => {
            if (response.length == 0)  return res.status(400).send({ message: genericError });

            const name = response[0].name;
            const username = response[0].username;
            const password = response[0].password;

            const auth = compare(req.body.password,password).then((response) => {
                if (response) {
                    console.log("user has been succesfully athenticated: ", username);
                    req.session.authenticated = true;
                    req.session.username = username;
                    req.session.name = name;
    
                    res.send({  response: true,
                                name: name,
                                username: username      
                    });

                } else {
                    console.log("user has been denied access: ", username);
                    res.status(400).send({ message: genericError });
                }
            });
        });    
    }
);

router.post("/api/logout", async (req, res) => {
    req.session.destroy()

    res.send({ response: true })
});

export default router;