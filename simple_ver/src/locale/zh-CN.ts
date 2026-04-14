import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import DailyProduction from '@/views/report/F_SCM_DailyProduction_Output/locale/zh-CN';
import F_PERMISSION_MANGE from '@/views/permission/F_PERMISSION_MANGE/locale/zh-CN';

import localbaoyangdetail from '@/views/device_management/maintenanceDetails/locale/zh-CN';
import localDeviceMain from '@/views/device_management/Kanban_device_A/locale/zh-CN';
import localrepairdetail from '@/views/device_management/repairDetails/locale/zh-CN';
import localeChangeOver from '@/views/QCO Management/ChangeOver/locale/zh-CN';
import localeReport from '@/views/QCO Management/Report/locale/zh-CN';
import localeReportDetails from '@/views/QCO Management/ReportDetails/locale/zh-CN';
import localeTimesDashboard from '@/views/QCO Management/TimesDashboard/locale/zh-CN';
import localeRTLDashboard from '@/views/RTL Management/RTL_Dashboard/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'APP.Platform.Name': '万邦生产管理看板平台',
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'menu.list.searchTable': '查询表格',
  'menu.manufact_mange': '生产管理',
  'menu.manufact_report': '生产报表',
  'menu.permission_mange': '权限管理',
  'menu.manufact_report.F_SCM_DailyProduction_Output': '每日生产报表',
  'menu.permission_mange.F_PERMISSION_MANGE': '菜单设置',
  'menu.device_manage': '设备管理',
  'menu.device_manage.Kanban_device_A': '数位化设备管理看板',
  'menu.device_manage.maintenanceDetails': '保养状况详情页',
  'menu.device_manage.repairDetails': '维修状况详情页',
  'menu.qco.management': '质量控制管理',
  'menu.qco.management.ChangeOver': '转换',
  'menu.qco.management.Report': '报告',
  'menu.qco.management.TimesDashboard': '时代仪表板',
  'menu.rtl.management.plssb': '加工线配套状态牌',
  'menu.rtl.management.Early_warnings': '早期预警',
  'menu.rtl.management.status': '地位',
  'menu.rtl.management': '劳教管理',
  'menu.rtl.management.RTLDashboard': 'RTL 仪表板 ',
  'menu.pro.Production Management': 'Production Management',

  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...DailyProduction,
  ...F_PERMISSION_MANGE,
  ...localbaoyangdetail,
  ...localDeviceMain,
  ...localrepairdetail,
  ...localeChangeOver,
  ...localeReport,
  ...localeReportDetails,
  ...localeTimesDashboard,
  ...localeRTLDashboard, 
};

