import { renderOrderSummary } from "./cart/order_summary.js";
import { renderCheckoutSummary } from "./cart/checkout_summary.js";
import { fetchProducts } from "./data/products.js";

async function loadPage() {
  try {
    await fetchProducts();
  } catch (error) {
    console.log(error);
  }
  renderOrderSummary();
  renderCheckoutSummary();
}

loadPage();
