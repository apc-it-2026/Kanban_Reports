import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const manufactReport: AppRouteRecordRaw = {
  path: '/manufact_report',
  name: 'manufact_report',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.manufact_report',
    requiresAuth: true,
  },
  children: [
    {
      path: 'search-table1',
      name: 'SearchTable1',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'search-table2',
      name: 'F_SCM_FulfillmentRate_report',
      component: () =>
        import('@/views/report/F_SCM_FulfillmentRate_report/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'search-table3',
      name: 'F_SCM_DailyProduction_Output',
      component: () =>
        import('@/views/report/F_SCM_DailyProduction_Output/index.vue'),
      meta: {
        locale: 'menu.manufact_report.F_SCM_DailyProduction_Output',
        requiresAuth: true,
      },
    },
  ],
};

export default manufactReport;
