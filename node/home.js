let fs = require("fs");
let path = require("path");

exports.showHome = function(res) {
    let filePath = path.join(__dirname, "../HomePage.html");
    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }

        const extension = path.extname(filePath);
        let contentType = "text/html";

        switch (extension) {
            case ".css":
                contentType = "text/css";
                break;
            case ".js":
                contentType = "application/javascript";
                break;
            // Add more cases for other file types if needed

            default:
                contentType = "text/html";
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.write(data);
        return res.end();
    });



};

exports.proceedHomeClick = function(res) {
    console.log("user clicked on visit shop");
    
}