import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
}
export interface ChangeOverRate {
  CO_STATUS_NAME: string;
  NAME: string;
  VALUE: number;
  RATE: number;
}
export interface ReasonRate {
  VALUE: string;
  NAME: string;
  REMARKS: string;
}
export interface costatusdata {
  code: string;
  name: string;
}
export interface GetModeldata {
  A_MODEL: string;
  B_MODEL: string;
} 

export async function ChangeOverRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'ChangeOverRate',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      plant: param.factory_area,
      amodel: param.Amodel,
      bmodel: param.Bmodel,
      type: param.type,
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

export async function ReasonRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'ReasonRate',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      plant: param.factory_area,
      amodel: param.Amodel,
      bmodel: param.Bmodel,
      type: param.type,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(ReasonRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as ReasonRate[];
    }
    return result;
  }
}

export async function QcoDetails(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'QcoDetails',
    {
      org_id: params.selectorg,
      date_begin: params.selectdate[0],
      date_end: params.selectdate[1],
      udf05: params.factory_area,
      amodel: params.Amodel,
      bmodel: params.Bmodel,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(QcoDetails)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}

export async function ChangeoverDetails(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'ChangeoverDetails',
    {
      org_id: params.selectorg,
      date_begin: params.selectdate[0],
      date_end: params.selectdate[1],
      plant: params.factory_area,
      status: params.status,
      amodel: params.Amodel,
      bmodel: params.Bmodel,
      type: params.type,
      reasontype: params.reason,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(ChangeoverDetails)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any[];
    }
    return result;
  }
}
export async function Getcostatus() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
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
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
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

export async function GetCotCoptTotal(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetCotCoptTotal',
    {
      org_id: params.selectorg,
      plant: params.factory_area,
      begin_date: params.selectdate[0],
      end_date: params.selectdate[1],
      amodel: params.Amodel,
      bmodel: params.Bmodel,
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
export async function GetTotalChangeover(params: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetTotalChangeover',
    {
      org_id: params.selectorg,
      date_begin: params.selectdate[0],
      date_end: params.selectdate[1],
      plant: params.factory_area,
      amodel: params.Amodel,
      bmodel: params.Bmodel,
      type: params.type,
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
