import { products } from "../data/products.js";
import { cart, removeFromCart } from "../data/cart.js";

const cartItemsContainer = document.querySelector(".cart-body__orders");
let cartItemsHTML = "";

cart.forEach((cartItem, i) => {
  // ---
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartItemsHTML += `
        <div class="order-item js-cart-item-${productId}">
            <p class="order-item__date">تاریخ تحویل: 24/2/1403</p>
            <div class="order-item-content">
            <div class="order-item__product">
                <img
                class="product-image"
                src="${matchingProduct.image}"
                alt="product image"
                />
                <div class="product-info">
                <span class="product-name">${matchingProduct.name}</span>
                <span class="product-price">${matchingProduct.price} تومان</span>
                <div class="product-card__quantity">
                    <span class="quantity__title">تعداد: </span>
                    <select>
                        <option value="${cartItem.quantity}" selected disabled hidden>${cartItem.quantity}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button class="remove-product-button" data-product-id="${productId}"}>
                    <img
                    src="images/icons/delete-icon.svg"
                    alt="delete icon"
                    />
                </button>
                  </div>
                </div>
                <div class="order-item__delivery">
                  <span class="delivery-title">زمان تحویل را مشخص کنید:</span>
                  <!-- delivery - option: 1 -->
                  <div class="delivery-option">
                    <input name="delivery-option-${i}" type="radio" checked />
                    <div class="delivery-option-content">
                      <span class="delivery-option__date">سه‌شنبه 22 آذر</span>
                      <span class="delivery-option__price">رایگان</span>
                    </div>
                  </div>
                  <!-- delivery - option: 2 -->
                  <div class="delivery-option">
                    <input name="delivery-option-${i}" type="radio" />
                    <div class="delivery-option-content">
                      <span class="delivery-option__date">پنجشنبه 18 آذر</span>
                      <span class="delivery-option__price">30000 تومان</span>
                    </div>
                  </div>
                  <!-- delivery - option: 3 -->
                  <div class="delivery-option">
                    <input name="delivery-option-${i}" type="radio" />
                    <div class="delivery-option-content">
                      <span class="delivery-option__date">دو‌شنبه 15 آذر</span>
                      <span class="delivery-option__price">50000 تومان</span>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    `;
});
cartItemsContainer.innerHTML = cartItemsHTML;

document.querySelectorAll(".remove-product-button").forEach((removeButton) => {
  removeButton.addEventListener("click", () => {
    const productID = removeButton.dataset.productId;
    removeFromCart(productID);
    document.querySelector(`.js-cart-item-${productID}`).remove();
  });
});
