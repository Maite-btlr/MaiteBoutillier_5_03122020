//pour afficher le nombre d'articles dans le panier du menu nav
function cartNumber() {
    const panier = JSON.parse(localStorage.getItem("panier")); 
  
    if (panier) { 
      let inCart = 0;  
      panier.forEach(() => {
        inCart = inCart + 1;  
      });
      localStorage.setItem("inCart", inCart); 
      document.getElementById("cart_number").textContent = inCart;
    }
  }

