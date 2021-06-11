import { App } from './app';

const app = new App();

document.addEventListener('DOMContentLoaded', function () {
  const waElement = document.querySelector('#enteraddress');
  const waInstance = M.Modal.init(waElement, { dismissible: false });
  waInstance.open();
});

document.querySelector('#enteraddress')?.addEventListener('click', async function () {
  const address = document.querySelector('#address')?.value.trim();
  console.log(address);
  app.init(address);
  document.querySelector('#dialog')?.classList.add('scale-out');
});

AFRAME.registerComponent('henlink', {
  schema: { type: 'string' },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data;
    this.el.addEventListener('click', function (evt) {
      console.log('clicked on henlink');
      window.open(url, '_blank');
    });
  },
  remove: function () {}
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
  },
  remove: function () {}
});
