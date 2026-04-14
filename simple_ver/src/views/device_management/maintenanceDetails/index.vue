<template>
  <div class="">
    <!-- <Breadcrumb :items="['menu.list', 'menu.list.maintenanceDetails']" />
    <a-card class="general-card" :title="$t('menu.list.maintenanceDetails')">
      <a-row> -->
    <div class="container">
      <a-spin
        :loading="loading"
        tip="Loading...(Loading data...)"
        style="width: 100%"
      >
        <div class="left-side">
          <div class="panel">
            <h1 class="tit">Equipment Digital Management Kanban</h1>
          </div>
          <div>
            <img
              src="@/assets/images/back.png"
              style="width: 40px; margin-left: 20px"
              @click="toList"
          /></div>
          <div class="grid-demo-background">
            <a-space direction="vertical" :size="16" style="display: block">
              <a-row class="grid-demo">
                <!-- <button @click="toList">点击返回主页</button> -->
                <!-- <div>传递参数：{{ myId.value }}</div> -->
                <div class="box">
                  <div class="box1">
                    <a-space
                      direction="vertical"
                      :size="16"
                      style="display: block"
                    >
                      <a-row class="grid-demo">
                        <a-col :span="6">
                          <div
                            ><span style="color: white"
                              >{{
                                $t('maintenanceDetails.form.daterange')
                              }}：</span
                            ><a-range-picker
                              v-model="formModel.selectdate"
                              style="width: 254px; margin-bottom: 20px"
                          /></div>
                        </a-col>
                        <a-col :span="6">
                          <div
                            ><span style="color: white"
                              >{{ $t('maintenanceDetails.form.org') }}：</span
                            >

                            <a-select
                              v-model="formModel.selectorg"
                              :style="{ width: '160px' }"
                              placeholder="Select"
                              :trigger-props="{ autoFitPopupMinWidth: true }"
                            >
                              <a-option
                                v-for="item in orgList"
                                :key="item.ORG_CODE"
                                :value="item.ORG_CODE"
                                >{{ item.ORG_NAME }}</a-option
                              >
                            </a-select></div
                          >
                        </a-col>
                        <a-col :span="6">
                          <div
                            ><span style="color: white"
                              >{{
                                $t('maintenanceDetails.form.factoryarea')
                              }}：</span
                            >

                            <a-select
                              v-model="formModel.factory_area"
                              :style="{ width: '160px' }"
                              placeholder="Select"
                              :trigger-props="{ autoFitPopupMinWidth: true }"
                            >
                              <a-option
                                v-for="item in factoryareaList"
                                :key="item.CODE"
                                :value="item.CODE"
                                >{{ item.ORG }}</a-option
                              >
                            </a-select></div
                          >
                        </a-col>
                        <a-col :span="6">
                          <div
                            ><a-button
                              type="primary"
                              style="width: 200px"
                              @click="search"
                              >{{
                                $t('maintenanceDetails.form.search')
                              }}</a-button
                            ></div
                          >
                        </a-col>
                      </a-row>
                    </a-space>
                  </div>
                  <div class="box2">
                    <div
                      ><h2>{{
                        $t('maintenanceDetails.form.onemaintenance')
                      }}</h2></div
                    >
                    <div>
                      <table
                        class="table"
                        cellspacing="0"
                        border="1"
                        cellpadding="0"
                      >
                        <tr>
                          <th
                            v-for="item in MaintenanceList01"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.name }}</th
                          >
                        </tr>

                        <tr>
                          <td
                            v-for="item in MaintenanceList01"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.month_plan }}</td
                          >
                        </tr>
                        <tr>
                          <td
                            v-for="item in MaintenanceList01"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.finishrate }}</td
                          >
                        </tr>
                        <tr>
                          <td
                            v-for="item in MaintenanceList01"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.passrate }}</td
                          >
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="box3">
                    <div
                      ><h2>{{
                        $t('maintenanceDetails.form.twomaintenance')
                      }}</h2></div
                    >
                    <div>
                      <table
                        class="table"
                        cellspacing="0"
                        border="1"
                        cellpadding="0"
                      >
                        <tr>
                          <th
                            v-for="item in MaintenanceList02"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.name }}</th
                          >
                        </tr>

                        <tr>
                          <td
                            v-for="item in MaintenanceList02"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.month_plan }}</td
                          >
                        </tr>
                        <tr>
                          <td
                            v-for="item in MaintenanceList02"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.finishrate }}</td
                          >
                        </tr>
                        <tr>
                          <td
                            v-for="item in MaintenanceList02"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.passrate }}</td
                          >
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </a-row>
            </a-space>
          </div>
        </div>
      </a-spin>
    </div>

    <!-- </a-row>
    </a-card> -->
  </div>
