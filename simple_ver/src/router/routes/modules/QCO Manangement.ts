/* eslint-disable prettier/prettier */
import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const QCOManage: AppRouteRecordRaw = {
  path: '/qco_management',
  name: 'QCO Management',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.qco.management',
    requiresAuth: true,
  },

  children: [
    {
      path: 'ChangeOver',
      name: 'ChangeOver',
      component: () => import('@/views/QCO Management/ChangeOver/index.vue'),
      meta: {
        locale: 'menu.qco.management.ChangeOver',
        requiresAuth: true,
        roles: ['*'],
      },
    },

    {
      path: 'Report',
      name: 'Report',
      component: () => import('@/views/QCO Management/Report/index.vue'),
      meta: {
        locale: 'menu.qco.management.Report',
        requiresAuth: true,
        roles: ['*'],
      },
    },

    {
      path: '/ReportDetails',
      name: 'ReportDetails',
      component: () => import('@/views/QCO Management/ReportDetails/index.vue'),
      meta: {
        locale: 'menu.qco.management.ReportDetails',
        requiresAuth: true,
        roles: ['*'],
      },
    },

    {
      path: '/timesdashboard',
      name: 'Times Dashboard',
      component: () =>
        import('@/views/QCO Management/TimesDashboard/index.vue'),
      meta: {
        locale: 'menu.qco.management.TimesDashboard',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default QCOManage;
