import sqlite3 from "sqlite3";
import { open } from "sqlite";

//////////////////////////////////////////////////////
//                                                  //
//   WARNING: running this ddl will reset the DB    //
//                                                  //
//////////////////////////////////////////////////////

//NOTE: the API has not been set up for sqlite, small changes are required for functional use

const connection = await open({
    filename: "mandatory.db",
    driver: sqlite3.Database
});

export default connection;