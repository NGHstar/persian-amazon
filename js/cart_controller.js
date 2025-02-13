import { renderOrderSummary } from "./cart/order_summary.js";
import { renderCheckoutSummary } from "./cart/checkout_summary.js";
import { loadProducts } from "./data/products.js";

loadProducts(() => {
  renderOrderSummary();
  renderCheckoutSummary();
});
