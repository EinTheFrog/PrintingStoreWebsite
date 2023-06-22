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

exports.proceedSignUpClick = function(req, res) {
    let userData = req.body;
    
    if (userData.email == "tylerbaudelaire@gmail.com") {
        res.redirect("/");
    } else {
        res.redirect("/sign_up");
    }
    return res.end();
}