export let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBadge = document.querySelector(".menu__cart-badge");
const mobileMenuCart = document.querySelector(".mobile-menu-cart");

function updateCartBadge(quantity) {
  cartBadge.innerHTML = cart.length;
  if (cart.length) {
    cartBadge.classList.remove("hide");
  } else {
    cartBadge.classList.add("hide");
  }
  mobileMenuCart.innerHTML = `سبد خرید (${cart.length} محصول)`;
}

if (cart) {
  updateCartBadge();
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

export function addToCart(productId, productQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += productQuantity;
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
