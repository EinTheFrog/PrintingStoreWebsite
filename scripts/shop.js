function loadData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            loadItems(xhttp);
        }
    }
    xhttp.open("GET", "/data/items.json", true);
    xhttp.send();
}

function loadItems(xhttp) {
    let rootJson = xhttp.responseText;
    let rootObj = JSON.parse(rootJson);

    let table = document.getElementById("items_table");
    table.innerHTML = generateItems(rootObj.items)
}

function generateItems(itemDataList) {
    let result = "";
    for (i = 0; i < itemDataList.length; i++) {
        result += generateItem(itemDataList[i]);
    }
    return result;
}

function generateItem(itemData) {
    return `
        <div class="item_container">
            <div class="item_card"> 
                <img class="item_image" src="${itemData.imgSrc}" />
                <div class="item_label">
                    <p class="item_name">
                        ${itemData.name}
                    </p>
                    <p class="item_price">
                        ${itemData.price.toFixed(2)} AED
                    </p>
                </div>
             </div>
             <div class="item_effect">
            </div>
        </div>
    `
}



            