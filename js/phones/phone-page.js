import PhonesCatalog from './components/phones-catalog.js';
import PhonesViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Component from '../components.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage extends Component {
  constructor({element}) {
    super({element})

    this.element = element;
    this._render();

    this.viewer = new PhonesViewer({
      element: this.element.querySelector('[data-component="phone-viewer"]'),
      activeBtnBack: () => {
        this.viewer.hide();
        this.catalog.show();
      },
      activeBtnBasket: ({currentPhone,amount}) => {
        this.basket.addToCart({ currentPhone, amount });
      }
    });

    this.catalog = new PhonesCatalog({
      element: this.element.querySelector('[data-component="phone-catalog"]'),
      allPhones: PhoneService.getAll(),
      phoneSelected: (phoneId, amount) => {
        const currentPhone = PhoneService.getById(phoneId);
        if (amount) {
          this.basket.addToCart({ currentPhone, amount });
        } else {
          this.viewer.showDetails(currentPhone);
          this.catalog.hide();
        }
      }
    });

    this.basket = new ShoppingCart({
      element: this.element.querySelector('[data-component="phone-basket"]')
    })
  }
  _render() {
    this.element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <p>
              Search:
              <input>
            </p>
            
            <p>
              Sort by:
              <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </p>
          </section>

          <section>
            <div data-component="phone-basket"></div>
          </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">

        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" hidden></div>

        </div>
      </div>
    `
  }
}