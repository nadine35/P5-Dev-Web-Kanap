// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const orderId = urlParams.get("orderId");


 //document.getElementById("orderId").innerHTML=orderId;

 // renvoie la partie de la chaine de requête d'une URL
let params = new URLSearchParams(document.location.search);

//recupération de la chaine "orderId"
let orderId = params.get("orderId"); // is the string "orderId"

//écriture de la chaine orderId dans le html
document.getElementById("orderId").innerHTML=orderId;

