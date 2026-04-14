/* eslint-disable prettier/prettier */
 import { AppRouteRecordRaw } from '../types' ; 
import { DEFAULT_LAYOUT } from '../base' ; 

const CuttingManage: AppRouteRecordRaw = {
  path: '/CuttingManagementReport' , 
  name: 'CuttingManagementReport'  , 
  component: DEFAULT_LAYOUT , 
  meta: {
    locale: 'menu.CuttingManagementReport' , 
    requiresAuth: true , 
  },

  children: [
     { 
      path: '/PlantWise' ,  
      name:'PlantWise' ,  
      component: () => import('@/views/CuttingManagement/PlantWise/index.vue') ,  
      meta: { 
         locale: 'menu.CuttingManagementReport.PlantWise' ,  
         requiresAuth: true ,  
         roles: ['*'] ,  
      } ,  
    }  , 
      { 
      path: '/Schedule' ,  
      name:'Schedule' ,  
      component: () => import('@/views/CuttingManagement/Schedule/index.vue') ,  
      meta: { 
         locale: 'menu.CuttingManagementReport.Schedule' ,  
         requiresAuth: true ,  
         roles: ['*'] ,  
      } ,  
    }  , 
    { 
      path: '/PlanSchedule' ,  
      name:'PlanSchedule' ,  
      component: () => import('@/views/CuttingManagement/PlanSchedule/index.vue') ,  
      meta: { 
         locale: 'menu.CuttingManagementReport.PlanSchedule' ,  
         requiresAuth: true ,  
         roles: ['*'] ,  
      } ,  
    }  ,   
  ], 
}; 

export default CuttingManage;  


