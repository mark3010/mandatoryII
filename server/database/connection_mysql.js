import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "password",
    database: "schema-name"
});

export default connection;