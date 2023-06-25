var fs = require ('fs');
const mysql = require('mysql');

exports.showLogin = function (res) {
    fs.readFile('login.html', function(err,data) {
        if (err) {
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end('404 NOT FOUND');
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
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
        console.log("Connected");

        con.query("SELECT * FROM store_user WHERE email=" + userData.email + "AND user_password=" + userData.userPassword, function(err,results) {
            if (err) throw err;
            if (results.length > 0) {
               res.redirect("/HomePage")
            } else {
               res.redirect("/login")
            }
           con.end();
           return res.end();
       });
   });
}