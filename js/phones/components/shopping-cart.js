import Component from '../../components.js';
export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element })
    this.element = element;
    this.items = [];
    this.deleteItem = this.deleteItem.bind(this)

    this._render();
  }
  addToCart({ currentPhone, amount }) {
    let isNeededAdd = true;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].currentPhone.id === currentPhone.id) {
        this.items[i].amount += amount;
        isNeededAdd = false;
        break;
      }
    }
    if (isNeededAdd) {
      this.items.push({ currentPhone, amount });
      isNeededAdd = true;
    }
    this.itemsHtml = this.items.map(item => {
      return `
      <li>
        <div class="shoppingCart__img">
          <img alt=${item.currentPhone.id} src="${item.currentPhone.images[0]}">
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

    this._render();
    this.element.removeEventListener('click', this.deleteItem);
    this.element.addEventListener('click', this.deleteItem)
  }

  deleteItem(event) {
    if (event.target.nodeName === 'I') {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].currentPhone.id === event.target.dataset.phoneId) {
          this.items.splice(i, 1);
          break;
        }
      }
      event.target.closest('li').remove();
    }
  }
  
  _render() {
    this.element.innerHTML = `
      <p>Shopping Cart</p>
      <ul class="shoppingCart__list">
        ${this.itemsHtml || ''}
      </ul>
    `
  }
}