/*
 @Description        : It's all about progress bar based on Phase Picklist
  @Author             : tanwi.biswas@inadev.com
  @Group              : Inadev
  @Last Modified By   : tanwi.biswas@inadev.com
  @Last Modified On   : 23-08-2021
  @Modification Log   : 
  Ver    Date            Author      		             Modification
  1.0    16-12-2020      tanwi.biswas@inadev.com   Initial Version


*/

import { LightningElement,track, wire } from 'lwc';
import getAllWrapperObject from '@salesforce/apex/ProgressBarStatusController.getAllWrapperObject';
export default class ProjectPhaseStatusReport extends LightningElement {
    @track resultData;
    @track error;
    @track propertyName;
    @track unitName;
    @track progressPercentage;
    @track designPercentage;
    @track PreFitoutPercentage;
    @track fitoutPercentage;
    @track postTradePercentage;
    @track ampProgressBar=[];
    @wire(getAllWrapperObject)
    getWrapObj({ data, error }) {
        if(data){
            this.resultData = data;
           // let jsondata = ["oppProperty","oppUnit","phaseDetails",""];
            console.log("resultData is",JSON.stringify(this.resultData));
                    let  phaseStatus = [];
                    let openStatus =[];
                    let inProgressStatus =[];
                    let completedStatus = [];
                    
                    //new
                    let phaseDesign =[];
                    let phasePreFit =[];
                    let phaseFitout =[];
                    let phasePostTrade =[];

                    let phaseDetails= [];
                    let designOpen= [];
                    let designComplete= [];
                    let designProgress= [];
                    let preFitOpen= [];
                    let preFitComplete= [];
                    let preFitProgress= [];
                    let fitOpen= [];
                    let fitComplete= [];
                    let fitProgress= [];
                    let postTradeOpen= [];
                    let postTradeComplete= [];
                    let postTradeProgress= [];
           
            for(let i=0;i<this.resultData.length;i++){
                var ampProgressBarObj=new Object(); 
                console.log("property Name is",this.resultData[i].oppProperty);
                this.propertyName = this.resultData[i].oppProperty;
                this.unitName = this.resultData[i].oppUnit;
               
                ampProgressBarObj.property=this.propertyName;
                ampProgressBarObj.unit=this.unitName;
                //this.ampProgressBar.push({key:"property",value:this.propertyName});
                //this.ampProgressBar.push({key:"unit",value:this.unitName});
                for(let key in this.resultData[i]){
                    if(key == "phaseDetails"){
                        phaseDetails=this.resultData[i][key];
                        for(let k=0;k<phaseDetails.length;k++){
                         for(let key in phaseDetails[k]){
                            if(phaseDetails[k][key] == "Design"){
                                phaseDesign.push(phaseDetails[k].Id);
                               if(phaseDetails[k].Status__c == "Completed"){
                                designComplete.push(phaseDetails[k].Id);
                               }
                               if(phaseDetails[k].Status__c == "In Progress"){
                                designProgress.push(phaseDetails[k].Id);
                               }
                               if(phaseDetails[k].Status__c == "Open"){
                                designOpen.push(phaseDetails[k].Id);
                               }
                               
                            }

                            if(phaseDetails[k][key] == "Pre-Fitout"){
                                phasePreFit.push(phaseDetails[k].Id);
                                if(phaseDetails[k].Status__c == "Completed"){
                                    preFitComplete.push(phaseDetails[k].Id);
                                }
                                if(phaseDetails[k].Status__c == "In Progress"){
                                    preFitProgress.push(phaseDetails[k].Id);
                                }
                                if(phaseDetails[k].Status__c == "Open"){
                                    preFitOpen.push(phaseDetails[k].Id);
                                }
                             }
                             if(phaseDetails[k][key] == "Fitout"){
                                phaseFitout.push(phaseDetails[k].Id);
                                if(phaseDetails[k].Status__c == "Completed"){
                                    fitComplete.push(phaseDetails[k].Id);
                                }
                                if(phaseDetails[k].Status__c == "In Progress"){
                                    fitProgress.push(phaseDetails[k].Id);
                                }
                                if(phaseDetails[k].Status__c == "Open"){
                                    fitOpen.push(phaseDetails[k].Id);
                                }
                             }
                             if(phaseDetails[k][key] == "Post Trade"){
                                phasePostTrade.push(phaseDetails[k].Id);
                                if(phaseDetails[k].Status__c == "Completed"){
                                    postTradeComplete.push(phaseDetails[k].Id);
                                }
                                if(phaseDetails[k].Status__c == "In Progress"){
                                    postTradeProgress.push(phaseDetails[k].Id);
                                }
                                if(phaseDetails[k].Status__c == "Open"){
                                    postTradeOpen.push(phaseDetails[k].Id);
                                }
                             }
                         }
                        }
                        if(phaseDesign.length == designComplete.length){
                            this.designPercentage = 100;

            
                        } else{
                            this.designPercentage=(phaseDesign.length-(designOpen.length + designProgress.length)) * 100/phaseDesign.length;
                        }
                        console.log("designPercentage is ",this.designPercentage);
                        ampProgressBarObj.designPercentage=this.designPercentage;
                       
                        if(phasePreFit.length == preFitComplete.length){
                            this.PreFitoutPercentage = 100;
            
                        } else{
                            this.PreFitoutPercentage=(phasePreFit.length-(preFitOpen.length + preFitProgress.length)) * 100/phasePreFit.length;
                        }
                        console.log("PreFitoutPercentage is ",this.PreFitoutPercentage); 
                        ampProgressBarObj.PreFitoutPercentage=this.PreFitoutPercentage;
                        
                        if(phaseFitout.length == fitComplete.length){
                            this.fitoutPercentage = 100;
            
                        } else{
                            this.fitoutPercentage=(phaseFitout.length-(fitOpen.length + fitProgress.length)) * 100/phaseFitout.length;
                        }
                        console.log("FitoutPercentage is ",this.fitoutPercentage); 
                        ampProgressBarObj.fitoutPercentage=this.fitoutPercentage;
                        
                        if(phasePostTrade.length == postTradeComplete.length){
                            this.postTradePercentage = 100;
            
                        } else{
                            this.postTradePercentage=(phasePostTrade.length-(postTradeOpen.length + postTradeProgress.length)) * 100/phasePostTrade.length;
                        }
                        console.log("postTradePercentage is ",this.postTradePercentage);
                        ampProgressBarObj.postTradePercentage=this.postTradePercentage;
                         
                    }
                    if(key == "phaseStatus"){
                    phaseStatus=this.resultData[i][key];
                    console.log("phaseStatus is",JSON.stringify(phaseStatus));
                    for(let j=0;j<phaseStatus.length;j++){
                        if(phaseStatus[j] == "Open"){
                            openStatus.push(phaseStatus[j]);  
                           
                        }
                        if(phaseStatus[j] == "Completed"){
                            completedStatus.push(phaseStatus[j]);  
                            
                        }
                        if(phaseStatus[j] == "In Progress"){
                            inProgressStatus.push(phaseStatus[j]); 
                           
                        }

                       
                    }
                    console.log("openStatus is",openStatus.length);
                    console.log("completedStatus is",completedStatus.length);
                    console.log("inProgressStatus is",inProgressStatus.length); 

                    if(phaseStatus.length == completedStatus.length){
                        this.progressPercentage = 100;
        
                    } else{
                        this.progressPercentage=(phaseStatus.length-(openStatus.length + inProgressStatus.length)) * 100/phaseStatus.length;
                    }
                    console.log("progressPercentage is ",this.progressPercentage);
                    ampProgressBarObj.progressPercentage=this.progressPercentage;
                
                    }
            }
            this.ampProgressBar.push({key:'Progress'+i,value:ampProgressBarObj});
            openStatus=[];
            completedStatus=[];
            inProgressStatus=[];
            phaseStatus=[];
            postTradeComplete=[];
            postTradeProgress=[];
            postTradeOpen=[];
            fitComplete=[];
            fitProgress=[];
            fitOpen=[];
            preFitComplete=[];
            preFitProgress=[];
            preFitOpen=[];
            designComplete=[];
            designProgress=[];
            designOpen=[];
            phasePreFit=[];
            phasePostTrade=[];
            phaseFitout=[];
            phaseDesign=[];
            


            }
             
            
        }
        else if(error){
            this.error=error;
            console.log("error is ",this.error);
        }
    }
}