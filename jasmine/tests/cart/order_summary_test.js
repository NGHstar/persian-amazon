import { renderOrderSummary } from "../../../js/cart/order_summary.js";
import { loadFromStorage, cart } from "../../../js/data/cart.js";

describe("test suit: render order summary", () => {
  // ---
  const productId1 = "4g0emg17";
  const productId2 = "mk02z4ec";

  beforeEach(() => {
    //---
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        { productId: productId1, quantity: 1, deliveryOptionId: "1" },
        { productId: productId2, quantity: 2, deliveryOptionId: "1" },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    console.log("after");
  });

  beforeAll(() => {
    document.querySelector(".test-cart-body").innerHTML = `
            <div class="cart-body__orders"></div>
            <div class="cart-body__checkout"></div>
        `;
  });

  afterAll(() => {
    document.querySelector(".test-cart-body").innerHTML = "";
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".order-item").length).toEqual(2);
    expect(
      document.querySelector(`.test-js-default-quantity-${productId1}`).value
    ).toEqual("1");
    expect(
      document.querySelector(`.test-js-default-quantity-${productId2}`).value
    ).toEqual("2");
  });

  it("remove a product", () => {
    document.querySelector(`.js-test-remove-button-${productId1}`).click();
    expect(document.querySelectorAll(".order-item").length).toEqual(1);

    expect(document.querySelector(`.s-cart-item-${productId1}`)).toEqual(null);

    expect(document.querySelector(`.js-cart-item-${productId2}`)).not.toEqual(
      null
    );

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});
