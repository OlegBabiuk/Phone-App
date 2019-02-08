export default class Component {
  constructor({ element }) {
    this.element = element;
    this.callbackMap = {};
  }

  hide() {
    this.element.hidden = true;
  }

  show() {
    this.element.hidden = false;
  }
  subscribe(trigger, callback) {
    this.callbackMap[trigger] = callback;
  }

  emit(trigger, callbackaArg) {
    const tempFunction = this.callbackMap[trigger];
    if (!tempFunction) {
      return;
    }
    tempFunction(callbackaArg);
  }

  debounce(func, delay) {
    let timerId = null;
    return function () {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        func.call(this, ...arguments);
        timerId = null;
      }, delay);
    }
  }

  showPreloader() {
    this.element.innerHTML = `
      <div class="preloader">
        <img 
          alt='preloader' src='./img/preloader-gif-transparent-background-14.gif'
        >
      </div>`;
  }
}