function loadTopBar() {
    document.getElementById("navbar").innerHTML = `
        <div class="navdiv">
            <div class="logo"><img src="companyLogo.jpeg" alt="our company logo" width="100" height="85"></div>
             <ul>
                <li><a class="tab" href="./HomePage.html">Home</a></li>
                <li><a>|</a></li>
                <li><a class="tab"  href="./shop.html">Shop</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="./account.html">Account</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="./cart.html">Cart</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="./login.html">Login</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="./SignUp_Page.html">Sign up</a></li>
            </ul>
        </div>
    `
}