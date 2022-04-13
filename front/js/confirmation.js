const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");


document.getElementById("orderId").innerHTML=orderId;
// on vide le localstorage après la commande
localStorage.clear()