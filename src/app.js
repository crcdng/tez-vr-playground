import { TezosToolkit } from '@taquito/taquito';

export class App {
  constructor () {
    this.tk = new TezosToolkit('https://api.tez.ie/rpc/mainnet');
  }

  init (address) { this.address = address; }

  async getBalance (address = this.address) {
    const rawBalance = await this.tk.rpc.getBalance(address);
    const balance = rawBalance.toNumber() / 1000000;
    return balance;
  }
}
