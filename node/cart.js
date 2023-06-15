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
            password: "root",
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
                            let cartItem = { userId: userId, itemId: itemId, quantity: result[i].count }
                            let sqlItem = `SELECT * FROM item WHERE id = ${itemId};`;
                            con.query(sqlItem, function(err, result) {
                                if (err) throw err;

                                let item = result[0];
                                cartItem.name = item.item_name;
                                cartItem.price = item.price;
                                cartItem.imgSrc = item.img_src;

                                cartItems[i] = cartItem;

                                if (i == cartItems.length - 1) {
                                    fs.readFile("./data/cart.json", function(err, data) {
                                        if (err) throw err;
            
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
                                }
                            });
                        }
                    });
                });
            });
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};

exports.proceedChangeCartItemQuantity = function(req, res) {
    console.log(req.query);
    let itemId = req.query.itemId;
    let quantity = req.query.quantity;

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "printing_store"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        fs.readFile("./data/account.json", function(err, data) {
            if (err) throw err;

            let email = JSON.parse(data).account.email;
            let sqlUser = `SELECT id FROM store_user WHERE email = '${email}';`;
            con.query(sqlUser, function(err, result) {
                if (err) throw err; 

                let userId = result[0].id;
                
                let cartItem = { userId: userId, itemId: itemId, quantity: quantity }

                let sqlItem = `SELECT * FROM item WHERE id = ${itemId};`;
                con.query(sqlItem, function(err, result) {
                    if (err) throw err;

                    let item = result[0];
                    cartItem.name = item.name;
                    cartItem.price = item.price;
                    cartItem.imgSrc = item.img_src;

                    let sqlUpdate = `UPDATE cart_item SET count = ${quantity} WHERE user_id = ${userId} AND item_id = ${itemId};`;
                    con.query(sqlUpdate, function(err, result) {
                        if (err) throw err;
                        
                        con.end(function (err) {
                            if (err) throw err;
                        });
                        res.redirect("/cart")
                        return res.end();
                    });
                });
            });
        });
    });
}
