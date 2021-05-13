const panier = JSON.parse(localStorage.getItem("panier")); // On récupere les données stockées dans le local storage 

// Condition pour afficher le panier
if (panier) {//S'il y a un panier, execute la fonction pour l'afficher
    fullTab();}
 else {//Sinon, la fonction pour le masquer 
    emptyTab();}


function fullTab(){ // Boucle pour importer les données de chaque article panier
  panier.forEach(function(result,index){infoHTML(result, index);});
  totalBasket();
  cartNumber();
}
 
function infoHTML (result, index){
    document.getElementById("ajout_panier").innerHTML += `
    <tbody id="products-tablebody">
      <tr id="ligne_tableau">
        <td class="text-center"><img src="`+result.image+`" class="w-25" alt="appareil `+result.name+`"> <br/> `+result.name+`<br/> Objectif : `+result.lenses+`</td>
        <td class="text-center">
          <button disabled="disabled" onclick="quantityLess(`+index+`)" id="bouton_moins`+index+`" class="btn btn-dark btn-sm">-</button>
          <span id="quantite_nombre`+index+`" class="quantite_produit">`+result.quantite+`</span>
          <button onclick="quantityPlus(`+index+`)" id="bouton_plus`+index+`" class="btn btn-dark btn-sm">+</button>
        </td>
        <td id="prix_unite`+index+`" class="text-center">`+result.price + " €"+`</td>
        <td id="sous_total`+index+`"class="subtotal text-center">`+result.subTotal + " €"+`</td>
        <td class="text-center"><i id="supp_produit" onclick="annulArticle()" type="button" class="fas fa-trash-alt" title="Supprimer le produit du panier"></i></td>
      </tr>
    </tbody>`;
}

//calcul du total panier + affichage 
function totalBasket(){
    let total = 0;
    panier.forEach(function(result,index){
      total= total + panier[index].price * panier[index].quantite;
      console.log(total);
    });
    document.getElementById("prix_total").textContent = total+"€";
    localStorage.setItem("totalPanier", total);
}

//pour masquer le bouton, le panier et le formulaire lorsque le panier de l'utilisateur est vide
function emptyTab() {
    document.getElementById("panier_vide").innerHTML += `
      <div class="container col-6 text-center border shadow bg-white rounded py-5 mt-5 mb-5 ">
        <h3 class="mb-4">Votre panier est vide</h3>
        <a href="index.html"><p class="mb-4 text-secondary">Découvrez nos cameras vintage </p></a>
        <i class="fas fa-shopping-cart fa-3x p-3"></i>
      </div>`
    ;
    document.getElementById("tableau_panier").style.display = "none";
    document.getElementById("vider_panier").style.display = "none";
    document.getElementById("formulaire").style.display = "none";
    document.getElementById("valid_commande").style.display = "none";
}

//pour vider le panier et le localStorage (on click html)
  function emptyTheBasket() {
    localStorage.clear();
    location.reload();
}

// pour retirer article du panier 
function annulArticle(i) {
    panier.splice(i, 1);// on supprime un item du panier avec splice
    localStorage.clear(); // on le retire du localstorage
    // Mise à jour du nouveau panier après suppression de l'article
    localStorage.setItem("panier", JSON.stringify(panier));
    //Mise à jour de la page pour affichage de la suppression au client
    window.location.reload();
}

//pour ajouter quantite dans le panier +
function quantityPlus(index) {
    let quantite = document.getElementById(`quantite_nombre`+index+``);
    let addQuantity = ++panier[index].quantite; //on incrémente la quantité dans le localstorage
    quantite.textContent = addQuantity; //on met à jour la quantité dans le tableau
    let sousTotal = document.getElementById(`sous_total`+index+``);
    let ajoutTotal = panier[index].price * panier[index].quantite;
    sousTotal.textContent = ``+ajoutTotal+` €`; //on met à jour le sous-total dans le tableau
    localStorage.setItem("panier", JSON.stringify(panier)); // on met à jour le localstorage
    totalBasket(); //on met à jour le total panier
    if (addQuantity > 1) {
      document.getElementById(`bouton_moins`+index+``).removeAttribute("disabled");
    }
}

