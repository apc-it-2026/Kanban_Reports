import { scmpost , ResultParameter } from "@/api/scmapi"; 


export interface PolicyListRes {
    list: any[];
  } 

  export async function PlantWiseCSLAOutput(params:any) {   
    const result: PolicyListRes = { list: [] }; 
    const data: ResultParameter = await scmpost(
      'KZ_E2EAPI',
      'KZ_E2EAPI.Controllers.Production',
      'PlantWise_C_S_L_A_Output',  
      {
        crd:params.crd ,  
        PoNo:params.funpo,
        Model:params.funarticle  

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

  export async function ProductionTableData(params : any ) {      
     const result: PolicyListRes = { list: [] };
     const data: ResultParameter = await scmpost(
       'KZ_E2EAPI',
       'KZ_E2EAPI.Controllers.Production',
       'GetProductionTableData',
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
   export async function ProductionChartData(params:any) { 
    const result: PolicyListRes = { list: [] };
    try {

      const data: ResultParameter = await scmpost(
        'KZ_E2EAPI',
        'KZ_E2EAPI.Controllers.Production',
        'ProductionChartData',
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

