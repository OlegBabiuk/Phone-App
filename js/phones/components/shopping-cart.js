import Component from '../../components.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });
    this.element = element;
    this.items = this._ordersInStorage() || {};
    this.deleteItem = this.deleteItem.bind(this);
    this.element.addEventListener('click', this.deleteItem);
    this._render();
  }

  addToCart({ currentPhone, amount = 1 }) {
    let isNeedToAdd = true;

    if (this.items[currentPhone.id]) {
      this.items[currentPhone.id].amount += amount;
      this._ordersInStorage('set');
      isNeedToAdd = false;
    }

    if (isNeedToAdd) {
      this.items[currentPhone.id] = { currentPhone, amount };
      this._ordersInStorage('set');
    }
    this._render();
  }

  deleteItem(event) {
    if (event.target.hasAttribute('data-phone-id')) {
      delete this.items[event.target.dataset.phoneId];
      event.target.closest('[data-element]').remove();
      this._ordersInStorage('set');
    }
  }

  // eslint-disable-next-line consistent-return
  _ordersInStorage(set) {
    if (set) {
      localStorage.setItem('itemsInBasket', JSON.stringify(this.items));
    } else {
      return JSON.parse(localStorage.getItem('itemsInBasket'));
    }
  }

  _render() {
    this.itemsHtml = Object.entries(this.items)
      .map(savedItem => `
        <li data-element="phone">
          <div class="shoppingCart__img">
            <img alt="${savedItem[0]}"
            src="${savedItem[1].currentPhone.images[0]}">
          </div>
          <span class="shoppingCart__name">${savedItem[1].currentPhone.name}</span>
          <span class="shoppingCart__amount" data-basket="amount">
            Qty: ${savedItem[1].amount}
          </span>
          <i class="fas fa-times-circle"
            data-phone-id=${savedItem[1].currentPhone.id}></i>
        </li>
      `).join('');

    this.element.innerHTML = `
      <p>Shopping Cart</p>
      <ul class="shoppingCart__list">
        ${this.itemsHtml || '<h5>Your Shopping Cart is empty</h5>'}
      </ul>
    `;
  }
}
