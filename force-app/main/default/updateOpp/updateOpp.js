import { LightningElement,api,wire,track } from 'lwc';
import displayOpps from '@salesforce/apex/OppController.displayOpps';
import updateRecord from '@salesforce/apex/OppController.updateRecord';
import updateRecord2 from '@salesforce/apex/OppController.updateRecord2';
import updateRecord3 from '@salesforce/apex/OppController.updateRecord3';
import updateRecord4 from '@salesforce/apex/OppController.updateRecord4';
// import getOpportunityList from '@salesforce/apex/OppController.getOpportunityList';
import displayAccount from '@salesforce/apex/OppController.displayAccount';
import getopp from '@salesforce/apex/OppController.getOpportunity';
import {
    loadStyle
} from 'lightning/platformResourceLoader';
import Colorchange from '@salesforce/resourceUrl/Colorchange';
import Opportunity_Id from '@salesforce/schema/Opportunity.Id';
import Opportunity_CloseDate from '@salesforce/schema/Opportunity.CloseDate';
import { refreshApex } from '@salesforce/apex';
import Id from '@salesforce/schema/Lead.Id';
export default class updateOpp extends LightningElement {
	@api currentRecordId;
	@api errorMessage;
    @api RecordId;
    @api newId;
    @api AccRecID;
    @track actualDate;
    @track toggleval;
    @track taskId;
    @track task2Id;
    @track rowId;
    @track error;
    @track data;
    @track resultData;
    @track getopp=[];
    @track getopps=[];
    @track colorchange;
    @track color=false;
    @track colorchange2;
    @track iscssloaded=false;
    @wire(displayOpps,{newId: '$AccRecID'}) opps;
    @wire(displayAccount) Accountss; 
    @wire(getopp,{oppsId: '$RecordId'}) getopp;
    // ({data,error}){
    //     if (data){
    //         this.resultData=data;
    //         console.log("my data is",JSON.stringify(this.resultData));
    //         this.getopps=JSON.stringify(this.resultData);

    //         console.log("my opp is",JSON.stringify(this.getopps));
    //         console.log("my opp is",JSON.stringify(this.getopps.Name));
    //     } else if(error){
    //                  this.error=error;
    //                 console.log("error is ",this.error);
    //              }
    // }
    
    // @wire(getOpportunityList,{oppsId: '$RecordId'})
    // getWrapObj({ data, error }) {
    //     if(data){
    //     this.resultData=data;  
    //     console.log("resultData is  ",JSON.stringify(this.resultData)); 
    //    let isworking=false; 
    //    let jsondata = ["oppName","oppAcc","oppRecOpp","oppdate","oppStage","oppispri"];

    //      let jsontest = ["oppName","oppAcc","oppRecOpp","oppdate","oppStage","oppispri"];
    //     for(let i=0;i<this.resultData.length;i++){
    //        // console.log("resultdata is ",JSON.stringify(this.resultData[i]));
    //         let dataTabel1=[];
    //         let dataTabel2={};
    //         for(let key in jsondata){
    //             let dataKey = jsondata[key]; 
              
    //             dataTabel1.push({key:'tbl1'+dataKey,value:this.resultData[i][dataKey]});
    //         }
        
    //        data ={}
    //        data['tbl1']=dataTabel1;
    //       //  this.tableData.push({key:'tbl1'+i,value:dataTabel1});


    //         for(let key in jsontest){
    //             let dataKey1 = jsontest[key]; 
              
    //             dataTabel2[dataKey1]=this.resultData[i][dataKey1];
                
    //         }
    //         data['tbl2']=dataTabel2;
    //       this.tableData.push({key:'data'+i,value:data});
    //     }
    //     console.log("tableData is  ",(this.tableData)); 
    //     }
    //     else if(error){
    //         this.error=error;
    //         console.log("error is ",this.error);
    //     }
       

    // }
    // opps ({data, error})
    // {
    //     if(data){
    //         console.log('data',data);
    //         this.data=data;
    //             this.data=data.map(
    //                 item => {item.rowcolor='row-color'
    //                 })
    //                 console.log('colortest',JSON.stringify(this.data));
    //                 return {
    //                     ...item,
    //                     rowcolor:rowcolor
    //                 }    
    //         console.log('colortest',JSON.stringify(this.data));
    //      } 
    //      else{
    //         this.error = error;
    //     }
    //     console.log('colortest2',JSON.stringify(this.data));
    // } 

