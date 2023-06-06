function loadData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            loadAccountInfo(xhttp);
            loadOrders(xhttp);
        }
    }
    xhttp.open("GET", "/data/account.json", true);
    xhttp.send();
}

function loadAccountInfo(xhttp) {
    let rootJson = xhttp.responseText;
    let rootObj = JSON.parse(rootJson);
    let accountData = rootObj.account;

    document.getElementById("email").innerHTML = "Email: " + accountData.email;
    document.getElementById("name").innerHTML = "Name: " + accountData.name;
    document.getElementById("phoneNumber").innerHTML = "Phone number: " + accountData.phoneNumber;
    document.getElementById("address").innerHTML = "Address: " + accountData.address;
    document.getElementById("dateOfBirth").innerHTML = "Date of birth: " + accountData.dateOfBirth;
    document.getElementById("avatar").src = accountData.avatarSrc;
}

function loadOrders(xhttp) {
    let rootJson = xhttp.responseText;
    let rootObj = JSON.parse(rootJson);

    let list = document.getElementById("orders_list");
    list.innerHTML = generateOrders(rootObj.account.orders)
}

function generateOrders(orderDataList) {
    let result = "";
    for (i = 0; i < orderDataList.length; i++) {
        result += generateOrder(orderDataList[i]);
    }
    return result;
}

function generateOrder(orderData) {
    return `
        <div class="item_card"> 
            <img class="item_image" src="${orderData.imgSrc}" />
            <div class="item_label">
                <p class="item_name">
                    ${orderData.name}
                </p>
                <p class="item_quantity">
                    Quantity: ${orderData.quantity}
                </p>
                <p class="order_date">
                    Date: ${orderData.date}
                </p>
            </div>
        </div>
    `
}