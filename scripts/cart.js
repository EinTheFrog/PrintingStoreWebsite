function loadData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            loadItems(xhttp);
            loadTotalPrice(xhttp);
        }
    }
    xhttp.open("GET", "/data/cart.json", true);
    xhttp.send();
}

function loadItems(xhttp) {
    let rootJson = xhttp.responseText;
    let rootObj = JSON.parse(rootJson);

    let table = document.getElementById("items_list");
    table.innerHTML = generateItems(rootObj.items)
}

function loadTotalPrice(xhttp) {
    let rootJson = xhttp.responseText;
    let rootObj = JSON.parse(rootJson);

    let totalPrice = document.getElementById("total_price");
    totalPrice.innerHTML = "Total: " + calculateTotalPrice(rootObj.items).toFixed(2) + " AED"
}

function generateItems(itemDataList) {
    if (itemDataList === undefined) return "";

    let result = "";
    for (i = 0; i < itemDataList.length; i++) {
        result += generateItem(itemDataList[i]);
    }
    return result;
}

function calculateTotalPrice(itemDataList) {
    if (itemDataList === undefined) return 0;

    let result = 0;
    for (i = 0; i < itemDataList.length; i++) {
        result += itemDataList[i].price * itemDataList[i].quantity;
    }
    return result;
}

function changeCartItemQuantity(itemId) {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    let itemSelect = document.getElementById("select" + itemId);
    let selectedIndex = itemSelect.selectedIndex;
    let itemQuantity = itemSelect.options[selectedIndex].value;
    form.setAttribute('action', '/changeCartItemQuantity?quantity=' + itemQuantity + '&itemId=' + itemId);
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}

function generateItem(itemData) {
    return `
        <div class="item_card"> 
            <img class="item_image" src="${itemData.imgSrc}" />
            <div class="item_label">
                <p class="item_name">
                    ${itemData.name}
                </p>
                <p class="item_quantity">
                    Quantity: &nbsp;
                    <select id=select${itemData.itemId} onchange=changeCartItemQuantity(${itemData.itemId})>
                        <option value="1" ${itemData.quantity == 1 ? "selected" : ""}>1</option>
                        <option value="2" ${itemData.quantity == 2 ? "selected" : ""}>2</option>
                        <option value="3" ${itemData.quantity == 3 ? "selected" : ""}>3</option>
                        <option value="4" ${itemData.quantity == 4 ? "selected" : ""}>4</option>
                        <option value="5" ${itemData.quantity == 5 ? "selected" : ""}>5</option>
                    </select>
                </p>
            </div>
        </div>
    `
}