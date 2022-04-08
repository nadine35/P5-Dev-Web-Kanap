
// renvoie la partie de la chaine de requête d'une URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
// var str = window.location.href;

const urlProduit = `http://localhost:3000/api/products/${productId}`;
// Cherche dans l'urlProduit qui a l'id du produit appelé une réponse au format
//json dans laquelle tu retournes dans article les éléments demandés par la suite
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

    // Récupération de l'id  dans une variable 
    const titleProduct = document.getElementById("title");
    // inserer le titre
    titleProduct.textContent = article.name;

    
    const desc = document.getElementById("description");
    //inserer la description
    desc.textContent = article.description;

    
    const kanap_prix = document.getElementById("price");
    //inserer le prix
    kanap_prix.textContent = article.price;

    
    const detailDesc = document.getElementById("description");
    //insérer paragraphe description kanap
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

//Récupérer données sélectionnées du kanap par l'utilisateur avec la fonctio
//addEventlistener
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
    if ((quantity > 0 || quantity < 100) && color !== "") {
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
//si le produit n'a pas la même id et la même couleur alors 
//on push le produit dans le basket
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
        //sinon si le produit à la même id et la même couleur on ajoute
        //la nouvelle quantité dans le basket
      } else {
        for (let p of basket) {
          if (p.id == productId && p.color == color) {
            p.quantity = Number(quantity) + p.quantity;
            break;
          }
        }
      }
      // on ajoute la valeur du basket dans le localstorage en chaine json
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }
});
