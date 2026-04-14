/* eslint-disable prettier/prettier */
import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const deviceManage: AppRouteRecordRaw = {
  path: '/device_manage',
  name: 'device_manage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.device_manage',
    requiresAuth: true,
    icon: 'icon-tool',
  },
  children: [
    {
      path: 'Kanban_device_A',
      name: 'Kanban_device_A',
      component: () =>
        import('@/views/device_management/Kanban_device_A/index.vue'),
      meta: {
        locale: 'menu.device_manage.Kanban_device_A',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'maintenanceDetails',
      name: 'maintenanceDetails',
      component: () =>
        import('@/views/device_management/maintenanceDetails/index.vue'),
      meta: {
        locale: 'menu.device_manage.maintenanceDetails',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'repairDetails',
      name: 'repairDetails',
      component: () =>
        import('@/views/device_management/repairDetails/index.vue'),
      meta: {
        locale: 'menu.device_manage.repairDetails',
        requiresAuth: true,
      },
    },
  ],
};

export default deviceManage;
