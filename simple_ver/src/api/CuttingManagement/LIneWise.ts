import { scmpost , ResultParameter } from "../scmapi";

export interface PolicyListRes{
    list : any[] ; 
} ; 

export async function GetPlanningData(param:any) {  
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GetPlanningData',
    {
      startdate : param.value[0] , 
      enddate : param.value[1]  
    }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
} 
 
export async function GetProductionScheduleData(seid: any ) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GetProductionScheduleData', 
    {
      seid
    } 
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}

export async function GetBOMAndPurchaseStatus(seid:any) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GetBOMAndPurchaseStatusdt', 
    {
      seid
    }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}  

export async function GetFetchingStatus(seid:any) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GetFetchingStatus', 
    {
      seid
    }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
} 

export async function GEtMaterialStatus(prodorder:any , seid : any ) {    
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GEtMaterialStatus',  
    {
      prodorder , 
      seid 
    }   
  ); 
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}  

export async function GetFetchingDetailsView(prodorder:any , seid : any ) {    
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GetFetchingDetailsView',  
    {
      prodorder , 
      seid 
    }   
  ); 
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}  

export async function RaiseEscalations(seid:any , issue : any ) {    
  let result: any = '' ;
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer', 
    'RaiseEscalations',   
    {
      seid , 
      issue 
    }   
  ); 
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    debugger ; 
    if (data.RetData !== '') {
      result = data.RetData ; 
      console.log(result.list); 
    }
    return result;
  }
}  
  export async function EscalationsCount() {     
    let result: any = '' ;
    const data: ResultParameter = await scmpost(
      'KZ_CUTMNT',
      'KZ_CUTMNT.Controllers.GeneralServer', 
      'EscalationsCount',   
      {}   
    ); 
    if (!data.IsSuccess) {
      console.log(data.ErrMsg);
      throw new Error(`${data.ErrMsg}`);  
    } else {
      debugger ; 
      if (data.RetData !== '') {
        result = data.RetData ; 
        console.log(result.list); 
      }
      return result;
    }
  }  

export async function GEtRiaseissuesData(seid : any ) {    
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GEtRiaseissuesData',  
    {
      seid 
    }   
  ); 
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}  