const mysql = require('mysql');
const fs = require('fs');

exports.showCart = function (res) {
    fs.readFile("./cart.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }

        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "MaxPain2001",
            database: "printing_store"
        });
    
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            fs.readFile("./data/account.json", function(err, data) {
                let email = JSON.parse(data).account.email;
                let sqlUser = `SELECT id FROM store_user WHERE email = '${email}';`;
                con.query(sqlUser, function(err, result) {
                    if (err) throw err; 

                    let userId = result[0].id;
                    let sqlCartItems = `SELECT * FROM cart_item WHERE user_id = ${userId};`;
                    con.query(sqlCartItems, function (err, result) {
                        if (err) throw err;
                        
                        let cartItems = new Array(result.length);
                        for (let i = 0; i < result.length; i++) {
                            let itemId = result[i].item_id;
                            let cartItem = { userId: userId, itemId: itemId, quantity: result[0].count }
                            let sqlItem = `SELECT * FROM item WHERE id = ${itemId};`;
                            con.query(sqlItem, function(err, result) {
                                if (err) throw err;

                                let item = result[0];
                                cartItem.name = item.name;
                                cartItem.price = item.price;
                                cartItem.imgSrc = item.img_src;
                            });
                            cartItems[i] = cartItem;
                        }
                        fs.readFile("./data/cart.json", function(err, data) {
                            let parsedData = JSON.parse(data);
                            parsedData.items = cartItems;
                            let jsonData = JSON.stringify(parsedData);
                            fs.writeFile("./data/cart.json", jsonData, function (err) {
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
            });
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};