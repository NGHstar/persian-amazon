import { renderOrderSummary } from "./cart/order_summary.js";
import { renderCheckoutSummary } from "./cart/checkout_summary.js";
import { loadProducts } from "./data/products.js";

new Promise((resolve) => {
  loadProducts(() => {
    resolve("value");
  });
}).then((value) => {
  console.log(value);
  renderCheckoutSummary();
  renderOrderSummary();
});
