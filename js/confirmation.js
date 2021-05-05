//Affichage confirmation de la commande ou non 
function showCommand() {
    let currentCommand = localStorage.getItem("idCommand");
  
    if (currentCommand) {
      document.getElementById("no_command").style.display = "none";
      document.getElementById("confirmation").innerHTML += `
        <div class="container col-10 text-center border shadow bg-white rounded p-4">
          <h3 class="mb-4">Votre commande a bien été enregistrée !</h3>
          <i class="far fa-check-circle fa-4x mb-4 "></i>
          <div>Numéro de commande :</div>
          <div class="font-weight-bold mb-4">`+localStorage.idCommand+`</div>
          <div>Montant total de votre commande</div>
          <div class="font-weight-bold mb-4">`+localStorage.totalPanier+` €</div>
          <h3 class="mb-4">Un mail vous sera adressé dès l'expédition de votre commande </h3>
          <div>Merci et à bientôt!</div>
        </div>
  `;
    } else {
      document.getElementById("confirmation").style.display = "none";
      document.getElementById("no_command").innerHTML += `
      <div class="container col-10 text-center border shadow bg-white rounded p-4 ">
        <h3 class="mb-4">Vous n'avez pas de commande en cours</h3>
        <button type="button" class="btn btn-warning p-2"><a href="index.html" id="bouton_command" class="text-dark">Découvrez notre gamme d'appareils-photo</a></button>
      </div>
      `;
    }
  }
  
  showCommand();
  cartNumber();
  