public  class AccountController 
{
   @AuraEnabled(cacheable=true)
   public static List<Account> displayAccounts(){
       return [select Id,Name,Site from Account];
   }
   @AuraEnabled
   public static List<Account> updateRecord(String accId){
       System.debug('@@@@AccountId@@@'+accId);
       Account acc=[select Id,Name,Site from Account where Id=:accId];
       acc.site='Approved';
       try{
           update acc;
       }
	   catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return displayAccounts();
   }
}

