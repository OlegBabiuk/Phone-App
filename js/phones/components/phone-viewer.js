import Component from '../../components.js'
export default class PhonesViewer extends Component {
  constructor({ element }) {
    super({ element });
    this.element = element;
    this._functionRouter = this._functionRouter.bind(this);
  }

  showDetails(phone) {
    this.phoneDetails = phone;
    this._render();
    this.show();
    this.element.addEventListener('click', this._functionRouter);
  }

  _functionRouter(event) {
    event.preventDefault();
    if (event.target.closest('[data-img="medium"]')) {
      this._gallery(event);
    }
    if (event.target.closest('[data-btn="back"]')) {
      this.emit('onBtnBack');
      this.element.removeEventListener('click', this._functionRouter);
    }
    if (event.target.closest('[data-phone-id]')) {
      this.emit('onBtnBasket', {
        currentPhone: this.phoneDetails,
        amount: 1
      });
    }
  }

  _gallery(event) {
    this.element.querySelector('[data-img="large"]').src = event.target.src;
  }
  
  _render() {
    const phone = this.phoneDetails;
    this.element.innerHTML = `
      <div>

        <img
          data-img="large"
          class="phone"
          src="${phone.images[0]}">

        <button data-btn="back"> Back </button>
        <button data-phone-id="${phone.id}">Add to basket</button>


        <h1>${phone.name}</h1>

        <p>${phone.description}</p>

        <ul class="phone-thumbs">

          ${phone.images
            .map(imageSrc => {
              return '<li><img data-img="medium" src=' + imageSrc + '></li>'
            })
            .join('')}
        
        </ul>

        <ul class="specs">
          <li>
            <span>Availability and Networks</span>
            <dl>
              <dt>Availability</dt>

              ${phone.availability
                .map(item => {
                  return '<dd>' + item + '</dd>'
                })
                .join('')}
                
            </dl>
          </li>
          <li>
            <span>Battery</span>
            <dl>
              <dt>Type</dt>
              <dd>${phone.battery.type}</dd>
              <dt>Talk Time</dt>
              <dd>${phone.battery.talkTime}</dd>
              <dt>Standby time (max)</dt>
              <dd>${phone.battery.standbyTime}</dd>
            </dl>
          </li>
          <li>
            <span>Storage and Memory</span>
            <dl>
              <dt>RAM</dt>
              <dd>${phone.storage.ram}</dd>
              <dt>Internal Storage</dt>
              <dd>${phone.storage.flash}</dd>
            </dl>
          </li>
          <li>
            <span>Connectivity</span>
            <dl>
              <dt>Network Support</dt>
              <dd>${phone.connectivity.cell}</dd>
              <dt>WiFi</dt>
              <dd>${phone.connectivity.wifi}</dd>
              <dt>Bluetooth</dt>
              <dd>${phone.connectivity.bluetooth}</dd>
              <dt>Infrared</dt>
              <dd>${(phone.connectivity.infrared) ? '✓' : '✘'}</dd>
              <dt>GPS</dt>
              <dd>${(phone.connectivity.gps) ? '✓' : '✘'}</dd>
            </dl>
          </li>
          <li>
            <span>Android</span>
            <dl>
              <dt>OS Version</dt>
              <dd>${phone.android.os}</dd>
              <dt>UI</dt>
              <dd>${phone.android.ui}</dd>
            </dl>
          </li>
          <li>
            <span>Size and Weight</span>
            <dl>
              <dt>Dimensions</dt>
              <dd>${phone.sizeAndWeight.dimensions[0]}</dd>
              <dd>${phone.sizeAndWeight.dimensions[1]}</dd>
              <dd>${phone.sizeAndWeight.dimensions[2]}</dd>
              <dt>Weight</dt>
              <dd>${phone.sizeAndWeight.weight}</dd>
            </dl>
          </li>
          <li>
            <span>Display</span>
            <dl>
              <dt>Screen size</dt>
              <dd>${phone.display.screenSize}</dd>
              <dt>Screen resolution</dt>
              <dd>${phone.display.screenResolution}</dd>
              <dt>Touch screen</dt>
              <dd>${(phone.display.touchScreen) ? '✓' : '✘'}</dd>
            </dl>
          </li>
          <li>
            <span>Hardware</span>
            <dl>
              <dt>CPU</dt>
              <dd>${phone.hardware.cpu}</dd>
              <dt>USB</dt>
              <dd>${phone.hardware.usb}</dd>
              <dt>Audio / headphone jack</dt>
              <dd>${phone.hardware.audioJack}</dd>
              <dt>FM Radio</dt>
              <dd>${(phone.hardware.fmRadio) ? '✓' : '✘'}</dd>
              <dt>Accelerometer</dt>
              <dd>${(phone.hardware.accelerometer) ? '✓' : '✘'}</dd>
            </dl>
          </li>
          <li>
            <span>Camera</span>
            <dl>
              <dt>Primary</dt>
              <dd>${phone.camera.primary}</dd>
              <dt>Features</dt>
              <dd>${phone.camera.features.join(', ').slice(0, -2)}</dd>
            </dl>
          </li>
          <li>
            <span>Additional Features</span>
            <dd>${phone.additionalFeatures}</dd>
          </li>
        </ul>
      </div>
    `
  }
}