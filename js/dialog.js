const checkoutDialog = document.getElementById('checkout_dialog');

function openDialog() {
    console.log("open");
    
  // show dialog
  checkoutDialog.showModal();

  // add new classes for backdrop 
  checkoutDialog.classList.add("opened");
  // and no scrolling
  body.style.overflow = "hidden";

  closeBasket();
  clearCart();

}

function closeDialog() {
console.log("close");

  // remove classes who setted by openDialog
  checkoutDialog.classList.remove("opened");
  body.style.overflow = "auto";
  
  // close the Dialog
  checkoutDialog.close();
}