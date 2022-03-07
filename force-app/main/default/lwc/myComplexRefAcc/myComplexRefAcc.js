import { LightningElement,api, wire, track } from 'lwc';
import  displayOpportunity from '@salesforce/apex/MixController.displayOpportunity';
import  displayAccount from '@salesforce/apex/MixController.displayAccount';
import  displayAccountOpportunity from '@salesforce/apex/MixController.displayAccountOpportunity';
import  getOpp from '@salesforce/apex/MixController.getOpportunity';
import  updateRecord from '@salesforce/apex/MixController.updateRecord';

export default class MyComplexRefAcc extends LightningElement {
    @api currentRecordId;
    @api RecordId;
    @api newId;
    @api AccRecID;
    @track getopp=[];
	@api errorMessage;
    @wire(getOpp,{oppsId: '$RecordId'}) getopp;
    @wire(displayAccountOpportunity,{newId: '$AccRecID'}) Oppor;
    //@wire(displayOpportunity) Oppor;
    @wire(displayAccount) Accountss;

    handleAccount(event){
        var element = event.target;
        this.AccRecID = element.getAttribute('data-id');
        //this.AccRecID=event.target.id.replace('-98','');
        console.log(this.AccRecID);
        alert("hello it's me");

    }
    handleUpdate(event){
        this.currentRecordId = event.target.value;
        this.RecordId = event.target.value;
        console.log('@@currentRecordId@@@'+this.currentRecordId);

        // getOpp({oppsId: this.RecordId})
        // .then(result => {
        //     if(result){
        //     console.log('we are in getOpportunity'+result);
        //     this.getopp = result;
        //     }else {
        //         this.getopp = [];
        //         window.console.log('error  ');
        //     }
            
        // });
        updateRecord({
            oppId:this.currentRecordId
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.Oppor);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });

        
    }
}
