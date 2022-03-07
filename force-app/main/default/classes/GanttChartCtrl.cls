public class GanttChartCtrl {
	public List<String> Name{get;set;}
    public List<String> SDate{get;set;}
    public List<String> EDate{get;set;}
    public List<Integer> Duration{get;set;}
    public List<String> tStatus{get;set;}
    
    public GanttChartCtrl(){
        List<Task> taskList = new List<Task>();
        List<Opportunity> oppList = new List<Opportunity>();
        Name = new List<String>();
        SDate = new List<String>();
        EDate = new List<String>();
        Duration = new List<Integer>();
        tStatus=new List<String>();
        
        Integer dd;
        Integer month;
        Integer year;
        
        String whatId= ApexPages.currentPage().getParameters().get('id');
       // taskList = [SELECT Id, Subject, CreatedDate, ActivityDate, Status  FROM Task WHERE WhatId=:whatId];  
       oppList = [SELECT Id, Property__r.Name,HandoverDateForNewTenant__c,StageName FROM Opportunity where StageName IN('Current Lease','Lease Execution and Finalisation') AND Id IN (Select Opportunity__c from TD_Workflow__c where Opportunity__c !=null) AND  RecordType.Name = 'Retail HoA Opportunity'];
       // oppList = [SELECT Id, Name,HandoverDateForNewTenant__c,	StageName FROM Opportunity];
        for(Opportunity ts:oppList){
            tStatus.add(ts.StageName); 
            Date todayDate = System.Date.today();
            dd = todayDate.day();
            month=todayDate.month();
            year = todayDate.year();
            Name.add(ts.Property__r.Name);
            SDate.add(year+'-'+month+'-'+dd);
            dd = ts.HandoverDateForNewTenant__c.day();
            month=ts.HandoverDateForNewTenant__c.month();
            year = ts.HandoverDateForNewTenant__c.year();
            EDate.add(year+'-'+month+'-'+dd);
            Integer dt = (system.today()).daysBetween(Date.valueOf(ts.HandoverDateForNewTenant__c));
            Duration.add(dt);
             system.debug(dt);
             system.debug(SDate); 
            system.debug(EDate);
            system.debug(Duration);
            system.debug(tStatus);
        }
    }
}