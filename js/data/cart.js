export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [];
  }
}

const cartBadge = document.querySelector(".menu__cart-badge");
const mobileMenuCart = document.querySelector(".mobile-menu-cart");

function updateCartBadge(quantity) {
  if (cartBadge) {
    if (cart.length) {
      cartBadge.classList.remove("hide");
      cartBadge.innerHTML = cart.length;
    } else {
      cartBadge.classList.add("hide");
    }
  }
  if (mobileMenuCart)
    mobileMenuCart.innerHTML = `سبد خرید (${cart.length} محصول)`;
}

if (cart) {
  updateCartBadge();
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

export function getCartItem(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  return matchingItem;
}

export function addToCart(productId, productQuantity) {
  const cartItem = getCartItem(productId);

  if (!productQuantity) productQuantity = 1;

  if (cartItem) {
    cartItem.quantity += productQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: productQuantity,
      deliveryOptionId: "1",
    });
  }
  console.log(cart);
  saveToStorage();
}

export function removeFromCart(productId) {
  // ---
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const cartItem = getCartItem(productId);
  cartItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  const cartItem = getCartItem(productId);
  cartItem.quantity = newQuantity;
  saveToStorage();
}

export function getTotalQuantity() {
  let total = 0;
  cart.forEach((cartItem) => {
    total += Number(cartItem.quantity);
  });

  return total;
}
