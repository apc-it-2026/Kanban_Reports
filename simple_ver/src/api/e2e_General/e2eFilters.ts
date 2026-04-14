
import { scmpost, ResultParameter } from '@/api/scmapi';
import jsPDF from 'jspdf';
import { policyListRes } from '../e2e_biz/order';

export interface PolicyListRes {
  list: any[];
}

export async function GetPlantsData(params:any) {
    const result: PolicyListRes = { list: [] };
    try {
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.GeneralServer',
        'GetPlantsData',
        {
          org:params 
        } 
      ); 
      console.log('API response:', data);

      if (!data.IsSuccess) {
        throw new Error(data.ErrMsg);  
      } else if (!data.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(data.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
  
    return result;
  }  

  export async function GetOrgData() { 
    const result: PolicyListRes = { list: [] };
    try {
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.GeneralServer',
        'GetOrganization', 
        {}  
      ); 
      console.log('API response:', data);
  
      if (!data.IsSuccess) {
        throw new Error(data.ErrMsg);  
      } else if (!data.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(data.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
  
    return result;
  } 

  export async function IssueRaise(params:any) { 
    const result: PolicyListRes = { list: [] };
    try {
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.GeneralServer',
        'SendMessage',
        {
          Txtissue:params.issue, 
        
        } 
      ); 
      console.log('API response:', data);
  
      if (!data.IsSuccess) {
        throw new Error(data.ErrMsg);  
      } else if (!data.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(data.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
  
    return result;
  }
  
    export async function SalesOrderTrakingReport(params: any) { 
      const result:PolicyListRes = {list : []} ; 
      try {
        const data: ResultParameter = await scmpost(
          'KZ_E2EAPI' , 
          'KZ_E2EAPI.Controllers.GeneralServer' , 
          'SalesOrderTrackingReport' , 
          {
            PO_NO : params.ponumber
          }
        ) ; 
        if(!data.IsSuccess)
        {
          throw new Error(data.ErrMsg) ; 
        } else {
          if(data.RetData !== ''){
            result.list = JSON.parse(data.RetData) as any[] ; 
          }
          return result ; 
        } 
      } catch(error) {
         console.log(error) ; 
      } 
    }  

  export async function GetCRDData(params:any)
  {
    const result:PolicyListRes = {list: []} ; 
    try {
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI' , 
          'KZ_E2EAPI.Controllers.GeneralServer' , 
          'GetCRD' , 
          {
            year:params.year ,  
            month:params.month 
          }
      ) ; 
      if(!data.IsSuccess)
      {
        throw new Error(data.ErrMsg) ; 
      } else {
        if(data.RetData !== '')
        {
          result.list = JSON.parse(data.RetData) as any[] ; 
        }
        return result ;
      }
      
    } catch(error){
      console.log(error) ; 
    }
  } 
  export async function GetYearsValues()
  {
    const result:PolicyListRes = {list : []} ; 
    try {
      const data:ResultParameter = await scmpost(
        'KZ_E2EAPI' , 
        'KZ_E2EAPI.Controllers.GeneralServer' , 
        'GETYearss' , 
        {}
      ) ; 
      if(!data.IsSuccess)
      {
        throw new Error(data.ErrMsg) ; 
      } 
      else {
        if(data.RetData !== '')
        {
        result.list = JSON.parse(data.RetData) as any[] ; 
        }
        return result ; 
      }
    }
    catch(error)
    {
      console.log(error) ; 
    }  
  } 
  
  export async function GetNearestCRDValue(){
    const result: policyListRes = {list : []} ; 
    try{
    const data : ResultParameter = await scmpost (
      'KZ_E2EAPI' , 
      'KZ_E2EAPI.Controllers.GeneralServer' , 
      'GetNearestCRD' , 
      {

      } 
    ) ; 
    if(!data.IsSuccess){
      throw new Error(data.ErrMsg)  ; 
    } else {
      if(data.RetData !== ''){
        result.list = JSON.parse(data.RetData) as any[] ; 
      }
      return result ; 
    }
  }
  catch(error){
    console.log(error) ; 
  }
  } ; 
