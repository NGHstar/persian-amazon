import { cart, getTotalQuantity } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/delivery_options.js";
import { getProduct } from "../../data/products.js";

export function renderCheckoutSummary() {
  // ---
  const checkoutContainer = document.querySelector(".cart-body__checkout");
  let productsTotal = 0;
  let shippingTotal = 0;

  cart.forEach((cartItem) => {
    // ---
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    productsTotal += product.price * cartItem.quantity;
    shippingTotal += deliveryOption.price;
  });

  const total = productsTotal + shippingTotal;
  const tax = total * 0.1;
  const totalWithTax = total + tax;

  const checkoutSummaryHTML = `
    <span class="checkout-title">خلاصه سفارش</span>
      <div class="checkout-row">
        <span class="checout-cart-items__count">محصولات (${getTotalQuantity()}):</span>
        <span class="checout-cart-items__total">${productsTotal} تومان</span>
      </div>
      <div class="checkout-row">
        <span>هزینه ارسال:</span>
        <span class="checout-shipping__total">${shippingTotal} تومان</span>
      </div>
      <div class="checkout-row">
        <span class="checout-shipping__title">مالیات (10 درصد):</span>
        <span class="checout-shipping__total">${Math.round(tax)} تومان</span>
      </div>
      <hr />
      <div class="checkout-row checkout-total-wrapper">
        <span>هزینه کل:</span>
        <span class="checkout-total">${Math.round(totalWithTax)} تومان</span>
      </div>
    <button class="product-card__add-to-cart-button">تسویه حساب</button>
  `;
  checkoutContainer.innerHTML = checkoutSummaryHTML;
}
