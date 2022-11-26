import db from "./connection_sqlite.js";

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.exec(`
        DROP TABLE IF EXISTS user;
    `);
}

db.exec(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);
`);

// seed the database
if (isInDeleteMode) {
    db.run(`INSERT INTO user (name, username, password) VALUES ("Admin user", "admin", "123");`);
    db.run(`INSERT INTO user (name, username, password) VALUES ("Normal user", "user", "123");`);
}
