const fs = require("fs");
const mysql = require("mysql");

exports.showEditProfile = function(res) {
    fs.readFile("./edit_profile.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};

exports.proceedEditProfileClick = function(req, res) {
    let userData = req.body;
    let userName = userData.userName;
    let userPhoneNumber = userData.phoneNumber;
    let userAddress = userData.address;
    let userDateOfBirth = userData.dateOfBirth;
    let userEmail = userData.email;
    let userPassword = userData.password;

    
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "MaxPain2001",
        database: "printing_store"
    });

    let sqlFindId = `
        SELECT id, user_password FROM store_user WHERE email = '${userEmail}';
    `

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected");
        
        con.query(sqlFindId, function(err, result) {
            let userId = result[0].id;
            console.log(result);

            if (userPassword === undefined) {
                userPassword = result[0].user_password;
            }

            let sqlUpdate = `
                UPDATE store_user
                SET user_name = '${userName}', mobile = '${userPhoneNumber}', 
                address = '${userAddress}', date_of_birth = '${userDateOfBirth}',
                email = '${userEmail}', user_password = '${userPassword}'
                WHERE id = '${userId}';
            `;
        
            con.query(sqlUpdate, function(err, result) {
                if (err) throw err;
                console.log("User record updated");
                res.redirect("/account");
                con.end();
                return res.end();
            });
        })
    });
}