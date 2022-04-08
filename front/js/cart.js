// on récupère la valeur du panier en chaine js
let basket = JSON.parse(localStorage.getItem("basket"));

// Condition de vérification si le panier existe et ou est vide et modification texte
if (basket === null || basket.length === 0) {
  document.querySelector("h1").textContent = " Votre panier est vide !";
}
let section = document.getElementById("cart__items");

function displayCart(basket) {
  //pour chaque produit "product"du panier "basket" dans la section id
  //"cart_items" je remplace dans le html les valeurs du panier
  for (let product of basket) {
    section.innerHTML += `<article class="cart__item" data-id=${product.id} data-color=${product.color}>
                 <div class="cart__item__img">
                   <img src="${product.imageUrl}" alt="Photographie d'un canapé">
                 </div>
                 <div class="cart__item__content">
                   <div class="cart__item__content__description">
                     <h2>${product.name}</h2>
                     <p>${product.color}</p>
                     <p>${product.price}€</p>
                   </div>
                   <div class="cart__item__content__settings">
                     <div class="cart__item__content__settings__quantity">
                       <p>Qté : </p>
                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                     </div>
                     <div class="cart__item__content__settings__delete">
                       <p class="deleteItem">Supprimer</p>
                     </div>
                   </div>
                 </div>
               </article>
                `;
  }
}
//je rappelle la fonction
displayCart(basket);

//récupération du prix total
function getTotalPrix() {
  //création d'un tableau vide du prix total des produits
  let prixTotalCalcul = [];
  //récupération de l'id du prix total"totalPrice" dans une variable
  let prixTotalArticle = document.getElementById("totalPrice");
  //récupération de l'id de la quantité totale "totalQuantity" dans une variable
  let qteTotalArticle = document.getElementById("totalQuantity");
  //a chaque élément du tableau panier, calcul du prix*quantité
  for (let m = 0; m < basket.length; m++) {
    //je mets dans une variable le prix*la quantité
    let prixProduitDansLePanier = basket[m].price * basket[m].quantity;

    //je push le "prixProduitDansLePanier"vers mon tableau prixTotalCalcul
    prixTotalCalcul.push(prixProduitDansLePanier);
  }
  //additionner les prix dans le tableau prixTotal avec la méthode reducer
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotal = prixTotalCalcul.reduce(reducer, 0);
  //j'écris le prix total "prixTotal"dans le html :
  //prixTotalArticle ayant l'id "totalPrice"
  prixTotalArticle.innerHTML = prixTotal;
}
getTotalPrix();

function getTotalQtes() {
  let qteTotalCalcul = [];
  let qteTotalArticle = document.getElementById("totalQuantity");

  for (let l = 0; l < basket.length; l++) {
    let qteProduitDansLePanier = basket[l].quantity;
    //A chaque produit présent dans le panier je push la quantité modifiée
    //dans le tableau qteTotalCalcul
    qteTotalCalcul.push(qteProduitDansLePanier);
  }
  //additionner les quantités dans le tableau qteTotalCalcul avec la méthode reducer
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const qteTotal = qteTotalCalcul.reduce(reducer, 0);
  
  qteTotalArticle.innerHTML = qteTotal;
}
getTotalQtes();

let btnSupprimer = document.querySelectorAll(".deleteItem");
for (let j = 0; j < btnSupprimer.length; j++) {
  btnSupprimer[j].addEventListener("click", (event) => {
    event.preventDefault();

    // Selection de l'element à supprimer en fonction de son id ET sa couleur
    let idDelete = basket[j].id;
    let colorDelete = basket[j].color;

    //je filtre dans le basket les produits qui n'ont pas la même id
    //et la même couleur
    basket = basket.filter(
      (el) => el.id !== idDelete || el.color !== colorDelete
    );

    localStorage.setItem("basket", JSON.stringify(basket));

    // Alerte attention produit supprimé et remise à zéro de la page panier
    alert("Ce produit va être supprimé du panier !");
    location.reload();
  });
}

function modifQte() {
  let input = document.querySelectorAll(".itemQuantity");
  for (let j = 0; j < input.length; j++) {
    input[j].addEventListener("change", function (e) {
      //la quantité se modifie à chaque changement dans la fenêtre et le html
      //avec le addEventListener dans l'input
      let quantityModif = basket[j].quantity;
      let qttModifValue = input[j].valueAsNumber;
      const resultFind = basket.find(
        (el) => el.qttModifValue !== quantityModif
      );
      resultFind.quantiteProduit = qttModifValue;
      basket[j].quantity = resultFind.quantiteProduit;
      

      localStorage.setItem("basket", JSON.stringify(basket));
      
      quantityModif = e.target.value;
      location.reload();
      
    });
  }
}

