import { LightningElement,api,track } from 'lwc';

export default class Feb16parent extends LightningElement {

    @track acceptedFormats = ['.pdf','.png','.jpeg'];
    @track recordId='a005j000009ARbbAAG';
    @track uploadfilesize = '3500000';  
    @track name;
    @track year;
   

    @track
    soobjdata={
        Id: this.recordId,      
        Build_Year__c:this.year,
        Name:this.name
    };

renderedCallback(){
    console.log('soobj..',this.soobjdata);

}


onNameChange(event) {  
  //  this.name = event.detail.value;  
    this[event.target.name] = event.target.value;
    this.name = this[event.target.name];
    this.soobjdata.Name =  this[event.target.name];
    //let val = this.template.querySelector('input[data-id=input1]').value;

   
  }
onYearChange(event) {  
 //   this.year= event.detail.value;  
    this[event.target.name] = event.target.value;
    this.year= this[event.target.name];
    //let val = this.template.querySelector('input[data-id=input1]').value;
    this.soobjdata.Build_Year__c =  this[event.target.name];
  }



}