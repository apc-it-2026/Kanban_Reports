/* eslint-disable prettier/prettier */
import { scmpost, ResultParameter } from '@/api/scmapi';   

export interface orgData { 
  org_code: string;
  org_name: string;
} 
export interface Organizations {
  code : string ; 
  name : string ; 
}

export interface factoryareaData {   
  code: string;
  org: string;
}  

export interface Plants { 
  code : string ;  
  name : string ; 
} 

export interface Line {
  code : string ; 
  name : string ; 
} 
export interface Productiondates {
  code : string ; 
  name : string ; 
}
export interface OrderLeadtime {
  code : string ; 
  name : string ; 
}
export interface Artno {
  code : string ; 
  name : string ; 
}

export interface costatusdata{  
  code: string ;  
  name: string ; 
} 
export interface GetModeldata{ 
   A_MODEL: string ; 
   B_MODEL: string ;  
} 
 
export interface maintenanceData {  
  KEY: string;
  ADDRESS: string;
  SNID: string;
  DEVICE_NAME: string;
  BODY_PART: string;
  ITEM: string;
  PLAN_FINISHDATE: string;
} 

export interface repairData {
  
  KEY: string;
  ADDRESS: string;
  SNID: string;
  DEVICE_NAME: string;
  BZ_REMARK: string;
  BZ_USER: string;
  BZ_DATE: string;
}

export interface DevicestatusData {
  RATE: number;
  DEVICE_STATUS: string;
  NAME: string;
}
export interface MaintenanceRateData {
  ONERATE: number;
  TWORATE: number;
}
export interface RepairRateData {
  REPAIRINGRATE: number;
  FINISHDATA: number;
  WAITRATE: number;
}

export interface PolicyListRes {
  
  list: any[];
}

export interface ReasonRate {
  VALUE: string ; 
  NAME: string ; 
  REMARKS: string ; 
}

export interface ChangeOverRate {
  
    
  CO_STATUS_NAME: string;
  NAME: string;
  VALUE: number ; 
 RATE: number;
}

export async function Getorg() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_Miscellaneous_Server',
    'LoadOrg', 
    {}
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as orgData[];
    return result;
  }
}
export async function Getfactory() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.ProductionDashBoardServer',
    'LoadPlant',
    {}
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as factoryareaData[];
    }
    return result;
  }
}
export async function GetMaintenanceList(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetMaintenanceList',
    {
      org_id: param.selectorg,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMaintenanceList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as maintenanceData[];
    }

    return result;
  }
}

export async function RepairList(param: any) {
 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetRepairList',
    {
      org_id: param.selectorg,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetRepairList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as repairData[];
    }

    return result;
  }
}

export async function DevicestatusRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'DevicestatusRate',
    {
      org_id: param.selectorg,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(DevicestatusRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as DevicestatusData[];
    }
    return result;
  }
}

export async function MaintenanceCompletionRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'MaintenanceCompletionRate',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(MaintenanceCompletionRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as MaintenanceRateData[];
    }

    return result;
  }
}
export async function RepairCompletionRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'RepairCompletionRate',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(RepairCompletionRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as RepairRateData[];
    }

    return result;
  }
}
export async function GetMaintenanceDetail01(param: any) {
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetMaintenanceDetail_01',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      udf05: param.factory_area,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMaintenanceDetail_01)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetMaintenanceDetail02(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetMaintenanceDetail_02',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      udf05: param.factory_area,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMaintenanceDetail_02)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetRepairDetail(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetRepairDetail',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      udf05: param.factory_area,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetRepairDetail)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetToplist() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetToplist',
    {}
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetToplist)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

// implemented by me 

export async function ChangeOverRate(param: any) { 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',
    'ChangeOverRate',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0] , 
      date_end: param.selectdate[1] , 
      plant: param.factory_area, 
      amodel: param.Amodel , 
      bmodel : param.Bmodel , 
      type:param.type , 

    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(ChangeOverRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as ChangeOverRate[];
      console.log(result.list);
    }
    return result; 
  }
} 

export async function ReasonRate(param: any){
  const result: PolicyListRes = { list: []} ; 
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',
    'ReasonRate' , 
    {
      org_id: param.selectorg , 
      date_begin: param.selectdate[0] , 
      date_end: param.selectdate[1] , 
      plant: param.factory_area , 
      amodel: param.Amodel , 
      bmodel : param.Bmodel , 
      type:param.type , 
    } 
  ) ; 
  if(!data.IsSuccess){
    console.log(data.ErrMsg) ; 
    throw new Error (`${data.ErrMsg}(ReasonRate)`) ; 
  } else {
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as ReasonRate[] ; 
    }
    return result ; 
  }
} 

export async function QcoDetails(params:any) {
  const result: PolicyListRes = {list: []} ; 
  const data: ResultParameter = await scmpost( 
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',  
    'QcoDetails' , 
    { 
      org_id: params.selectorg , 
      date_begin: params.selectdate[0], 
      date_end: params.selectdate[1] ,
      udf05: params.factory_area , 
      amodel: params.Amodel ,   
      bmodel: params.Bmodel , 
    } 
   ) ; 
  if(!data.IsSuccess){ 
         console.log(data.ErrMsg) ; 
         throw new Error(`${data.ErrMsg}(QcoDetails)`) ; 
  }else{ 
      if(data.RetData !== ''){
        result.list = JSON.parse(data.RetData) as any[] ; 
      }
      return result ; 
  }
} 

