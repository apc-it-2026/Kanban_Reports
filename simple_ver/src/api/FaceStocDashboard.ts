import { scmpost, ResultParameter } from '@/api/scmapi';
import { isNullOrEmptyStr } from '@/utils/is';

export interface ResponseResult {
  status: boolean;
  data: any;
  msg: string;
}

// 查询工厂
export async function LoadOrgId() {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.WMS_CommonAPI_Server',
    'LoadOrgId',
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

// 第一页-查询日计划产量、可配套数、总RTL等数据
export async function GetRtl(orgId: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetRtl',
    {
      org_id: orgId,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第一页-查询面底配套率
export async function GetShoeupperRoleMatchRate(orgId: string, day: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetShoeupperRoleMatchRate',
    {
      org_id: orgId,
      work_day: day
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第一页-查询面底库存
export async function GetShoeupperRoleStoc(orgId: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetShoeupperRoleStoc',
    {
      org_id: orgId,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第一页-查询厂区配套信息
export async function GetFactoryAreaInfo(orgId: string, day: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetFactoryAreaInfo',
    {
      org_id: orgId,
      work_day: day
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第一页-查询某个厂区配套信息
export async function GetFactoryAreaDetail(orgId: string, areaCode: string, day: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetFactoryAreaDetail',
    {
      org_id: orgId,
      area_code: areaCode,
      work_day: day
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第二页-查询3003仓面底当日入库数
export async function GetShoeupperRoleInStoc(orgId: string, date: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetShoeupperRoleInStoc',
    {
      org_id: orgId,
      date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第二页-查询3003仓厂商面底当日入库数
export async function GetFactoryShoeupperRoleInStoc(orgId: string, date: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetFactoryShoeupperRoleInStoc',
    {
      org_id: orgId,
      date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第二页-查询当日鞋面总排单、已发料及未发料等数据
export async function GetShoeupperRoleTotalOrder(orgId: string, date: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetShoeupperRoleTotalOrder',
    {
      org_id: orgId,
      date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第二页-查询3003仓当日配套排单明细
export async function GetShoeupperRoleOrderDetail(orgId: string, date: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetShoeupperRoleOrderDetail',
    {
      org_id: orgId,
      date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第二页-查询鞋型1014仓面底库存明细
export async function GetFaceBottomStocDetail(orgId: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetFaceBottomStocDetail',
    {
      org_id: orgId
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第二页-查询鞋型3003仓面底库存明细
export async function GetShoeupperRoleStocDetail(orgId: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.KBN_WMS_ShoeupperRoleStocServer',
    'GetShoeupperRoleStocDetail',
    {
      org_id: orgId
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第三页-查询加工线列表
export async function GetMatchDeptList(orgId: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.RPT_WMS_MES_RelatedServer',
    'GetMatchDeptList',
    {
      org_id: orgId,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 第三页-查询加工组的状态
export async function GetDeptStatus(deptCode: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.RPT_WMS_MES_RelatedServer',
    'GetMatchStocStatusByDept',
    {
      dept_no: deptCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
