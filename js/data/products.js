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

export const products = [
  {
    id: "e62d810g",
    image: "images/products/p-t-shirt.jpg",
    name: "تی شرت مردانه بنفش",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: 190000,
    keywords: ["تی شرت", "مردانه", "پوشاک"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  },
  {
    id: "xhn7gs63",
    image: "images/products/b-tshirt.jpg",
    name: "تی شرت مردانه مشکی",
    rating: {
      stars: 4,
      count: 127,
    },
    price: 170000,
    keywords: ["تی شرت", "مردانه", "پوشاک"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  },
  {
    id: "2jcofx10",
    image: "images/products/coffeemaker.jpg",
    name: "قهوه ساز خانگی مدل لورم",
    rating: {
      stars: 4.5,
      count: 56,
    },
    price: 3000000,
    keywords: ["قهوه ساز", "آشپزخانه", "لوازم خانگی"],
  },
  {
    id: "z0k8moyh",
    image: "images/products/foodmaker.jpg",
    name: "غذا ساز برقی مدل لورم",
    rating: {
      stars: 4.5,
      count: 56,
    },
    price: 1800000,
    keywords: ["غذا ساز", "آشپزخانه", "لوازم خانگی"],
  },
  {
    id: "uvk7acy2",
    image: "images/products/basketball.jpg",
    name: "توپ بسکتبال مدل لورم (اصل)",
    rating: {
      stars: 4.5,
      count: 56,
    },
    price: 780000,
    keywords: ["بسکتبال", "توپ", "ورزشی"],
  },
  {
    id: "s5gb5y7s",
    image: "images/products/football.jpg",
    name: "توپ فوتبال مدل لورم (اصل)",
    rating: {
      stars: 4.5,
      count: 56,
    },
    price: 990000,
    keywords: ["فوتبال", "توپ", "ورزشی"],
  },
  {
    id: "4g0emg17",
    image: "images/products/blackp.jpg",
    name: "پرده سیاه - ضد آفتاب",
    rating: {
      stars: 4.5,
      count: 56,
    },
    price: 440000,
    keywords: ["اتاق خواب", "پرده", "لوازم خانگی"],
  },
  {
    id: "mk02z4ec",
    image: "images/products/abajor.jpg",
    name: "چراغ خواب پایه بلند چوبی",
    rating: {
      stars: 4.5,
      count: 56,
    },
    price: 1100000,
    keywords: ["اتاق خواب", "لوازم خانگی", "چراغ"],
  },
].map((productDetails) => {
  if (productDetails.type === "clothing") {
    return new Clothing(productDetails);
  } else {
    return new Product(productDetails);
  }
});
