<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.F_PERMISSION_MANGE']" />
    <a-card class="general-card" :title="$t('menu.list.F_PERMISSION_MANGE')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="number"
                  :label="$t('F_PERMISSION_MANGE.form.role')"
                >
                  <a-input
                    v-model="formModel.scm_rule"
                    :placeholder="
                      $t('F_PERMISSION_MANGE.form.role.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="name"
                  :label="$t('F_PERMISSION_MANGE.form.nowRole')"
                >
                  <p>{{ nowRule }}</p>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="getMenuStatu">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('F_PERMISSION_MANGE.form.search') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-card :bordered="false" :style="{ width: '100%' }">
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('F_PERMISSION_MANGE.form.reset') }}
        </a-button>
        <a-button @click="save">
          <template #icon>
            <icon-save />
          </template>
          {{ $t('F_PERMISSION_MANGE.form.save') }}
        </a-button>
        <a-card
          v-for="(item, index) in menuList"
          :key="index"
          :hoverable="index % 2 === 0"
          :style="{ width: '100%' }"
        >
          <a-card
            class="card-demo"
            :title="$t(item.meta.locale)"
            :bordered="false"
          >
            <template #extra>
              <a-space direction="vertical" size="large">
                <a-switch
                  v-model="item.enable"
                  checked-value="true"
                  unchecked-value="false"
                />
              </a-space>
            </template>
            <a-card-grid
              v-for="(children, index) in item.children"
              :key="index"
              :hoverable="index % 2 === 0"
              :style="{ width: '25%' }"
            >
              <a-card
                class="card-demo"
                :title="$t(children.meta.locale)"
                :bordered="false"
              >
                <template #extra>
                  <a-switch
                    v-model="children.enable"
                    checked-value="true"
                    unchecked-value="false"
                  />
                </template>
              </a-card>
            </a-card-grid>
          </a-card>
        </a-card>
      </a-card>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';

  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getMenuListByRole, SaveMenuListByRole } from '@/api/user';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { appRoutes } from '@/router/routes';
  import { Message } from '@arco-design/web-vue';

  const nowRule = ref<string>('');
  const menuListNow: any[] = appRoutes;
  const menuList = ref<any>([]);
  const generateFormModel = () => {
    return {
      scm_rule: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const formModel = ref(generateFormModel());

  const getMenuStatu = async () => {
    setLoading(true);
    try {
      if (
        formModel.value.scm_rule === '' ||
        formModel.value.scm_rule === null
      ) {
        return;
      }
      const data: any = await getMenuListByRole(formModel.value.scm_rule);
      const retlist: any[] = JSON.parse(data.RetData);
      const list: any[] = [];

      retlist.forEach((item: any) => {
        list.push(item.NAME);
      });
      menuListNow.forEach((item: any) => {
        if (list.includes(item.name)) {
          item.enable = 'true';
          if (item.children !== undefined) {
            item.children.forEach((listItem: any) => {
              if (list.includes(listItem.name)) {
                listItem.enable = 'true';
              } else {
                listItem.enable = 'false';
              }
            });
          }
        } else {
          item.enable = false;
          if (item.children !== undefined) {
            item.children.forEach((listItem: any) => {
              if (list.includes(listItem.name)) {
                listItem.enable = 'true';
              } else {
                listItem.enable = 'false';
              }
            });
          }
        }
      });
      menuList.value = JSON.parse(JSON.stringify(menuListNow));
      nowRule.value = formModel.value.scm_rule;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    setLoading(true);
    try {
      menuList.value = JSON.parse(JSON.stringify(menuListNow));
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setLoading(true);
    try {
      const data = await SaveMenuListByRole(
        formModel.value.scm_rule,
        menuList.value
      );
      if (data.IsSuccess === true) {
        Message.success(t('F_PERMISSION_MANGE.form.saveSucess'));
      } else {
        Message.success(data.ErrMsg);
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'DailyProductionOutput',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
