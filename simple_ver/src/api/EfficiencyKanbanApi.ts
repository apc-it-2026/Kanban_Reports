import { mespost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
  errordate: string;
}
export async function GetIERateDoard(param: any) {
  if (param.org_id == null) {
    param.org_id = '';
  }
  if (param.plant_id == null) {
    param.plant_id = '';
  }
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await mespost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.EfficiencyReportServer',
    'GetIERateDoard',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      begin_date: param.startdate,
      end_date: param.enddate,
      process_no: param.process_no,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetIERateDoard)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
export async function GetBigArtIERateDoard(param: any) {
  if (param.org_id == null) {
    param.org_id = '';
  }
  if (param.plant_id == null) {
    param.plant_id = '';
  }
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await mespost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.EfficiencyReportServer',
    'GetBigArtIERateDoard',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      begin_date: param.startdate,
      end_date: param.enddate,
      process_no: param.process_no,
      big_Art: param.big_Art,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetBigERateDoard)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
export async function GetBigArtInfo() {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await mespost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.EfficiencyReportServer',
    'GetBigArtInfo',
    {}
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetBigArtInfo)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
export async function GetBigArtInfobyDate(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await mespost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.EfficiencyReportServer',
    'GetBigArtInfo',
    { begin_date: param.startdate, end_date: param.enddate }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetBigArtInfo)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
export async function GetCompareIERateDoard(param: any) {
  if (param.org_id == null) {
    param.org_id = '';
  }
  if (param.plant_id == null) {
    param.plant_id = '';
  }
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await mespost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.EfficiencyReportServer',
    'GetCompareIERateDoard',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      begin_date: param.startdate,
      end_date: param.enddate,
      process_no: param.process_no,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetCompareIERateDoard)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
