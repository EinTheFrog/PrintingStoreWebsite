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
    let userAvatarSrc = "";
    let userEmail = userData.email;
    let userPassword = userData.password;

    console.log("EDIT PROFILE");
    console.log(userDateOfBirth);
    
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "printing_store"
    });

    let sqlFindId = `
        SELECT id, user_password FROM store_user WHERE email = '${userEmail}';
    `

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected");
        
        con.query(sqlFindId, function(err, result) {
            if (err) throw err;

            let userId = result[0].id;

            if (userPassword === undefined) {
                userPassword = result[0].user_password;
            }

            if (userDateOfBirth === undefined || userDateOfBirth == "") {
                userDateOfBirth = result[0].date_of_birth;
                console.log("Empty date of birth");
            }
            console.log("date of birth: " + userDateOfBirth)

            if (req.files) {
                let avatarFile = req.files.avatar;
                let buf = Buffer.from(avatarFile.data, avatarFile.encoding);
                let newAvatarFilePath = "./resources/images/" + userId + "_" + avatarFile.name;
                fs.writeFile(newAvatarFilePath, buf, function(err) { 
                    if (err) throw err;
                });
                userAvatarSrc = newAvatarFilePath;
            }

            if (userAvatarSrc == "") {
                userAvatarSrc = result[0].avatar_src;
            }


            let sqlUpdate = `
                UPDATE store_user
                SET user_name = '${userName}', email = '${userEmail}', mobile = '${userPhoneNumber}', 
                address = '${userAddress}', date_of_birth = '${userDateOfBirth}',
                avatar_src = '${userAvatarSrc}', user_password = '${userPassword}'
                WHERE id = '${userId}';
            `;

            let newUserData = {
                email: userEmail,
                name: userName,
                phoneNumber: userPhoneNumber,
                address: userAddress,
                dateOfBirth: userDateOfBirth,
                avatarSrc: userAvatarSrc
            };
        
            con.query(sqlUpdate, function(err, result) {
                if (err) throw err;
                console.log("User record updated");

                fs.readFile("./data/account.json", function(err, data) {
                    let parsedData = JSON.parse(data);
                    let oldUserData = parsedData.account;
                    newUserData.orders = oldUserData.orders;
                    parsedData.account = newUserData;
                    fs.writeFile("./data/account.json", JSON.stringify(parsedData), function(err) {
                        if (err) throw err;
                    });
                });
                res.redirect("/account");
                con.end();
                return res.end();
            });
        })
    });
}