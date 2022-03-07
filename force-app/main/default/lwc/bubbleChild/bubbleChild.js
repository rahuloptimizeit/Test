import { LightningElement,track } from 'lwc';

export default class bubbleChild extends LightningElement {
    @track txtBoxVal='';
    handleChange(event)
    {
        this.txtBoxVal=event.target.value;
        console.log('msg2 :',this.txtBoxVal);
    }
    handleclick(event) {
        const txtBoxValue=this.txtBoxVal;
       // this.txtBoxVal=event.target.value;
        console.log('msg1 :',txtBoxValue);
        const inputText = new CustomEvent('inputtext', {
        bubbles:false, composed:true ,detail :txtBoxValue});
      
        this.dispatchEvent(inputText);
    }
}