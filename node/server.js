let http = require('http');
let url = require('url');
let fs = require('fs');
let querystring = require('querystring');

let contactModule = require('./contact')

http.createServer(function(req, res) {
    switch(req.url) {
        case "/home":
            showHome();
            break;
        case "/login":
            showLogin();
            break;
        case "/sign_up":
            showSignUp();
            break;
        case "/account":
            showAccount();
            break;
        case "/edit_profile":
            showEditProfile();
            break;
        case "/contact":
            showContact(res);
            break;
        case "/about_us":
            showAboutUs();
            break;
        case "/shop":
            showShop();
            break;
        case "/cart":
            showCart();
            break;
    }
});