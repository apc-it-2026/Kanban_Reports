import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
}

export async function FgInboundTableData(params : any ) {      
     const result: PolicyListRes = { list: [] };
     const data: ResultParameter = await scmpost(
       'KZ_E2EAPI',
       'KZ_E2EAPI.Controllers.FgController',
       'GetFgInboundTableData',
       {
        FormDate:params.From_Date,
        ToDate:params.To_Date,
        Company:params.Company,
        Plant:params.Plant,
        PoNo:params.po_no,
        Model:params.model
   
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


export async function PoCompetionTableData(params : any ) {      
     const result: PolicyListRes = { list: [] };
     const data: ResultParameter = await scmpost(
       'KZ_E2EAPI',
       'KZ_E2EAPI.Controllers.FgController',
       'GetPoCompetionTableData',
       {
         FormDate:params.From_Date,
         ToDate:params.To_Date,
         Company:params.Company,
         Plant:params.Plant,
         PoNo:params.po_no,
         Model:params.model
   
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

   export async function GetFGChartDataMethod(params:any) {
    const result: PolicyListRes = { list: [] };
    try {
  
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.FgController',
        'GetFGInboundChartData',
        { 
            crd:params.crd ,  
            PoNo:params.funpo,
            Model:params.funarticle   
  
        }
      );
      console.log('API response:', data);
  
      // Check for success and handle errors
      if (!data.IsSuccess) {
        throw new Error(data.ErrMsg);  
      } else if (!data.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(data.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
  
    // Return the populated resultGetDashboardTableData
    return result;
  }

  
export async function PoCompletionPercentage(params:any) {  
    const result: PolicyListRes = { list: [] };
    try {
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.FgController',
        'PO_Completion_Percentage',
        {
          crd:params.crd ,    
        }
      );
      console.log('API response:', data);
      if (!data.IsSuccess) {
        throw new Error(data.ErrMsg);  
      } else if (!data.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(data.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
    return result;
  }    

  export async function GetMonthlySalesData(params:any) {  
    const result: PolicyListRes = { list: [] };
    try { 
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.FgController',
        'GetMonthlySalesData', 
        {
          crd:params.crd ,  
            PoNo:params.funpo,
            Model:params.funarticle   
        }
      );
      console.log('API response:', data);
  
      // Check for success and handle errors
      if (!data.IsSuccess) {
        throw new Error(data.ErrMsg);  
      } else if (!data.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(data.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
  
    // Return the populated resultGetDashboardTableData
    return result;
  } 

  export async function GetWarehouseWeeks(params:any) {  
    const result: PolicyListRes = { list: [] };
    try { 
      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.FgController',
        'GetWarehouseWeeks',  
        {
          crd:params.crd , 
        }
      );
      console.log('API response:', data);
  
       if (!data.IsSuccess) {
        throw new Error(data.ErrMsg);  
      } else if (!data.RetData) {
        throw new Error('RetData is null or undefined.'); 
      }
      result.list = JSON.parse(data.RetData) as any[];
    } catch (error) {
      console.error('Error occurred while fetching stat cards:', error);
      throw error; 
    }
  
     return result;
  } 



  