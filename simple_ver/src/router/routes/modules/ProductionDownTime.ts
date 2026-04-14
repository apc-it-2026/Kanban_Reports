/* eslint-disable prettier/prettier */
import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const ProductionDownTimeManage: AppRouteRecordRaw = {
  path: '/Production_Down_Time',
  name: 'Production_Down_Time',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.pro.management.pdt', 
    requiresAuth: true,
  },

  children: [
    {
      path: '/PDT_Dashboard',
      name: 'PDT_Dashboard', 
      component: () => import('@/views/Production_Down_Time/index.vue'),
      meta: {
        locale: 'menu.pro.management.pdt_dashboard',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/TOP3DC',
      name: 'TOP3DC', 
      component: () => import('@/views/Production_Down_Time/TOP3Downtime_causes/index.vue'), 
      meta: {
        locale: 'menu.pro.management.pdt.TOP3DC',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ], 
}; 

export default ProductionDownTimeManage; 
