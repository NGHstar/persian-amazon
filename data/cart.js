export let cart = [
  {
    productId: "e62d810g",
    quantity: 3,
  },
  {
    productId: "xhn7gs63",
    quantity: 1,
  },
];

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
    });
  }
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
}
