import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

// ================ GENERATE PRODUCTS ================
const productsGrid = document.querySelector(".amazon-main__products-grid");
let productsHTML = "";
products.forEach((product, index) => {
  productsHTML += `
          <div class="product-card">
            <img
              src="${product.image}"
              class="product-card__image"
            />
            <p class="product-card__title">${product.name}</p>
            <div class="product-card__rating">
              <img
                class="rating__image"
                src="images/ratings/rating-${product.rating.stars * 10}.png"
                alt="rating stars"
              />
              <span class="rating__vote-count">${product.rating.count}</span>
            </div>

            <p class="product-card__price">${product.price}</p>
            <div class="product-card__quantity">
              <span class="quantity__title">تعداد: </span>
              <select class="product-quantity-${product.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="product-card__added-to-cart-message product-message-${
              product.id
            }">
              <span>اضافه شد</span>
              <img src="images/icons/check-circle-icon.svg" />
            </div>
            <button class="product-card__add-to-cart-button" 
              data-product-id="${product.id}">
              افزون به سبد
            </button>
          </div>
  `;
});
productsGrid.innerHTML = productsHTML;

// ================ ADD TO CART ================
function updateCartBadge(quantity) {
  cartBadge.innerHTML = cart.length;
  cartBadge.classList.remove("hide");
  mobileMenuCart.innerHTML = `سبد خرید (${cart.length} محصول)`;
}

function showAddedToCartMessage(productId) {
  const message = document.querySelector(`.product-message-${productId}`);

  message.classList.add("visible");

  setTimeout(function () {
    message.classList.remove("visible");
  }, 2000);
}

const cartBadge = document.querySelector(".menu__cart-badge");
const mobileMenuCart = document.querySelector(".mobile-menu-cart"); // سبد خرید منوی موبایل

document
  .querySelectorAll(".product-card__add-to-cart-button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      const productQuantity = document.querySelector(
        `.product-quantity-${productId}`
      ).value;

      showAddedToCartMessage(productId);
      addToCart(productId, Number(productQuantity));
      updateCartBadge();
    });
  });
