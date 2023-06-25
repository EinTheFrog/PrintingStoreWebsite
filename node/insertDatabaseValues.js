const mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //your database password
    database: "printing_store"
});

let insertValues1 = `
    INSERT INTO item(item_name, price, img_src) VALUES
    ('NASA T-shirt', 30.00, './resources/images/nasa_tshirt.png'),
    ('Office Cup', 10.00, './resources/images/office_cup.png'),
    ('Star Wars Hoodie', 50.00, './resources/images/star_wars_hoodie.png'),
    ('NASA Sweater', 99.00, './resources/images/sweater.png'),
    ('Tyler The Creator Poster', 22.00, './resources/images/tyler_the_creator_poster.png');
`;

let insertValues2 = `
    INSERT INTO store_user(user_name, email, mobile, date_of_birth, avatar_src, address, user_password) VALUES
    ('Tyler Baudalaire', 'tylerbaudelaire@gmail.com', '+1 (885) 4444-8888', '1991-03-6', './resources/images/avatar.png', 'Hawhorne, CA, USA', 'tyler1991');
`;


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    
    con.query(insertValues1, function(err, result) {
        if (err) throw err;
        console.log("Values 1 inserted");
    });
    con.query(insertValues2, function(err, result) {
        if (err) throw err;
        console.log("Values 2 inserted");
    });
});