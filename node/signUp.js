let fs = require("fs");

exports.showSignUp = function(req, res) {
    fs.readFile("./SignUp_Page.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};

exports.proceedSignUpClick = function(req, res, con) {
    let userData = req.body;
    let userName = userData.firstName + " " + userData.middleName + " " + userData.lastName;
    let userEmail = userData.email;
    let userPassword = userData.password;

    let sqlInsert = `
        INSERT INTO store_user(user_name, email, user_password) VALUES
        ('${userName}', '${userEmail}', '${userPassword}');
    `;

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected")
        
        con.query(sqlInsert, function(err, result) {
            if (err) throw err;
            console.log("New record inserted into shop user table");
        });
    });

    
    res.redirect("/login");
    return res.end();
}