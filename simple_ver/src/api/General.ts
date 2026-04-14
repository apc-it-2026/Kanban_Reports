/* eslint-disable prettier/prettier */
import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
  errordate: string;
}




export async function GetNowTime() {
   const result: PolicyListRes = { list: [], errordate: '' };
   const data: ResultParameter = await scmpost(
   'KZ_EAPAPI',
    'KZ_EAPAPI.Controllers.MachineLinkCollectServer',
    'GetNowTime',
    {}
   );
   if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
  console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}()`);
   } else {
    if (data.RetData !== '') {
    result.list = data.RetData as any;
    }
    return result;
   }
}

