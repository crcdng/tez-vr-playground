/* global AFRAME, M */
import { App } from './app';

const app = new App();

document.addEventListener('DOMContentLoaded', function () {
  const waElement = document.querySelector('#enteraddress');
  const waInstance = M.Modal.init(waElement, { dismissible: false });
  waInstance.open();

  document.querySelector('#enteraddress')?.addEventListener('click', async function () {
    const address = document.querySelector('#address')?.value.trim();
    console.log(address);
    app.init(address);
  });
});

// AFRAME components should be registered before the <a-scene> tag
// These components need access to the global Taquito app instance.

AFRAME.registerComponent('henlink', {
  schema: { url: { type: 'string' }, loc: { type: 'string', default: 'tab' } },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data.url;
    const loc = this.data.loc;
    this.el.addEventListener('click', function (evt) {
      console.log('clicked on henlink');
      if (loc === 'tab') {
        window.open(url, '_blank');
      } else if (loc === 'frame') {
        const henWindowElement = document.querySelector('#henwindow');
        const henFrame = document.querySelector('#henframe');
        henFrame.setAttribute('src', url);
        const henWindowInstance = M.Modal.init(henWindowElement, { dismissible: false });
        henWindowInstance.open();
      }
    });
  }
});

AFRAME.registerComponent('balance', {
  schema: {},
  init: function () {
    console.log('registering component balance');
  },
  update: function () {
    this.el.addEventListener('click', async function (evt) {
      console.log('click on component balance');
      const balance = await app.getBalance();
      const textGeometryAttribute = `value: ${balance} Tezos; font: #comic-sans-bold`;
      document.querySelector('#balance').setAttribute('text-geometry', textGeometryAttribute);
      console.log(balance);
    });
  }
});
