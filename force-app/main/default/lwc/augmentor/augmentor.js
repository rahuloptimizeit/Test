import { LightningElement } from 'lwc';

export default class Augmentor extends LightningElement {

    startCounter = 0;
    handleStartChange(event) {
      this.startCounter = parseInt(event.target.value);
    }
    handleMaximizeCounter() {
        this.template.querySelector('c-numerator').maximizeCounter();
        this.template.querySelector('c-remote-Control').maximizeCounter();
      }
      handleMinimizeCounter() {
        this.template.querySelector('c-numerator').MinimizeCounter();
        this.template.querySelector('c-remote-Control').maximizeCounter();
      }
      handlehundredCounter() {
        this.template.querySelector('c-numerator').hundredCounter();
        this.template.querySelector('c-remote-Control').maximizeCounter();
      }
}