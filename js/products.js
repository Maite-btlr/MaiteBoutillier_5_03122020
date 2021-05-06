// fonctions pour récuperer les données depuis l'API + pour afficher le produit
function addContent () {
    let id = new URL(window.location).searchParams.get('id')// On donne la valeur 'id' = 'id' de l'api 
    fetch ("https://jwdp5.herokuapp.com/api/cameras/"+id)  
    .then(response => response.json()) 
    .then (data => { 
          article = data 
          addHTML()
          addLenses()
          console.log(article);        
      })
  }  

  //Ajout des objectifs pour chaque item renseigné dans l'API
  //A chaque exécution de la boucle, la variable est incrémentée de un (i ++), elle se termine quand il n'y a plus d'objets à ajouter  
  //Ajout des options dans le HTML 
  function addLenses() {
    for (let i = 0; i < article.lenses.length; i++) {
    document.getElementById("lense_select").innerHTML += `<option value="` + article.lenses[i] + `">`+ article.lenses[i] + `</option>`
    }
  }
  // Présentation du produit en HTML dans la div adaptée
  function addHTML() {
    document.getElementById('focus_produit').innerHTML += 
    `
      <div class="affichage_produit">
        <img class=”image_produit” style="width: 100%" src="`+ article.imageUrl + `"  alt="appareil `+ article.name +`">
        <h3 class="mt-4 mb-4"><mark>`+ article.name + `</mark></h3>
        <p class="description_produit">`+ article.description + `</p>
        <p class="prix_produit"><span>`+ article.price/100 + `€</span></p>
      </div>
    `
    }
//Ajout du produit au panier
function addBasket() {
    let lentilles = document.querySelector('select').value; //Récupère la valeur de l'objectif choisi depuis la balise select 
    if (lentilles == "") { //si aucune lentille choisie, affichage alert
      alert("Oups! Vous devez choisir un objectif pour commander votre appareil");
    } else {
        const panier = JSON.parse(localStorage.getItem("panier")) || [] // Retourne la valeur associée 
        panier.push({ //pour chaque article, on pousse les infos suivantes dans le panier
          image : article.imageUrl,
          name : article.name,
          id : article._id,
          lenses: lense_select.value,
          description : article.description,
          price : article.price/100,
          quantite : 1,
          subTotal : article.price/100*1
        })
        window.localStorage.setItem("panier", JSON.stringify(panier))  // Stocke les données, convertit la valeur JS en chaine Json 
        //console.log(panier)
        console.log("Le produit a été ajouté au panier");
        popUpBasket()
      }
}

//Affichage d'un popup pour confirmer l'ajout au panier  
function popUpBasket (){ 
  if (confirm("Vous avez ajouté un article au panier") == true) {
    userChoice = "Prêts pour de nouveaux clichés ?";
  } else {
    userChoice = "Vous n'avez rien ajouté au panier";
  }
  document.getElementById("msg").innerHTML = userChoice; 
}

addContent();
cartNumber();