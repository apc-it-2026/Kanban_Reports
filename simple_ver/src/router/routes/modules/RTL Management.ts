import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const RTLManage: AppRouteRecordRaw = {
  path: '/rtl_management',
  name: 'RTL Management',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.rtl.management',
    requiresAuth: true,
  },

  children: [
    {
      path: 'RTLDashboard',
      name: 'RTLDashboard',
      component: () => import('@/views/RTL Management/RTL_Dashboard/index.vue'),
      meta: {
        locale: 'menu.rtl.management.RTLDashboard',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default RTLManage; 
