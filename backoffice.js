//EFFETUO LA CHIAMATA GET 
fetch('https://striveschool-api.herokuapp.com/api/product/', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YWFhNjVkNzU4NzAwMTUzNzg2MzYiLCJpYXQiOjE3Mjk2MDQ1NTIsImV4cCI6MTczMDgxNDE1Mn0.8tN48uZdzowx2uC_enEnzNI-LJhXE1vIfh8_OgE_L2M'
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => { 
        throw new Error(text); 
      });
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
    
    /*per Riccardo: controllo quali prodotti ho aggiunto perchè con quokka mi dava errore, solo dopo in console mi sono accorta che la fetch 
    di tipo post avesse inviato dei dati che avevo inserito in modo errato*/ 
     
    function getProdottiEsistenti() {
        return fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YWFhNjVkNzU4NzAwMTUzNzg2MzYiLCJpYXQiOjE3Mjk2MDQ1NTIsImV4cCI6MTczMDgxNDE1Mn0.8tN48uZdzowx2uC_enEnzNI-LJhXE1vIfh8_OgE_L2M'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel recupero dei prodotti');
            }
            return response.json();
        });
    }
    
    function prodottoEsiste(prodottiEsistenti, nuovoProdotto) {
        return prodottiEsistenti.some(prodotto =>
            prodotto.name === nuovoProdotto.name &&
            prodotto.brand === nuovoProdotto.brand &&
            prodotto.price === nuovoProdotto.price &&
            prodotto.imageUrl === nuovoProdotto.imageUrl
        );
    }

    // volevo inviare 4 oggetti perciò ne ho aggiunti altri due
    const prodotti = [ 
        {
            name: "cuffie",
            description: "cuffie wirless nere o bianche",
            brand: "Lenovo",
            price: 25,
            imageUrl: "https://m.media-amazon.com/images/I/41r5burShsL._AC_UL480_FMwebp_QL65_.jpg"
        },
        {
            name: "Stampante",
            description: "Stampamnte a colori fronte retro manuale",
            brand: "Hp",
            price: 55,
            imageUrl: "https://m.media-amazon.com/images/I/61s+2QeccIL._AC_UY327_FMwebp_QL65_.jpg"
        }
    ];
    
    prodotti.forEach((prodotto) => {
        fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YWFhNjVkNzU4NzAwMTUzNzg2MzYiLCJpYXQiOjE3Mjk2MDQ1NTIsImV4cCI6MTczMDgxNDE1Mn0.8tN48uZdzowx2uC_enEnzNI-LJhXE1vIfh8_OgE_L2M',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prodotto)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Prodotto inviato con successo:', data);
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    });

   // Mostro i prodotti nella pagina HTML
function MostraProdotti(prodotti) {
    const ListaProdotti = document.getElementById('product-list');
    ListaProdotti.innerHTML = ''; 

    prodotti.forEach(prodotto => {
        const singoloProdotto = document.createElement('div');
        singoloProdotto.className = 'product-item col-md-4 mb-4'; 
        singoloProdotto.innerHTML = `
            <h3>${prodotto.name}</h3>
            <p>${prodotto.description}</p>
            <p>Brand: ${prodotto.brand}</p>
            <p>Price: €${prodotto.price}</p>
            <img src="${prodotto.imageUrl}" alt="${prodotto.name}" class="img-fluid" />
        `;
        ListaProdotti.appendChild(singoloProdotto);
    });
}

    
    getProdottiEsistenti()
    .then(prodottiEsistenti => {
        MostraProdotti(prodottiEsistenti);
    })
    .catch(error => console.error('Errore nel recupero dei prodotti:', error));

    // con questa funzione se inserisco nuovi dati nel form e clicco su "crea prodotto" stampa su products.html i nuovi prodotti
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newName = document.getElementById('new-name').value;
    const newDescription = document.getElementById('new-description').value;
    const newBrand = document.getElementById('new-brand').value;
    const newImgUrl = document.getElementById('new-imgUrl').value;
    const newPrice = parseFloat(document.getElementById('new-price').value);

    // Creo un nuovo prodotto
    const nuovoProdotto = {
        name: newName,
        description: newDescription,
        brand: newBrand,
        price: newPrice,
        imageUrl: newImgUrl
    };


    //invio il nuovo prodotto al server
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YWFhNjVkNzU4NzAwMTUzNzg2MzYiLCJpYXQiOjE3Mjk2MDQ1NTIsImV4cCI6MTczMDgxNDE1Mn0.8tN48uZdzowx2uC_enEnzNI-LJhXE1vIfh8_OgE_L2M',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuovoProdotto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nell aggiunta del prodotto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Prodotto aggiunto con successo:', data);
       //chiamo la funzione per mostrare tutti i prodotti, compresi i vecchi
        getProdottiEsistenti().then(prodotti => {
            MostraProdotti(prodotti); 
        });
    })
    .catch(error => {
        console.error('Errore:', error);
    });

    // resetto il form al ricaricamento della pagina
    document.getElementById('product-form').reset();
});


