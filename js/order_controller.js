import { orders } from "./data/orders.js";
import { fetchProducts, getProduct } from "./data/products.js";
import { convertToPersianDate } from "./utils/persian_date.js";

// elements
const ordersContainer = document.querySelector(".orders");

function generateProducts(products) {
  let orderProductsHTML = "";
  products.forEach((orderProduct) => {
    const product = getProduct(orderProduct.productId);
    orderProductsHTML += `
        <div class="order-product-card">
            <img src=${product.image} alt="product image" />
            <div class="product-card__info">
            <span class="product-title">${product.name}</span>
            <span class="product-arriving-time">${convertToPersianDate(
              orderProduct.estimatedDeliveryTime
            )}</span>
            <span class="product-quantity">تعداد: ${
              orderProduct.quantity
            }</span>
            <button class="product-reorder-button">
                <span>خرید مجدد</span>
                <img src="images/icons/rebuy-icon.svg" alt="icon" />
            </button>
            </div>
            <div class="track-order-button-wrapper">
            <a href="tracking.html">
                <button class="track-order-button">پیگیری بسته</button>
            </a>
            </div>
        </div>
    `;
  });
  return orderProductsHTML;
}

function renderOrdersCard() {
  let ordersContainerHTML = "";
  orders.forEach((order) => {
    ordersContainerHTML += `<div class="order-card">
          <header>
            <div class="order-card__column">
              <span>زمان ثبت:</span>
              <span class="order-placed">${convertToPersianDate(
                order.orderTime
              )}</span>
            </div>
            <div class="order-card__column">
              <span>هزینه کل:</span>
              <span class="order-total">${order.total}</span>
            </div>
            <div class="order-card__column">
              <span class="order-id-title">کد سفارش:</span>
              <span class="order-id">${order.id}</span>
            </div>
          </header>
          <div class="order-card__products">
            ${generateProducts(order.products)}
          </div>
        </div>`;
  });
  ordersContainer.innerHTML = ordersContainerHTML;
}

async function loadPage() {
  await fetchProducts();
  renderOrdersCard();
}

loadPage();
