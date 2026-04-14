import { AriaComponent } from 'echarts/components';
import { scmpost, ResultParameter } from '../scmapi';

export interface policyListRes {
  list: any[];
}

export async function GetOrderChartDetails(params: any) {
  const result: policyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.GeneralServer',
    'GetOrderChartDetails',
    {
      crd: params.crd,
      po: params.po,
      article : params.model , 
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

export async function GetPOsCRD(params: any , pocomp : any , sarticle : any ) {  
  debugger ; 
  const result: policyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.GeneralServer',
    'GETPOs', 
    {
      crd: params.crd,
      po: params.po,
      article : params.model ,  
      pocompletion : pocomp , 
      sa : sarticle.value ,  
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

export async function ShipmentDetailsData(params: any) {  
  const result: policyListRes = { list: [] };
  const data: ResultParameter = await scmpost(  
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.GeneralServer',
    'GetShipmentDetails',
    {
      crd: params.crd,
      po: params.po,
      article : params.model , 
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

export async function GetBOMPURStatusData(seid: any , po:any , article : any ) { 
  const result: policyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.GeneralServer',
    'GetBOMPURStatus',
    {
      seid: seid.value , 
      po : po.value , 
      article : article.value 
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
} ;  
 

// export async function GETCUTSTITASSPACFGINOUTStatusMethod(seid:any) { 
 
//     const result : policyListRes = {list : []} ; 
//     const data : ResultParameter = await scmpost(
//         'KZ_E2EAPI',
//         'KZ_E2EAPI.Controllers.GeneralServer',
//         'GETCUTSTITASSPACFGINOUTStatus',
//         {
//             po : seid.value , 
//         } 
//     ) ; 
//     if(!data.IsSuccess)
//     {
//         throw new Error(data.ErrMsg) ; 
//     }
//     else {
//         if(data.RetData !== '')
//         {
//             result.list = JSON.parse(data.RetData) as any[] ; 
//         }
//         return result ; 
//     }
// } ; 

export async function GETPURCHSESTATUSCARDMethod(seid: any) 
{
    const result : policyListRes =  {list: []} ; 
    const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.GeneralServer',
        'GETPURCHSESTATUSCARD',
        {
            seid : seid.value 
        }
       ) ; 
       if(!data.IsSuccess)
       {
        throw new Error (data.ErrMsg) ; 
       }
       else {
        if(data.RetData !== '')
        {
            result.list = JSON.parse(data.RetData) as any[] ; 
        }
        return result ; 
       }
}

export async function GetCalendarDatesFromOrdertoShipment(seid: any , po : any , article : any )
{
 
  const result : policyListRes = {list:[]}  ; 
  const data: ResultParameter = await scmpost (
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.GeneralServer',
    'GetCalendarDatesFromOrdertoShipment',
    {
      seid : seid.value , 
      po : po.value , 
      article : article.value 
    } 
  ) ; 
  if(!data.IsSuccess){
    throw new Error (data.ErrMsg) ; 
  } else {
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as any[] ; 
    }
    return result ; 
  }
} ; 

export async function GetOuputsDetails(seid: any , po :any , article : any)
{
  const result : policyListRes = {list: []} ; 
  const data : ResultParameter = await scmpost (
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.GeneralServer',
    'GetOuputs', 
    {
      seid : seid.value , 
      po : po.value , 
      article : article.value , 
    }
  ) ; 
  if(!data.IsSuccess){
    throw new Error(data.ErrMsg) ; 
  } else {
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as any[] ; 
    }
    return result ; 
  }
} ; 

export async function GetOutputDetailsBysize(seid:any , index:any){ 
  const result : policyListRes = {list: []} ; 
  const data: ResultParameter = await scmpost (
    'KZ_E2EAPI',
    'KZ_E2EAPI.Controllers.GeneralServer',
    'GetOutputBySize', 
    {
      seid : seid.value ,
      index , 
    }
  ) ; 
  if(!data.IsSuccess){
    throw new Error(data.ErrMsg) ; 
  } else {
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as any[] ; 
    }
    return result ; 
  }
} ; 

export async function IssueRaise(issue: string, dept: string, phno: string) {
  let result: any = null;  

  try {
     const res: ResultParameter = await scmpost(
      'KZ_E2EAPI',
      'KZ_E2EAPI.Controllers.GeneralServer',
      'SendMessagewithoutAwait',
      {
        Txtissue: issue,
        Dept: dept,
        phnumber: phno,
      }
    );

     console.log("API Response:", res);

     if (!res.IsSuccess) {
      console.error("Request failed: ", res.ErrMsg || 'Unknown error');
      throw new Error('Request failed');
    } else if (!res.RetData) {
      console.error("RetData is missing.");
      throw new Error('RetData is null or undefined.');
    }
 

     if (typeof res.RetData === 'string') {
      result = res.RetData;
      console.log("Result assigned:", result);
    } else {
      console.error("RetData is not a string:", res.RetData);
      throw new Error("RetData is not a string");
    }

  } catch (error) {
     console.error('Error occurred while fetching data:', error);
    throw error;
  }

   return result;
}




export async function SendMailsToDepartment(issue:string,dept:string) { 
  const result : policyListRes = {list: []} ;  
  try {
    const res: ResultParameter = await scmpost(
      'KZ_E2EAPI',
      'KZ_E2EAPI.Controllers.GeneralServer',
      'SendMails',
      {
        Txtissue:issue,
        Dept:dept, 
      }
    );
    if (!res.IsSuccess) {
     // console.log(data);
    } else if (!res.RetData) {
      throw new Error('RetData is null or undefined.'); 
    }
    result.list = JSON.parse(res.RetData) as any[];
  } catch (error) {
    console.error('Error occurred while fetching stat cards:', error);
    throw error; 
  }
  return result;
}; 




 