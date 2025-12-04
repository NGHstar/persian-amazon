import { getOrderById } from "./data/orders.js";
import { convertToPersianDate } from "./utils/persian_date.js";

const orderTrack = document.querySelector(".package-details");

function getOrderState(order) {
  const orderTime = new Date(order.orderTime);
  const estimatedDeliveryTime = new Date(
    order.products[0].estimatedDeliveryTime
  );
  const now = new Date();

  const oneDayAfterOrder = new Date(
    orderTime.getTime() + 24 * 60 * 60 * 1000
  );

  if (now < oneDayAfterOrder) {
    return "آماده سازی";
  } else if (now >= oneDayAfterOrder && now < estimatedDeliveryTime) {
    return "ارسال شده";
  } else {
    return "تحویل شده";
  }
}

function generateTrackingDetails() {
  let params = new URLSearchParams(document.location.search);
  let orderId = params.get("orderId");
  console.log(orderId);

  const order = getOrderById(orderId);

  const orderState = getOrderState(order);

  orderTrack.innerHTML = `<div class="package-product-wrapper">
              <span class="package-date"
                >زمان ثبت: ${convertToPersianDate(
                  order.orderTime
                )}</span
              >
                <span class="package-date"
                >زمان تحویل: ${convertToPersianDate(
                  order.products[0].estimatedDeliveryTime
                )}</span
              >
          </div>
          <div class="tracking-labels-container">
            <span
              class="tracking-prepare-label tracking-label ${
                orderState === "آماده سازی" ? "active-label" : ""
              }"
            >
              آماده سازی
            </span>
            <span class="tracking-shipping-label tracking-label ${
              orderState === "ارسال شده" ? "active-label" : ""
            }"
              >ارسال شده</span
            >
            <span class="tracking-delivered-label tracking-label ${
              orderState === "تحویل شده" ? "active-label" : ""
            }"
              >تحویل شده</span
            >
          </div>
          <div class="tracking-bar-container">
            <div class="tracking-bar-progress ${
              orderState === "ارسال شده"
                ? "progress-shipping"
                : orderState === "تحویل شده"
                ? "progress-delivered"
                : ""
            }"></div>
          </div>`;
}

generateTrackingDetails();
