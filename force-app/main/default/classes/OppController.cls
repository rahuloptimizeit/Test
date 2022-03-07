public  class OppController 
{
    @AuraEnabled(cacheable=true)
    public static List<Account> displayAccount(){
        return [SELECT Id, Name,RecentOpp__c,Phone,Industry,Website FROM Account ];
    }   
   @AuraEnabled(cacheable=true)
   public static List<Opportunity> displayOpps(String  newId){
       return [SELECT Id, IsPrivate, Name, StageName, Account.RecentOpp__c,Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity WHERE AccountId =: newId];
   }
   @AuraEnabled
   public static List<Opportunity> updateRecord(String  newId,String oppId, Date CloseDate ,Boolean IsPrivate, Boolean IsClosed){
       System.debug('@@@@AccountId@@@1111'+oppId);
       Opportunity opp=[SELECT Id, IsPrivate, Name,AccountId,Account.Name,Account.RecentOpp__c, StageName, Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity where Id=:oppId];
    //    Account acc=[SELECT Id, Name,RecentOpp__c,Phone,Industry,Website FROM Account];
    //   if(oppId=='0065j00000HPgLZAA1')
    //   {
    //       opp.Name='Edge Installation';
    //   }
      opp.Account.RecentOpp__c=opp.Name;
       opp.Amount=opp.Probability;
    //   opp.Probability=75;
    //   opp.LeadSource='Phone Inquiry';
      opp.CloseDate= CloseDate;
   
       try{
           update opp;
        //    update acc;
       }
	   catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return displayOpps(opp.AccountId);
   }

   @AuraEnabled
   public static List<Opportunity> updateRecord2(String  newId,String oppId, Date CloseDate ,Boolean IsPrivate, Boolean IsClosed){
       System.debug('@@@@AccountId@@@1111'+oppId);
       Opportunity opp=[SELECT Id, IsPrivate, Name,AccountId,Account.Name, Account.RecentOpp__c,StageName, Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity where Id=:oppId];
    //  opp.StageName='Prospecting';
    //   if(oppId=='0065j00000HPgLZAA1')
    //   {
    //       opp.Name='Edge Installation';
    //   }
    //   opp.Amount=220000;
    //   opp.Probability=75;
    //   opp.LeadSource='Phone Inquiry';
    //   opp.Account.Name='abc';
      opp.IsPrivate= IsPrivate;
       try{
           update opp;
       }
	   catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return displayOpps(opp.AccountId);
   }

   @AuraEnabled
   public static List<Opportunity> updateRecord3(String  newId,String oppId, Date CloseDate ,Boolean IsPrivate, Boolean IsClosed){
       System.debug('@@@@opp@@@1111'+oppId);
       Opportunity opp=[SELECT Id, IsPrivate, Name,AccountId,Account.Name,Account.RecentOpp__c, StageName, Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity where Id=:oppId];
       Opportunity opp1=[SELECT Id, IsPrivate, Name,AccountId,Account.Name,Account.RecentOpp__c, StageName, Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity where Id=:oppId];
        
    String accountID;
    String OppName;
    // for (Opportunity opps:opp1)
    // {
        accountID=opp1.AccountId;
        OppName=opp1.Name;
    // }
    Account acc=[SELECT Id, Name,RecentOpp__c,Phone,Industry,Website FROM Account WHERE Id=:accountID];
    //   if(oppId=='0065j00000HPgLZAA1')
    System.debug('@@@@AccountId@@@1111'+accountID);
    System.debug('@@@@oppsname@@@1111'+OppName);
    // List<Account> accupdate=new List<Account>();
    // for (Account acct:acc)
    // {
        acc.RecentOpp__c=OppName;
        // accupdate.add(acct);
    // }
    update acc;
    System.debug('11111'+acc);
    //   {
    //       opp.Name='Edge Installation';
    //   }
    // acc.RecentOpp__c=opp.Name;
    //    opp.Amount=opp.Probability;
    //   opp.Probability=75;
    //   opp.LeadSource='Phone Inquiry';
    //   opp.CloseDate= CloseDate;
   
    //    try{
    //        update opp;
    //     //    update acc;
    //    }
	//    catch (Exception e) {
    //        System.debug('unable to update the record due to'+e.getMessage());
    //    }
       return displayOpps(opp.AccountId);
   }

   @AuraEnabled
   public static List<Account> updateRecord4(){
    //    System.debug('@@@@AccountId@@@1111'+oppId);
      // Opportunity opp=[SELECT Id, IsPrivate, Name,AccountId,Account.Name,Account.RecentOpp__c, StageName, Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity where Id=:oppId];
      List<Account> acc=[SELECT Id, Name, RecentOpp__c,(SELECT Id, Name, Amount, CloseDate, IsPrivate FROM Opportunities) FROM Account];
    //   if(oppId=='0065j00000HPgLZAA1')
    //   {
    //       opp.Name='Edge Installation';
    //   }
    for(Account a: acc){
        System.debug('CAaount name:'+ a.Name);
    
   //I dono how to acces contact s here
          for(Opportunity c:a.Opportunities)
        { System.debug('Conatct Last:' +c.Name);
        }
    }
    //    opp.Amount=opp.Probability;
    // //   opp.Probability=75;
    // //   opp.LeadSource='Phone Inquiry';
    //   opp.CloseDate= CloseDate;
   
       try{
        //    update opp;
           update acc;
       }
	   catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return displayAccount();
   }


   @AuraEnabled(cacheable=true)
   public static List<Opportunity>  getOpportunity(String  oppsId){
    Opportunity opp=[ SELECT Id, Name,AccountId,Account.Name, StageName, Account.RecentOpp__c, CloseDate, OwnerId,IsPrivate  FROM Opportunity WHERE Id =: oppsId];
    opp.Account.RecentOpp__c='opp.Name';
       return [ SELECT Id, Name,AccountId,Account.Name, StageName,Account.RecentOpp__c,  CloseDate, OwnerId,IsPrivate  FROM Opportunity WHERE Id =: oppsId];
   }


//    @AuraEnabled(cacheable=true)
//    public static List<OpportunityTableData>  getOpportunityList(String  oppsId){
//     Opportunity getOpp = [SELECT Id, Name,AccountId,Account.Name, StageName, Account.RecentOpp__c, CloseDate, OwnerId,IsPrivate  FROM Opportunity WHERE Id =: oppsId];
//     List<OpportunityTableData> oppWrapperList = new List<OpportunityTableData>();
//    // List<boolean> booleanList = new List<boolean>();
   
//         for(Opportunity opp : getOpp){
//             OpportunityTableData oppWrapper = new OpportunityTableData();

//             oppWrapper.oppName = opp.Name;
//             oppWrapper.oppAcc = opp.Account.Name;
//             oppWrapper.oppRecOpp = opp.Account.RecentOpp__c;
//             oppWrapper.oppStage = opp.StageName;
//             oppWrapper.oppdate = opp.CloseDate;
//             oppWrapper.oppispri = opp.IsPrivate;
           
//             oppWrapperList.add(oppWrapper);
           
// }
 
// System.debug('oppWrapperList issss '+oppWrapperList);
//     return oppWrapperList;  
// }
// public class OpportunityTableData{
// @AuraEnabled public String oppName;
// @AuraEnabled public String oppAcc;
// @AuraEnabled public String oppRecOpp;
// @AuraEnabled public Date oppdate;
// @AuraEnabled public String oppStage;
// @AuraEnabled public Boolean oppispri;

// }
}

