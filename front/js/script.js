const items = document.getElementById("items");

async function displayProducts() {
    let response = await fetch("http://localhost:3000/api/products");
    let kanaps = await response.json();

    for (kanap of kanaps) {
        let anchor = document.createElement('a');
        document.querySelector('#items').appendChild(anchor);
        anchor.href = `./product.html?id=${kanap._id}`;
    
        let article = document.createElement('article');
        anchor.appendChild(article);
    
        let image = document.createElement('img');
        article.appendChild(image);
        image.src = kanap.imageUrl;
        image.Alt = kanap.altTxt;
    
        let h3 = document.createElement('h3');
        article.appendChild(h3);
        h3.classList.add('productName');
        h3.textContent = kanap.name;
    
        let p = document.createElement('p');
        article.appendChild(p);
        p.classList.add('productDescription');
        p.textContent = kanap.description;
      }
    

    // for (kanap of kanaps) {//ligne 52 index html on récupère les valeurs
    //     items.innerHTML += `
    //     <a href="./product.html?id=${kanap._id}">
    //                                     <article>
    //                                     <img src=${kanap.imageUrl} alt=${kanap.altTxt}>
    //                                     <h3 class="productName">${kanap.name}</h3>
    //                                     <p class="productDescription">${kanap.description}</p>
    //                                     </article>
    //                                     </a>
    //                                     `;                                        
    // }
}
displayProducts();