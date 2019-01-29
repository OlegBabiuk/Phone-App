import Component from '../../components.js';
export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element })
    this.element = element;
    this.items = this._ordersInStorage() || [];
    this.deleteItem = this.deleteItem.bind(this);
    this.element.addEventListener('click', this.deleteItem);
    this._render();
  }

  addToCart({ currentPhone, amount }) {
    let isNeededAdd = true;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].currentPhone.id === currentPhone.id) {
        this.items[i].amount += amount;
        this._ordersInStorage('set');
        isNeededAdd = false;
        break;
      }
    }
    if (isNeededAdd) {
      this.items.push({ currentPhone, amount });
      this._ordersInStorage('set');
    }
    this._render();    
  }

  deleteItem(event) {
    if (event.target.hasAttribute('data-phone-id')) {
      this.items = this.items.filter(item => {
        return item.currentPhone.id !== event.target.dataset.phoneId;
      })
      event.target.closest('[data-element]').remove();
      this._ordersInStorage('set');
    }
  }
  
  _ordersInStorage(set) {
    if (set) {
      localStorage.setItem('itemsInBasket', JSON.stringify(this.items));
    } else {
      return JSON.parse(localStorage.getItem('itemsInBasket'));
    }
  }

  _render() {
    this.itemsHtml = this.items.map(item => {
      return `
        <li data-element="phone">
          <div class="shoppingCart__img">
            <img alt="${item.currentPhone.id}"
            src="${item.currentPhone.images[0]}">
          </div>
          <span class="shoppingCart__name">${item.currentPhone.name}</span>
          <span class="shoppingCart__amount" data-basket="amount">
            Qty: ${item.amount}
          </span>
          <i class="fas fa-times-circle"
            data-phone-id=${item.currentPhone.id}></i>
        </li>
      `
    }).join('');

    this.element.innerHTML = `
      <p>Shopping Cart</p>
      <ul class="shoppingCart__list">
        ${this.itemsHtml || ''}
      </ul>
    `
  }
}