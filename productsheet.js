 // Funzione per ottenere i parametri dalla query string
 function getQueryParams() {
    const params = {};
    const queryString = window.location.search.slice(1);
    const queries = queryString.split('&');

    queries.forEach(query => {
        const [key, value] = query.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
}

// mostro i dettagli del prodotto
const productParams = getQueryParams();
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('productName').textContent = productParams.name;
    document.getElementById('productDescription').textContent = productParams.description;
    document.getElementById('productBrand').textContent = productParams.brand;
    document.getElementById('productImg').src = productParams.imgUrl;
    document.getElementById('productPrice').textContent = `€${productParams.price}`;
});