//Affichage confirmation de la commande ou non 
function showCommand() {
    let currentCommand = localStorage.getItem("idCommand");
  
    if (currentCommand) { // si la commande est passée, on affiche le message de confirmation
      document.getElementById("no_command").style.display = "none";
      document.getElementById("confirmation").innerHTML += `
        <div class="container col-10 text-center border shadow bg-white rounded p-4">
          <h3 class="mb-4">Votre commande a bien été enregistrée !</h3>
          <i class="far fa-check-circle fa-4x mb-4 text-success"></i>
          <div>Numéro de commande :</div>
          <div class="font-weight-bold mb-4">`+localStorage.idCommand+`</div>
          <div>Montant total :</div>
          <div class="font-weight-bold mb-4">`+localStorage.totalPanier+` €</div>
          <h3 class="mb-4">Un mail vous sera adressé dès l'expédition de votre appareil </h3>
          <p>Merci et à bientôt !</p>
          <a href="index.html">ACCUEIL</a>
        </div>
  `;
    } else { // sinon on indique qu'il n'y a pas de commande en cours  
      document.getElementById("confirmation").style.display = "none";
      document.getElementById("no_command").innerHTML += `
      <div class="container col-6 text-center border shadow bg-white rounded py-5 mt-5 mb-5">
        <h3 class="mb-4">Vous n'avez pas de commande en cours</h3>
        <button type="button" class="btn btn-warning p-2"><a href="index.html" id="bouton_command" class="text-dark">Découvrez notre gamme </br>d'appareils-photo</a></button>
      </div>
      `;
    }
  }
  console.log("confirmation de commande")
  showCommand();
  cartNumber();
  