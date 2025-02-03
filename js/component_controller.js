class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
           <footer class="amazon-footer">
                <a href="./">
                    <img
                    src="images/amazon-logo-white.png"
                    alt="amazon logo"
                    class="amazon-footer__logo"
                    />
                </a>
                <p class="amazon-footer__copyright">copyright amazon 2025</p>
            </footer>
        `;
  }
}

class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="amazon-header">
      <a href="./" class="amazon-header__logo">
        <img src="images/amazon-logo-white.png" alt="white logo" />
      </a>

      <a href="./" class="amazon-header__mobile-logo">
        <img
          src="images/amazon-mobile-logo-white.png"
          alt="mobile white logo"
        />
      </a>

      <div class="amazon-header__search-box">
        <input
          type="text"
          class="search-box__text-input"
          placeholder="جستجوی محصولات"
        />
        <button class="search-box__submit-button">
          <img src="images/icons/search-icon.svg" alt="search icon" />
        </button>
      </div>

      <img
        class="mobile-menu__icon"
        src="images/icons/menu-icon.svg"
        alt="mobile menu icon"
      />

      <div class="amazon-header__menu">
        <a href="cart.html">
          <img
            class="menu__cart-button"
            src="images/icons/cart-icon.svg"
            alt="cart icon"
          />
        </a>
        <a class="menu__orders" href="orders.html"> سفارش‌ها </a>
      </div>
    </header>

    <ul class="amazon-header__mobile-menu">
      <a href="orders.html"><li>سفارش‌ها</li></a>
      <a href="cart.html"><li>سبد خرید (0)</li></a>
    </ul>
    `;
  }
}
customElements.define("amazon-footer", MyFooter);
customElements.define("amazon-header", MyHeader);
