import { LightningElement,track } from 'lwc';

export default class bubbleGrandParent extends LightningElement {
    @track valueFromGrandChild ='';
    handleClickEventP(event) {
        this.valueFromGrandChild=event.detail;
    }
}