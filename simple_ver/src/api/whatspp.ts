import { scmpost, ResultParameter } from '@/api/scmapi';
import { policyListRes } from './e2e_biz/order';

export interface PolicyListRes {
  list: any[];
} 

export async function Whtsappp ()  {      

    const result : policyListRes= {list: []} ; 
     try {
      const res: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.Whatsapp', 
        'SendMessagewithoutAwait',
        {} 
      );  
      if (!res.IsSuccess) {
        // 
      } else if (!res.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(res.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
    return result;
  };  
  