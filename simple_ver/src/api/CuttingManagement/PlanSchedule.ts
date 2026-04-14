  
import { scmpost, ResultParameter } from "../scmapi";

export interface PolicyListRes{
    list : any[] ; 
} ;

export interface PlanningData {
    ORGVAL?: string;
    PLANTVAL?: string;
    LINEVAL?: string;
    WEEKVAL?: string;
    SEIDVAL?: string;
    CONOVAL?: string;
    ARTNOVAL?: string;
    SHOENAMEVAL?: string;
    CRDVAL?: string;
    LPDVAL?: string;
    PSDDVAL?: string;
    LASTNOVAL?: string;
    MOLDNOVAL?: string;
    QTYVAL?: number;
    CLASSCODEVAL?: string;
    DESTINATIONVAL?: string;
    REMARKS1VAL?: string;
    REMARKS2VAL?: string;
    UPDSTATVAL?: string;
    UNIQUE_ID?: string;
}

export interface ComboboxEntry {
    Code: string;
    Name: string;
}

// Factory/Organization API
export async function GetFactoryList() {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'LoadOrg',
    {}  
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

// Plant API
export async function GetPlantList(orgId: string) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'LoadPlant',
    { OrgId: orgId }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Lines API
export async function GetLineList(orgId: string, plant: string, process: string) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'LoadLines',
    { OrgId: orgId, Plant: plant, Process: process }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Search Planning Data API
export async function SearchPlanningData(searchParams: {
    startdate: string;
    enddate: string;
    seid: string;
    orgid: string;
    plant: string;
    process: string;
    line: string;
    orderbyvalue: string;
}) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'PlanningTest',
    searchParams  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Save/Update Planning Data API
export async function SaveOrUpdatePlanningData(planningData: {
    planning: PlanningData[];
    ipaddress: string;
    Process: string;
    assemblystatus: boolean;
}) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'SaveOrUpdatePlanningData',
    planningData  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Delete Planning Data API
export async function DeletePlanningData(planningData: {
    planning: PlanningData[];
    ipaddress: string;
    Process: string;
}) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'DeletePlanningData',
    planningData  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Line Day Wise Target API
export async function GetLineDayWiseTarget(line: string) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'LineDayWiseTarget',
    { line }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Static Line Day Wise Target API
export async function GetStaticLineDayWiseTarget(lines: string[]) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'StiticLineDayWiseTarget',
    { line: lines }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Get Values by Sales Order API
export async function GetValuesBySO(params: {
    seid: string;
    article: string;
    org: string;
    salesorders: string[][];
}) {  
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'GettingValuesBySO',
    params  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Save Target Data API
export async function SaveTargetData(targetData: {
    GridData: any[];
    stitching: boolean;
}) {  
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'SaveAndUpdateTargetData',
    targetData  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      // Handle case where API returns "True" as string instead of JSON
      if (data.RetData === "True") {
        result.list = [{ success: true }];
      } else {
        result.list = JSON.parse(data.RetData) as any[];
      }
    }
    console.log(result); 
    return result;
  }
}

// Get Reschedule PO API
export async function GetReschedulePO(params: {
    OrgId: string;
    Plant: string;
    Process: string;
    line: string;
    week: string;
}) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'GetReschedulePos',
    params  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Reschedule Method API
export async function RescheduleMethod(rescheduleData: { 
    week: string;
    dataSource: any[];
    ipaddress: string;
    reason: string;
}) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'RescheduleMethod',
    rescheduleData  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Get Size Wise Reschedule API
export async function GetSizeWiseReschedule(datasource: any[]) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'GetSizeWiseReschedule',
    { datasource }  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

// Verify SO OK Not API
export async function VerifySOOKNot(params: { SOList: string[], org: string }) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'VerifySOOKNot',
    JSON.stringify(params)  
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];  
    }
    return result;
  } 
} 
 
// Verify Schedule OK Not API
export async function VerifyScheduleOKNot(params: { SOList: string[], process: string }) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'VerifyScheduleOKNot',
    JSON.stringify(params)  
  );
    if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
}

export const GetTargetHolidays = async (params: any) => { 
  try {
    debugger ; 
    const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.PlanningController', 
    'GetTargetHolidays',
    {
      sdate: params.startDate,
      edate: params.endDate
    }
  ); 
    
    if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}`);  
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[]; 
    }
    return result;
  }
  } catch (error) {
    console.error('Error in GetTargetHolidays:', error);
    throw error;
  }
} ;   
