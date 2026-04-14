import { scmpost, ResultParameter } from '@/api/scmapi';
import { Model } from 'echarts';

export interface PolicyListRes {
  list: any[];
}

export async function GetCompanies(): Promise<PolicyListRes> {
 
  const result: PolicyListRes = { list: [] };
  try {
    const data: ResultParameter = await scmpost(
      'KZ_QCO',
      'KZ_QCO.Controllers.SuspendedWorkingHoursServer',
      'GetCompaniesData',
      {}
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
export async function GetPlantsData(org:string): Promise<PolicyListRes> {
   
    const result: PolicyListRes = { list: [] };
    try {
      const data: ResultParameter = await scmpost(
        'KZ_QCO',
        'KZ_QCO.Controllers.SuspendedWorkingHoursServer',
        'GetPlantsData',
        {
          company:org
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


  

export async function ProdDowntimeDetailView(params : any ) {      

     const result: PolicyListRes = { list: [] };
     const data: ResultParameter = await scmpost(
       'KZ_QCO',
       'KZ_QCO.Controllers.SuspendedWorkingHoursServer',
       'GetProdDowntimeDetailView',
       {
         FormDate:params.From_Date,
         ToDate:params.To_Date,
         Company:params.Company,
         Plant:params.Plant,
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


   export async function ProdDownTimePercentage(params: any) {      

     const result: PolicyListRes = { list: [] };
     const data: ResultParameter = await scmpost(
       'KZ_QCO',
       'KZ_QCO.Controllers.SuspendedWorkingHoursServer',
       'ProdDownTimePercentageChartData',
       {
         FormDate:params.fromDate,
         ToDate:params.toDate,
         Company:params.selectedCompany,
         Plant:params.selectedPlant
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

   export async function ProdDowntimePercentBarChart(params: any) {      
 debugger;
     const result: PolicyListRes = { list: [] };
     const data: ResultParameter = await scmpost(
       'KZ_QCO',
       'KZ_QCO.Controllers.SuspendedWorkingHoursServer',
       'GetProdDowntimePercentBarChart',
       {
         FormDate:params.fromDate,
         ToDate:params.toDate,
         Company:params.selectedCompany,
         Plant:params.selectedPlant
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


   export async function DTTopthreeChartData(params: any) {      
debugger;
    const result: PolicyListRes = { list: [] };
    const data: ResultParameter = await scmpost(
      'KZ_QCO',
      'KZ_QCO.Controllers.SuspendedWorkingHoursServer', 
      'DTTopthreeChartData',
      {
        FormDate:params.fromDate,
        ToDate:params.toDate,
        Company:params.selectedCompany,
        Plant:params.selectedPlant
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

  export async function DTTopthreeBarChart(params: any) {      
debugger;
    const result: PolicyListRes = { list: [] };
    const data: ResultParameter = await scmpost(
      'KZ_QCO',
      'KZ_QCO.Controllers.SuspendedWorkingHoursServer',
      'DTTopthreeBarChart',
      {
        FormDate:params.fromDate,
        ToDate:params.toDate,
        Company:params.selectedCompany,
        Plant:params.selectedPlant
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

  export async function DTreasonsDetails(params: any) { 
    debugger ; 
    const result: PolicyListRes = { list: [] };
    const data: ResultParameter = await scmpost(
      'KZ_QCO',
      'KZ_QCO.Controllers.SuspendedWorkingHoursServer',
      'DTreasonsDetails',
      {
        org_id: params.selectedCompany,
        date_begin: params.fromDate,
        date_end: params.toDate,
        plant: params.selectedPlant,
        reasontype: params.pievalue,
      }
    );
    if (!data.IsSuccess) {
      console.log(data.ErrMsg);
      throw new Error(`${data.ErrMsg}(DTreasonsDetails)`);
    } else {
      if (data.RetData !== '') {
        result.list = JSON.parse(data.RetData) as any[];
      }
      return result;
    }
  }