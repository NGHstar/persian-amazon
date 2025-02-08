class Cart {
  // ---
  #localStorageKey;
  items;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

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
  }

  getCartItem(productId) {
    let matchingItem;

    this.items.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    return matchingItem;
  }

  loadFromStorage() {
    this.items = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.items) {
      this.items = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.items));
    this.updateCartBadge();
  }

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
  }

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
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = this.getCartItem(productId);
    cartItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    const cartItem = this.getCartItem(productId);
    cartItem.quantity = newQuantity;
    this.saveToStorage();
  }

  getTotalQuantity() {
    let total = 0;
    this.items.forEach((cartItem) => {
      total += Number(cartItem.quantity);
    });

    return total;
  }

  clear() {
    this.items = [];
    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");

if (cart.items) cart.updateCartBadge();

export { Cart }; // اجازه دادن به فایل‌های دیگر برای ساخت شیء از روی این کلاس

export default cart; // شیء پیش‌فرض برای استفاده در فایل‌های مختلف پروژه
