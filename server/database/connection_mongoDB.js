import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017"; //default mongoDB setup

export const client = new MongoClient(url);

await client.connect();

const findocDB = client.db("findoc");

export default {
    users: findocDB.collection("users"),
    posts: findocDB.collection("posts"),
    stocks: findocDB.collection("stocks"),
    
};
