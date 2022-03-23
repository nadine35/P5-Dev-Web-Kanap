let basket = JSON.parse(localStorage.getItem("basket"));
let section = document.getElementById("cart__items");

function displayCart(basket) {
  console.log(basket);
  for (let product of basket) {
    section.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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
               </article> `;
  }
}
displayCart(basket);

btn_supp = document.querySelectorAll(".deletItem");
console.log(btn_supp);

// Gestion de la suppréssion d'un produit
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < btn_supprimer.length; j++) {
    btn_supprimer[j].addEventListener("click", (event) => {
      event.preventDefault();

      // Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = basket[j].idProduit;
      let colorDelete = basket[j].couleurProduit;
      console.log(idDelete);
      basket = basket.filter(
        (el) => el.idProduit !== idDelete || el.couleurProduit !== colorDelete
      );

      localStorage.setItem("produit", JSON.stringify(basket));

      // Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();

//
//Initialisation du local storage

const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart() {
  if (basket === null || basket == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  }
}
// <div class="cart__order">
//           <form method="get" class="cart__order__form">
//             <div class="cart__order__form__question">
//               <label for="firstName">Prénom: </label>
//               <input type="text" name="firstName" id="firstName" required>
//               <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
//             </div>
// Vérification du formulaire
// Gestion du formulaire
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  // Création des expressions régulières
  let nameRegex = /^[a-zA-Z\-]+$/;
  let charRegExp = new RegExp("/ ^[a-zàâéèëêïîôùüçœ'’ -]{1,40}$/i.");
  let emailRegExp = new RegExp(
    "^[a-zA-Z.,-_]+[@]{1}[a-zA-Z-_]+[.]{1}[a-z]{2,10}$"
  );

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du nom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification de l'adresse
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification de la ville
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification de l'adresse mail
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  // Validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML =
        "Veuillez renseigner votre Prénom, il ne doit pas contenir de caractères spéciaux";
      invalid = true;
      firstName.style.border = "2px solid red";
    }
  };

  // Validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (nameRegex.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
      lastName.style.border = "none";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner votre Nom.";
      invalid = true;
      lastName.style.border = "3px solid red";
    }
  };

  // Validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (charRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner votre Adresse";
      invalid = true;
      address.style.border = "3px solid red";
    }
  };

  // Validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner votre Ville.";
      invalid = true;
      city.style.border = "3px solid red";
    }
  };

  // Validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Adresse email invalide.";

      email.style.border = "3px solid red";
      invalid = true;
    }
  };
}
getForm();
