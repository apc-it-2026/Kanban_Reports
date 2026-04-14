import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
}
export interface Organizations {
  code: string;
  name: string;
}
export interface Plants {
  code: string;
  name: string;
}
export interface Line {
  code: string;
  name: string;
}
export interface Productiondates {
  code: string;
  name: string;
}
export interface OrderLeadtime {
  code: string;
  name: string;
}
export interface Artno {
  code: string;
  name: string;
}

export async function Org(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'Org',
    {
      line: params.selectline,
      artno: params.selectartno,
      orderleadtime: params.selectorderleadtime,
      productiondate: params.selectproductiondate,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Organizations[];
    return result;
  }
}

export async function Plants(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'LoadPlant',
    {
      line: params.selectline,
      artno: params.selectartno,
      orderleadtime: params.selectorderleadtime,
      productiondate: params.selectproductiondate,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Plants[];
    return result;
  }
}

export async function Line(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'LoadLine',
    {
      plant: params.factory_area,
      artno: params.selectartno,
      orderleadtime: params.selectorderleadtime,
      productiondate: params.selectproductiondate,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Line[];
    return result;
  }
}

export async function Productiondates(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'Productiondates',
    {
      plant: params.factory_area,
      line: params.selectline,
      artno: params.selectartno,
      orderleadtime: params.selectorderleadtime,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Productiondates[];
    return result;
  }
}
export async function OrderLeadtime(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'OrderLeadtime',
    {
      plant: params.factory_area,
      line: params.selectline,
      artno: params.selectartno,
      productiondate: params.selectproductiondate,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as OrderLeadtime[];
    return result;
  }
}
export async function Artno(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'Artno',
    {
      plant: params.factory_area,
      line: params.selectline,
      orderleadtime: params.selectorderleadtime,
      productiondate: params.selectproductiondate,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as Artno[];
    return result;
  }
}

export async function RTLDetails(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'RTLDetails',
    {
      org_id: params.selectorg,
      plant: params.factory_area,
      line: params.selectline,
      artno: params.selectartno,
      orderleadtime: params.selectorderleadtime,
      productiondate: params.selectproductiondate,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(RTLDetails)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}

export async function Status(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'Status',
    {
      org_id: params.selectorg,
      plant: params.factory_area,
      line: params.selectline,
      artno: params.selectartno,
      orderleadtime: params.selectorderleadtime,
      productiondate: params.selectproductiondate,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(Status)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}

export async function PartsDetails(params: any) {
  debugger;
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'PartsDetails',
    {
      seid: params,
    }
  );
  debugger;
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(PartsDetails)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}
