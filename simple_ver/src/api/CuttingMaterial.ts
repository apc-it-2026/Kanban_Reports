import { scmpost , ResultParameter } from "./scmapi";

export interface PolicyListRes{
    list : any[] ; 
} ; 

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
      result.list = JSON.parse(data.RetData) as any[]; 
      console.log(result.list);
    }
    return result;
  }
}
 


