// import axios from 'axios';
import { scmpost, ResultParameter } from '@/api/scmapi';
import { Md5 } from 'ts-md5';
// import { UserState } from '@/store/modules/user/types';
import { successResponseWrap } from '@/utils/setup-mock';
// import { RouteRecordNormalized } from 'vue-router';
// import { AnyObject } from '@/types/global';
import defaultSettings from '@/config/settings.json';
import { stringify } from 'query-string';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export function login(data: LoginData): ResultParameter {
  let password: string = Md5.hashAsciiStr(data.password.toLocaleLowerCase());
  password = password.toUpperCase();
  return scmpost('SJ_SYSAPI', 'SJ_SYSAPI.User', 'Login', { 
    CompanyCode: defaultSettings.CompanyCode,
    CompanyName: defaultSettings.CompanyName,
    UserCode: data.username,
    UserPassword: password,
  }) as unknown as ResultParameter;
}

export function logout() {
  return {
    data: null,
    status: 'ok',
    msg: '请求成功',
    code: 200,
  };
}

export function getUserInfo() {
  return successResponseWrap({
    name: '',
    role: '',
    code: '',
    qq: '',
    department: '',
  });
}

export async function getMenuList(): Promise<any> {
  return scmpost(
    'KZ_REP',
    'KZ_REP.Controllers.GeneralServer', 
    'GetUserMenu3',
    {}
  ) as unknown as ResultParameter;
}

export async function getMenuListByRole(
  role: string
): Promise<ResultParameter> {
  return scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.KANBAN_COMMAND_SERVER',
    'GetUserMenuByRole',
    { scm_rule: role }
  ) as unknown as ResultParameter;
}

export async function SaveMenuListByRole(
  role: string,
  reslist: any[]
): Promise<ResultParameter> {
  const menu: any[] = [];
  reslist.forEach((item: any) => {
    if (item.enable === 'true') {
      menu.push({
        SCM_RULE: role,
        ISENABLE: 'Y',
        NAME: item.name,
        PATH: item.path,
        FATHER: '',
        MENUORDER: item.meta.order === undefined ? 0 : item.meta.order,
        ICON: item.meta.icon === undefined ? '' : item.meta.icon,
        REQUIRESAUTH: stringify(item.meta.requiresAuth),
        LOCALE: item.meta.locale,
      });
    }
    if (item.children !== undefined) {
      item.children.forEach((listItem: any) => {
        if (listItem.enable === 'true') {
          menu.push({
            SCM_RULE: role,
            ISENABLE: 'Y',
            NAME: listItem.name,
            PATH: listItem.path,
            FATHER: item.name,
            MENUORDER:
              listItem.meta.order === undefined ? 0 : listItem.meta.order,
            ICON: listItem.meta.icon === undefined ? '' : listItem.meta.icon,
            REQUIRESAUTH: stringify(listItem.meta.requiresAuth),
            LOCALE: listItem.meta.locale,
          });
        }
      });
    }
  });

  return scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.KANBAN_COMMAND_SERVER',
    'SaveMenuListByRole',
    { scm_rule: role, list: menu }
  ) as unknown as ResultParameter;
}
