const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");

let purchases = [];

function add() {
  const priceElement = document.getElementById("product");
  const numberElement = document.getElementById("number");

  const price = priceElement.value;
  const number = numberElement.value;
  const productId = priceElement.options[priceElement.selectedIndex].id;
  const productName = getProductNameById(productId);
  
  let purchase = {
    price: parseInt(price),
    number: parseInt(number),
    name: productName
  };

  const newPurchase = purchases.findIndex((item) => item.price === purchase.price);
  if (purchases.length < 1 || newPurchase === -1) {
    purchases.push(purchase);
  } else {
    purchases[newPurchase].number += purchase.number;
  }

  window.alert(`Producto: ${purchase.name}\nImporte: ${purchase.price}円\nCantidad: ${purchase.number}\n\n${display()}\nSubtotal: ${subtotal()}円`);
  priceElement.value = "0";
  numberElement.value = "";
}

function getProductNameById(productId) {
  switch (productId) {
    case 'original200':
      return 'Mezcla original 200g';
    case 'original500':
      return 'Mezcla original 500g';
    case 'especial200':
      return 'Mezcla especial 200g';
    case 'especial500':
      return 'Mezcla especial 500g';
    default:
      return '';
  }
}

function display() {
  return purchases.map(purchase => {
    return `${purchase.name} - ${purchase.price}円 - Cantidad: ${purchase.number}`;
  }).join("\n");
}

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.price * purchase.number;
  }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  const details = purchases.map(purchase => {
    return `Producto: ${purchase.name}\nImporte: ${purchase.price}円\nCantidad: ${purchase.number}`;
  }).join("\n");

  window.alert(`${details}\n\nSubtotal: ${sum}円\nGastos de envío: ${postage}円\nTotal: ${sum + postage}円`);
  purchases = [];
  priceElement.value = "0";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000) {
    return 500;
  } else {
    return 250;
  }
}

