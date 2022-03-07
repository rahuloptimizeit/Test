public with sharing class FileUploadService {
   
    @AuraEnabled                            
    public static Id saveTheChunkFile(Id parentId, String fileName, String base64Data, String contentType, String fileId){
       
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        if ( String.isBlank(fileId) ) {
            fileId = saveFiles(parentId, fileName, base64Data );
        } else {
            appendToFile(fileId, base64Data);
        }

        return Id.valueOf(fileId);
    }

    @AuraEnabled
    public static Id saveFiles(Id recordId, String fileName, String base64Data )  {
       
        ContentVersion contentToInsert =new ContentVersion();
        contentToInsert.Title =fileName;
        contentToInsert.VersionData=EncodingUtil.base64Decode(base64Data);
        contentToInsert.PathOnClient='/' + fileName ;
        contentToInsert.IsMajorVersion = false;
        insert contentToInsert;
       
        contentToInsert = [select id, ContentDocumentId from ContentVersion WHERE Id =: contentToInsert.Id];
        ContentDocumentLink cl = new ContentDocumentLink();
        cl.ContentDocumentId = contentToInsert.ContentDocumentId;
        cl.LinkedEntityId = recordId;
        cl.ShareType = 'V';
        cl.Visibility = 'AllUsers';
        insert cl;
       
        return contentToInsert.id;

    }


    @AuraEnabled
    public static void appendToFile(Id contentDocumentId, String base64Data) {
        //base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        ContentVersion versionData = [
            SELECT Id, VersionData,ContentDocumentId
            FROM ContentVersion
            WHERE Id = :contentDocumentId
        ];

        String existingBody     = EncodingUtil.base64Encode(versionData.VersionData);
        versionData.VersionData = EncodingUtil.base64Decode(existingBody + base64Data);

        update versionData;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accId) {
        return [
            SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WHERE AccountId = :accId
            WITH SECURITY_ENFORCED
        ];
    }

    @AuraEnabled  
    public static string saveContact(Contact contactRec, string file, string fileName) {  
      string contactId;  
      try{  
        Insert contactRec;  
        contactId = contactRec.Id;  
        String base64File = EncodingUtil.urlDecode(file, 'UTF-8');    
        ContentVersion contentVersionRec = new ContentVersion();  
        contentVersionRec.Title = fileName;  
        contentVersionRec.PathOnClient = '/' + fileName;  
        contentVersionRec.FirstPublishLocationId = contactRec.Id;  
        contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);  
        contentVersionRec.IsMajorVersion = true;  
        Insert contentVersionRec;  
      } catch(Exception ex){  
        system.debug('Exception===>'+ex.getMessage());  
      }  
      return contactId;  
    }    


    @AuraEnabled
    public static String saveParentAsLead(Car__c ld) {          
    try {    
    List<Car__c> cars = new List<Car__c>();
    cars.add(ld);
    System.debug(cars);  
   Database.SaveResult[] srList = Database.update(cars, false);      
   for (Database.SaveResult sr : srList) {
    if (sr.isSuccess()) {        
     System.debug('Successfully : ' + sr.getId());
    // return saveFile(sr.getId(),strFileName,base64Data);
     return 'Success';
    }else {
     return 'Failed';
    }
   }                
    } catch (DmlException ex) {
   return 'Failed';
    }          
       return null;
    }


}