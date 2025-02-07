function Cart(localStorageKey) {
  const cart = {
    items: undefined,
    add(productId, productQuantity) {
      const cartItem = this.getCartItem(productId);

      if (!productQuantity) productQuantity = 1;

      if (cartItem) {
        cartItem.quantity += productQuantity;
      } else {
        this.items.push({
          productId: productId,
          quantity: productQuantity,
          deliveryOptionId: "1",
        });
      }
      this.saveToStorage();
    },
    getCartItem(productId) {
      let matchingItem;

      this.items.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      return matchingItem;
    },
    loadFromStorage() {
      this.items = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.items) {
        this.items = [];
      }
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.items));
      this.updateCartBadge();
    },
    updateCartBadge(quantity) {
      const cartBadge = document.querySelector(".menu__cart-badge");
      const mobileMenuCart = document.querySelector(".mobile-menu-cart");
      if (cartBadge) {
        if (this.items.length) {
          cartBadge.classList.remove("hide");
          cartBadge.innerHTML = this.items.length;
        } else {
          cartBadge.classList.add("hide");
        }
      }
      if (mobileMenuCart)
        mobileMenuCart.innerHTML = `سبد خرید (${this.items.length} محصول)`;
    },
    remove(productId) {
      // ---
      const newCart = [];

      this.items.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.items = newCart;
      this.saveToStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      const cartItem = this.getCartItem(productId);
      cartItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
    updateQuantity(productId, newQuantity) {
      const cartItem = this.getCartItem(productId);
      cartItem.quantity = newQuantity;
      this.saveToStorage();
    },
    getTotalQuantity() {
      let total = 0;
      this.items.forEach((cartItem) => {
        total += Number(cartItem.quantity);
      });

      return total;
    },
    clear() {
      this.items = [];
      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-opp");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
businessCart.loadFromStorage();

if (cart.items) cart.updateCartBadge();
if (businessCart.items) cart.updateCartBadge();

businessCart.add("fake product");
cart.add("fake product");

console.log(cart);
console.log(businessCart);
