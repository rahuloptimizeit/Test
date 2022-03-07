public with sharing class MixController {@AuraEnabled(cacheable=true)
    public static List<Account> displayAccount(){
        return [SELECT Id, Name,Phone,Industry,Website FROM Account ];
    }   
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> displayAccountOpportunity(String  newId){
        return [SELECT Id, IsPrivate, Name, StageName, Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity  WHERE AccountId =: newId ];
    }
     @AuraEnabled
    public static List<Opportunity> updateRecord(String oppId){
        System.debug('@@@@AccountId@@@'+oppId);
        Opportunity opp=[SELECT Id, Name,AccountId,Account.Name, StageName,  CloseDate, OwnerId,IsPrivate  FROM Opportunity WHERE Id =: oppId];
     //    Opportunity opp=[SELECT Id, IsPrivate, Name, StageName, Amount, Probability, LeadSource, IsClosed, CloseDate FROM Opportunity where Id=:oppId];
        //String x=opp.Name; 
     //    opp.CloseDate= Date.newInstance(2022, 02, 02);
     opp.CloseDate= CloseDate;
     opp.IsPrivate= IsPrivate;
        //System.debug(x);
        try{
            System.debug('updated try block');
            update opp;
            
        }
        catch (Exception e) {
            System.debug('unable to update the record due to'+e.getMessage());
        }
        //return displayOpportunity();
        return displayAccountOpportunity(opp.AccountId);
    }
    @AuraEnabled(cacheable=true)
     public static List<Opportunity>  getOpportunity(String  oppsId){
         return [ SELECT Id, Name,AccountId,Account.Name, StageName,  CloseDate, OwnerId,IsPrivate  FROM Opportunity WHERE Id =: oppsId];
     }
 
 }
