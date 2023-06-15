let http = require("http");
let url = require("url");
let fs = require("fs");
let querystring = require("querystring");

let loginModule = require("./login");
let signUpModule = require("./signUp");
let accountModule = require("./account");
let editProfileModule = require("./editProfile");
let contactModule = require("./contact");
let aboutUsModule = require("./aboutUs");
let shopModule = require("./shop");
let cartModule = require("./cart");
let paymentModule = require("./payment");
let topBarModule = require("./topBar");
let homeModule = require("./home");


http.createServer(function(req, res) {
    switch(req.url) {
        // styles
        case "./login_styles.css":
            loginModule.userModuleStyle(res);
            break;
        case "./SignUp_Page.css":
            signUpModule.useSignUpStyle(res);
            break;
        case "./account_styles.css":
            accountModule.useAccountStyle(res);
            break;
        case "./edit_profile_styles.css":
            editProfileModule.useEditProfileStyle(res);
            break;
        case "./contact_styles.css":
            contactModule.useContactStyle(res);
            break;
        case "./about_Us_Style.css":
            aboutUsModule.useAboutUsStyle(res);
            break;
        case "./shop_styles.css":
            shopModule.useShopStyle(res);
            break;
        case "./cart_styles.css":
            cartModule.useCartStyle(res);
            break;
        case "./payment_styles.css":
            paymentModule.userPaymentStyle(res);
            break;
        case "./top_bar_style.css": 
            topBarModule.useTopBarStyle(res);
            break;
        case "./homePageStyle.css": 
            homeModule.useHomeStyle(res);
            break;
        // html-s
        case "/login":
            console.log("login");
            showLogin();
            break;
        case "/sign_up":
            console.log("sing_up");
            showSignUp();
            break;
        case "/account":
            console.log("contact");
            showAccount();
            break;
        case "/edit_profile":
            console.log("contact");
            showEditProfile();
            break;
        case "/contact":
            console.log("contact");
            contactModule.showContact(res);
            break;
        case "/about_us":
            console.log("contact");
            showAboutUs();
            break;
        case "/shop":
            console.log("shop");
            showShop();
            break;
        case "/cart":
            console.log("cart");
            showCart();
            break;
        default: 
            console.log("home");
            homeModule.showHome(res);
            break;
    }
}).listen(8080);