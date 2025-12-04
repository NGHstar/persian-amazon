import cart from "../data/cart.js";
import { getDeliveryOption } from "../data/delivery_options.js";
import { getProduct } from "../data/products.js";
import { addOrder } from "../data/orders.js";

export function renderCheckoutSummary() {
  // ---
  const checkoutContainer = document.querySelector(
    ".cart-body__checkout"
  );
  let productsTotal = 0;
  let shippingTotal = 0;

  cart.items.forEach((cartItem) => {
    // ---
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(
      cartItem.deliveryOptionId
    );

    productsTotal += product.price * cartItem.quantity;
    shippingTotal += deliveryOption.price;
  });

  const total = productsTotal + shippingTotal;
  const tax = total * 0.1;
  const totalWithTax = total + tax;

  const checkoutSummaryHTML = `
    <span class="checkout-title">خلاصه سفارش</span>
      <div class="checkout-row">
        <span class="checkout-cart-items__count">محصولات (${cart.getTotalQuantity()}):</span>
        <span class="checkout-cart-items__total">${productsTotal.toLocaleString(
          "fa-IR"
        )} تومان</span>
      </div>
      <div class="checkout-row">
        <span>هزینه ارسال:</span>
        <span class="checkout-shipping__total">${shippingTotal.toLocaleString(
          "fa-IR"
        )} تومان</span>
      </div>
      <div class="checkout-row">
        <span class="checkout-shipping__title">مالیات (10 درصد):</span>
        <span class="checkout-shipping__total">${Math.round(
          tax
        ).toLocaleString("fa-IR")} تومان</span>
      </div>
      <hr />
      <div class="checkout-row checkout-total-wrapper">
        <span>هزینه کل:</span>
        <span class="checkout-total">${Math.round(
          totalWithTax
        ).toLocaleString("fa-IR")} تومان</span>
      </div>
    <button class="product-card__add-to-cart-button js-submit-order">ثبت سفارش</button>
  `;
  checkoutContainer.innerHTML = checkoutSummaryHTML;

  const submitOrderBtn = document.querySelector(".js-submit-order");
  submitOrderBtn.addEventListener("click", async () => {
    submitOrderBtn.innerHTML = `<div class="smallLoader"></div>`;

    const response = await fetch(
      "https://mock-api-zeta-liard.vercel.app/persian-amazon/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cart }),
      }
    );

    if (!response.ok) {
      console.error("خطا در دریافت پاسخ:", response.status);
      return;
    }

    const order = await response.json();
    addOrder(order);

    cart.clear();

    window.location.href = "orders.html";
  });
}
