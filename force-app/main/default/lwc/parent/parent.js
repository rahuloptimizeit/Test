import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {

    handleClick(event)
    {
        console.log('value is ',event.target.value);
        this.template.queryselector('c-child').cm(event.target.value);
    }
}