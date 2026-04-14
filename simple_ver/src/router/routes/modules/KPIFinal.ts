 import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const KPIManage: AppRouteRecordRaw = {
  path: '/KPIDashboard' , 
  name: 'KPIDashboard', 
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.KPIDashboard', 
    requiresAuth: true,
  },

  children: [
    
    { 
      path: '/KPIFinal' ,  
      name:'KPIFinal' ,   
      component: () => import('@/views/KPI_REPORTS/index.vue') ,   
      meta: { 
         locale: 'menu.KPIDashboard.KPIFinal' ,   
         requiresAuth: true ,  
         roles: ['*'] ,  
      } ,  
    } 

  ], 
}; 

export default KPIManage;  