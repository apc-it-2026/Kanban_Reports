import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
import DailyProduction from '@/views/report/F_SCM_DailyProduction_Output/locale/en-US';
import F_PERMISSION_MANGE from '@/views/permission/F_PERMISSION_MANGE/locale/en-US';

import localbaoyangdetail from '@/views/device_management/maintenanceDetails/locale/en-US';
import localDeviceMain from '@/views/device_management/Kanban_device_A/locale/en-US';
import localrepairdetail from '@/views/device_management/repairDetails/locale/en-US';
import localeChangeOver from '@/views/QCO Management/ChangeOver/locale/en-US';
import localeReport from '@/views/QCO Management/Report/locale/en-US';
import localeReportDetails from '@/views/QCO Management/ReportDetails/locale/en-US';
import localeTimesDashboard from '@/views/QCO Management/TimesDashboard/locale/en-US';
import localeRTLDashboard from '@/views/RTL Management/RTL_Dashboard/locale/en-US';
import localeE2Ekpi from '@/views/ETEKPI/locale/en-US';
import localePDT from '@/views/Production_Down_Time/locale/en-US' ; 

// import localePoTracker from '@/views/ETEKPI/Tracker/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'APP.Platform.Name': 'APC Production Management Kanban Platform',
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  'menu.manufact_mange': 'Production management',
  'menu.manufact_report': 'Production report',
  'menu.permission_mange': 'Rights Management',
  'menu.manufact_report.F_SCM_DailyProduction_Output':
    'Daily production report',
  'menu.permission_mange.F_PERMISSION_MANGE': 'Menu settings',
  'menu.device_manage': 'Equipment management',
  'menu.device_manage.Kanban_device_A': 'Digital Device Management Dashboard',
  'menu.device_manage.maintenanceDetails': 'Maintenance status details page',
  'menu.device_manage.repairDetails': 'Maintenance Status Details Page',
  'menu.qco.management': 'QCO Management',
  'menu.qco.management.ChangeOver': 'ChangeOver',
  'menu.qco.management.Report': 'Report',
  'menu.qco.management.ReportDetails': 'ReportDetails',
  'menu.qco.management.TimesDashboard': 'Times Dashboard',
  'menu.rtl.management.RTLDashboard': 'RTL DASHBOARD ',
  'menu.rtl.management.Early_warnings': 'Early warnings',
  'menu.rtl.management.status': 'Status',
  'menu.rtl.management': 'RTL Management',
  'menu.pro.Production_Management': 'Production Management',
  'menu.pro.ProcessLineDashboard': 'ProcessLineDashboard',
  'menu.production.Cutting':'Cutting',
  'menu.production.TreatmentOutsourcing':'Treatment Outsourcing',
  'menu.production.Stritching':'Stritching',
  'menu.production.Assembly':'Assembly',
  'menu.production.Packing':'Packing',
  'menu.production':'Production',
  'menu.kpidashboard':'E2E Dashboard',
  // 'menu.e2e.Business':'Business', 
  'menu.e2e.Status':'Material Matching',
  'menu.pro.management.pdt_dashboard' : 'Dashboard' , 
  'menu.pro.management.pdt' : 'Production Down Time' , 
  'menu.e2e.POTracking' :'PO Tracking' , 
  'menu.pro.management.pdt.TOP3DC' : 'TOP 3 DOWN TIME CAUSES' , 
  'menu.KPIDashboard' : 'KPI' , 
  'menu.KPIDashboard.KPIFinal' : 'KPIFinal' ,
  'menu.e2e.Material' : 'Materail' , 
  // 'menu.CuttingManagementReport.LineWise' : 'LineWise' , 
  'menu.CuttingManagementReport' : 'CuttingManagement' , 
  'menu.CuttingManagementReport.PlantWise' : 'Dashboard' , 

  // Edited by Manohar 
  
  'menu.production_management' : 'Prod management' , 
  'menu.production_management.CompareIERateDashboard' : 'CompareIERateDashboard' ,  
  'menu.warehouse_management.WarehouseDashboard' : 'WarehouseDashboard' ,  
  'menu.warehouse_management.FaceStocDashboard' : 'FaceStocDashboard' ,  
  'menu.warehouse_management' : 'warehouse_management' , 
  'menu.CuttingManagementReport.Schedule' : 'Schedule' , 

  // Edited by Premika 
    'menu.production_management.BigArtIERateDashboard' : 'BigArtIERateDashboard' ,
    'menu.production_management.IERateDashboard' : 'IERateDashboard' , 
'menu.production_management.OutputRateDashboard':'OutputRateDashboard',
    'menu.production_management.QCODashboard':'QCODashboard',
    'menu.production_management.QCOIERateDashboard':'QCOIERateDashboard',
    'menu.production_management.rtlDataAnalyze':'rtlDataAnalyze',
   'menu.production_management.SkillCenterDashboard':'SkillCenterDashboard',
    'menu.production_management.SupervisorOutputDashboard':'SupervisorOutputDashboard',
    'menu.production_management.ProcessLineDashboard':'ProcessLineDashboard',
    'menu.production_management.IssueTrackingDashboard':'IssueTrackingDashboard',
    'menu.Producton.FGPacReasonList':'FGPacReasonList',  
     'menu.Producton.FGPending':'FGPending',   
       'menu.Producton.Reports':'Reports',    
    'menu.Producton' : 'Production' ,  
    'menu.CuttingManagementReport.PlanSchedule' : 'Plan Schedule' ,   

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
  ...localeE2Ekpi , 
  ...localePDT , 
  // ...localePoTracker
  
};
