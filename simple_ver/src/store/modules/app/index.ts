import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import type { RouteRecordNormalized } from 'vue-router';
import defaultSettings from '@/config/settings.json';
import { getMenuList } from '@/api/user';
import { ResultParameter } from '@/api/scmapi';
import { AppState } from './types';

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null;
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: 'loading',
          closable: true,
        });
        const fathermap: Map<string, number> = new Map<string, number>();
        const res: ResultParameter = await getMenuList();
        if (res.IsSuccess) {
          const menuList: any[] = JSON.parse(res.RetData);
          const data: any[] = [];
          menuList.forEach((item: any, index) => {
            if (item.FATHER === '' || item.FATHER === null) {
              fathermap.set(item.NAME, index);
              data.push({
                path: item.PATH,
                name: item.NAME,
                meta: {
                  locale: item.LOCALE,
                  requiresAuth: item.REQUIRESAUTH, // 是否需要登录
                  icon: item.ICON,
                  order: item.MENUORDER,
                },
                children: [],
              });
            } else {
              const fatherNameas: any = item.FATHER as unknown as string;
              const indexFather: number = fathermap.get(fatherNameas) as number;
              if (indexFather !== undefined) {
                const father = data[indexFather];
                father.children.push({
                  path: item.PATH,
                  name: item.NAME,
                  meta: {
                    locale: item.LOCALE,
                    requiresAuth: item.REQUIRESAUTH, // 是否需要登录
                    icon: item.ICON,
                    order: item.MENUORDER,
                  },
                });
              }
            }
          });
          this.serverMenu = data;
        } else {
          notifyInstance = Notification.error({
            id: 'menuNotice',
            content: 'error',
            closable: true,
          });
        }

        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: 'success',
          closable: true,
        });
      } catch (error) {
        // notifyInstance = Notification.error({
        //   id: 'menuNotice',
        //   content: 'error',
        //   closable: true,
        // });
        //
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
