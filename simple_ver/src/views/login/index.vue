<template>
  <div class="container">
    <a-card class="login-form2"> 
      <a-row>
        <a-col :span="12" :xs="24" :sm="24" :md="12">
          <div class="login-form-wrapper">
            <div class="login-form-title">{{ $t('login.form.title') }}</div>
            <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
            <div class="login-form-error-msg">{{ errorMessage }}</div>
            <a-spin
              :loading="loading"
              tip="登陆中...(Logging in...)"
              style="width: 100%; height: 100%"
            >
              <a-form
                ref="loginForm"
                :model="userInfo"
                class="login-form"
                layout="vertical"
                @submit="handleSubmit"
              >
                <a-form-item
                  field="username"
                  :rules="[
                    {
                      required: true,
                      message: $t('login.form.userName.errMsg'), 
                    },
                  ]"
                  :validate-trigger="['change', 'blur']"
                  hide-label
                >
                  <a-input
                    v-model="userInfo.username"
                    :placeholder="$t('login.form.userName.placeholder')"
                  >
                    <template #prefix>
                      <icon-user />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  field="password"
                  :rules="[
                    {
                      required: true,
                      message: $t('login.form.password.errMsg'),
                    },
                  ]"
                  :validate-trigger="['change', 'blur']"
                  hide-label
                >
                  <a-input-password
                    v-model="userInfo.password"
                    :placeholder="$t('login.form.password.placeholder')"
                    allow-clear
                  >
                    <template #prefix>
                      <icon-lock />
                    </template>
                  </a-input-password>
                </a-form-item>
                <a-space :size="16" direction="vertical">
                  <div class="login-form-password-actions">
                    <a-checkbox
                      checked="rememberPassword"
                      :model-value="loginConfig.rememberPassword"
                      @change="setRememberPassword as any"
                    >
                      {{ $t('login.form.rememberPassword') }}
                    </a-checkbox>
                  </div>
                  <a-button
                    type="outline"
                    html-type="submit"
                    long
                    :loading="loading"
                    class="login-button"
                  >
                    {{ $t('login.form.login') }}
                  </a-button>
                </a-space>
              </a-form>
            </a-spin>
          </div>
        </a-col>
        <a-col :span="12" :xs="24" :sm="24" :md="12"> 
          <img :src="endtoendimg" style="width: 400px; border-radius: 5px" />  
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';
  import { Base64 } from 'js-base64';
  import endtoendimg from './components/login.jpg';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: '', // 演示默认值
    password: '', // demo default value
  });

  const userInfo = reactive({
    username: loginConfig.value.username,
    password: Base64.decode(loginConfig.value.password),
  });
  debugger;
  const handleSubmit = async ({ 
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        debugger;
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;

        console.log(router.currentRoute.value.query);
        console.log(redirect);
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        const base64password = Base64.encode(password);
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? base64password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };  

  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
  
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      // color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      color: rgb(255, 0, 98);
    }

    &-sub-title {
      // color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
      color: rgb(60, 17, 216);
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
  .login-button {
    background: #ff4742;
    border: 1px solid #ff4742;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: nunito, roboto, proxima-nova, 'proxima nova', sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 16px;
    min-height: 40px;
    outline: 0;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    width: 150px;
    border: 2px solid yellowgreen;
  }
  .container {
    display: flex;
    height: 100vh;
    // background-image: linear-gradient(
    //   to right,
    //   rgb(44, 131, 230),
    //   rgb(39, 31, 39)
    // );
     background-image: url('../ETEKPI/images/download.jpeg');
    background-size: cover;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }

  .login-form2 {
    background-color: #efe2ba;
    border-radius: 5px;
    border: 2px solid #efe2ba;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    transition: 2px slid black;
  } 
  
</style>
