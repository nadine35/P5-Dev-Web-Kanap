let basket = JSON.parse(localStorage.getItem("basket"));

// Condition de vérification si le panier existe et ou est vide et modification texte
if (basket === null || basket.length === 0) {
  document.querySelector("h1").textContent = " Votre panier est vide !";
}
let section = document.getElementById("cart__items");
let blabla = document.getElementsByClassName(".article");
function displayCart(basket) {
  
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

displayCart(basket);

function getTotalPrix() {
  let prixTotalCalcul = [];
  let prixTotalArticle = document.getElementById("totalPrice");
  let qteTotalArticle = document.getElementById("totalQuantity");
  for (let m = 0; m < basket.length; m++) {
    let prixProduitDansLePanier = basket[m].price * basket[m].quantity;
    //mettre prix dans variable prixTotalCalcul

    prixTotalCalcul.push(prixProduitDansLePanier);

   
  }
  //additionner les prix dans le tableau prixTotal avec la méthode reducer
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotal = prixTotalCalcul.reduce(reducer, 0);
  prixTotalArticle.innerHTML = prixTotal;
}
getTotalPrix();

function getTotalQtes() {
  let qteTotalCalcul = [];
  let qteTotalArticle = document.getElementById("totalQuantity");

  for (let l = 0; l < basket.length; l++) {
    let qteProduitDansLePanier = basket[l].quantity;
    //mettre prix dans variable prixTotalCalcul
    qteTotalCalcul.push(qteProduitDansLePanier);

   
  }
  //additionner les prix dans le tableau prixTotal avec la méthode reducer
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
      // Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = basket[j].quantity;
      let qttModifValue = input[j].valueAsNumber;
      const resultFind = basket.find(
        (el) => el.qttModifValue !== quantityModif
      );
      resultFind.quantiteProduit = qttModifValue;
      basket[j].quantity = resultFind.quantiteProduit;
      // +totalQuantity;

      localStorage.setItem("basket", JSON.stringify(basket));
      //ce que j'avais fait avant :
      //  let quantityModif=basket[j].quantity;

      quantityModif = e.target.value;
      location.reload();
      // refresh rapide
    });
  }
}

modifQte();

// Gestion du formulaire

const btnEnvoyerFormulaire = document.querySelector("#order");

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
    const prenom = contact.firstName;

    let inputFirstName = document.querySelector("#firstName");
    if (regExPrenomNomVille(prenom)) {
      inputFirstName.style.backgroundColor = "green";

      document.querySelector("#firstNameErrorMsg").textContent = "";

      return true;
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
    const ville = contact.city;
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
    const mail = contact.email;
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
  let products = [];

  //collecter les id des produits du panier
  basket.forEach((element) => {
    products.push(element.id);
  });
  // Contrôle validité formulaire avant de l'envoyer dans le local storage
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl() &&
    products !== null
  ) {
    //je mets le tableau des id produits achetées et les infos formulaire contact
    // dans un objet

    let envoiFormulaire = {
      contact,
      products,
    };

    console.log("Formulaire à envoyer à l'API : ", envoiFormulaire);
    // Send the object with the POST method.
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(envoiFormulaire),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        //reponse du fetch en réponse json(en un objet javascript)
        response = await res.json();

        document.location.href =
          "confirmation.html?orderId=" + response.orderId;
        document.location.href = `confirmation.html?orderId=${response.orderId}`;
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    e.preventDefault();
  }
});
