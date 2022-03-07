import { LightningElement,api,wire } from 'lwc';
import displayAccounts from '@salesforce/apex/AccountController.displayAccounts';
import updateRecord from '@salesforce/apex/AccountController.updateRecord';
import { refreshApex } from '@salesforce/apex';
export default class UpdateAccount extends LightningElement {
	@api currentRecordId;
	@api errorMessage;
    @wire(displayAccounts) accounts;
    handleUpdate(event){
        this.currentRecordId=event.target.value;
        console.log('@@currentRecordId@@@'+this.currentRecordId);
        updateRecord({
            accId:this.currentRecordId
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.accounts);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }
    actualDateChange(event){
        let tempThis = this;
        this.isLoading = true;
        let taskId = event.target.getAttribute('data-id');
        let actualDate = event.target.value;
        console.log('###taskId: ' + this.taskId);
        console.log('###actualDate: ' + this.actualDate);
        debugger;
        refreshApex(this.wiredChecklist);
       
        if(actualDate != '' && taskId != ''){
            const fields = {};
            fields[TD_Workflow_Id.fieldApiName] = taskId;
            fields[TD_Workflow_EndDate.fieldApiName] = actualDate;
            const recordInput = { fields };
            updateRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Checklist updated',
                            variant: 'success'
                        })
                    );
                    //alert('Actual Date Updated!');
                   // localstorage.getItem(selectedPhase);
                  //  localstorage.getItem(selectedTaskId);
                   // window.location.reload();
                 
                    this.isLoading = false;
                   
                    return refreshApex(this.wiredChecklist);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error in updating actual date.',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );debugger;
                    console.log('Error: ' + error.body.message);
                    alert('Error in updating actual date!');
                    this.isLoading = false;
                });      
        }
    }





}