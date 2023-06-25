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

exports.proceedHomeClick = function (res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rootroot",
        database: "printing_store"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "SELECT * FROM item";
        con.query(sql, function (err, result) {
            if (err) throw err;

            const jsonData = JSON.stringify(result);
            fs.writeFile('items.json', jsonData, 'utf8', function (err) {
                if (err) throw err;
                console.log("Written successfully");

                con.end(function (err) {
                    if (err) throw err;
                    console.log("Database connection closed.");
                });
            });
        });
    });

    console.log("User accessed shop page");
};
