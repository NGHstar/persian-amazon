import { addToCart, cart, loadFromStorage } from "../../../js/data/cart.js";

describe("test suite: addToCart", () => {
  // existing product
  it("adds an existing product to the cart", () => {
    //---
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        { productId: "4g0emg17", quantity: 1, deliveryOptionId: "1" },
      ]);
    });

    loadFromStorage();

    addToCart("4g0emg17");

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("4g0emg17");
    expect(cart[0].quantity).toEqual(2);
  });

  // new product
  it("add new product to the cart", () => {
    //---
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart("4g0emg17");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("4g0emg17");
    expect(cart[0].quantity).toEqual(1);
  });
});
