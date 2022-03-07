import { LightningElement,track,api } from 'lwc';

export default class Child extends LightningElement {

    @track abc;
    @api
    cm(strString)
    {
        this.abc = strString.toUppercase();
    }
}