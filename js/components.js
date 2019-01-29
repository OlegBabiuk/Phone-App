export default class Component {
  constructor({ element }) {
    this.element = element;
  }

  hide() {
    this.element.hidden = true;
  }

  show() {
    this.element.hidden = false;
  }
}