public  class OppController1 
{
    @AuraEnabled(cacheable=true)
    public static List<Account> displayAccount(){
        return [SELECT Id, Name,RecentOpp__c,Phone,Industry,Website FROM Account ];
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
        System.debug('CAaount name:'+ a.RecentOpp__c);
    
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
}


