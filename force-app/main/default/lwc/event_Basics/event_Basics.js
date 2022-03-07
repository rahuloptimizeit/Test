import { LightningElement,api } from 'lwc';

export default class Event_Basics extends LightningElement {
    @api property;
    propertySelected() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this.property.Id,
        });
        this.dispatchEvent(selectedEvent);
    }
}