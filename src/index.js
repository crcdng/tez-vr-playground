import { App } from './app';

const app = new App();

document.querySelector("#submit")?.addEventListener("click", async function () {
    const address = document.querySelector("#address")?.value.trim();
    console.log(address);
    app.init(address);
    document.querySelector("#dialog")?.classList.add("hide");
});

AFRAME.registerComponent('henlink', {
  schema: { type: 'string' },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data;
    this.el.addEventListener('click', function (evt) {
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
        document.querySelector("#balance").setAttribute('text-geometry', textGeometryAttribute);
        console.log(balance);
    });
  },
  remove: function () {}
});




