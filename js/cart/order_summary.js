import { getProduct } from "../../data/products.js";
import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { persianDate } from "../utils/persian_date.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/delivery_options.js";
import { renderCheckoutSummary } from "./checkout_summary.js";

export function renderOrderSummary() {
  const cartItemsContainer = document.querySelector(".cart-body__orders");
  let cartItemsHTML = "";

  cart.forEach((cartItem) => {
    // ---
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const selectedDeliveryDate = persianDate(deliveryOption.days);

    cartItemsHTML += `
        <div class="order-item js-cart-item-${productId}">
            <p class="order-item__date">تاریخ تحویل: ${selectedDeliveryDate}</p>
            <div class="order-item-content">
            <div class="order-item__product">
                <img
                class="product-image"
                src="${matchingProduct.image}"
                alt="product image"
                />
                <div class="product-info">
                <span class="product-name">${matchingProduct.name}</span>
                <span class="product-price">${
                  matchingProduct.price
                } تومان</span>
                <div class="product-card__quantity">
                    <span class="quantity__title">تعداد: </span>
                    <select
                    data-product-id="${productId}"
                    class="quantity-select-element 
                    quantity-product-${matchingProduct.id}">
                        <option
                        value="${cartItem.quantity}" 
                        selected disabled hidden>
                        ${cartItem.quantity}
                        </option>
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
                  ${deliveryOptionsHtml(productId, cartItem.deliveryOptionId)}
                </div>
            </div>
        </div>
    `;
  });

  function deliveryOptionsHtml(productId, deliveryId) {
    // ---
    let html = "";

    deliveryOptions.forEach((option) => {
      // ---
      const priceString =
        option.price === 0 ? "رایگان" : `${option.price}تومان`;

      const isChecked = option.id === deliveryId ? "checked" : "";

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${productId}"
          data-delivery-id="${option.id}"
        >
            <input name="delivery-option-${productId}" type="radio" ${isChecked} />
            <div class="delivery-option-content">
                <span class="delivery-option__date">${persianDate(
                  option.days
                )}</span>
                <span class="delivery-option__price">${priceString}</span>
            </div>
        </div>
        `;
    });

    return html;
  }

  cartItemsContainer.innerHTML = cartItemsHTML;

  document.querySelector(
    ".cart-header__title"
  ).innerHTML = `سبد خرید (${cart.length} محصول)`;

  document.querySelectorAll(".quantity-select-element").forEach((e) => {
    e.addEventListener("change", (value) => {
      const productId = e.dataset.productId;
      const newQuantity = document.querySelector(
        `.quantity-product-${productId}`
      ).value;
      updateQuantity(productId, newQuantity);
      renderOrderSummary();
      renderCheckoutSummary();
    });
  });

  document
    .querySelectorAll(".remove-product-button")
    .forEach((removeButton) => {
      removeButton.addEventListener("click", () => {
        const productID = removeButton.dataset.productId;
        removeFromCart(productID);
        renderOrderSummary();
        renderCheckoutSummary();
      });
    });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryId } = element.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderOrderSummary();
      renderCheckoutSummary();
    });
  });
}

renderOrderSummary();
