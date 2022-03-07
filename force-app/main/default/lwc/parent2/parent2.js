import { LightningElement } from 'lwc';

export default class Parent2 extends LightningElement {
    counter = 0;
//   handleIncrement() {
//     this.counter++;
//   }
  handleDecrement() {
    this.counter--;
  }
}