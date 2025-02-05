import { products } from "../data/products.js";
import { cart, removeFromCart } from "../data/cart.js";
import { persianDate } from "./utils/persian_date.js";
import { deliveryOptions } from "../data/delivery_options.js";

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

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

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
                    <select>
                        <option value="${
                          cartItem.quantity
                        }" selected disabled hidden>${
    cartItem.quantity
  }</option>
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
                  ${deliveryOptionsHtml(i, cartItem.deliveryOptionId)}
                </div>
            </div>
        </div>
    `;
});

function deliveryOptionsHtml(id, deliveryId) {
  // ---
  let html = "";

  deliveryOptions.forEach((option) => {
    // ---
    const priceString = option.price === 0 ? "رایگان" : `${option.price}تومان`;

    const isChecked = option.id === deliveryId ? "checked" : "";

    html += `
        <div class="delivery-option">
            <input name="delivery-option-${id}" type="radio" ${isChecked} />
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

document.querySelectorAll(".remove-product-button").forEach((removeButton) => {
  removeButton.addEventListener("click", () => {
    const productID = removeButton.dataset.productId;
    removeFromCart(productID);
    document.querySelector(`.js-cart-item-${productID}`).remove();
  });
});
