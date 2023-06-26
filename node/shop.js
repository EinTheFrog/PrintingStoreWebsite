const mysql = require('mysql');
const fs = require('fs');

exports.showShop = function (res) {
    fs.readFile("./shop.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};

exports.proceedHomeClick = function (res, userID, itemID) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rootroot",
        database: "printing_store"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var selectQuery = `SELECT * FROM cart_item WHERE user_id = ${user_id} AND item_id = ${item_id}`;
        con.query(selectQuery, function (err, result) {
            if (err) throw err;

            if (result.length === 0) {
                var insertQuery = `INSERT INTO cart_item (user_id, item_id, count) VALUES (${user_id}, ${item_id}, 1)`;
                con.query(insertQuery, function (err, result) {
                    if (err) throw err;
                    console.log("Item added to the cart!");

                    con.end(function (err) {
                        if (err) throw err;
                        console.log("Database connection closed.");
                    });
                });
            } else {
                console.log("Item already exists in the cart!");

                con.end(function (err) {
                    if (err) throw err;
                    console.log("Database connection closed.");
                });
            }
        });
    });

    console.log("User accessed shop page");
};


