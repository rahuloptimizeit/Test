import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub' ; 
export default class PubsubPublisher extends LightningElement {

    handleClick(){
        window.console.log('Event Firing..... ');
        let message = {
            "message" : 'Hello PubSub'
        }
        pubsub.fire('simplevt', message );
        window.console.log('Event Fired ');
    }
}