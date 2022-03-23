const items = document.getElementById("items");

async function displayProducts() {
    let response = await fetch("http://localhost:3000/api/products");
    let kanaps = await response.json();

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
displayProducts();