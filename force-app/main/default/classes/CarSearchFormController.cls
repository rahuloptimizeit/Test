public with sharing class CarSearchFormController {
    @AuraEnabled(cacheable=true)
    public static List<Car_Type__c> getCarTypes(){
        return [SELECT Id, Name FROM Car_Type__c];
    }
    @AuraEnabled  
   public static string saveType(Car_Type__c carRec, string file, string fileName) {  
     string carId;  
     try{  
       Insert carRec;  
       carId = carRec.Id;  
       String base64File = EncodingUtil.urlDecode(file, 'UTF-8'); 
       system.debug(base64File);
       ContentVersion contentVersionRec = new ContentVersion(); 
       contentVersionRec.Title = fileName;  
       system.debug('Exception===>1'+ contentVersionRec.Title);
       contentVersionRec.PathOnClient = '/' + fileName; 
       system.debug('Exception===>2'+ contentVersionRec.PathOnClient);
       contentVersionRec.FirstPublishLocationId = carRec.Id; 
       system.debug('Exception===>3'+ contentVersionRec.FirstPublishLocationId);
       contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File); 
       system.debug('Exception===>4'+ contentVersionRec.VersionData);
       contentVersionRec.IsMajorVersion = true;  
       system.debug( 'Exception===>5'+contentVersionRec.IsMajorVersion);
       Insert contentVersionRec;  
       
      } catch(Exception ex){  
       system.debug('Exception===>'+ex.getMessage());  
     }  
     return carId;  
   }    
//     @AuraEnabled(cacheable = false)
// public static Boolean newCar(String photo ){
// Car__c carobj = new Car__c();
// carobj.Picture__c = photo;
// try { 
// insert carobj; 
// return true; 
// }
// catch (Exception e) {
// throw new AuraHandledException('exceptionText' + e.getMessage()); 
//   } 
// }


}