    handleAccount(event){
        var element = event.target;
        this.AccRecID = element.getAttribute('data-id');
        //this.AccRecID=event.target.id.replace('-98','');
        //console.log(this.AccRecID);
      //  alert("hello it's me");
    }
    handleUpdate2(event){
        this.currentRecordId=event.target.value;
        this.RecordId = event.target.value;
        console.log('testing',this.opps.data);
        this.opps.Account.Name;
        this.color=true;
     
    event.currentTarget.dataset.id
     this.template.querySelector("tr").style="background-color:green"
         console.log('@@currentRecordId@@@'+ this.colorchange);

        updateRecord4({
            oppId:this.currentRecordId
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.opps);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }


    handleUpdate(event){
        this.currentRecordId=event.target.value;
        this.RecordId = event.target.value;
        console.log('testing2',this.opps.data);
        // this.opps.Account.Name;
        // this.opps.data.forEach(row =>{
        //     console.log('testing2',row.Id);
        //     console.log('testing3',event.currentTarget.dataset.id);
        //     if(row.Id === event.currentTarget.dataset.id){
        //         row.rowSelected = 'row-color'
        //     } else {
        //         row.rowSelected = '';
        //     }
        // });

      //  event.target.classList.add('highlight');
    //    var element = document.getElementsByTagName('tr');
    //    this.colorchange=element.getAttribute('id');
    event.currentTarget.dataset.id
     this.template.querySelector("tr").style="background-color:green"
         console.log('@@currentRecordId@@@'+ this.colorchange);

        // console.log('@@currentRecordId@@@'+this.currentRecordId);
      //  document.querySelector("h1").style.backgroundColor = "red";
       // console.log('###actualDate2: ' +  Id);
       // document.body.style.color = "red";
      // document.querySelector('0065j00000HPgLSAA1').style.background = 'red';
    //    this.template.querySelector('0065j00000HPgLSAA1');
    //    console.log('###actualDate2: ' + document.querySelector('0065j00000HPgLSAA1'));
    //      console.log('###actualDate2: ' +  this.template.querySelector('0065j00000HPgLSAA1'));

        updateRecord3({
            oppId:this.currentRecordId
        })
        .then(() => {
            console.log('SUCCESS3');
            // return refreshApex(this.opps);
            return refreshApex(this.Accountss);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }
    // Special Edition
    fortest(event){
        var target = event.target,
      count = +target.dataset.count;
   target.style.backgroundColor = count === 1 ? "#7FFF00" : '#f44336';
   target.dataset.count = count === 1 ? 0 : 1;
   this.toggleval = count === 1 ? true : false; 
   console.log(' color value ',this.toggleval);
        this.task2Id = event.target.getAttribute('data-id');
   updateRecord2({
    // CloseDate:this.actualDate,
     IsPrivate:this.toggleval,
     oppId:this.task2Id
})
.then(() => {
    console.log('SUCCESS');
    return refreshApex(this.opps);
})
.catch((error) => {
    this.errorMessage=error;
    console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
});
    }
    
    fortrue(event){
        console.log(' color value 1', this.color);
         this.color=true;
         console.log(' color value 2', this.color);
        var target = event.target,
        count = +target.dataset.count;
        // target.style.backgroundColor = count === 1 ? "#7FFF00" : '#f44336';
        // var val=event.target.value;
        // if(val==true)
        // {
        //     target.style.backgroundColor = "#7FFF00";
        // }else{
        //     target.style.backgroundColor = "#f44336";
        // }

        if(this.color==true)
        {
            console.log(' color value 3', this.color);
            target.style.backgroundColor = "#7FFF00";
        }else
        {
            console.log(' color value 4', this.color);
            target.style.backgroundColor = "#f44336";
        }
        this.toggleval = event.target.value;
        //console.log(' color value ',this.toggleval);
            // this.colorchange2='row-color'
            //console.log(' color value ',event.target.value);
        this.task2Id = event.target.getAttribute('data-id');
        updateRecord2({
            // CloseDate:this.actualDate,
             IsPrivate:this.toggleval,
             oppId:this.task2Id
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.opps);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }

    forfalse(event){
       
    var target = event.target,
      count = +target.dataset.count;
  
   target.style.backgroundColor = "#7FFF00";
        this.toggleval = event.target.value;
        this.colorchange2='highlight '
        console.log(' color value ',this.toggleval);
        this.task2Id = event.target.getAttribute('data-id');
        updateRecord2({
            // CloseDate:this.actualDate,
             IsPrivate:this.toggleval,
             oppId:this.task2Id
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.opps);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }

    actualDateChange(event){
        //console.log('###actualDate1: ' + event.target.value);
        this.taskId = event.target.getAttribute('data-id');
        this.actualDate = event.target.value;
         console.log('###taskId1: ' + this.taskId);
         console.log('###actualDate1: ' + this.actualDate);

         updateRecord({
            CloseDate:this.actualDate,
            //  IsPrivate:this.toggleval,
             oppId:this.taskId
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.opps);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });

        // debugger;
    
        // // if(actualDate != '' && taskId != ''){
        //     const fields = {};
        //     console.log('###taskId2: ' + this.taskId);
        //     console.log('###actualDate2: ' + this.actualDate);
        //     fields[Opportunity_Id.fieldApiName] = this.taskId;
        //     fields[Opportunity_CloseDate.fieldApiName] = this.actualDate;
        //     console.log('###taskId3: ' + fields[Opportunity_Id.fieldApiName]);
        //     console.log('###actualDate3: ' +  fields[Opportunity_CloseDate.fieldApiName]);
        //     const recordInput = { fields };
        //     console.log('###actualDate4: ' +  recordInput);
          //  updateRecord(recordInput);
        // }
    }
    renderedCallback() {
        
        Promise.all([
            loadStyle( this, Colorchange )
            ]).then(() => {
                console.log( 'Files loaded' );
            })
            .catch(error => {
                console.log( error.body.message );
        });

        
    }
      // Special Edition
}