</template>

<script lang="ts" setup>
  import {
    Getorg,
    Getfactory,
    GetMaintenanceDetail01,
    GetMaintenanceDetail02,
  } from '@/api/kanbandevicea';
  import { useRouter, useRoute } from 'vue-router';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { ref, onMounted } from 'vue';
  import { onBeforeUpdate } from 'vue';

  const generateFormModel = () => {
    return {
      selectorg: '5001',
      selectdate: ['2025-12-01', '2025-12-31'],
      factory_area: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const router = useRouter();
  const formModel = ref(generateFormModel());
  const orgList = ref<any>([]);
  const factoryareaList = ref<any>([]);
  const MaintenanceList01 = ref<any>([]);
  const MaintenanceList02 = ref<any>([]);
  const localdate = ref<any>([]);

  const myId = ref<any>([]);
  // const requstdata: any = JSON.parse(JSON.stringify(router.currentRoute.value));
  // myId.value = requstdata.query;
  // if (myId.value != null || myId.value != null) {
  //   formModel.value.selectorg = myId.value.selectorg;
  //   formModel.value.selectdate = myId.value.selectdate;
  // }
  onMounted(() => {
    // 读取缓存数据
    try {
      debugger ; 
      const getLocalorg = window.sessionStorage.getItem('org_code');
      const getLocaldate = window.sessionStorage.getItem('selectdate');
      if (getLocalorg != null && getLocaldate != null) {
        formModel.value.selectorg = getLocalorg;
        localdate.value = JSON.parse(getLocaldate);
        formModel.value.selectdate = localdate.value;
      }
    } catch (err) {
      setLoading(false) ; 
      // you can report use errorHandler or other
      Message.error(String(err));
    } finally {
      setLoading(false);
    }
  });
  function toList() {
    // 关闭当前页面

    // 返回上一页面
    router.go(-1);
  }
  const getorglist = async () => {
    debugger
    const orgdata: any = await Getorg();
    orgList.value = JSON.parse(JSON.stringify(orgdata.list));
    const factoryareadata: any = await Getfactory();
    factoryareaList.value = JSON.parse(JSON.stringify(factoryareadata.list));
    factoryareaList.value.unshift({ CODE: '0000', ORG: 'All' });
    search();
  };
  getorglist();
  const search = async () => {
    setLoading(true);
    try {
      debugger
      const byata1: any = await GetMaintenanceDetail01(formModel.value);
      MaintenanceList01.value = JSON.parse(JSON.stringify(byata1.list));
      const byata2: any = await GetMaintenanceDetail02(formModel.value);
      MaintenanceList02.value = JSON.parse(JSON.stringify(byata2.list));
      console.log(MaintenanceList01);
    } catch (err) {
      setLoading(false) ; 
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'MaintenanceDetails',
  };
</script>

<style scoped lang="less">
  h1 {
    // color: var(--color-neutral-10);
    color: white;
  }
  .margin_10 {
    margin: 20px;
  }
  .txt_center {
    text-align: center;
  }
  .boder {
    border: 1px solid var(--color-neutral-4);
  }
  .container {
    // background-color: var(--color-bg-1);
    background-image: url('@/assets/images/backgroud.png');
    background-size: cover;
    // background-repeat: no-repeat;
    // background-color: #031a5a;
    // width: 1920px;
    // border: 1px solid red;
    width: 100%;
    height: 1080px;
    // background-position: 0px -70px;
  }
  .arco-layout-footer footer {
    display: none;
  }
  .tit {
    text-align: center;
    padding-top: 10px;
    color: rgb(76, 15, 219);
  }
  .tit_1 {
    text-align: center;
    padding-top: 0px;
  }
  .box {
    width: 90%;
    margin: 0px auto;
    text-align: center;
  }
  .box1 {
    color: white;
    font-size: 20px;
  }
  .box2,
  .box3 {
    // border: 1px solid red;
    color: white;
    margin-top: 70px;
  }
  .table {
    width: 100%;
    font-size: 18px;
  }
  .table td,
  .table th {
    border: 1px solid rgb(160, 107, 107);
    height: 60px;
  }
  .table tr:nth-child(1) {
    background: rgba(57, 5, 243, 0.4);
  }
  .table tr:nth-child(2) {
    background: rgba(62, 245, 12, 0.2);
  }
  .table tr:nth-child(3) {
    background: rgba(49, 174, 232, 0.4);
  }
  .table tr:nth-child(4) {
    background: rgba(228, 169, 7, 0.4);
  }
</style>
