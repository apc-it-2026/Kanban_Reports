/* eslint-disable prettier/prettier */
import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const Production: AppRouteRecordRaw = {
  path: '/Producton',
  name: 'Production',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.Producton',
    requiresAuth: true,
  }, 

  children: [    

    {  
      path: '/FGPacReasonList', 
      name: 'FGPacReasonList', 
      component: () => import('@/views/production/FGPacReasonList/index.vue'),  
      meta: { 
        locale: 'menu.Producton.FGPacReasonList', 
        requiresAuth: true, 
        roles: ['*'], 
      }, 
    },   

    {
      path: '/FGPending',
      name: 'FGPending',
      component: () => import('@/views/production/FGPending/index.vue'), 
      meta: {
        locale: 'menu.Producton.FGPending',
        requiresAuth: true,
        roles: ['*'],
      },
    },  

      {
      path: '/Reports',
      name: 'Reports',
      component: () => import('@/views/production/Reports/index.vue'),  
      meta: {
        locale: 'menu.Producton.Reports',
        requiresAuth: true,
        roles: ['*'],
      },
    },  

  ],
};

export default Production; 


