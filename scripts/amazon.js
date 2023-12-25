import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${(product.rating.stars) * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${((product.priceCents) / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart added-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary add-to-cart-btn"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});
document.querySelector('.products-grid').innerHTML = productsHTML;

function flashMessage(addedMsg) {
  clearTimeout(timeoutId);
    addedMsg.style.opacity = 1;
    timeoutId = setTimeout(() => {
      addedMsg.style.opacity = 0;
  }, 1000);
};

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
};

let timeoutId = '';
document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const productQuantity = Number(document.querySelector(`.quantity-selector-${productId}`).value);
    const addedMsg = document.querySelector(`.added-${productId}`);

    flashMessage(addedMsg);
    addToCart(productId, productQuantity);
    updateCartQuantity();
  });
});