//MOSTRO IN LISTA I PRODOTTI SE LI CERCO

document.getElementById('new-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // vado a prendere i valori che inserisco nei campi input
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imgUrl = document.getElementById('imgUrl').value;
    const price = parseFloat(document.getElementById('price').value);

    // Creo un nuovo oggetto prodotto per il confronto tra il prodotto esistente e quello che inserisco
    const nuovoProdotto = {
        name,
        description,
        brand,
        price,
        imageUrl: imgUrl
    };

    // controllo se il prodotto esiste già tramite l'API
    getProdottiEsistenti()
        .then(prodottiEsistenti => {
            if (prodottoEsiste(prodottiEsistenti, nuovoProdotto)) {
                mostraProdottoInLista(nuovoProdotto);
            } else {
                console.log("Prodotto non trovato.");
            }
        })
        .catch(error => console.error('Errore:', error));
});

// Funzione per confrontare il prodotto esistente con quello inserito
function prodottoEsiste(prodottiEsistenti, nuovoProdotto) {
    return prodottiEsistenti.some(prodotto =>
        prodotto.name.toLowerCase() === nuovoProdotto.name.toLowerCase() &&
        prodotto.description.toLowerCase() === nuovoProdotto.description.toLowerCase() &&
        prodotto.brand.toLowerCase() === nuovoProdotto.brand.toLowerCase() &&
        prodotto.price === nuovoProdotto.price && 
        prodotto.imageUrl.toLowerCase() === nuovoProdotto.imageUrl.toLowerCase() 
    );
} 
// Faccio una funzione per mostrare il prodotto in lista con il pulsante "Elimina"
function mostraProdottoInLista(prodotto) {
    const lista = document.getElementById('lista');
    
    const prodottoItem = document.createElement('li');
    prodottoItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    prodottoItem.innerHTML = `
        <span>${prodotto.name} - €${prodotto.price}</span>
        <button class="btn btn-sm elimina-btn">Elimina</button>
    `;

    // Aggiungo l'evento al click del pilsante elimina
    prodottoItem.querySelector('.elimina-btn').addEventListener('click', function() {
        prodottoItem.remove();
    });

lista.appendChild(prodottoItem);
}

//inizio lo script per la ricerca del prodotto che mi rimanda alla scheda del prodotto
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('nameInput').value;
    const description = document.getElementById('descriptionInput').value;
    const brand = document.getElementById('brandInput').value;
    const imgUrl = document.getElementById('imgUrlInput').value;
    const price = document.getElementById('priceInput').value;

    // Creo una query string con i dati del prodotto
    const queryString = `?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&brand=${encodeURIComponent(brand)}&imgUrl=${encodeURIComponent(imgUrl)}&price=${encodeURIComponent(price)}`;


    window.location.href = `productsheet.html${queryString}`;
});



