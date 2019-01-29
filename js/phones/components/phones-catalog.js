import Component from '../../components.js'
export default class PhonesCatalog extends Component {
  constructor({
    element,
    allPhones = [],
    phoneSelected = () => {}
  }) {
    super({ element });
    this.element = element;
    this.allPhones = allPhones;
    this.allPhonesHtml = this.allPhones.map(phone => {
      return `
        <li class="thumbnail">
          <a href="#!/phones/${phone.id}" class="thumb" data-phone-id=${phone.id}>
            <img alt="${phone.name}" src="${phone.imageUrl}">
          </a>

          <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success" data-phone-add=${phone.id} data-phone-id=${phone.id}>
              Add
            </a>
          </div>

          <a href="#!/phones/${phone.id}" data-phone-id=${phone.id}>
            ${phone.name}
          </a>
          <p>${phone.snippet}</p>
        </li>
      `
    }).join('');
    this._render();
    this.phoneSelected = phoneSelected;
    
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      let viewPhone = event.target.closest('[data-phone-id]');
      let addPhone = event.target.closest('[data-phone-add]');
      
      if (addPhone) {
        this.phoneSelected(viewPhone.dataset.phoneAdd, 1);
      } else if (viewPhone) {
        this.phoneSelected(viewPhone.dataset.phoneId);
      }
    })
  }
  _render() {
    this.element.innerHTML = `
    <ul class="phones">
      ${this.allPhonesHtml}
    </ul>
    `
  }
}