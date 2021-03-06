function getRequest(){

const fetchPromise = fetch('https://jwdp5.herokuapp.com/api/cameras'); // const pour chercher les données dans l'API
const inputJS = document.getElementById("produits"); // const pour inserer par la suite les données dans la div "produits"

fetchPromise.then(response => {// on transforme le resultat en une nouvelle promesse résolue
    return response.json(); // on récupère la reponse sous format json (format textuel)
  })
  .then((data => { // qu'on utilise pour une nouvelle fonction 
    data.forEach((item)  => { //pour chaque item récupéré depuis l'API, on créer une constante name, price_id etc..
      const { name, price, _id, description, imageUrl } = item;
              //puis on insert ces informations dans l'index HTML 
              inputJS.innerHTML +=`
              <div class="container col-md-6 col-lg-4">
                 <div class="affichage_produit mt-4 card bg-white">
                    <img class=”card-img-top” src=` + imageUrl + ` alt="appareil ` + name + `">
                    <div class="card-body text-center">
                       <h3 class="card-title">`+ name + `</h3>
                       <span>`+ price/100 + `€</span></p>
                       <div class="text-center mt-4" ><a id="bouton" type="button" class="btn btn-outline-warning mb-2" onclick="window.location.href = 'products.html?id=`+ _id + `'">En savoir plus</a></div>
                    </div>
                 </div>
              </div>`
     })
  }))
 
}
console.log("Affichage articles")

getRequest() 
cartNumber()
