import { LightningElement, api,track } from 'lwc';
import saveTheChunkFile from '@salesforce/apex/FileUploadService.saveTheChunkFile';
import saveParentAsLead from '@salesforce/apex/FileUploadService.saveParentAsLead';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const MAX_FILE_SIZE = 4500000;
const CHUNK_SIZE = 750000;
export default class UploadFile16feb extends LightningElement {
   
    @api recordId;
    @api acceptedFormats;
    @api soobjdata;
    @api uploadfilesize;

    @track fileName = '';
    @track filesUploaded = [];
    @track isLoading = false;
    @track fileSize;

    @track isLoading = false;
    MAX_FILE_SIZE = 5000000; //Max file size 5.0 MB
    @track filesUploaded = [];
    @track file;
    @track  fileContents;
    @track fileReader;
    @track content;
    @track fileError;
 
    @track lstAllFiles = [];
    // @api
    // get acceptedFormats() {
    //     return ['.pdf','.png'];
    // }
  //  @api acceptedFormats = ['.pdf','.png'];
   


    // @track name;
    // @track year;  



    handleFilesChange(event) {
        if(event.target.files.length > 0) {
            this.filesUploaded = event.target.files;
            this.fileName = event.target.files[0].name;
            console.log(this.fileName);
        }
    }

    saveFile(){
        console.log(this.fileName);
        var fileCon = this.filesUploaded[0];
        this.fileSize = this.formatBytes(fileCon.size, 2);      
        if (fileCon.size >this.uploadfilesize){
      //  if (fileCon.size > MAX_FILE_SIZE) {
            let message = 'File size cannot exceed ' + this.uploadfilesize + ' bytes.\n' + 'Selected file size: ' + fileCon.size;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: message,
                variant: 'error'
            }));
            return;
        }
       
        let fileNameParts = this.fileName.split('.');
        let extension = '.' + fileNameParts[fileNameParts.length - 1].toLowerCase();              
        if (!this.acceptedFormats.includes(extension)) {
           // this.fileError = 'This extension ' + extension + ' is not listed as accepted format';
           // deleteRecord(event.detail.files[0].documentId);
          //  deleteRecord( fileCon.documentId);
          let msg = 'File format not appropiate as '+this.acceptedFormats+ ' Selected file type: '+ extension;
          this.dispatchEvent(new ShowToastEvent({
              title: 'Error',
              message: msg,
              variant: 'error'
          }));
          return;
        }



        var reader = new FileReader();
        var self = this;
        reader.onload = function() {
            var fileContents = reader.result;
            var base64Mark = 'base64,';
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
            fileContents = fileContents.substring(dataStart);
            self.upload(fileCon, fileContents);
        };
        reader.readAsDataURL(fileCon);
        this.handleUploadfinished();
       
    }

    upload(file, fileContents){
        var fromPos = 0;
        var toPos = Math.min(fileContents.length, fromPos + CHUNK_SIZE);
       
        this.uploadChunk(file, fileContents, fromPos, toPos, '');
    }

    uploadChunk(file, fileContents, fromPos, toPos, attachId){
        this.isLoading = true;
        var chunk = fileContents.substring(fromPos, toPos);
       
        saveTheChunkFile({
            parentId: this.recordId,
            fileName: file.name,
            base64Data: encodeURIComponent(chunk),
            contentType: file.type,
            fileId: attachId
        })
        .then(result => {
           
            attachId = result;
            fromPos = toPos;
            toPos = Math.min(fileContents.length, fromPos + CHUNK_SIZE);    
            if (fromPos < toPos) {
                this.uploadChunk(file, fileContents, fromPos, toPos, attachId);  
            }else{
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!',
                    message: 'File Upload Success',
                    variant: 'success'
                }));
                this.isLoading = false;
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        })
        .finally(()=>{
           
        })
    }

    formatBytes(bytes,decimals) {
        if(bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

// onNameChange(event) {  
//     this.name = event.detail.value;  
//   }
// onYearChange(event) {  
//     this.year= event.detail.value;  
//   }

handleUploadfinished() {  
//    const car = {
//         Id: this.recordId,
//         Build_Year__c:this.year,
//         Name:this.name
//    };

   const car =this.soobjdata;
 
 
   saveParentAsLead({
           ld: car        
       })
       .then(msg => {
               console.log("Message from Server :", msg);
               this.isLoading = false;
               if (msg === 'Success') {
                   this.dispatchEvent(
                       new ShowToastEvent({
                           title: 'Car',
                           message: 'File is Successfully uploaded as Child of Car Record',
                       }),
                   );
               }
            else {
               this.dispatchEvent(
                   new ShowToastEvent({
                       title: 'Error creating record',
                       message: msg,
                       variant: 'error'
                   }),
               );
           }
       }).catch(error => {
   this.isLoading = false;  
   console.log('error ', error);
   this.dispatchEvent(
       new ShowToastEvent({
           title: 'Error creating record',
           message: error.body.message,
           variant: 'error',
       }),
   );
});

}

}