import { scmpost , ResultParameter } from "../scmapi";

export interface PolicyListRes{
    list : any[] ; 
} ; 

export async function GetWarehouseStockBySO(so: any) { 
  debugger ; 
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_CUTMNT',
    'KZ_CUTMNT.Controllers.GeneralServer',
    'GetWarehouseStockBySO',  
    {
     so,
    }
  );
  if (!data.IsSuccess) {
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWarehouseStockBySO)`);
  } else { 
    if (data.RetData !== '') {
      console.log(data.RetData) ; 
      result.list = (data.RetData) as any;  
      console.log(result.list);
    }
    return result;
  }
} 
 


 