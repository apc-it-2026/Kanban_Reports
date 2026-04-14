import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';
import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyRecord {
  id: string;
  SUPPLIERS_NAME: string;
  WORKCENTER: string;
  DEPARTMENT_NAME: string;
  INSERT_DATE: string;
  QTY: number;
  SALES_ORDER: string;
  ART_NO: string;
  SIZE1: string;
  ORDER_NO: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: PolicyRecord[];
  total: number;
}
export function queryPolicyList1(params: PolicyParams) {
  console.log('ddd   queryPolicyList1');
  return axios.get<PolicyListRes>('/api/list/policy1', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function queryPolicyList(params: PolicyParams) {
  console.log('ddd   queryPolicyList');
  return axios.get<PolicyListRes>('/api/list/policy', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}