//pour retirer quantite dans le panier -
function quantityLess(index) {
    let quantite = document.getElementById(`quantite_nombre`+index+``);
    let subQuantity = --panier[index].quantite; //on décrémente la quantité dans le localstorage
    quantite.textContent = subQuantity; //on met à jour la quantité dans le tableau
    let sousTotal = document.getElementById(`sous_total`+index+``);
    let ajoutTotal = panier[index].price * panier[index].quantite;
    sousTotal.textContent = ``+ajoutTotal+` €`; //on met à jour le sous-total dans le tableau
    localStorage.setItem("panier", JSON.stringify(panier)); // on met à jour le localstorage
    totalBasket(); //on met à jour le total panier
    if (subQuantity <= 1) {
      document.getElementById(`bouton_moins`+index+``).setAttribute("disabled", "disabled");
    }
}

// FORMULAIRE + REQUETE POST

//Evenement pour vérifier le champ mail 
document.querySelector("#email").addEventListener("blur", function() {
    const mail = document.querySelector("#email").value;
    const regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; // Utilisation de regex (POUR VALIDER LE CHAMP DE SAISIE)
    if (!regexEmail.test(mail)) {
      document.querySelector("#erreur_mail").textContent =
        "Adresse email non valide";
    }
  });

//Evenement pour effacer le formulaire
document.querySelector("#rafraichir").addEventListener("click", function() {
document.querySelector("#erreur_mail").textContent = "";

  });
  
//Evenement pour valider le formulaire et envoyer la requete POST
  document.querySelector("#formulaire").addEventListener("submit", function(event){
    event.preventDefault();
    let input = document.getElementsByTagName("input");
  
    for (let i = 0; i < input.length; i++) { //boucle pour vérifier si chaque champ a été renseigné
      if (input[i].value == "") { //si un des champs est vide, envoi d'un message erreur 
        alert("OUPS ! Merci de renseigner correctement le formulaire pour valider votre commande.")
        return false;
      }
    }
    requestPost()
    confirmCommand()
    localStorage.clear()
    totalBasket()
  });
  
//pour créer la requete POST et retourner le numero commande 
function requestPost() {
  const idTableau = panier.map(function (product) {return product.id;});
    let order = {
      contact: {
        firstName: document.querySelector("#firstName").value.trim(),
        lastName: document.querySelector("#lastName").value.trim(),
        address: document.querySelector("#adress").value.trim(),
        city: document.querySelector("#city").value.trim(),
        email: document.querySelector("#email").value.trim(),
      },
      products: idTableau,
  };
 console.log(order);
  
 const request = new Request( // On crée notre requête POST vers API en lui passant en paramètres les données a envoyer 
  "https://jwdp5.herokuapp.com/api/cameras/order",
    {
     method: "POST",
     body: JSON.stringify(order),
     headers: new Headers({
     Accept: "application/json",
    "Content-Type": "application/json",
        }),
    }
 );

  fetch(request)
  .then((response) => response.json())
  .then((response) => { //on récupère la réponse de l'API pour obtenir numéro de commande
    let numCommand = response.orderId;
    //console.log(numCommand)
    localStorage.setItem("idCommand", JSON.stringify(numCommand)); // on met à jour le localstorage avec numero de commande
    localStorage.setItem("infosOrder",JSON.stringify(order)); // on met à jour le localstorage avec infos de commande
    });
}
  
// CONFIRMATION DE COMMANDE
  function confirmCommand() {
    sweetAlert("Votre commande a bien été validée, vous allez être redirigé");
    setTimeout(function() {window.location = 'confirmation.html'; }, 3000);
  }
  
  
  