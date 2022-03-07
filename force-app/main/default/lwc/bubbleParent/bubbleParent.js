import { LightningElement,track} from 'lwc';

export default class bubbleParent extends LightningElement {
    @track valueFromChild ='';
    handleClickEvent(event) {
        this.valueFromChild=event.detail;
    }
}