//je met dans une variable l'élément id récupéré dans l'index
const items = document.getElementById("items");

async function displayProducts() {
    //cherche dans l'api les produits et met dans la variable response
    let response = await fetch("http://localhost:3000/api/products");
    //response est mis au format json dans la variable kanaps
    let kanaps = await response.json();

// Pour chaque kanap de kanaps(response du fetch) trouvé dans products
//je récupère  les valeurs id, images, nom et description des kanap dans ma page index, page d'accueil
    for (kanap of kanaps) {
        items.innerHTML += `
        <a href="./product.html?id=${kanap._id}">
                                        <article>
                                        <img src=${kanap.imageUrl} alt=${kanap.altTxt}>
                                        <h3 class="productName">${kanap.name}</h3>
                                        <p class="productDescription">${kanap.description}</p>
                                        </article>
                                        </a>
                                        `;                                        
    }
}
//je rappelle la fonction pour return les résultats
displayProducts();