var fs = require ('fs');
const mysql = require('mysql');

exports.showLogin = function (req, res) {
    fs.readFile('login.html', function(err,data) {
        if (err) {
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end('404 NOT FOUND');
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        if (req.query.incorrectData) {
            res.write(`
                <script>
                    document.getElementById("incorrect_data").innerHTML = "Incorrect email or password";
                </script>
            `)
        }
        return res.end();
    });
};
exports.proceedloginClick = function(req, res) {
    let userData = req.body;

    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "printing_store"
    })

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected")
        
        con.query(`SELECT * FROM store_user WHERE email = '${userData.email}' AND user_password = '${userData.userPassword}';`, function(err, result) {
            if (err) throw err;

            if (result.length == 1) {
                res.redirect("/");
                console.log("User exists")

                let userId = result[0].id;
                let user = {
                    email: result[0].email,
                    name: result[0].user_name, 
                    phoneNumber: result[0].mobile,
                    address: result[0].address,
                    dateOfBirth: result[0]. date_of_birth,
                    avatarSrc: result[0].avatar_src
                }
                console.log(user);

                let sqlOrders = `SELECT * FROM user_item WHERE user_id=${userId};`;
                con.query(sqlOrders, function(err, result) {
                    if (err) throw err;

                    if (result.length == 0) {
                        fs.readFile("./data/account.json", function(err, data) {
                            if (err) throw err;

                            let parsedData = JSON.parse(data);
                            parsedData.account = user;
                            console.log(parsedData);
                            fs.writeFile("./data/account.json", JSON.stringify(parsedData), function(err) {
                                if (err) throw err;

                                con.end();
                                return res.end();
                            });
                        });
                    } else {
                        let orders = new Array(result.length);
                        for (let i = 0; i < result.length; i++) {
                            let itemId = result[i].item_id;
                            let itemQuantity = result[i].count;
                            let deliveryDate = result[i].date_of_delivery;
                            let sqlItem = `SELECT * FROM item WHERE id = ${itemId};`;
                            con.query(sqlItem, function(err, result) {
                                if (err) throw err;
    
                                let item = {
                                    id: result[0].id,
                                    name: result[0].item_name,
                                    price: result[0].price,
                                    imgSrc: result[0].img_src,
                                    quantity: itemQuantity,
                                    date: deliveryDate
                                }
                                orders[i] = item;
    
                                if (i == orders.length - 1) {
                                    user.orders = orders;
                                    console.log(user);
                                    fs.readFile("./data/account.json", function(err, data) {
                                        if (err) throw err;
    
                                        let parsedData = JSON.parse(data);
                                        parsedData.account = user;
                                        console.log(parsedData);
                                        fs.writeFile("./data/account.json", JSON.stringify(parsedData), function(err) {
                                            if (err) throw err;
    
                                            con.end();
                                            return res.end();
                                        });
                                    });
                                }
                            });
                        }
                    }
                });
            } else {
                res.redirect("/login?incorrectData=true");
                console.log("User does not exist")

                con.end();
                return res.end();
            }
       });
   });
}

