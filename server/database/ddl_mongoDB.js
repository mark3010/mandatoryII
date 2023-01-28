import db from "./connection_mongoDB.js";
import fs from "fs";
import {parse} from "csv-parse";
import {hash, createUUID, } from "../security/encryption.js"

//////////////////////////////////////////////////////
//                                                  //
//   WARNING: running this ddl will reset the DB    //
//                                                  //
//////////////////////////////////////////////////////

//test users for seeding
const baseUser1 = {
    name: "Base-user #1",
    UUID: await createUUID(),
    username: "base1@user.com",
    password: await hash("123"),
    createdAt: new Date().toDateString(),
    admin: false,
    ghost: false
};
const baseUser2 = {
    name: "Base-user #2",
    UUID: await createUUID(),
    username: "base2@user.com",
    password: await hash("123"),
    createdAt: new Date().toDateString(),
    admin: false,
    ghost: false
};
const baseUser3 = {
    name: "Base-user #3",
    UUID: await createUUID(),
    username: "base3@user.com",
    password: await hash("123"),
    createdAt: new Date().toDateString(),
    admin: false,
    ghost: false
};
const baseAdmin = {
    name: "Admin-user #root",
    UUID: await createUUID(),
    username: "admin@user.com",
    password: await hash("123"),
    createdAt: new Date().toDateString(),
    admin: true,
    ghost: false
};

//Reset function
async function resetContent() {
    // Await for the collections to be deleted
    try{await db.users.drop();} catch (error) {}
    try{await db.posts.drop();} catch (error) {}
    try{await db.stocks.drop();} catch (error) {}
};

// Call the function
resetContent().then( async () => {

    //seed DB with documents
    console.log("seeding database with users");
    await db.users.insertOne(baseAdmin);
    await db.users.insertOne(baseUser1);
    await db.users.insertOne(baseUser2);
    await db.users.insertOne(baseUser3);

    console.log("seeding database with stocks");
    await fs.createReadStream("./database/stocks.csv").pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        const stock = {
            symbol : row[0],
            companyName : row[1],
            sector : row[2]
        }
        db.stocks.insertOne(stock);
        
    });
    console.log("you can now close the process"); 
});