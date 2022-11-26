import db from "./connection_mysql.js";

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.execute(`
        DROP TABLE IF EXISTS user;
    `);
}

db.execute(`CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);
`);

// seed the database
if (isInDeleteMode) {
    db.execute(`INSERT INTO user (name, username, password) VALUES ("Admin user", "admin", "123");`);
    db.execute(`INSERT INTO user (name, username, password) VALUES ("Normal user", "user", "123");`);
}

db.end();