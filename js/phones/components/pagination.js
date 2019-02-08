import Component from '../../components.js'
export default class Pagination extends Component {
  constructor({ element }) {
    super({ element });
    this.element = element; 
    this.onPage = 5;
    this.currentPage = 1;
    this.startPosition = 0;
    this._render();
    this.paginationSwitch = this.element
        .querySelector('[data-pagination="switch"]');
    this.pageList = this.element
        .querySelector('[data-pagination="pageList"]');
    this.indicatePage = this.element
        .querySelector('[data-pagination="indicatePage"]');
    this.navigation = this.element
        .querySelector('[data-pagination="navigation"]');
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
      this.emit('division', this.phonesListPart)
    });
  }

  _addListeners() {
    this.paginationSwitch.addEventListener('input', (event) => {
      if (event.target.value === 'all') {
        this.onPage = this.numberOfItems;
        this.startPosition = 0;
      } else {
        this.onPage = (+event.target.value > this.numberOfItems)
          ? this.numberOfItems
          : +event.target.value;
      }
      
      this.division();
    })

    this.navigation.addEventListener('click', (event) => {
      let targetData = event.target.dataset.pagination;

      if (targetData === 'previous' && this.startPosition > 0) {
        this.startPosition -= this.onPage;
      }

      if (targetData === 'next' && this.finishPosition < this.numberOfItems) {
        this.startPosition += this.onPage;
      }

      if (!isNaN(+targetData)) {
        this.startPosition = this.onPage * (+targetData - 1);
      }

      this.division();
    })
  }

  _calculatePages() {
    if (this.finishPosition > this.numberOfItems) {
      this.startPosition = 0;
    }
    
    this.numberOfPages = Math.ceil(this.numberOfItems  / this.onPage);
    this.finishPosition = this.startPosition + this.onPage;
    this.currentPage = this.finishPosition / this.onPage;
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