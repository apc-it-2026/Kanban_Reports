import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const permissionMange: AppRouteRecordRaw = {
  path: '/permission_mange',
  name: 'permission_mange',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.permission_mange',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: '/F_PERMISSION_MANGE',
      name: 'F_PERMISSION_MANGE',
      component: () =>
        import('@/views/permission/F_PERMISSION_MANGE/index.vue'),
      meta: {
        locale: 'menu.permission_mange.F_PERMISSION_MANGE',
        requiresAuth: true,
      },
    },
  ],
};

export default permissionMange;
