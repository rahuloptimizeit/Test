public with sharing class CarSearchResultController {
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars(String carTypeId){
        
        if(String.isEmpty(carTypeId)){
            return [SELECT Id, Name, Picture__c, Contact__r.Name
                    FROM Car__c];
        } else{
            return [SELECT Id, Name, Picture__c, Contact__r.Name
                    FROM Car__c];
        }

    }
}