export async function ChangeoverDetails(params:any) {    
  
  const result: PolicyListRes = {list: []} ; 
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',
   'ChangeoverDetails' ,
   {org_id: params.selectorg ,
    date_begin: params.selectdate[0], 
    date_end: params.selectdate[1] , 
    plant: params.factory_area ,  
    status: params.status ,  
    amodel: params.Amodel , 
    bmodel: params.Bmodel , 
    type : params.type , 
    reasontype: params.reason , 
    
   } 
  ) ;  
  if(!data.IsSuccess){ 
    console.log(data.ErrMsg) ; 
    throw new Error(`${data.ErrMsg}(ChangeoverDetails)`) ; 
  }else{
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as any[] ; 
    }
    return result ; 
  }
} 
export async function Getcostatus() { 
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',
    'Getcostatus',
    {}
  ); 
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as costatusdata[]; 
    }
    return result; 
  }
}
export async function GetModel() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',
     'GetModel', 
    {}
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as GetModeldata[]; 
    }
    return result; 
  }
}

export async function GetCotCoptTotal(params:any) { 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',
     'GetCotCoptTotal', 
     {org_id: params.selectorg ,
      plant: params.factory_area , 
      begin_date: params.selectdate[0], 
      end_date: params.selectdate[1] , 
      amodel: params.Amodel , 
      bmodel: params.Bmodel , 
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
export async function GetTotalChangeover(params:any) { 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer', 
     'GetTotalChangeover', 
     {org_id: params.selectorg ,
      date_begin: params.selectdate[0], 
      date_end: params.selectdate[1] , 
      plant: params.factory_area ,  
      amodel: params.Amodel , 
      bmodel: params.Bmodel , 
      type:params.type , 
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

//    for rtl purpose by manohar 
export async function Org(params : any ) {  
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI' , 
    'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
     'Org',
    {
      line : params.selectline , 
      artno : params.selectartno , 
      orderleadtime: params.selectorderleadtime ,  
      productiondate : params.selectproductiondate , 
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Organizations[]; 
    return result;
  }
} 

export async function Plants(params : any ) { 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI' , 
    'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
     'LoadPlant',
    {
      line : params.selectline , 
      artno : params.selectartno , 
      orderleadtime: params.selectorderleadtime ,  
      productiondate : params.selectproductiondate , 
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Plants[]; 
    return result;
  }
} 

export async function Line(params : any ) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI' , 
    'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
     'LoadLine',
    {  
      plant : params.factory_area ,
      artno : params.selectartno , 
      orderleadtime: params.selectorderleadtime , 
      productiondate : params.selectproductiondate ,
    }  
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Line[]; 
    return result;
  }
}

export async function Productiondates(params : any ) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI' , 
    'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
     'Productiondates',
    {
      plant : params.factory_area ,
      line : params.selectline , 
      artno : params.selectartno , 
      orderleadtime: params.selectorderleadtime , 
     }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Productiondates[]; 
    return result;
  }
}
export async function OrderLeadtime(params : any ) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost( 
    'KZ_EPMAPI' , 
    'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
     'OrderLeadtime',
    {
      plant : params.factory_area ,
      line : params.selectline , 
      artno : params.selectartno , 
      productiondate : params.selectproductiondate ,
    }  
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as OrderLeadtime[]; 
    return result;
  }
}
export async function Artno(params : any ) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI' , 
    'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
     'Artno',
    { 
      plant : params.factory_area , 
      line : params.selectline ,  
      orderleadtime: params.selectorderleadtime , 
      productiondate : params.selectproductiondate ,
    } 
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Artno[]; 
    return result;
  }
} 

export async function RTLDetails(params:any) {  
  
  const result: PolicyListRes = {list: []} ; 
  const data: ResultParameter = await scmpost(
   'KZ_EPMAPI' , 
   'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
   'RTLDetails' ,
   {org_id: params.selectorg  , 
    plant : params.factory_area ,
    line : params.selectline , 
    artno : params.selectartno , 
    orderleadtime: params.selectorderleadtime , 
    productiondate : params.selectproductiondate , 
   } 
  ) ;  
  if(!data.IsSuccess){ 
    console.log(data.ErrMsg) ; 
    throw new Error(`${data.ErrMsg}(RTLDetails)`) ; 
  }else{
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as any[] ; 
    }
    return result ; 
  }
}  

export async function Status(params:any) {  
  
  const result: PolicyListRes = {list: []} ; 
  const data: ResultParameter = await scmpost(
   'KZ_EPMAPI' , 
   'KZ_EPMAPI.Controllers.MachineKanBanServer' , 
   'Status' , 
   {org_id: params.selectorg  , 
    plant : params.factory_area ,
    line : params.selectline , 
    artno : params.selectartno , 
    orderleadtime: params.selectorderleadtime , 
    productiondate : params.selectproductiondate , 
   } 
  ) ;  
  if(!data.IsSuccess){ 
    console.log(data.ErrMsg) ; 
    throw new Error(`${data.ErrMsg}(Status)`) ;  
  }else{
    if(data.RetData !== ''){
      result.list = JSON.parse(data.RetData) as any[] ; 
    }
    return result ; 
  }
}  
export async function GetCotCoptrut(params: any) {
  debugger;
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_QCO',
    'KZ_QCO.Controllers.GeneralServer',
    'GetCotCoptrut',
    {
      // org_id: params.selectorg,
      date_begin: params.selectdate[0],
      date_end: params.selectdate[1],
      value : params.cotcoptrtuvalue ,  

    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetCotCoptrut)`);
  } else {
    if (data.RetData !== '') {
      debugger;
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}


 



