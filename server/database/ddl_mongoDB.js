import db, { client } from "./connection_mongoDB.js";

import fs from "fs";
import {parse} from "csv-parse";

//////////////////////////////////////////////////////
//                                                  //
//   WARNING: running this ddl will reset the DB    //
//                                                  //
//////////////////////////////////////////////////////

//test users for seeding
const baseUser = {
    name: "base user",
    username: "admin",
    password: "123",
    admin: false
}

const baseAdmin = {
    name: "Admin user",
    username: "admin",
    password: "123",
    admin: true
}

//Reset function
async function resetContent() {
    // Await for the collections to be deleted
    try{await db.users.drop();} catch (error) {}
    try{await db.posts.drop();} catch (error) {}
    try{await db.stocks.drop();} catch (error) {}
}

// Call the function
resetContent().then( async response => {

    //seed DB with documents
    console.log("seeding database with users")
    await db.users.insertOne(baseAdmin)
    await db.users.insertOne(baseUser)

    console.log("seeding database with stocks")
    await fs.createReadStream("stocks.csv").pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        const stock = {
            symbol : row[0],
            companyName : row[1],
            sector : row[2]
        }
        db.stocks.insertOne(stock)
        
    })

    console.log("you can now close the process")
    
});