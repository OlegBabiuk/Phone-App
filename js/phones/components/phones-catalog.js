import Component from '../../components.js';

export default class PhonesCatalog extends Component {
  constructor({
    element,
  }) {
    super({ element });
    this.element = element;
    this.allPhones = [];

    this._render();

    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      const viewPhone = event.target.closest('[data-phone-id]');
      const addPhone = event.target.closest('[data-phone-add]');

      if (addPhone) {
        this.emit('onBtnAdd', {
          phoneId: addPhone.dataset.phoneAdd,
          amount: 1,
        });
      }
      if (viewPhone) {
        this.emit('viewPhone', viewPhone.dataset.phoneId);
      }
    });
  }

  showCatalog(allPhones) {
    this.allPhones = allPhones;
    this._render();
  }

  _render() {
    this.allPhonesHtml = this.allPhones.map(phone => `
        <li data-element="phone" class="thumbnail">
          <a
            data-phone-id=${phone.id}
            href="#!/phones/${phone.id}" 
            class="thumb"
          >
            <img alt="${phone.name}" src="${phone.imageUrl}">
          </a>

          <div class="phones__btn-buy-wrapper">
            <a
              data-phone-add=${phone.id} 
              class="btn btn-success"
            >
              Add
            </a>
          </div>

          <a href="#!/phones/${phone.id}" data-phone-id=${phone.id}>
            ${phone.name}
          </a>
          <p>${phone.snippet}</p>
        </li>
      `).join('');

    this.element.innerHTML = `
    <ul class="phones">
      ${this.allPhonesHtml}
    </ul>
    `;
  }
}
