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

  // eslint-disable-next-line class-methods-use-this
  debounce(func, delay) {
    let timerId = null;
    return function tepm(arg) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        func.call(this, arg);
        timerId = null;
      }, delay);
    };
  }

  showPreloader() {
    this.element.innerHTML = `
      <div class="preloader">
        <img 
          alt='preloader' src='./img/preloader-gif-transparent-background-14.gif'
        >
      </div>
    `;
  }
}
