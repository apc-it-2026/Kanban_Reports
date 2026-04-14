/* eslint-disable camelcase */
// eslint-disable @typescript-eslint/camelcase
import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';
// eslint-disable-next-line import/no-cycle, import/namespace

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

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/list/policy1', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export async function DeliyProductionQuery(params: PolicyParams, model: any) {
  const result: PolicyListRes = { list: [], total: 0 };
  const data: ResultParameter = await scmpost(
    'KZ_SCMAPI',
    'KZ_SCMAPI.Controllers.F_SCM_ProductionProgress_reportServer',
    'DeliyProductionQuery',
    {
      Art_No: model.art,
      Sales_Order: model.se_id,
      Order_No: model.order_no,
      Scan_Date: model.createdTime[0],
      Scan_Date2: model.createdTime[1],
      Org_id: model.company,
    }
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as PolicyRecord[];
    result.total = result.list.length;
    return result;
  }
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