modifQte();

// Gestion du formulaire
//récupération de l'id du bouton commander
const btnEnvoyerFormulaire = document.querySelector("#order");
//au click du bouton je récupère et introduit dans l'objet contact les
//valeurs du prénom, nom, adresse et email
btnEnvoyerFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  // Regex pour le contrôle des champs Prénom, Nom et Ville
  const regExPrenomNomVille = (value) => {
    return /^[a-zA-Z\-]+$/.test(value);
  };

  // Regex pour le contrôle du champ Adresse
  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  // Regex pour le contrôle du champ Email
  const regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };

  // Fonctions de contrôle du champ Prénom:
  function firstNameControl() {
    //je récupère dans une variable prenom le firstName(id)lié à l'objet
    //contact plus haut

    const prenom = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if (regExPrenomNomVille(prenom)) {
      //si la valeur du prénom correspond au regex, l'input se met en vert
      inputFirstName.style.backgroundColor = "green";
//le message d'erreur ne contient rien
      document.querySelector("#firstNameErrorMsg").textContent = "";
//si le regex est ok je retourne true
      return true;
      //sinon l'input du prenom se met au rouge
    } else {
      
      inputFirstName.style.backgroundColor = "#FF6F61";
      document.querySelector("#firstNameErrorMsg").textContent =
        "Champ Prénom de formulaire invalide, Veuillez entrer une majuscule au début du nom, prénom et ville et pas de caractères spéciaux s'il vous plaît";
      return false;
    }
  }

  // Fonctions de contrôle du champ Nom:
  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if (regExPrenomNomVille(nom)) {
      inputLastName.style.backgroundColor = "green";

      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      inputLastName.style.backgroundColor = "#FF6F61";

      document.querySelector("#lastNameErrorMsg").textContent =
        "Champ Nom de formulaire invalide, ex: Durand";
      return false;
    }
  }

  // Fonctions de contrôle du champ Adresse:
  function addressControl() {
    const adresse = contact.address;
    let inputAddress = document.querySelector("#address");
    if (regExAdresse(adresse)) {
      inputAddress.style.backgroundColor = "green";

      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      inputAddress.style.backgroundColor = "#FF6F61";

      document.querySelector("#addressErrorMsg").textContent =
        "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
      return false;
    }
  }

  // Fonctions de contrôle du champ Ville:
  function cityControl() {
    const ville = contact.city; //dans l'objet let contact
    let inputCity = document.querySelector("#city");
    if (regExPrenomNomVille(ville) && regExPrenomNomVille !== null) {
      inputCity.style.backgroundColor = "green";

      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      inputCity.style.backgroundColor = "#FF6F61";

      document.querySelector("#cityErrorMsg").textContent =
        "Champ Ville de formulaire invalide, ex: Paris";
      return false;
    }
  }

  // Fonctions de contrôle du champ Email:
  function mailControl() {
    const mail = contact.email; //de l'objet let contact
    let inputMail = document.querySelector("#email");
    if (regExEmail(mail)) {
      inputMail.style.backgroundColor = "green";

      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      inputMail.style.backgroundColor = "#FF6F61";

      document.querySelector("#emailErrorMsg").textContent =
        "Champ Email de formulaire invalide, ex: example@contact.fr";
      return false;
    }
  }
  //je créé un tableau vide de produit
  let products = [];

  //collecter les id des produits du panier 
  //et les mettre dans le tableau produit
  basket.forEach((element) => {
    products.push(element.id);
  });
  // Contrôle validité formulaire avant de l'envoyer dans le local storage
  //si les éléments du formulaire correspondent au regex
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl() 
    
  ) {
    //je push la ou les id produits commandées dans tab products[]
    // et les infos formulaire de l'objet contact créé plus haut
    // dans un objet nommé envoiFormulaire
     

    let envoiFormulaire = {
      contact,
      products,
    };

    console.log("Formulaire à envoyer à l'API : ", envoiFormulaire);
    // Send the object with the POST method.
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      //l'objet js envoiFormulaire est convertit en chaine json
      body: JSON.stringify(envoiFormulaire),
      headers: {
        "Content-Type": "application/json",
        
      },
      
    })
    
      .then(async (res) => {
        //en attente reponse du fetch dans la variable reponse json(en un objet javascript)
        response = await res.json();
        //ajout de la réponse de l'id de la commande dans l'url
        document.location.href =
          "confirmation.html?orderId=" + response.orderId;
          //créer des chaînes en remplaçant les espaces réservés avec backtip
        document.location.href = `confirmation.html?orderId=${response.orderId}`;
      })
      //si erreur
      .catch((e) => {
        console.log(e);
      });
  } else {
    e.preventDefault();
  }
});
