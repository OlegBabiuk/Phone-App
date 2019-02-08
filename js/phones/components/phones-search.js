import Component from '../../components.js'
export default class PhonesSearch extends Component {
  constructor({ element }) {
    super({ element });
    this._render();

    this.input = element.querySelector('[data-element="input"]');
    this.sort = element.querySelector('[data-element="sort"]');

    this.filter = this.debounce(this.filter, 500);
    
    this.element.addEventListener('input', (event) => {
      this.emit('search', event);
    })
  }

  _render() {
    this.element.innerHTML = `
      <p>
        Search:
        <input data-element="input">
      </p>
      
      <p>
        Sort by:
        <select data-element="sort">
          <option value="age">Newest</option>
          <option value="name">Alphabetical</option>
        </select>
      </p>
    `
  }
}