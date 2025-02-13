export function getProduct(productId) {
  // ---
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  price;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.price = productDetails.price;
  }

  starsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  priceString() {
    return this.price.toLocaleString("fa-IR") + " تومان";
  }

  extraInfoHTML() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  // over-ride : replace with super function (the function in the product class(parent class))
  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">راهنمای سایز</a>`;
  }
}

export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      } else {
        return new Product(productDetails);
      }
    });
    console.log(products);
    fun();
  });

  xhr.open("GET", "https://ghabagha.ir/get-products.php");
  xhr.send();
}
