import PhonesCatalog from './components/phones-catalog.js';
import PhonesViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesSearch from './components/phones-search.js';
import Pagination from './components/pagination.js';
import Component from '../components.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage extends Component {
  constructor({element}) {
    super({element})

    this.element = element;
    this._render();

    this.initViewer();
    this.initPagination();
    this.initCatalog();
    this.initShoppingCart();
    this.initPhonesSearch();
    

    this._onSearchPanel = this.debounce(this._onSearchPanel, 300);
  }

  initViewer() {
    this.viewer = new PhonesViewer({
      element: this.element.querySelector('[data-component="phone-viewer"]')
    });

    this.viewer.showPreloader();

    this.viewer.subscribe('onBtnBack', () => {
      this.viewer.hide();
      this.catalog.show();
      this.pagination.show();
    });

    this.viewer.subscribe('onBtnBasket', ({ currentPhone, amount }) => {
      this.basket.addToCart({ currentPhone, amount });
    });
  }
  
  initCatalog() {
    this.catalog = new PhonesCatalog({
      element: this.element.querySelector('[data-component="phone-catalog"]'),
    });

    this.catalog.showPreloader();
    
    if (sessionStorage.getItem('allPhones')) {
      this.allPhones = JSON.parse(sessionStorage.getItem('allPhones'));
      this.pagination.division(this.allPhones);
      this._onPagination();
    } else {
      let showAllPhones = async () => {
        this.allPhones = await PhoneService.getAll();
        sessionStorage.setItem('allPhones', JSON.stringify(this.allPhones));
        this.pagination.division(this.allPhones);
        this._onPagination();
      }
      showAllPhones();
    }

    this.catalog.subscribe('viewPhone', async (phoneId) => {

      if (sessionStorage.getItem('phoneId')) {
        this.viewer.showDetails(JSON.parse(sessionStorage.getItem(`${phoneId}`)));
      } else {
        let phoneDetails = await PhoneService.getById(phoneId);

        sessionStorage.setItem(`${phoneId}`, JSON.stringify(phoneDetails));
        this.viewer.showDetails(phoneDetails);
      }

      this.catalog.hide();
      this.pagination.hide();
    });

    this.catalog.subscribe('onBtnAdd', async ({ phoneId }) => {
 
      if (sessionStorage.getItem(phoneId)) {
        let currentPhone = JSON.parse(sessionStorage.getItem(phoneId));
        this.basket.addToCart({ currentPhone });
      } else {
        let currentPhone = await PhoneService.getById(phoneId);
        
        this.basket.addToCart({ currentPhone });
      }
    });
  }

  initShoppingCart() {
    this.basket = new ShoppingCart({
      element: this.element.querySelector('[data-component="phone-basket"]')
    })
  }

  initPhonesSearch() {
    this.searchPanel = new PhonesSearch({
      element: this.element.querySelector('[data-component="phone-search"]')
    });

    this.filterSettings = {
      input: '',
      sort: '',
    };
    this.searchPanel.subscribe('search', (event) => {
      let filterType = event.target.dataset.element;
      let inputValue = event.target.value.toLowerCase();

      if (filterType === 'input') {
        this.filterSettings.input = inputValue;
      }
      if (filterType === 'sort') {
        
        this.filterSettings.sort = inputValue;
      }

      this._onSearchPanel(this.allPhones);
    })
  }

  initPagination() {
    this.pagination = new Pagination({
      element: this.element.querySelector('[data-component="pagination"]')
    })
  }

  _onSearchPanel(allPhones) {
    let currentPhones = allPhones;
    
    if (this.filterSettings.input) {
      currentPhones = currentPhones.filter(phone => {
        return phone.name.toLowerCase().includes(this.filterSettings.input);
      })
    }
    
    if (this.filterSettings.sort === 'name') {
      currentPhones = currentPhones.sort((phone1, phone2) => {
        return phone1.name > phone2.name ? 1 : -1;
      })
    }
    
    if (this.filterSettings.sort === 'age') {
      currentPhones = currentPhones.sort((phone1, phone2) => {
        return phone1.age - phone2.age;
      })
    }
    this.pagination.division(currentPhones, true);
    this._onPagination();
  }

  _onPagination() {
    this.pagination.subscribe('division', (divisionPhones) => {
      this.catalog.showCatalog(divisionPhones);
    })
  }

  _render() {
    this.element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <div class="sidebar">
            <section>
              <div data-component="phone-search"></div>
            </section>

            <section class="phone-basket">
              <div data-component="phone-basket"></div>
            </section>
          </div>
        </div>

        <!--Main content-->
        <div class="col-md-10">

          <div data-component="phone-catalog"></div>
          <div data-component="pagination"></div>
          <div data-component="phone-viewer" hidden></div>

        </div>
      </div>
    `
  }
}