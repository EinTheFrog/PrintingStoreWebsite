const mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //your database password
});

let sqlCreateDB = `
        CREATE DATABASE printing_store;
    `;

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    
    con.query(sqlCreateDB, function(err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});