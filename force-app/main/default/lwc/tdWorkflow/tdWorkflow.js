import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { getRecord,updateRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import getTDWorkflow from '@salesforce/apex/TDWorkflowController.getTDWorkflow';
import getTDWorkflowChecklist from '@salesforce/apex/TDWorkflowController.getTDWorkflowChecklist';
import TD_Workflow_Id from '@salesforce/schema/TD_Workflow__c.Id';
import TD_Workflow_Notes from '@salesforce/schema/TD_Workflow__c.Notes__c';
import TD_Workflow_EndDate from '@salesforce/schema/TD_Workflow__c.End_Date__c';
import CheckValue_Field from '@salesforce/schema/TD_Workflow_Checklist__c.Check_Value__c';
import Checklist_ID_FIELD from '@salesforce/schema/TD_Workflow_Checklist__c.Id';
import {loadStyle} from 'lightning/platformResourceLoader';
import TDWorkflowStyles from '@salesforce/resourceUrl/TDWorkflowStyles';

export default class TdWorkflow extends LightningElement {
    @api opportunityId;
    @track tdWorkflow;
    @track error;
    @track phases = [];
    @track phaseTasks = [];
    @track taskChecklist;
    @track selectedPhase;
    @track selectedTaskId;
    @track isLoading = false;
    @track wiredChecklist = [];
    @track userName;

    @wire(getRecord, {recordId : USER_ID, fields : ['User.Name']})
    wireduser({data, error}){debugger;console.log('###USER_ID: ' + USER_ID);
        if(data){debugger;
            this.userName = data.fields.Name.value;
        }else if(error){
            this.error = error;
        }
    }

    @wire(getTDWorkflow, {opportunityId: '$opportunityId'}) 
    wiredTDWorkflow({data, error}){   
        this.isLoading = true;
        this.wiredActivities = data;  
        if(data){
            console.log('data-->' + data);debugger;
            if(data.length > 0){
                let tempThis = this;   
                this.tdWorkflow = data;
                this.error = undefined;
                let oldPhase = '';
                let tempPhases = [];
                this.selectedPhase = this.tdWorkflow[0].Phase__c;
                
               // console.log(this.selectedPhase,this.tdWorkflow);
            //   localstorage.setItem('selectedPhase',this.selectedPhase);
                let phaseStats = [];
               /* if(localStorage.getItem('selectedPhase') !== null)
                {
                    tempThis.selectedPhase = localStorage.getItem('selectedPhase');
                    tempThis.selectedTaskId = localStorage.getItem('selectedTaskId');
         
                }*/
                this.tdWorkflow.forEach(function(tdf){
                    if(tempThis.selectedTaskId == undefined && tdf.Status__c == 'In Progress'){debugger;
                        tempThis.selectedPhase = tdf.Phase__c;
                        tempThis.selectedTaskId = tdf.Id;
                      
                       // localstorage.setItem('selectedPhase',tempThis.selectedPhase);
                     //   localstorage.setItem('selectedTaskId',tempThis.selectedTaskId);
                       // console.log(tempThis.selectedTaskId);
                    }
                    if(oldPhase != tdf.Phase__c){
                        phaseStats = tempThis.getPhaseStats(tdf.Phase__c);
                        tempPhases.push({label : tdf.Phase__c, tdWorkflowId : tdf.Id, opportunityId : tdf.Opportunity__r, cssClass : 'slds-tabs_default__item ' + (tdf.Phase__c == tempThis.selectedPhase ? 'slds-is-active ' : ''), phaseStats : phaseStats});
                        oldPhase = tdf.Phase__c;
                    
                    }
                });//, taskList : this.tdWorkflow.filter(item => item.Phase__c === tdf.Phase__c)
               
            
                this.phases = tempPhases;
                debugger;
                //this.template.querySelectorAll('lightning-tabset').activeTabValue = this.selectedTaskId;
                if(tempPhases.length > 0){
                    this.createPhaseTask(data, tempPhases[0].label);//this.phaseTasks = data.filter(item => item.Phase__c === tempPhases[0].label);
                    console.log(tempPhases);
                }
             
            }else{
                alert('Tenancy delivery workflow is not available, Please check stage, fitout period and handover date of opportunity record.');
            }
            this.isLoading = false;
        }else{
            console.log('error-->' + error);
            this.tdWorkflow = undefined;
            this.error = error;
            this.isLoading = false;
        }
    }
    handler() {
         refreshApex(this.wiredActivities);
    }

    getPhaseStats(phaseName){
        let tempThis = this;
        let phaseStats = [];
        let completedTask = 0; let redAlertTask = 0; let orangeAlertTask = 0; let greenAlertTask = 0; let blueAlertTask = 0;
        this.tdWorkflow.filter(item => item.Phase__c == phaseName).forEach(function(record){
            const diffDays = tempThis.getDateDiff(new Date(), new Date(record.Target_Date__c));
            //console.log(diffDays + " days - " + record.Task_Overview__c);
            if(record.Status__c == 'Completed')
                completedTask++;
            else if(diffDays < 0)
                redAlertTask++;
            else if(diffDays >= 0 && diffDays < 7)
                orangeAlertTask++;
            else if(diffDays >= 7 && diffDays < 14)
                greenAlertTask++;
            else
                blueAlertTask++;
        });
        phaseStats.push({completed : completedTask, red : redAlertTask, orange : orangeAlertTask, green : greenAlertTask, blue : blueAlertTask});
        return phaseStats;
    }
    
    createPhaseTask(records, phaseName){debugger;
        let tempThis = this;
        let tempPhaseTasks = [];
        if(this.tdWorkflow.length > 0){
            let tempTask = this.tdWorkflow.filter(item => item.Phase__c == phaseName && item.Status__c == 'In Progress');
            if(tempTask.length == 0)
                tempTask = this.tdWorkflow.filter(item => item.Phase__c == phaseName);
            this.selectedTaskId = tempTask[0].Id;
        }        
        records.filter(item => item.Phase__c === phaseName).forEach(function(record){
            let cssHightlight = 'blueAlert';
            const diffDays = tempThis.getDateDiff(new Date(), new Date(record.Target_Date__c));
            //console.log(diffDays + " days - " + record.Task_Overview__c);
            if(record.Status__c == 'Completed')
                cssHightlight = 'completedAlert';
            else if(diffDays < 0)
                cssHightlight = 'redAlert';
            else if(diffDays >= 0 && diffDays < 7)
                cssHightlight = 'orangeAlert';
            else if(diffDays >= 7 && diffDays < 14)
                cssHightlight = 'greenAlert';

            tempPhaseTasks.push({taskId : record.Id, taskName : record.Task_Overview__c, taskOwner : record.Task_Owner__c, status : record.Status__c, startDate : record.Target_Date__c, plannedDate : record.Target_Date__c, actualDate : record.End_Date__c, cssClass : 'slds-vertical-tabs__nav-item ' + (record.Id == tempThis.selectedTaskId ? 'slds-is-active ' : ''), cssClassHighlight : cssHightlight, notes : record.Notes__c});
        });
        this.phaseTasks = tempPhaseTasks;
        this.setPhaseAndTaskTabVisibility();
        
        return refreshApex(this.wiredChecklist);
    }

    getDateDiff(date1, date2){
        /*const date1 = new Date(); 
        const date2 = new Date(record.Target_Date__c);*/
        const diffTime = date2 - date1;//Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        //console.log(diffTime + " milliseconds");
        //console.log(diffDays + " days");
        return diffDays;
    }

    @wire(getTDWorkflowChecklist, {tdWorkflowId : '$selectedTaskId'})
    wiredTDWorkflowChecklist({data, error}){ 
        let tempThis = this;
        this.wiredChecklist= data;
        if(data){
            let tempTaskChecklist = [];
            data.forEach(function(chk){
                let chkOptions = [];//chk.Check_Option__c.split(/,/);
                let isDisabled = chk.Check_Value__c != null ? true : false;
                chk.Check_Option__c.split(/,/).forEach(function(chkOpt){
                    chkOptions.push({option : chkOpt, isSelected : (chk.Check_Value__c == chkOpt)})
                });
                tempTaskChecklist.push({CheckId : chk.Id, CheckLabel : chk.Check_Label__c, CheckOptions : chkOptions, checkValue : chk.Check_Value__c, isDisabled : isDisabled, lastModifiedBy: chk.LastModifiedBy.Name, lastModifiedDate : chk.LastModifiedDate, icCheckChecked : (chk.Check_Value__c != null ? true : false), isEscalation : (chk.Escalation_Notification__c == 'N/A' || chk.Escalation_Notification__c == null ? false : true), escalationDate : chk.Escalation_Date__c, ecsalationTo : chk.Escalation_Notification__c});
            });debugger;
            this.taskChecklist = tempTaskChecklist;
        }else{
            this.taskChecklist = undefined;
            this.error = error;
        }
    }

    connectedCallback(){
        //console.log('###connectedCallback');
        if(this.selectedTaskId !== undefined) {
            this.template.querySelectorAll('lightning-tabset').activeTabValue = this.selectedTaskId;
        }
    }

    renderedCallback(){
        //console.log('###renderedCallback');
        Promise.all([
            loadStyle(this, TDWorkflowStyles + '/TDWorkflow/TDWorkflow.css')
        ]);
        this.setPhaseAndTaskTabVisibility();
    }

    setPhaseAndTaskTabVisibility(){
        if(this.selectedPhase != undefined){
            /*this.template.querySelector('[data-container="' + this.selectedPhase + '"]').classList.remove('slds-hide');
            this.template.querySelector('[data-container="' + this.selectedPhase + '"]').classList.add('slds-show');*/
            this.template.querySelectorAll('[data-container="' + this.selectedPhase + '"]').forEach((dvObj, ind) => {
                dvObj.classList.remove('slds-hide');
                dvObj.classList.add('slds-show');
            });
        }
        if(this.selectedTaskId !== undefined) {
            this.template.querySelectorAll('[data-container="' + this.selectedTaskId + '"]').forEach((dvObj, ind) => {
                dvObj.classList.remove('slds-hide');
                dvObj.classList.add('slds-show');
            });
        }
    }

    handleActive(event){
        //this.phaseTasks = this.tdWorkflow.filter(item => item.Phase__c === event.target.label);
        this.createPhaseTask(this.tdWorkflow, event.target.label);
    }

    handleActiveChild(event){
        /*this.selectedTaskId = event.target.value;
        return refreshApex(this.wiredChecklist);Commented as we are using */
        /*getTDWorkflowChecklist({tdWorkflowId : event.target.value})
            .then((result) => {debugger;    
                this.wiredActivities = result;  
                let tempTaskChecklist = [];
                result.forEach(function(chk){
                    let chkOptions = [];
                    let isDisabled = chk.Check_Value__c != null ? true : false;
                    chk.Check_Option__c.split(/,/).forEach(function(chkOpt){
                        chkOptions.push({option : chkOpt, isSelected : (chk.Check_Value__c == chkOpt)})
                    });
                    tempTaskChecklist.push({CheckId : chk.Id, CheckLabel : chk.Check_Label__c, CheckOptions : chkOptions, checkValue : chk.Check_Value__c, isDisabled : isDisabled});
                });
                this.taskChecklist = tempTaskChecklist;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.taskChecklist = undefined;
            });*/
    }

    fetchChecklist(){
        this.isLoading = true;
        getTDWorkflowChecklist({tdWorkflowId : this.selectedTaskId})
            .then((result) => {    
                this.wiredActivities = result;  
                let tempTaskChecklist = [];
                result.forEach(function(chk){
                    let chkOptions = [];
                    let isDisabled = chk.Check_Value__c != null ? true : false;
                    chk.Check_Option__c.split(/,/).forEach(function(chkOpt){
                        chkOptions.push({option : chkOpt, isSelected : (chk.Check_Value__c == chkOpt)})
                    });
                    tempTaskChecklist.push({CheckId : chk.Id, CheckLabel : chk.Check_Label__c, CheckOptions : chkOptions, checkValue : chk.Check_Value__c, isDisabled : isDisabled});
                });
                this.taskChecklist = tempTaskChecklist;
                this.error = undefined;
                this.isLoading = false;
            })
            .catch((error) => {
                this.error = error;
                this.taskChecklist = undefined;
                this.isLoading = false;
            });
    }

    handleCheckOptionClick(event){debugger;
        this.isLoading = true;
        let CheckId = event.target.id.replace('-0', '');
        let checkValue = event.target.value;
        //if(confirm('Are you sure you want to update this record with your selection?')){
        if(1 == 1){
            const fields = {};
            fields[Checklist_ID_FIELD.fieldApiName] = event.target.value;
            fields[CheckValue_Field.fieldApiName] = CheckId;
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
                    //Need to open in future for production env//alert('Checklist updated!');
                    // Display fresh data in the form
                    window.location.reload();
                    //this.fetchChecklist();
                    this.isLoading = false;
                    
                    return refreshApex(this.wiredChecklist);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error updating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                    console.log('Error: ' + error.body.message);
                    alert('Error updating record!');
                    this.isLoading = false;
                });
            console.log('checkId : ' + CheckId);
        }else{
            console.log('checkValue : ' + checkValue);
            this.isLoading = false;
        }
    }

    getTodayDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    handleSaveTaskNote(event){
        let tempThis = this;
        this.isLoading = true;
        let taskId = event.target.getAttribute('data-id');
        let note = '';
        this.template.querySelectorAll('lightning-textarea').forEach(function(ta){
            if(note == '' && ta.value != undefined && ta.getAttribute('data-noteid') == taskId){debugger;
                note = ta.value + '<br/>Added By <b>' + tempThis.userName + '</b> on <b>' + tempThis.getTodayDate() + '</b>'+ (ta.getAttribute('data-value') != null ? '<br/><br/>' + ta.getAttribute('data-value') : '');
            }
        });
        console.log('###taskId: ' + taskId);
        console.log('###note: ' + note);
        if(note != '' && taskId != ''){
            const fields = {};
            fields[TD_Workflow_Id.fieldApiName] = taskId;
            fields[TD_Workflow_Notes.fieldApiName] = note;
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
                    alert('Note added!');
                    window.location.reload();
                    this.isLoading = false;
                    
                    return refreshApex(this.wiredChecklist);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error in adding note.',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                    console.log('Error: ' + error.body.message);
                    alert('Error in adding record!');
                    this.isLoading = false;
                });      
        }
    }

    tabClick(e){
        const allTabs = document.querySelectorAll('ul>li');
        allTabs.forEach( (elm, idx) =>{
            console.log(elm);
            elm.classList.remove("slds-is-active")
        })
        e.currentTarget.classList.add('slds-is-active')
    }

    handlePhaseTab(e){debugger;
        this.isLoading = true;
        const allTabs = this.template.querySelectorAll('ul>li.slds-tabs_default__item');
        allTabs.forEach((elm, idex) => {
            const tabContentId = elm.querySelector('a').getAttribute('aria-controls');
            //console.log('###tabContentId: ' + tabContentId);
            elm.classList.remove("slds-is-active");
            this.template.querySelector('[id="' + tabContentId + '"]').classList.remove('slds-show');
            this.template.querySelector('[id="' + tabContentId + '"]').classList.add('slds-hide');
            const aTag = elm.querySelector('a');
        });
        e.currentTarget.classList.add('slds-is-active');
        /*const currentTabId = e.currentTarget.querySelector('a').getAttribute('aria-controls');
        this.template.querySelector('[id="' + currentTabId + '"]').classList.remove('slds-hide');
        this.template.querySelector('[id="' + currentTabId + '"]').classList.add('slds-show');*/
        
        //this.phaseTasks = this.tdWorkflow.filter(item => item.Phase__c === e.currentTarget.querySelector('a').getAttribute('data-id'));
        this.selectedPhase = e.currentTarget.querySelector('a').getAttribute('data-id');
     
        this.createPhaseTask(this.tdWorkflow, this.selectedPhase);
        this.isLoading = false; 
    }

    handleTaskTab(e){
        this.isLoading = true;
        const allTabs = this.template.querySelectorAll('ul>li.slds-vertical-tabs__nav-item');
        allTabs.forEach((elm, idex) => {
            const tabContentId = elm.querySelector('a').getAttribute('data-id');
            //console.log('###tabContentId: ' + tabContentId);
            elm.classList.remove("slds-is-active");
            /*this.template.querySelector('[data-container="' + tabContentId + '"]').classList.remove('slds-show');
            this.template.querySelector('[data-container="' + tabContentId + '"]').classList.add('slds-hide');*/
            this.template.querySelectorAll('[data-container="' + tabContentId + '"]').forEach((dvObj, ind) => {
                dvObj.classList.remove('slds-show');
                dvObj.classList.add('slds-hide');
            });
        });
        e.currentTarget.classList.add('slds-is-active');
        /*const currentTabId = e.currentTarget.querySelector('a').getAttribute('data-id');        
            this.template.querySelectorAll('[data-container="' + currentTabId + '"]').forEach((dvObj, ind) => {
                dvObj.classList.remove('slds-hide');
                dvObj.classList.add('slds-show');
            });*/
            debugger;
        this.selectedTaskId = e.currentTarget.querySelector('a').getAttribute('data-id');
    
       
        this.isLoading = false;
        return refreshApex(this.taskChecklist);
    }

    handleTaskLinkClick(e){
        window.open('https://re-connect--inadev.lightning.force.com/' + this.selectedTaskId);
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