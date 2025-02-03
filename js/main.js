const mobileMenuIcon = document.querySelector(".mobile-menu__icon");

const mobileMenu = document.querySelector(".amazon-header__mobile-menu");

mobileMenuIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("expanded");
});

const products = [
  {
    image: "images/products/b-tshirt.jpg",
    name: "black t shirt",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: 260000,
  },
  {
    image: "images/products/p-t-shirt.jpg",
    name: "black t shirt",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: 260000,
  },
];

const productsGrid = document.querySelector(".amazon-main__products-grid");
let productsHTML = "";

products.forEach((product, index) => {
  productsHTML += `
          <div class="product-card">
            <img
              src="${product.image}"
              class="product-card__image"
            />
            <p class="product-card__title">${product.name}</p>
            <div class="product-card__rating">
              <img
                class="rating__image"
                src="images/ratings/rating-${product.rating.stars * 10}.png"
                alt="rating stars"
              />
              <span class="rating__vote-count">${product.rating.count}</span>
            </div>

            <p class="product-card__price">${product.price}</p>
            <div class="product-card__quantity">
              <span class="quantity__title">تعداد: </span>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button class="product-card__add-to-cart-button">
              افزون به سبد
            </button>
          </div>
  `;
});

productsGrid.innerHTML = productsHTML;
