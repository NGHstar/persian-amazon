import cart from "./data/cart.js";
import { loadProducts, products } from "./data/products.js";

// ================ GENERATE PRODUCTS ================
loadProducts(generateProductsGrid);

function generateProductsGrid() {
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
                src="${product.starsUrl()}"
                alt="rating stars"
              />
              <span class="rating__vote-count">${product.rating.count}</span>
            </div>

            <p class="product-card__price">${product.priceString()}</p>
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

            ${product.extraInfoHTML()}

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

  document
    .querySelectorAll(".product-card__add-to-cart-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;

        const productQuantity = document.querySelector(
          `.product-quantity-${productId}`
        ).value;

        showAddedToCartMessage(productId);
        cart.add(productId, Number(productQuantity));
      });
    });
}

// ================ ADD TO CART ================
function showAddedToCartMessage(productId) {
  const message = document.querySelector(`.product-message-${productId}`);

  message.classList.add("visible");

  setTimeout(function () {
    message.classList.remove("visible");
  }, 2000);
}
