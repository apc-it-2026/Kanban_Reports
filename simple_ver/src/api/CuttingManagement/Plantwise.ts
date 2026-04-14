import { scmpost , ResultParameter } from "../scmapi";

export interface PolicyListRes{
    list : any[] ; 
} ; 

export async function GetPLantsData() { 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetPLantsData',
    {} 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(PlantsData)`); 
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
} ; 

export async function GetLines(plant:any) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetLines', 
    {
      plant
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(LinesData)`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
} 
 
export async function GetYears() {   
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetYears',  
    {}  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(YearsData)`);   
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
} 

export async function GetMonths(year:any) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetMonths', 
    { 
      year
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(MonthsData)`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}  

export async function GetWeeks(year:any , month : any ) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetWeeks', 
    {
      year , month 
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(WeeksData)`);   
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}  

export async function GetPlanningData(week:any , plant : any , line : any , so : any , weekfilter : any  ) {    
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetPlanningData', 
    {
      week , plant , line , so , weekfilter 
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(PlanningData)`);   
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}   

export async function GetPlanningScheduleData(week:any , plant : any , line : any , so : any , weekfilter : any  ) {    
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetPlanningScheduleData', 
    {
      week , plant , line , so , weekfilter  
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(PlanningData)`);   
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}   

export async function GetsIZEPlanningScheduleData( line : any , so : any ) {    
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetsIZEPlanningScheduleData', 
    {
      line , so     
    }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(SizePlanningData)`);    
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}   

export async function VerifyMaterialStatus(SOList:any  ) {   
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'VerifyMaterialStatus', 
    { 
      SOList 
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(Sending SOList)`);   
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}   

export async function GetWarehouseStockBySO(so:any  ) {    
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.LineWise',
    'GetWarehouseStockBySO',  
    { 
      so 
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(Sending SOList)`);   
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}   

export async function SendMailAppAlerts(param:any) { 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MailAlert', 
    'SendSalesOrderAlert',
    {
      planningList : param 
    } 
  );
    return result;
} ;   

export async function SendWhatsAppAppAlerts(param:any) { 
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.WhatsappAlert',  
    'SendSalesOrderAlert', 
    {
      planningList : param 
    } 
  );
    return result;
} ;    
