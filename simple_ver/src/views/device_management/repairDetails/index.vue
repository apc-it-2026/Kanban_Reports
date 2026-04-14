<template>
  <div class="">
    <!-- <Breadcrumb :items="['menu.list', 'menu.list.repairDetails']" />
    <a-card class="general-card" :title="$t('menu.list.repairDetails')">
      <a-row> -->
    <div class="container">
      <a-spin
        :loading="loading"
        tip="Loading...(Loading data...)"
        style="width: 100%; height: auto"
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
                <!-- <button @click="toList">点击返回列表</button>
                  <div>传递参数：{{ repairList }}</div> -->
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
                              >{{ $t('repairDetails.form.daterange') }}：</span
                            ><a-range-picker
                              v-model="formModel.selectdate"
                              style="width: 254px; margin-bottom: 20px"
                          /></div>
                        </a-col>
                        <a-col :span="6">
                          <div
                            ><span style="color: white"
                              >{{ $t('repairDetails.form.org') }}：</span
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
                                $t('repairDetails.form.factoryarea')
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
                              >{{ $t('repairDetails.form.search') }}</a-button
                            ></div
                          >
                        </a-col>
                      </a-row>
                    </a-space>
                  </div>
                  <div class="box2">
                    <div style="text-align: left"
                      ><h2
                        >{{ $t('repairDetails.form.repairstatus') }}：</h2
                      ></div
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
                            v-for="item in repairList"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.name }}</th
                          >
                        </tr>

                        <tr>
                          <td
                            v-for="item in repairList"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.repaired }}</td
                          >
                        </tr>
                        <tr>
                          <td
                            v-for="item in repairList"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.repairing }}</td
                          >
                        </tr>
                        <tr>
                          <td
                            v-for="item in repairList"
                            :key="item.code"
                            :value="item.code"
                            >{{ item.waitrepair }}</td
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
  import { Getorg, Getfactory, GetRepairDetail } from '@/api/kanbandevicea';
  import router from '@/router';
  import { ref, onMounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  const { loading, setLoading } = useLoading(true);

  const generateFormModel = () => {
    return {
      selectorg: '5001',
      selectdate: ['2023-05-01', '2023-05-09'],
      factory_area: '',
    };
  };

  const formModel = ref(generateFormModel());
  const orgList = ref<any>([]);
  const factoryareaList = ref<any>([]);
  const repairList = ref<any>([]);
  const localdate = ref<any>([]);

  onMounted(() => {
    // 读取缓存数据
    try {
      // const requstdata: any = JSON.parse(
      //   JSON.stringify(router.currentRoute.value)
      // );
      // myId.value = requstdata.query;
      // if (myId.value != null || myId.value != null) {
      //   formModel.value.selectorg = myId.value.selectorg;
      //   formModel.value.selectdate = myId.value.selectdate;
      // }
      const getLocalorg = window.sessionStorage.getItem('org_code');
      const getLocaldate = window.sessionStorage.getItem('selectdate');
      if (getLocalorg != null && getLocaldate != null) {
        formModel.value.selectorg = getLocalorg;
        localdate.value = JSON.parse(getLocaldate);
        formModel.value.selectdate = localdate.value;
      }
    } catch (err) {
      // you can report use errorHandler or other
      Message.error(String(err));
    } finally {
      setLoading(false);
    }
  });

  function toList() {
    router.go(-1);
  }

  const getorglist = async () => {
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
      const data1: any = await GetRepairDetail(formModel.value);
      repairList.value = JSON.parse(JSON.stringify(data1.list));
    } catch (err) {
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
    color: rgb(253, 197, 114);
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
    margin-top: 100px;
  }
  .table {
    width: 100%;
    font-size: 18px;
    margin-top: 10px;
  }
  .table td,
  .table th {
    border: 1px solid gray;
    height: 100px;
  }
  .table tr:nth-child(1) {
    background: rgba(223, 8, 194, 0.4);
  }
  .table tr:nth-child(2) {
    background: rgba(41, 168, 6, 0.2);
  }
  .table tr:nth-child(3) {
    background: rgba(49, 174, 232, 0.4);
  }
  .table tr:nth-child(4) {
    background: rgba(82, 8, 201, 0.4);
  }
</style>
