/* eslint-disable prettier/prettier */
 import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const E2EManage: AppRouteRecordRaw = {
  path: '/E2EKPI',
  name: 'E2EKPI',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.e2ekpi',
    requiresAuth: true,
  },

  children: [
    
    { 
      path: '/POTracking' ,  
      name:'POTracking' ,  
      component: () => import('@/views/ETEKPI/components/SalesOrderTracking.vue') ,  
      meta: { 
         locale: 'menu.e2e.POTracking' ,  
         requiresAuth: true ,  
         roles: ['*'] ,  
      } ,  
    } , 
     { 
      path: '/Material' ,  
      name:'Material' ,  
      component: () => import('@/views/ETEKPI/components/MaterialCheck.vue') ,  
      meta: { 
         locale: 'menu.e2e.Material' ,  
         requiresAuth: true ,  
         roles: ['*'] ,  
      } ,  
    } 

  ], 
}; 

export default E2EManage;  


