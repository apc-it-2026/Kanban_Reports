/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { useStorage } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { normalizeStyle } from 'vue';

import defaultSettings from '@/config/settings.json';

export interface postobj {
  DllName: string;
  ClassName: string;
  Method: string;
  IP4: string;
  MAC: string;
  IsRasRequst: boolean;
  IsRasResult: boolean;
  RasResultKey: string;
  UserToken: string;
  Data: any;
}

export interface LoginParameterData {
  CompanyCode: string;
  CompanyName: string;
  UserCode: string;
  UserPassword: string; 
}

export interface ResultParameter {
  IsEnableEncryption: boolean;
  IsSuccess: boolean;
  ErrMsg: string;
  RetData: string;
  RetData1: string;
}

export function scmpost(
  DllName: string,
  ClassName: string,
  Method: string,
  Data: any
): ResultParameter {
  const Parameter: postobj = {
    DllName: '',
    ClassName: '',
    Method: '',
    IP4: '',
    MAC: '',
    IsRasRequst: false,
    IsRasResult: false,
    RasResultKey: '',
    UserToken: localStorage.getItem('token') as string,
    Data: '',
  };
  Parameter.DllName = DllName;
  Parameter.ClassName = ClassName;
  Parameter.Method = Method;
  Parameter.Data = Data;
  const result = axios.post<ResultParameter>(
    defaultSettings.api_url,
    Parameter
  );
  return result as unknown as ResultParameter;
}

export function mespost(
  DllName: string,
  ClassName: string,
  Method: string,
  Data: any
): ResultParameter {
  const Parameter: postobj = {
    DllName: '',
    ClassName: '',
    Method: '',
    IP4: '',
    MAC: '',
    IsRasRequst: false,
    IsRasResult: false,
    RasResultKey: '',
    UserToken: localStorage.getItem('token') as string,
    Data: '',
  };
  Parameter.DllName = DllName;
  Parameter.ClassName = ClassName;
  Parameter.Method = Method;
  Parameter.Data = Data;
  const result = axios.post<ResultParameter>(
    defaultSettings.api_url,
    Parameter
  );
  return result as unknown as ResultParameter;
} 