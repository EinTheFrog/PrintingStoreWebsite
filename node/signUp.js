const fs = require("fs");
const mysql = require("mysql");

exports.showSignUp = function(req, res) {
    fs.readFile("./SignUp_Page.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        console.log(req.query);
        if (req.query.userExists) {
            res.write(`
                <script>
                    document.getElementById("user_exists").innerHTML = "User with this email already exists. Please use another email or log in to an existing account";
                </script>
            `)
        }
        return res.end();
    });
};

exports.proceedSignUpClick = function(req, res) {
    let userData = req.body;
    let userName = userData.firstName + " " + userData.middleName + " " + userData.lastName;
    let userEmail = userData.email;
    let userPassword = userData.password;

    let sqlInsert = `
        INSERT INTO store_user(user_name, email, user_password) VALUES
        ('${userName}', '${userEmail}', '${userPassword}');
    `;

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "MaxPain2001",
        database: "printing_store"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected");
        
        con.query(sqlInsert, function(err, result) {
            if (err) {
                if (err.code = "ER_DUP_ENTRY") {
                    res.redirect("/sign_up?userExists=true");
                } else {
                    throw err;
                }
                con.end();
                return res.end();
            } else {
                console.log("New record inserted into shop user table");
                res.redirect("/login");
                con.end();
                return res.end();
            }
        });
    });
}
