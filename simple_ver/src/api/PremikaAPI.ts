import { scmpost,ResultParameter } from "./scmapi";

export interface PolicyListRes {
    list: any[];
  }
  
  export async function GetStatCardsData() {
    const result: PolicyListRes = { list: [] };
    const data: ResultParameter = await scmpost(
      'KZ_EDMAPI',
      'KZ_EDMAPI.Controllers.ManualController',
      'GetStatCardsData',
      {}
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