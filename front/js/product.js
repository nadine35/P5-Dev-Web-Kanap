const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
var str = window.location.href;

const urlProduit = `http://localhost:3000/api/products/${productId}`;
//requête http avec GET pour récupérer des données
fetch(urlProduit)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert("erreur api");
    }
  })
  .then(async function (resAPI) {
    article = await resAPI;

    // inserer l'image
    const imgSrc = document.getElementById("imgProduct");
    imgSrc.src = article.imageUrl;

    // inserer le titre
    const titleProduct = document.getElementById("title");
    titleProduct.textContent = article.name;

    //inserer la description
    const desc = document.getElementById("description");
    desc.textContent = article.description;

    //inserer le prix
    const kanap_prix = document.getElementById("price");
    kanap_prix.textContent = article.price;

    //insérer paragraphe description kanap
    const detailDesc = document.getElementById("description");
    detailDesc.textContent = article.altTxt;

    let color_select = document.querySelector("#colors"); // Selection du noeud

    // Stockage des couleurs disponible dans une variable
    for (color of article.colors) {
      let option = document.createElement("option");
      option.value = color; //j'ajoute l'attribut value à options et sa valeur
      color_select.appendChild(option);
      option.textContent = color;
    }
  })
  .catch(function (error) {
    console.log(error);
  });

//Récupérer quantité sélectionnée et coloris du kanap par l'utilisateur
document.getElementById("addToCart").addEventListener("click", function () {
  let quantity = document.getElementById("quantity").value;
  let color = document.getElementById("colors").value;
  let name = document.getElementById("title").textContent;
  let id = productId;
  let price = document.getElementById("price").textContent;
  let image = document.getElementById("imgProduct").src;
  let basket = JSON.parse(localStorage.getItem("basket"));
// si le panier n'a pas été créé on initialise la variable avec un tableau vide
  if (basket == null) {
    basket = [];
  }

  if (quantity === "0") {
    alert("veuillez choisir une quantité supèrieure à 0 !");
  } else if (color == "") {
    alert("Vous devez choisir une couleur !");
  } else {
    if ((quantity > 0 && quantity <= 100 && quantity !=0) && color !== "") {
      //vérification si le produit est déjà dans le panier
      let productExists = false;
      if (basket.length > 0) {
        for (let p of basket) {
          if (p.id == productId && p.color == color) {
            productExists = true;
            break;
          }
        }
      }

      if (productExists == false) {
        let product = {
          quantity: Number(quantity),
          color: color,
          id: productId,
          name: name,
          price: Number(price),
          imageUrl: image,
        };

        basket.push(product);
      } else {
        for (let p of basket) {
          if (p.id == productId && p.color == color) {
            p.quantity = Number(quantity) + p.quantity;
            break;
          }
        }
      }
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }
});
