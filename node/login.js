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
    password: "MaxPain2001",
    database: "printing_store"
})

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected")
        
        con.query("SELECT * FROM store_user WHERE email=" + userData.email + "AND user_password=" + userData.userPassword, function(err, result) {
            if (err) throw err;
            if (result.length > 0) {
               res.redirect("/HomePage");
               console.log("User exists")
               const jsonData = JSON.stringify(result[0]);
               fs.writeFile('account.json', jsonData, (err) => {
                if (err) throw err;
                else {
                    console.log("User data written to JSON");
                }
               })

            } else {
               res.redirect("/login");
               console.log("User does not exist")
            }
           con.end();
           return res.end();
       });
   });
}

