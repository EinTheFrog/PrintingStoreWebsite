const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const loginModule = require("./login");
const signUpModule = require("./signUp");
const accountModule = require("./account");
const editProfileModule = require("./editProfile");
const contactModule = require("./contact");
const aboutUsModule = require("./aboutUs");
const shopModule = require("./shop");
const cartModule = require("./cart");
const paymentModule = require("./payment");
const homeModule = require("./home");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.get("/login", function(req, res) {
    console.log("login");
    loginModule.showLogin(req, res);
});
app.get("/sign_up", function(req, res) {
    console.log("sign_up");
    signUpModule.showSignUp(req, res);
});
app.get("/account", function(req, res) {
    console.log("account");
    accountModule.showAccount(res);
});
app.get("/edit_profile", function(req, res) {
    console.log("edit_profile");
    editProfileModule.showEditProfile(res);
});
app.get("/contact", function(req, res) {
    console.log("contact");
    contactModule.showContact(res);
});
app.get("/about_us", function(req, res) {
    console.log("about_us");
    aboutUsModule.showAboutUs(res);
});
app.get("/shop", function(req, res) {
    console.log("shop");
    shopModule.showShop(res);
});
app.get("/cart", function(req, res) {
    console.log("cart");
    cartModule.showCart(res);
});
app.get("/payment", function(req, res) {
    console.log("payment");
    paymentModule.showPayment(res);
});
app.get("/", function(req, res) {
    console.log("home");
    homeModule.showHome(res);
});

app.post("/loginClick", function(req,res) {
    console.log("login");
    loginModule.proceedloginClick(req, res);
})
app.post("/signUpClick", function(req, res) {
    signUpModule.proceedSignUpClick(req, res);
});
app.post("/editProfileClick", function(req, res) {
    editProfileModule.proceedEditProfileClick(req, res);
});
app.post("/changeCartItemQuantity", function(req, res) {
    console.log('ON CHANGE');
    cartModule.proceedChangeCartItemQuantity(req, res);
});
app.post("/shopItemClick", function(req, res) {
    console.log("SHOP ITEM CLICK");
    shopModule.proceedShopItemClick(req, res);
});

app.use(express.static("./"));
app.listen(8080);