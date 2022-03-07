import { LightningElement } from 'lwc';

export default class Parent3 extends LightningElement {
    counter = 2;
  handleMulti() {
    this.counter=this.counter*this.counter;
  }
 
}