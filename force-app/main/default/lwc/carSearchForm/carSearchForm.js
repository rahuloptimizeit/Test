import { LightningElement, track, wire,api } from 'lwc';
import getCarTypes from '@salesforce/apex/CarSearchFormController.getCarTypes';
import saveRecord from '@salesforce/apex/CarSearchFormController.saveType';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
const MAX_FILE_SIZE = 100000; //100 kb
export default class CarSearchForm extends NavigationMixin(LightningElement) {
    
   @track acceptedFormats = ['.pdf','.png','.jpeg'];
    @track recordId='a065j0000057PftAAE';
    @track uploadfilesize = '3500000';  
    // @track name;
    @track year;

    @track carTypes;
    @api myRecordId;

    @track picture;
    uploadedFiles = []; 
    file; 
    fileContents; 
    fileReader; 
    content; 
    fileName ; 

    @track
    soobjdata={
        Id: this.recordId,      
        Build_Year__c:this.year,
        Name:this.name
    };

        renderedCallback(){
        console.log('soobj..',this.soobjdata);

        }


    @wire(getCarTypes)
    wiredCarType({data, error}){
        if(data){
            this.carTypes = [{value:'', label:'All Types'}];
            data.forEach(element => {
                const carType = {};
                carType.label = element.Name;
                carType.value = element.Id;
                this.carTypes.push(carType);
            });
        } else if(error){
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    handleCarTypeChange(event){
        const carTypeId = event.detail.value;

        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', {detail : carTypeId});
        this.dispatchEvent(carTypeSelectionChangeEvent);
    }
     
   onNameChange(event) {  
     this.name = event.detail.value; 
     console.log('This is Nameeee',this.name) ;
   }  

   onNameChange1(event) {  
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

   onFileUpload(event) {  
     if (event.target.files.length > 0) {  
       this.uploadedFiles = event.target.files;  
       this.fileName = event.target.files[0].name;  
       this.file = this.uploadedFiles[0];  
       if (this.file.size > this.MAX_FILE_SIZE) {  
         alert("File Size Can not exceed" + MAX_FILE_SIZE);  
       }  
     }  
   }
   saveCarType() {  
    this.fileReader = new FileReader(); 
     
    this.fileReader.onloadend = (() => {  
     console.log('File Contents is as below For The Sizeis 0------',this.fileReader);
     this.fileContents = this.fileReader.result;  
      console.log('File Contents is as below For The Sizeis 1------',this.fileContents);
      let base64 = 'base64,'; 

      this.content = this.fileContents.indexOf(base64) + base64.length;  
      console.log('File Contents is as below For The Sizeis 2------',this.content);
      this.fileContents = this.fileContents.substring(this.content); 
      
      console.log('File Contents is as below For The Sizeis 3------',this.fileContents);
      this.saveRecord();  
    });  
    this.fileReader.readAsDataURL(this.file);  
  }  
  saveRecord() {  
    var con = {  
      'object': 'Car__c',  
       'Photos__c': this.fileContents,  
    
    }  
    saveRecord({  
       carRec: con,  
      file: encodeURIComponent(this.fileContents),  
      fileName: this.fileName  
    })  
      .then(carId => {  
        if (carId) {  
          this.dispatchEvent(  
            new ShowToastEvent({  
              title: 'Success',  
              variant: 'success',  
              message: 'Car Type Successfully created',  
            }),  
          );  
          this[NavigationMixin.Navigate]({  
            type: 'standard__recordPage',  
            attributes: {  
              recordId: carId,  
              objectApiName: 'Car_Type__c',  
              actionName: 'view'  
            },  
          });  
        }  
      }).catch(error => {  
        console.log('error ', error);  
      });  
  }  
  showToast(title, message, variant) {
   const evt = new ShowToastEvent({
       title: title,
       message: message,
       variant: variant,
   });
   this.dispatchEvent(evt);
}


}