const mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //your database password
    database: "printing_store"
});

let createTable1 = `
    CREATE TABLE store_user(
        id INT AUTO_INCREMENT, 
        user_name VARCHAR(100),
        email VARCHAR(50),
        mobile VARCHAR(20),
        date_of_birth DATE,
        avatar_src VARCHAR(150),
        address VARCHAR(100),
        user_password VARCHAR(50),
        PRIMARY KEY(id),
        UNIQUE(email)
    ); 
`;

let createTable2 = `
    CREATE TABLE item(
        id INT AUTO_INCREMENT,
        item_name VARCHAR(100),
        price DECIMAL(8,2),
        img_src VARCHAR(150),
        PRIMARY KEY(id)
    );
`;

let createTable3 = `
    CREATE TABLE cart_item(
        user_id INT,
        item_id INT,
        count REAL,
        FOREIGN KEY(user_id) REFERENCES store_user(id),
        FOREIGN KEY(item_id) REFERENCES item(id),
        PRIMARY KEY(user_id, item_id)
    );
`;

let createTable4 = `
    CREATE TABLE user_item(
        user_id INT,
        item_id INT,
        count REAL,
        date_of_delivery DATE,
        FOREIGN KEY(user_id) REFERENCES store_user(id),
        FOREIGN KEY(item_id) REFERENCES item(id),
        PRIMARY KEY(user_id, item_id)
    );
`;

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    
    con.query(createTable1, function(err, result) {
        if (err) throw err;
        console.log("Table 1 created");
    });
    con.query(createTable2, function(err, result) {
        if (err) throw err;
        console.log("Table 2 created");
    });
    con.query(createTable3, function(err, result) {
        if (err) throw err;
        console.log("Table 3 created");
    });
    con.query(createTable4, function(err, result) {
        if (err) throw err;
        console.log("Table 4 created");
    });
});