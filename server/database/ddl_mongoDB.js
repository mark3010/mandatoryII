import db from "./connection_mongoDB.js";

//////////////////////////////////////////////////////
//                                                  //
//   WARNING: running this ddl will reset the DB    //
//                                                  //
//////////////////////////////////////////////////////

//test users for seeding
const baseUser = {
    name: "Admin user",
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
    await new Promise((resolve) => {
        db.users.drop((error,deleteOK) => {
        if (error) {
            console.log("no user collection could be found")
        }
        
        if (deleteOK) {
            console.log("user collection has been deleted")
            resolve(deleteOK)
        }
        
        });        
    });

    //seed DB
    console.log("seeding database with users")
    db.users.insertOne(baseAdmin)
    db.users.insertOne(baseUser)


}

// Call the function
resetContent().then( response => {
    //client.close();
    console.log("ddl over");
});
