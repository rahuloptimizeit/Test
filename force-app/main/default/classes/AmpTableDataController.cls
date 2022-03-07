/*
 @Description        :  Controller class of ampdatatableexecl 
  @Author             : tanwi.biswas@inadev.com
  @Group              : Inadev
  @Last Modified By   : tanwi.biswas@inadev.com
  @Last Modified On   : 01-09-2021
  sobject Used : Property__c, Unit__c,Contracts, Fees__c,TD_Workflow_c, Opportunity
  */
public inherited sharing class AmpTableDataController {
@AuraEnabled(cacheable=true)
public static List<WrapperAmpTableData> getAllWrapperObject(){ 
        
        List<Opportunity> getOpp = [Select Type,Property__r.Name,Unit__r.UnitType__c,LeaseExpiryDate__c,CAT1Cost__c,HandoverDateForNewTenant__c,Tenancy_Delivery_Workflow_Current_Phase__c,GLASqmExcStorage__c,ApprovedDate__c,RentCommencementDate__c,Tenancy_Project_Manager__r.Name,Retail_Lease_Transactions_Manager__r.Name,Lease_Executive_In_Charge__r.Name,RetailDesignDeliveryManager__r.Name,BankGuaranteeRequired__c,Lease_Deposit__c,(Select Handover_Date__c,FitoutPeriodinDays__c,Rent_Commencement_date__c,RentTerminationDate__c,ContractNumber,Name,CustomerSignedId,Bank_Guarantee_Required__c FROM Contracts__r),(Select Type__c From Fees__r where Type__c IN ('Survey', 'Hoarding','Consultant')),(Select Target_Date__c, End_Date__c,Task_Overview__c From TD_Workflow__r) FROM Opportunity where Id IN (Select Opportunity__c from TD_Workflow__c where Opportunity__c !=null ) AND  RecordType.Name = 'Retail HoA Opportunity'];
        List<WrapperAmpTableData> oppWrapperList = new List<WrapperAmpTableData>();

        if(!getOpp.isEmpty()){
            for(Opportunity opp : getOpp){
                 WrapperAmpTableData oppWrapper = new WrapperAmpTableData();
                //if(!opp.Contracts__r.isEmpty() && !opp.Fees__r.isEmpty()){
                
                oppWrapper.oppType = opp.Type;
                oppWrapper.oppProperty = opp.Property__r.Name;
                    if(!opp.TD_Workflow__r.isEmpty()){
                    for(TD_Workflow__C tdList : opp.TD_Workflow__r){
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Design Introductory Pack Issued'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.DesignIntroPackIssued=tdList.Target_Date__c.format();
                           oppWrapper.DesignPlannedDate = tdList.Target_Date__c.format();
                            }/*else{ //commented as its requried field
                                oppWrapper.DesignPlannedDate='';
                                oppWrapper.DesignIntroPackIssued='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.DesignActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.DesignActualDate='';
                            }
                        }
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Lessee Nominates Retail Designer'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.RetailDesignerNominated = tdList.Target_Date__c.format();
                           oppWrapper.RetailDesignerNominatedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{ // //commented as its requried field
                                oppWrapper.RetailDesignerNominatedPlannedDate='';
                                oppWrapper.RetailDesignerNominated  ='';
                            } */
                            if(tdList.End_Date__c != null){
                           oppWrapper.RetailDesignerNominatedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.RetailDesignerNominatedActualDate='';
                            }
                        }
                        
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Lessee submitts Concept Designs'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.ConceptDesignSubmission = tdList.Target_Date__c.format();
                           oppWrapper.ConceptDesignSubmissionPlannedDate = tdList.Target_Date__c.format();
                            }/*else{ // //commented as its requried field
                                oppWrapper.ConceptDesignSubmissionPlannedDate='';
                                 oppWrapper.ConceptDesignSubmission='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.ConceptDesignSubmissionActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.ConceptDesignSubmissionActualDate='';
                            }
                        }
                        //CONCEPT DESIGN APPROVAL
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Concept Design Approval Issued'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.ConceptDesignApproval = tdList.Target_Date__c.format();
                           oppWrapper.ConceptDesignApprovalPlannedDate = tdList.Target_Date__c.format();
                            }/*else{ // //commented as its requried field
                                oppWrapper.ConceptDesignApprovalPlannedDate='';
                                oppWrapper.ConceptDesignApproval ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.ConceptDesignApprovalActualDate = tdList.End_Date__c.format();
                            }/*else{ // //commented as its requried field
                                oppWrapper.ConceptDesignApprovalActualDate='';
                            }*/
                        }
                        //FORM 02 SERVICES SUBMISSION
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Lessee Submitts Form 02 Services Questionnaire'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.Form02ServicesSubmission = tdList.Target_Date__c.format();
                           oppWrapper.Form02ServicesSubmissionPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.Form02ServicesSubmissionPlannedDate='';
                                oppWrapper.Form02ServicesSubmission='';
                            } */
                            if(tdList.End_Date__c != null){
                           oppWrapper.Form02ServicesSubmissionActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.Form02ServicesSubmissionActualDate='';
                            }
                        }
                        //PRELIMINARY DESIGN APPROVAL
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Preliminary Design Approval issued'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.PreliminaryDesignApproval = tdList.Target_Date__c.format();
                           oppWrapper.PreliminaryDesignApprovalPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.PreliminaryDesignApprovalPlannedDate='';
                                oppWrapper.PreliminaryDesignApproval='';
                            } */
                            if(tdList.End_Date__c != null){
                           oppWrapper.PreliminaryDesignApprovalActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.PreliminaryDesignApprovalActualDate='';
                            }
                        }
                        //ENGINEERING REVIEW ISSUED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Services Engineering Review'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.EngineeringReviewIssued = tdList.Target_Date__c.format();
                           oppWrapper.EngineeringReviewIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.EngineeringReviewIssuedPlannedDate='';
                                oppWrapper.EngineeringReviewIssued ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.EngineeringReviewIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.EngineeringReviewIssuedActualDate='';
                            }
                        }
                        //ENGINEERING REVIEW RECEIVED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Service Engineering Received'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.EngineeringReviewReceived = tdList.Target_Date__c.format();
                           oppWrapper.EngineeringReviewReceivedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.EngineeringReviewReceivedPlannedDate='';
                                oppWrapper.EngineeringReviewReceived ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.EngineeringReviewReceivedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.EngineeringReviewReceivedActualDate='';
                            }
                        }
                        //FINAL DESIGN APPROVAL
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Final Design Approval issued'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.FinalDesignApproval = tdList.Target_Date__c.format();
                           oppWrapper.FinalDesignApprovalPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.FinalDesignApprovalPlannedDate='';
                                oppWrapper.FinalDesignApproval='';
                            } */
                            if(tdList.End_Date__c != null){
                           oppWrapper.FinalDesignApprovalActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.FinalDesignApprovalActualDate='';
                            }
                        }
                        //LESSOR WORKS COMMENCE
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Commencement of Lessor Works'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.LessorWorksCommence = tdList.Target_Date__c.format();
                           oppWrapper.LessorWorksCommencePlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.LessorWorksCommencePlannedDate='';
                                oppWrapper.LessorWorksCommence ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.LessorWorksCommenceActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.LessorWorksCommenceActualDate='';
                            }
                        }
                        //LESSOR WORKS COMPLETED
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Completion of Lessor Works'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.LessorWorksCompleted = tdList.Target_Date__c.format();
                           oppWrapper.LessorWorksCompletedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.LessorWorksCompletedPlannedDate='';
                                oppWrapper.LessorWorksCompleted  ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.LessorWorksCompletedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.LessorWorksCompletedActualDate='';
                            }
                        }
                        //ISSUED HANDOVER NOTICE
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Handover Notice to Lessee'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.IssuedHandoverNotice = tdList.Target_Date__c.format();
                           oppWrapper.IssuedHandoverNoticePlannedDate = tdList.Target_Date__c.format();
                            }/*else{   //commented as its requried field
                                oppWrapper.IssuedHandoverNoticePlannedDate='';
                                oppWrapper.IssuedHandoverNotice ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.IssuedHandoverNoticeActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.IssuedHandoverNoticeActualDate='';
                            }
                        }
                        //PC INTRO PACK ISSUED
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Principal Contractor Introductory Pack Issued'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.PCIntroPackIssued = tdList.Target_Date__c.format();
                           oppWrapper.PCIntroPackIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{   //commented as its requried field
                                oppWrapper.PCIntroPackIssuedPlannedDate='';
                                oppWrapper.PCIntroPackIssued  ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.PCIntroPackIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.PCIntroPackIssuedActualDate='';
                            }
                        }
                        //SERVICE ENGINEERING ISSUED TO PC
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue CAT1 Service Engineering to PC'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.ServiceEngineeringIssuedtoPC = tdList.Target_Date__c.format();
                           oppWrapper.ServiceEngineeringIssuedtoPCPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.ServiceEngineeringIssuedtoPCPlannedDate='';
                                oppWrapper.ServiceEngineeringIssuedtoPC ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.ServiceEngineeringIssuedtoPCActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.ServiceEngineeringIssuedtoPCActualDate='';
                            }
                        }
                        //AUTHORISATION TO COMMENCE WORKS ISSUED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Authorisation to Commence Works'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.AuthorisationToCommenceWorksIssued = tdList.Target_Date__c.format();
                           oppWrapper.AuthorisationToCommenceWorksIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.AuthorisationToCommenceWorksIssuedPlannedDate='';
                                 oppWrapper.AuthorisationToCommenceWorksIssued ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.AuthorisationToCommenceWorksIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.AuthorisationToCommenceWorksIssuedActualDate='';
                            }
                        }
                        //PRE-START BRIEFING CONDUCTED
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Conduct Pre-Start Briefing'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.PreStartBriefingConducted = tdList.Target_Date__c.format();
                           oppWrapper.PreStartBriefingConductedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.PreStartBriefingConductedPlannedDate='';
                                oppWrapper.PreStartBriefingConducted ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.PreStartBriefingConductedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.PreStartBriefingConductedActualDate='';
                            }
                        }
                        //HANDOVER ACCEPTANCE/NONATTENDANCE NOTICED ISSUED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Handover Acceptance, or Issue Non Attendance Notice'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.HandoverAcceptanceorNonAttendanceNoticedIssued = tdList.Target_Date__c.format();
                           oppWrapper.HandoverAcceptanceOrNonAttendanceNoticedIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.HandoverAcceptanceOrNonAttendanceNoticedIssuedPlannedDate='';
                                oppWrapper.HandoverAcceptanceorNonAttendanceNoticedIssued='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.HandoverAcceptanceOrNonAttendanceNoticedIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.HandoverAcceptanceOrNonAttendanceNoticedIssuedActualDate='';
                            }
                        }
                        //APPROVAL TO TRADE CHECKLIST ISSUED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Approval to Trade Checklist Email'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.ApprovaltoTradeChecklistIssued = tdList.Target_Date__c.format();
                           oppWrapper.ApprovaltoTradeChecklistIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.ApprovaltoTradeChecklistIssuedPlannedDate='';
                                oppWrapper.ApprovaltoTradeChecklistIssued ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.ApprovaltoTradeChecklistIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.ApprovaltoTradeChecklistIssuedActualDate='';
                            }
                        }
                        //PRE-TRADE INSPECTION COMPLETED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Preliminary Pre-Trade Defect Inspection'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.PreTradeInspectionCompleted = tdList.Target_Date__c.format();
                           oppWrapper.PreTradeInspectionCompletedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.PreTradeInspectionCompletedPlannedDate='';
                                oppWrapper.PreTradeInspectionCompleted ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.PreTradeInspectionCompletedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.PreTradeInspectionCompletedActualDate='';
                            }
                        }
                        //PRE-TRADE DEFECT NOTICE ISSUED ??
                         system.debug('tdList.Task_Overview__c '+tdList.Task_Overview__c);
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Preliminary Defect Inspection Notice'){
                           
                            if(tdList.Target_Date__c != null){
                                system.debug('tdList.Target_Date__c '+tdList.Target_Date__c);
                           oppWrapper.PreTradeDefectNoticeIssued = tdList.Target_Date__c.format();
                           oppWrapper.PreTradeDefectNoticeIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.PreTradeDefectNoticeIssuedPlannedDate='';
                                oppWrapper.PreTradeDefectNoticeIssued='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.PreTradeDefectNoticeIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.PreTradeDefectNoticeIssuedActualDate='';
                            }
                        }
                        //PRELIMINARY DESIGN SUBMISSION
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Lessee submitts Preliminary Designs'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.PreliminaryDesignSubmission = tdList.Target_Date__c.format();
                           oppWrapper.PreliminaryDesignSubmissionPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.PreliminaryDesignSubmissionPlannedDate='';
                                oppWrapper.PreliminaryDesignSubmission ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.PreliminaryDesignSubmissionActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.PreliminaryDesignSubmissionActualDate='';
                            }
                        }
                        //FINAL DESIGN SUBMISSION
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Lessee submitts Final Designs'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.FinalDesignSubmission = tdList.Target_Date__c.format();
                           oppWrapper.FinalDesignSubmissionPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.FinalDesignSubmissionPlannedDate='';
                                oppWrapper.FinalDesignSubmission ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.FinalDesignSubmissionActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.FinalDesignSubmissionActualDate='';
                            }
                        }
                        //
                        //AUTHORITY TO TRADE NOTICE ISSUED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Authority to Trade Notice'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.AuthoritytoTradeNoticeIssued = tdList.Target_Date__c.format();
                           oppWrapper.AuthoritytoTradeNoticeIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.AuthoritytoTradeNoticeIssuedPlannedDate='';
                                oppWrapper.AuthoritytoTradeNoticeIssued ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.AuthoritytoTradeNoticeIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.AuthoritytoTradeNoticeIssuedActualDate='';
                            }
                        }
                        //FINAL DEFECT INSPECTION COMPLETED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Final Defect Inspection'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.FinalDefectInspectionCompleted = tdList.Target_Date__c.format();
                           oppWrapper.FinalDefectInspectionCompletedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.FinalDefectInspectionCompletedPlannedDate='';
                                oppWrapper.FinalDefectInspectionCompleted ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.FinalDefectInspectionCompletedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.FinalDefectInspectionCompletedActualDate='';
                            }
                        }
                        //FINAL DEFECT NOTICE ISSUED
                         if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Final Defect Inspection Notice'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.FinalDefectNoticeIssued = tdList.Target_Date__c.format();
                           oppWrapper.FinalDefectNoticeIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.FinalDefectNoticeIssuedPlannedDate='';
                                oppWrapper.FinalDefectNoticeIssued ='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.FinalDefectNoticeIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.FinalDefectNoticeIssuedActualDate='';
                            }
                        }
                        //STATEMENT OF COMPLETION ISSUED
                        if(tdList.Task_Overview__c != null && tdList.Task_Overview__c == 'Issue Statement of Completion'){
                            if(tdList.Target_Date__c != null){
                           oppWrapper.StatementofCompletionIssued = tdList.Target_Date__c.format();
                           oppWrapper.StatementofCompletionIssuedPlannedDate = tdList.Target_Date__c.format();
                            }/*else{  //commented as its requried field
                                oppWrapper.StatementofCompletionIssuedPlannedDate='';
                                oppWrapper.StatementofCompletionIssued='';
                            }*/
                            if(tdList.End_Date__c != null){
                           oppWrapper.StatementofCompletionIssuedActualDate = tdList.End_Date__c.format();
                            }else{
                                oppWrapper.StatementofCompletionIssuedActualDate='';
                            }
                        }
                        //
                    }
                    }
                    //blank value assign fields
                    oppWrapper.DealAssoc = 'OP';
                    oppWrapper.Category = opp.Unit__r.UnitType__c;
                    oppWrapper.TenSQM =opp.GLASqmExcStorage__c;
                   // oppWrapper.LT =opp.Retail_Lease_Transactions_Manager__c;
                    oppWrapper.LE =opp.Lease_Executive_In_Charge__r.Name; //no value is there
                    oppWrapper.TPM = opp.Tenancy_Project_Manager__r.Name;//no value is there
                 oppWrapper.LT =opp.Retail_Lease_Transactions_Manager__r.Name;
                    oppWrapper.DAFSubDate='';
                if(opp.ApprovedDate__c == null){
                    oppWrapper.DAFApprovalDate = '';
                }else{
                    oppWrapper.DAFApprovalDate =opp.ApprovedDate__c.format();
                }
                if(opp.HandoverDateForNewTenant__c != null){
                    Date handover =opp.HandoverDateForNewTenant__c;
	                Date today = System.today();
                    oppWrapper.WeekstoHO = string.valueof(today.daysBetween(handover)/7);
                } else {
                    oppWrapper.WeekstoHO ='';
                }
                 if(opp.HandoverDateForNewTenant__c == null){
                    oppWrapper.DAFHODate = '';
                }else{
                    oppWrapper.DAFHODate =opp.HandoverDateForNewTenant__c.format();
                }
                 if(opp.RentCommencementDate__c == null){
                    oppWrapper.DAFRentCommDate = '';
                }else{
                    oppWrapper.DAFRentCommDate=opp.RentCommencementDate__c.format();
                }
                    oppWrapper.DAFTradeDate='';
                    oppWrapper.ActualTradeDate='';
                    oppWrapper.Phase=opp.Tenancy_Delivery_Workflow_Current_Phase__c;
                    oppWrapper.DefitNoticeIssued='';
                    oppWrapper.DefitByLesseeorLessor='';
                    oppWrapper.LastDayofTrade ='';
                if(opp.LeaseExpiryDate__c == null){
                    oppWrapper.DueDateLeaseAdmin = '';
                }else{
                    oppWrapper.DueDateLeaseAdmin=opp.LeaseExpiryDate__c.format();
                }
					oppWrapper.Insurance='';
                if(opp.LeaseExpiryDate__c == null){
                    oppWrapper.DueDateFinance = '';
                }else{
					oppWrapper.DueDateFinance=opp.LeaseExpiryDate__c.format();
                }
					oppWrapper.HoardingSkin='';
					oppWrapper.DesignFee=''; 
					oppWrapper.RecoveralbeCAT1s=opp.CAT1Cost__c;
            
                    if(opp.RetailDesignDeliveryManager__c == null){
                        oppWrapper.oppRetailDesignDeliveryManager='';
                    }else{
                oppWrapper.oppRetailDesignDeliveryManager = opp.RetailDesignDeliveryManager__r.Name;
                 }
                /* if(opp.BankGuaranteeRequired__c == null){ //need to check
                        oppWrapper.oppBankGuaranteeRequired='';
                    }else{
                oppWrapper.oppBankGuaranteeRequired = opp.BankGuaranteeRequired__c;
                 }*/
                oppWrapper.oppLeaseDeposit = opp.Lease_Deposit__c;
                if(!opp.Contracts__r.isEmpty()){
                    for(Contract lease: opp.Contracts__r){
                    oppWrapper.contContractNumber = lease.ContractNumber;
                        
                    oppWrapper.contHandoverDate = lease.Handover_Date__c;
                oppWrapper.contFitoutPeriodinDays = lease.FitoutPeriodinDays__c;
             if(lease.Bank_Guarantee_Required__c == null){ //need to check
                        oppWrapper.oppBankGuaranteeRequired='';
                    }else{
                oppWrapper.oppBankGuaranteeRequired = lease.Bank_Guarantee_Required__c;
                 }
               if(lease.Rent_Commencement_date__c == null){
                        oppWrapper.contRentCommencementDate='';
                    }else{
                oppWrapper.contRentCommencementDate = lease.Rent_Commencement_date__c.format();
                 }
               
                 if(lease.RentTerminationDate__c == null){
                        oppWrapper.contRentTerminationDate='';
                    }else{
                oppWrapper.contRentTerminationDate = lease.RentTerminationDate__c.format();
                    }
                oppWrapper.contName = lease.Name;
                    if(lease.CustomerSignedId == null){
                      oppWrapper.LeaseSigned ='No';  
                    }else{
                         oppWrapper.LeaseSigned ='Yes';
                    }    
                }
                }
               
                oppWrapper.surverType = 'NO';
                oppWrapper.HoardingType = 'NO';
                oppWrapper.ConsultantType = 'NO';
                oppWrapper.HoardingSkin = 'NO';
                oppWrapper.DesignFee = 'NO';
                if(!opp.Fees__r.isEmpty()){
                    for(Fee__c fee: opp.Fees__r){
                     
                            if(fee.Type__c != null && fee.Type__c == 'Survey'){
                                System.debug('yes survey');
                                oppWrapper.surverType = 'YES';
                            } 
                            if(fee.Type__c != null && fee.Type__c == 'Hoarding'){
                                 System.debug('yes Hoarding');
                                oppWrapper.HoardingType = 'YES';
                            } 
                            if(fee.Type__c != null && fee.Type__c == 'Consultant'){
                                System.debug('yes Consultant');
                                oppWrapper.ConsultantType = 'YES';
                            } 
                             if(fee.Type__c != null && fee.Type__c == 'Hoarding Skin'){ 
                                oppWrapper.HoardingSkin = 'YES';
                            }
                             if(fee.Type__c != null && fee.Type__c == 'Design Fee'){ 
                                oppWrapper.DesignFee = 'YES';
                            }
 
                }
                }          
                 oppWrapperList.add(oppWrapper);
            }
            
        }
        System.debug('oppWrapperList issss '+oppWrapperList);
        return oppWrapperList;
    }
      
