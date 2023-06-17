function loadTopBar() {
    document.getElementById("navbar").innerHTML = `
        <div class="navdiv">
            <div class="logo"><img src="./resources/images/companyLogo.jpeg" alt="our company logo" width="100" height="85"></div>
             <ul>
                <li><a class="tab" href="/">Home</a></li>
                <li><a>|</a></li>
                <li><a class="tab"  href="/shop">Shop</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="/cart">Cart</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="/account">Account</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="/login">Login</a></li>
                <li><a>|</a></li>
                <li><a class="tab" href="/sign_up">Sign up</a></li>
            </ul>
        </div>
    `
}