import Component from '../../components.js';

export default class Pagination extends Component {
  constructor({ element }) {
    super({ element });
    this.element = element;
    this.onPage = 5;
    this.currentPage = 1;
    this.startPosition = 0;
    this.switcherStatus = this.onPage;
    this._render();

    this.paginationSwitch = this.element
      .querySelector('[data-pagination="switch"]');
    this.pageList = this.element
      .querySelector('[data-pagination="pageList"]');
    this.indicatePage = this.element
      .querySelector('[data-pagination="indicatePage"]');
    this.navigation = this.element
      .querySelector('[data-pagination="navigation"]');
    this.previousBtn = this.navigation
      .querySelector('[data-pagination="previous"]');
    this.nextBtn = this.navigation
      .querySelector('[data-pagination="next"]');

    this._addListeners();
  }

  division(allPhones, filterUsed) {
    if (filterUsed) {
      this.startPosition = 0;
    }
    this.allPhones = allPhones || this.allPhones;
    this.numberOfItems = this.allPhones.length;

    this._calculatePages();
    this._updataPagination();

    setTimeout(() => {
      this.emit('division', this.phonesListPart);
    });
  }

  _addListeners() {
    this.paginationSwitch.addEventListener('input', (event) => {
      this.switcherStatus = event.target.value;
      if (this.switcherStatus === 'all') {
        this.onPage = this.numberOfItems;
        this.startPosition = 0;
      } else {
        this.onPage = (+this.switcherStatus > this.numberOfItems)
          ? this.numberOfItems
          : +event.target.value;
      }

      this.division();
    });

    this.navigation.addEventListener('click', (event) => {
      const targetData = event.target.dataset.pagination;

      if (targetData === 'previous' && this.startPosition > 0) {
        this.startPosition -= this.onPage;
      }

      if (targetData === 'next' && this.finishPosition < this.numberOfItems) {
        this.startPosition += this.onPage;
      }

      if (!Number.isNaN(+targetData)) {
        this.startPosition = this.onPage * (+targetData - 1);
      }

      this.division();
    });
  }

  _calculatePages() {
    if (this.finishPosition > this.numberOfItems) {
      this.startPosition = 0;
    }

    this.numberOfPages = Math.ceil(this.numberOfItems / this.switcherStatus);

    this.finishPosition = this.startPosition
      + (Number.isNaN(+this.switcherStatus)
        ? this.onPage
        : +this.switcherStatus);
    this.currentPage = Math.floor(this.finishPosition / this.onPage);
    this.phonesListPart = this.allPhones
      .slice(this.startPosition, this.finishPosition);
  }

  _updataPagination() {
    let numberBtn = '';
    for (let i = 1; i <= this.numberOfPages; i++) {
      if (this.currentPage === i) {
        numberBtn += `<li class="active" data-pagination="${i}">${i}</li>`;
      } else {
        numberBtn += `<li data-pagination="${i}">${i}</li>`;
      }
    }
    this.pageList.innerHTML = `${numberBtn}`;
    this.indicatePage.innerHTML = `
      <p>
        ${this.startPosition + 1} - ${this.phonesListPart.length + this.startPosition} of
        ${this.numberOfItems}
      </p>`;

    this.previousBtn.hidden = false;
    if (this.currentPage === 1) {
      this.previousBtn.hidden = true;
    }

    this.nextBtn.hidden = false;
    if (this.currentPage === this.numberOfPages
        || this.switcherStatus === 'all'
    ) {
      this.nextBtn.hidden = true;
    }

    this.navigation.hidden = false;
    if (this.numberOfPages === 1) {
      this.navigation.hidden = true;
    }
  }

  _render() {
    this.element.innerHTML = `
    <section class="pagination">
      <div class="pagination__part_left">
        <select name="itemOnPage" data-pagination="switch">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="all">All</option>
        </select>
        <p>per page</p>
      </div>

      <div 
        class="pagination__part_center"
        data-pagination="navigation"
      >
        <div 
          class="pagination__btn"
          data-pagination="previous"
        > 
          Previous 
        </div>

        <ul data-pagination="pageList">
          
        </ul>

        <div 
          class="pagination__btn"
          data-pagination="next"
        >
          Next 
        </div>
      </div>
      
      <div 
        class="pagination__part_right"
        data-pagination="indicatePage"
      ></div>
    </section>`;
  }
}
