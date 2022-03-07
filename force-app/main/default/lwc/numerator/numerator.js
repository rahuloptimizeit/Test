import { LightningElement,api } from 'lwc';

export default class Numerator extends LightningElement {
  @api counter = 0;
  @api priorCount =100000;
  handleIncrement() {
    this.counter++;
  }
  handleDecrement() {
    this.counter--;
  }
  handleMultiply(event) {
    const factor = event.detail;
    this.counter *= factor;
  }
  @api
  maximizeCounter() {
    this.counter += 1000000;
  }
  @api
  MinimizeCounter() {
    this.counter -= 1000000;
  }
  @api
  hundredCounter() {
    this.counter += 100;
  }
}