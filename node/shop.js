const mysql = require('mysql');
const fs = require('fs');

exports.showShop = function (res) {
    fs.readFile("./shop.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "MaxPain2001",
            database: "printing_store"
        });
    
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");

            var selectQuery = `SELECT * FROM item`;
            con.query(selectQuery, function(err, result) {
                if (err) throw err;

                let items = new Array(result.lenth);
                for (let i = 0; i < result.length; i++) {
                    let item = { 
                        id: result[i].id,
                        name: result[i].item_name,
                        price: result[i].price,
                        imgSrc: result[i].img_src
                    };
                    items[i] = item;
                }
                
                fs.readFile("./data/items.json", function(err, data) {
                    if (err) throw err;

                    let parsedData = JSON.parse(data);
                    parsedData.items = items;
                    let jsonData = JSON.stringify(parsedData);
                    fs.writeFile("./data/items.json", jsonData, function (err) {
                        if (err) throw err;
                        console.log("Written successfully");
        
                        con.end(function (err) {
                            if (err) throw err;
                            console.log("Database connection closed.");
                        });
                    });
                });
            });
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};

exports.proceedShopItemClick = function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "MaxPain2001",
        database: "printing_store"
    });

    let item_id = req.query.itemId;

    fs.readFile("./data/account.json", function(err, data) {
        let email = JSON.parse(data).account.email;
        let sqlUser = `SELECT id FROM store_user WHERE email = '${email}';`;

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");

            con.query(sqlUser, function(err, result) {
                if (err) throw err; 
    
                let user_id = result[0].id;
    
                var selectQuery = `SELECT * FROM cart_item WHERE user_id = ${user_id} AND item_id = ${item_id}`;
            
                con.query(selectQuery, function (err, result) {
                    if (err) throw err;
            
                    if (result.length == 0) {
                        var insertQuery = `INSERT INTO cart_item (user_id, item_id, count) VALUES (${user_id}, ${item_id}, 1)`;
                        con.query(insertQuery, function (err, result) {
                            if (err) throw err;
                            console.log("Item added to the cart!");
            
                            con.end(function (err) {
                                if (err) throw err;
                                console.log("Database connection closed.");
                            });
    
                            res.redirect("/cart")
                            return res.end();
                        });
                    } else {
                        console.log("Item already exists in the cart!");
            
                        con.end(function (err) {
                            if (err) throw err;
                            console.log("Database connection closed.");
                        });
    
                        res.redirect("/cart")
                        return res.end();
                    }
                });
            });
            
        });
    });
};