public class WrapperAmpTableData {
@AuraEnabled public String oppType;
@AuraEnabled public String oppProperty;
@AuraEnabled public String oppRetailDesignDeliveryManager;
@AuraEnabled public String oppBankGuaranteeRequired;
@AuraEnabled public Decimal oppLeaseDeposit;
@AuraEnabled public Date contHandoverDate;
@AuraEnabled public Decimal contFitoutPeriodinDays;
@AuraEnabled public String contRentCommencementDate;
@AuraEnabled public String contRentTerminationDate;
@AuraEnabled public String contContractNumber;
@AuraEnabled public String contName;
@AuraEnabled public String LeaseSigned;
//@AuraEnabled public List<String> feesType;
    //blank value assign fields
@AuraEnabled public String DealAssoc;
@AuraEnabled public String Category;
@AuraEnabled public Decimal TenSQM;
@AuraEnabled public String  LE;
@AuraEnabled public String  LT;
@AuraEnabled public String  TPM;
@AuraEnabled public String  DAFSubDate;
@AuraEnabled public String  DAFApprovalDate;
@AuraEnabled public String  WeekstoHO;
@AuraEnabled public String  DAFHODate;
@AuraEnabled public String  DAFRentCommDate;
@AuraEnabled public String  DAFTradeDate;
@AuraEnabled public String  ActualTradeDate;
@AuraEnabled public String  Phase;
@AuraEnabled public String  DefitNoticeIssued;
@AuraEnabled public String  DefitByLesseeorLessor;
@AuraEnabled public String   LastDayofTrade;
@AuraEnabled public String   DueDateLeaseAdmin;
@AuraEnabled public String   Insurance;
@AuraEnabled public String   DueDateFinance;
@AuraEnabled public String   HoardingSkin;
@AuraEnabled public String   DesignFee; 
@AuraEnabled public Decimal   RecoveralbeCAT1s;
@AuraEnabled public String   DesignIntroPackIssued;
@AuraEnabled public String   RetailDesignerNominated;
@AuraEnabled public String   ConceptDesignSubmission;
@AuraEnabled public String   ConceptDesignApproval;
@AuraEnabled public String   PreliminaryDesignSubmission;
@AuraEnabled public String   Form02ServicesSubmission;
@AuraEnabled public String   PreliminaryDesignApproval;
@AuraEnabled public String   EngineeringReviewIssued;
@AuraEnabled public String   EngineeringReviewReceived;
@AuraEnabled public String   FinalDesignSubmission;
@AuraEnabled public String   FinalDesignApproval;
@AuraEnabled public String   LessorWorksCommence;
@AuraEnabled public String   LessorWorksCompleted;
@AuraEnabled public String   IssuedHandoverNotice;
@AuraEnabled public String   PCIntroPackIssued;
@AuraEnabled public String   ServiceEngineeringIssuedtoPC;
@AuraEnabled public String   AuthorisationToCommenceWorksIssued;
@AuraEnabled public String   PreStartBriefingConducted;
@AuraEnabled public String   HandoverAcceptanceorNonAttendanceNoticedIssued;
@AuraEnabled public String   ApprovaltoTradeChecklistIssued;
@AuraEnabled public String   PreTradeInspectionCompleted;
@AuraEnabled public String   PreTradeDefectNoticeIssued;
@AuraEnabled public String   AuthoritytoTradeNoticeIssued;
@AuraEnabled public String   FinalDefectInspectionCompleted;
@AuraEnabled public String   FinalDefectNoticeIssued;
@AuraEnabled public String   StatementofCompletionIssued;
@AuraEnabled public String    surverType;
@AuraEnabled public String    HoardingType;
@AuraEnabled public String    ConsultantType;
    
    
@AuraEnabled public String    DesignPlannedDate;
@AuraEnabled public String    DesignActualDate;  
    //Retail Designer Nominated
@AuraEnabled public String    RetailDesignerNominatedPlannedDate;
@AuraEnabled public String    RetailDesignerNominatedActualDate; 
    //Concept Design Submission	
@AuraEnabled public String    ConceptDesignSubmissionPlannedDate;
@AuraEnabled public String    ConceptDesignSubmissionActualDate; 
    //Concept Design Approval	
@AuraEnabled public String    ConceptDesignApprovalPlannedDate;
@AuraEnabled public String    ConceptDesignApprovalActualDate;
    //Preliminary Design Submission	
@AuraEnabled public String    PreliminaryDesignSubmissionPlannedDate;
@AuraEnabled public String    PreliminaryDesignSubmissionActualDate;
    //Form 02 Services Submission	
@AuraEnabled public String    Form02ServicesSubmissionPlannedDate;
@AuraEnabled public String    Form02ServicesSubmissionActualDate;
    //Preliminary Design Approval	
@AuraEnabled public String    PreliminaryDesignApprovalPlannedDate;
@AuraEnabled public String    PreliminaryDesignApprovalActualDate;   
    //Engineering Review Issued	
@AuraEnabled public String    EngineeringReviewIssuedPlannedDate;
@AuraEnabled public String    EngineeringReviewIssuedActualDate;   
    //Engineering Review Received	
@AuraEnabled public String    EngineeringReviewReceivedPlannedDate;
@AuraEnabled public String    EngineeringReviewReceivedActualDate;
    //Final Design Submission	
@AuraEnabled public String    FinalDesignSubmissionPlannedDate;
@AuraEnabled public String    FinalDesignSubmissionActualDate;  
    //Final Design Approval	
@AuraEnabled public String    FinalDesignApprovalPlannedDate;
@AuraEnabled public String    FinalDesignApprovalActualDate;  
    //Lessor Works Commence	
@AuraEnabled public String    LessorWorksCommencePlannedDate;
@AuraEnabled public String    LessorWorksCommenceActualDate; 
    //Lessor Works Completed	
@AuraEnabled public String    LessorWorksCompletedPlannedDate;
@AuraEnabled public String    LessorWorksCompletedActualDate; 
    //Issued Handover Notice	
@AuraEnabled public String    IssuedHandoverNoticePlannedDate;
@AuraEnabled public String    IssuedHandoverNoticeActualDate;
    //PC Intro Pack Issued	
@AuraEnabled public String    PCIntroPackIssuedPlannedDate;
@AuraEnabled public String    PCIntroPackIssuedActualDate;
    //Service Engineering Issued to PC	
@AuraEnabled public String    ServiceEngineeringIssuedtoPCPlannedDate;
@AuraEnabled public String    ServiceEngineeringIssuedtoPCActualDate;
    //Authorisation To Commence Works Issued	
@AuraEnabled public String    AuthorisationToCommenceWorksIssuedPlannedDate;
@AuraEnabled public String    AuthorisationToCommenceWorksIssuedActualDate;
    //Pre-Start Briefing Conducted	
@AuraEnabled public String    PreStartBriefingConductedPlannedDate;
@AuraEnabled public String    PreStartBriefingConductedActualDate;
    //Handover Acceptance/Non Attendance Noticed Issued	
@AuraEnabled public String    HandoverAcceptanceOrNonAttendanceNoticedIssuedPlannedDate;
@AuraEnabled public String    HandoverAcceptanceOrNonAttendanceNoticedIssuedActualDate;
    //Approval to Trade Checklist Issued	
@AuraEnabled public String    ApprovaltoTradeChecklistIssuedPlannedDate;
@AuraEnabled public String    ApprovaltoTradeChecklistIssuedActualDate;
    //Pre-Trade Inspection Completed	
@AuraEnabled public String    PreTradeInspectionCompletedPlannedDate;
@AuraEnabled public String    PreTradeInspectionCompletedActualDate;
    //Pre-Trade Defect Notice Issued
@AuraEnabled public String    PreTradeDefectNoticeIssuedPlannedDate;
@AuraEnabled public String    PreTradeDefectNoticeIssuedActualDate;	
    //Authority to Trade Notice Issued	
@AuraEnabled public String    AuthoritytoTradeNoticeIssuedPlannedDate;
@AuraEnabled public String    AuthoritytoTradeNoticeIssuedActualDate;
    //Final Defect Inspection Completed	
@AuraEnabled public String    FinalDefectInspectionCompletedPlannedDate;
@AuraEnabled public String    FinalDefectInspectionCompletedActualDate;
    //Final Defect Notice Issued
@AuraEnabled public String    FinalDefectNoticeIssuedPlannedDate;
@AuraEnabled public String    FinalDefectNoticeIssuedActualDate;	
    //Statement of Completion Issued
@AuraEnabled public String    StatementofCompletionIssuedPlannedDate;
@AuraEnabled public String    StatementofCompletionIssuedActualDate;

}
}