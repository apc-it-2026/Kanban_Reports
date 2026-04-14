/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { scmpost, ResultParameter } from './scmapi';

export interface PolicyListRes{
    list : any[] ; 
} ; 


export async function getOrganizations() {
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'LoadOrg',
    {}
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(ORGVALUES)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}    
export async function LoadPlant(plant : any ) {
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'LoadPlant',
    {OrgId: plant }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(ORGVALUES)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
} 
export async function LoadLines(OrgId : any , Plant : any , Process : any  ) {  
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'LoadLines',
    {OrgId , Plant, Process: "L" }    
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(ORGVALUES)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}       
export async function FGTrackingData(params: any) {  
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'FGTrackingData', 
    {org: params.orgId, startdate: params.startDate, enddate: params.endDate, line: params.lineId , plant: params.plantId }   
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(FGTRACKINGDATA)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}  

export async function InsertReasonData(params: any) {  
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'InsertReasonData', 
    params
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(INSERT_REASON_DATA)`);
  } else {
    // Handle specific response format
    if (data.RetData === "SUCCESS") {
      console.log('Insert successful:', data.RetData);
      result.list = [{ success: true, message: 'Data inserted successfully' }];
    } else {
      // Handle error response
      console.error('Insert failed:', data.RetData);
      throw new Error(`Insert failed: ${data.RetData}`);
    }
    return result;
  }
}  

export async function DeleteReasonList(params: any) {  
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'DeleteReasonData', 
    params
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(INSERT_REASON_DATA)`);
  } else {
    // Handle specific response format
    if (data.RetData === "SUCCESS") {
      console.log('Insert successful:', data.RetData);
      result.list = [{ success: true, message: 'Data inserted successfully' }];
    } else {
      // Handle error response
      console.error('Insert failed:', data.RetData);
      throw new Error(`Insert failed: ${data.RetData}`);
    }
    return result;
  }
}   

export async function GetReasonData(params: any) {   
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'GetReasonData', 
    {startdate: params.startDate, enddate: params.endDate }   
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GET_REASON_DATA)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}   

export async function UpdateReasonData(params: any) {   
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'UpdateReasonData', 
    params
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(UPDATE_REASON_DATA)`);
  } else {
    // Handle specific response format
    if (data.RetData === "SUCCESS") {
      console.log('Update successful:', data.RetData);
      result.list = [{ success: true, message: 'Data updated successfully' }];
    } else {
      // Handle error response
      console.error('Update failed:', data.RetData);
      throw new Error(`Update failed: ${data.RetData}`);
    }
    return result;
  }
}  
export async function GetReasonPieData(params: any) {   
  debugger ; 
  const result: PolicyListRes = { list: [] }; 
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.MaterialMatchingTrackingController',
    'GetReasonPieData', 
    {startdate: params.startDate, enddate: params.endDate }   
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GET_REASON_DATA)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}    
