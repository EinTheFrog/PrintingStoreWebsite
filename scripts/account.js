function loadData() {
    let xhttp = XMLHttpRequest();
    xhttp.onReadyStateChange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            loadAccountInfo(xhttp);
        }
    }
}

function loadAccountInfo() {

}