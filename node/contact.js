let fs = require("fs");

exports.showContact = function(res) {
    fs.readFile("./contact.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
};

exports.useContactStyle = function(res) {
    fs.readFile("./contact_styles.css", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/css" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(data);
        return res.end();
    });
};