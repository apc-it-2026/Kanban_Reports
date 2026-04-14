import { scmpost, ResultParameter } from '@/api/scmapi';
import { policyListRes } from './order';

export interface PolicyListRes {
  list: any[];
}

export async function GetOrderPiechartData(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'GetOrderBargraph',
    {
      FormDate: params.fromDate,
      ToDate: params.todate,
      PoNo: params.po,
      Model: params.model,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}

export async function SearchEmpByBarcode(params: any) {
  debugger;
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'SearchEmpByBarcode',
    { barcode: params.phno }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}

export async function GroupsForSendWhatsapp() {
  debugger;
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'GroupsForSendWhatsapp',
    {}
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}

export async function POSEIDARTICLESuggetions(params: any, po: any) {
  debugger;
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'POSEIDARTICLESuggetions',
    {
      po: params.po,
      seid: params.seid,
      article: params.model,
      crd: params.crd,
      value: po,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}

export async function POARTICLESUGGETIONS (po:any , article : any , valuee: any) { 
  debugger; 
  const result : policyListRes = {list : []} ; 
  const data : ResultParameter = await scmpost (
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'POARTICLESUGGETIONS', 
    {
       po : po.value , 
      article : article.value ,  
      value : valuee
    }
  ) ; if(!data.IsSuccess){
    throw new Error(data.ErrMsg) ; 
  } else {
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as any[] ; 
    }
    return result ; 
  }
} ;  

export async function GetSizewiseSTatus(seid:any , po : any , article : any ) {  
  debugger ; 
  const result: policyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'GetSizeWiseStatus', 
    {
      seid: seid.value ,
      po: po.value , 
      article: article.value  
    } 
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}   

export async function CheckMaterialStatus(seid:any) {     
  debugger ;  
  const result: policyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'CheckMaterialStatus',  
    {
      seid: seid.value 
    } 
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}   

export async function GetTimelines(seid : any) {
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'GetTimelines',
    {
      seid  
    } 
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
} 

export async function GETSOS(seid : any) { 
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'GETSOS', 
    {
      seid  
    } 
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}  

export async function GetSODetails(params : any) { 
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.BusinessController',
    'GetSODetails',  
    {
      seid : params.seid , 
      crd : params.crd   
    } 
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}  