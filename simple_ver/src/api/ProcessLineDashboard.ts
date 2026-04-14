import { scmpost, ResultParameter } from '@/api/scmapi';

export interface ResponseResult {
  status: boolean;
  data: any;
  msg: string;
}

// 查询获取服务器系统时间
export async function GetServerTime() { 
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_EAPAPI',
    'KZ_EAPAPI.Controllers.MachineLinkCollectServer',
    'GetNowTime',
    {}
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = data.RetData;
  }
  return result;
}


// 查询登录用户生产部门
export async function LoadDepartment() { 
  debugger ; 
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.F_Manual_WareHousingServer',
    'LoadDepartment', 
    {} 
  );
  result.status = data.IsSuccess;  
  if (!data.IsSuccess) {   
    result.msg = data.ErrMsg;  
    // eslint-disable-next-line no-console   
    console.log(data.ErrMsg);  
  } else {  
    result.data = data.RetData;   
  }  
  return result;  
}  

// 查询生产组别
export async function LoadDeptGroup() { 
  debugger ; 
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'LoadDeptGroup',
    {}
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询生产线基本信息
export async function getProductionLineInfo(param: any) { 
  debugger ; 
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getProductionLineInfo',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询领导信息
export async function getEmployeeLeader(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getEmployeeLeader',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询生产信息-每小时生产达成率
export async function getHourProductionInfo(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getProductionInfo',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询日、月IE达成率信息
export async function getCompletionRate(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getCompletionRate',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询日、月PPH信息
export async function getPPH(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getPPH',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询组别人员信息
export async function getGroupMembers(param: any) {
  debugger ; 
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getGroupMembers',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询设备管理信息
export async function getEquipmentManagement(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getEquipmentManagement',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询问题追踪信息
export async function getProblemTracking(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getProblemTracking',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询鞋子产量信息
export async function getShoesModelYield(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getShoesModelYield',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询品质管理信息
export async function getQualityManagement(param: any) {   
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.WorkCenterDashboardServer',
    'getQualityManagement',
    {
      department_code: param.departmentCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}
