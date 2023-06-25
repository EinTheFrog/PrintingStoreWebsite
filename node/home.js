let fs = require("fs");

exports.showHome = function(res) {
    fs.readFile("./HomePage.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};

exports.proceedHomeClick = function(res) {
    console.log("user clicked on visit shop");
    
}