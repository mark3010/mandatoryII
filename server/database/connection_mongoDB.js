import { MongoClient } from "mongodb";

//TODO: REPLACE WITH ENV VAR
const url = "mongodb://127.0.0.1:27017"

export const client = new MongoClient(url);

await client.connect();

const findocDB = client.db("findoc");

export default {
    users: findocDB.collection("users"),
    posts: findocDB.collection("posts"),
    stocks: findocDB.collection("stocks"),
};
