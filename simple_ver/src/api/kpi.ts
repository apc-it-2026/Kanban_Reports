import { scmpost, ResultParameter } from '@/api/scmapi';
import { policyListRes } from './e2e_biz/order';
 
export interface PolicyListRes {
  list: any[];
}

export async function GetKPIDataTable(params: any) { 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_PRODKPIAPI',
    'KZ_PRODKPIAPI.Controllers.ReportController', 
    'GetKPIDataTable',
    {
       month : params.month , 
       line : params.line ,
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

export async function GetInputLabels(params:any) {
  const result: policyListRes = { list : []} ; 
  const data : ResultParameter = await scmpost(
    'KZ_PRODKPIAPI',
    'KZ_PRODKPIAPI.Controllers.ReportController', 
    'GetInputLabels',
    {
       plant : params.plant , 
       type : params.type , 
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

export async function GetExpandLineChart(month : any , line : any , kpi : any) {  
  const result: policyListRes = { list : []} ; 
  const data : ResultParameter = await scmpost(
    'KZ_PRODKPIAPI',
    'KZ_PRODKPIAPI.Controllers.ReportController', 
    'GetExpandLineChart',
    { 
      month ,  
      line , 
      kpi ,
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

export async function GetZEROKPI(params:any) { 
  const result: policyListRes = { list : []} ; 
  const data : ResultParameter = await scmpost(
    'KZ_PRODKPIAPI',
    'KZ_PRODKPIAPI.Controllers.ReportController', 
    'GetZEROKPI', 
    { 
      month : params.month ,  
      line : params.line , 
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

export async function GetKPIPiechart(month :any , line:any , kpi : any) { 
  const result: policyListRes = { list : []} ; 
  const data : ResultParameter = await scmpost(
    'KZ_PRODKPIAPI',
    'KZ_PRODKPIAPI.Controllers.ReportController', 
    'GetKPIPiechart', 
    { 
      month ,  
      line , 
      kpi ,
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