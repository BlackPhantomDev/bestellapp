const checkoutDialog = document.getElementById('checkout_dialog');
const clearCartDialog = document.getElementById('clear_cart_dialog');

// show dialog
// add new classes for backdrop 
// remove scrolling
function openCheckoutDialog() {
  closeBasket();
  clearCart(1);
    
  checkoutDialog.showModal();

  checkoutDialog.classList.add("opened");
  body.style.overflow = "hidden";
}

// remove classes who setted by openDialog
// add scrolling
// and close the Dialog
function closeCheckoutDialog() {
  checkoutDialog.classList.remove("opened");
  body.style.overflow = "auto";
  
  checkoutDialog.close();
}


// same functions as above for other dialog
function openClearCartDialog() {
    
  clearCartDialog.showModal();

  clearCartDialog.classList.add("opened");
  body.style.overflow = "hidden";

  closeBasket();

}

// same functions as above for other dialog
function closeClearCartDialog() {
  clearCartDialog.classList.remove("opened");
  body.style.overflow = "auto";
  
  clearCartDialog.close();
}