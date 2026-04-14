<template>
  <div class="container">
    <div class="container_outside">
      <div style="color: red">{{ errorMessage }}</div>
      <!-- <Breadcrumb :items="['menu.list', 'menu.list.Kanban_device_A']" />
    <a-card class="general-card" :title="$t('menu.list.F_PERMISSION_MANGE')">
      <a-row> -->
      <a-spin
        :loading="loading"
        tip="loading...(Loading data...)"
        style="width: 100%"
      >
        <div class="" style="margin: 0 20px">
          <div class="left-side">
            <div class="panel">
              <h1 class="tit">{{ $t('menu.list.Kanban_device_A') }}</h1>
            </div>
            <div class="grid-demo-background">
              <a-space direction="vertical" :size="16" style="display: block">
                <a-row class="grid-demo">
                  <a-col :span="8">
                    <div class="one">
                      <div class="one_top">
                        <a-card
                          class="card-demo boder margin_10"
                          :title="$t('Kanban_device_A.form.devMaintenance')"
                          hoverable
                        >
                          <template #extra>
                            <a-link @click="handleClick1">{{
                              $t('Kanban_device_A.form.detail')
                            }}</a-link>
                          </template>
                          <div class="card_content" style="display: flex">
                            <div style="flex-grow: 1">
                              <categoriesPpercent
                                :mask="baoyangonerate"
                                style="color: white"
                                :title="
                                  $t('Kanban_device_A.form.onefinishrate')
                                "
                            /></div>

                            <div style="flex-grow: 1">
                              <categoriesPpercent
                                :mask="baoyangtworate"
                                style="color: white"
                                :title="
                                  $t('Kanban_device_A.form.twofinishrate')
                                "
                              />
                            </div>
                          </div>
                        </a-card>
                      </div>
                      <div class="one_bottom">
                        <a-card
                          class="card-demo boder margin_10"
                          :title="$t('Kanban_device_A.form.devrepair')"
                          hoverable
                        >
                          <template #extra>
                            <a-link @click="handleClick2">{{
                              $t('Kanban_device_A.form.detail')
                            }}</a-link>
                          </template>
                          <div class="card_content">
                            <div style="display: flex">
                              <div style="flex-grow: 1">
                                <categoriesPpercent
                                  :mask="finishedrate"
                                  style="color: white"
                                  :title="$t('Kanban_device_A.form.repairOk')"
                                />
                              </div>
                              <div style="flex-grow: 1">
                                <categoriesPpercent
                                  :mask="repairingrate"
                                  style="color: white"
                                  :title="$t('Kanban_device_A.form.repairing')"
                                />
                              </div>
                            </div>
                            <div style="margin-top: 200px; margin-left: 150px">
                              <categoriesPpercent
                                :mask="waitrate"
                                style="color: white"
                                :title="$t('Kanban_device_A.form.waitrepair')"
                              />
                            </div>
                          </div>
                        </a-card>
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="8">
                    <div class="two">
                      <div style="display: flex">
                        <div style="flex-grow: 1">
                          <span style="color: white">{{
                            $t('Kanban_device_A.form.org')
                          }}</span>

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
                          </a-select>
                        </div>
                        <div style="flex-grow: 2">
                          <span style="color: white">{{
                            $t('Kanban_device_A.form.daterange')
                          }}</span
                          ><a-range-picker
                            v-model="formModel.selectdate"
                            style="width: 254px; margin-bottom: 15px"
                          />
                        </div>
                        <div style="flex-grow: 1">
                          <a-button type="primary" @click="search">{{
                            $t('Kanban_device_A.form.search')
                          }}</a-button>
                        </div>
                      </div>
                      <div class="card_content">
                        <div style="padding-top: 16px">
                          <h2>{{
                            $t('Kanban_device_A.form.devicestatusPiechart')
                          }}</h2>
                          <a-spin style="width: 100%" :loading="loading">
                            <Chart style="height: 300px;" :option="chartOption" />
                          </a-spin>
                        </div>
                        <!-- <div>---------------orgList-------</div> -->
                        <div style="margin-top: 70px">
                          <h2>{{
                            $t('Kanban_device_A.form.diagnosiscausesRanking')
                          }}</h2>
                          <div style="margin-top: -40px">
                            <div>
                              <a-spin style="width: 100%" :loading="loading">
                                <onebottomone :option="option"></onebottomone>
                              </a-spin>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="8">
                    <div class="three">
                      <div style="width: 95%; text-align: right"
                        ><h2 style="color: rgb(23, 163, 214)">{{ timeNow }}</h2>
                      </div>
                      <div class="three_top">
                        <a-card
                          class="card-demo margin_10"
                          :title="$t('Kanban_device_A.form.Maintenancetasks')"
                          hoverable
                        >
                          <a-table
                            v-model:selectedKeys="selectedKeys"
                            row-key="name"
                            :columns="columns"
                            :data="baoyanglist"
                            :pagination="pagination"
                            :table-layout-fixed="true"
                            :scroll="scroll"
                            :scrollbar="scrollbar"
                          />
                        </a-card>
                      </div>
                      <div class="three_bottom">
                        <a-card
                          class="card-demo margin_10"
                          :title="$t('Kanban_device_A.form.repairtasks')"
                          hoverable
                        >
                          <a-table
                            v-model:selectedKeys="selectedKeys"
                            row-key="name"
                            :columns="columns1"
                            :data="repairlist"
                            :pagination="pagination"
                            :table-layout-fixed="true"
                            :scroll="scroll"
                            :scrollbar="scrollbar"
                          />
                        </a-card>
                      </div>
                    </div>
                  </a-col>
                </a-row>
              </a-space>
            </div>
          </div>
        </div>
        <!-- </a-row>
    </a-card> -->
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import useChartOption from '@/hooks/chart-option';
  import useLoading from '@/hooks/loading';
  // import moment from 'moment';
  import {
    Getorg,
    GetMaintenanceList,
    RepairList,
    DevicestatusRate,
    MaintenanceCompletionRate,
    RepairCompletionRate,
    GetToplist,
  } from '@/api/kanbandevicea';
  // import { useI18n } from 'vue-i18n';
  import router from '@/router';
  import { EChartsOption } from 'echarts';
  import categoriesPpercent from './components/categories-percent.vue';
  import onebottomone from './components/onebottomone.vue';

  const generateFormModel = () => {
    return {
      selectorg: '5001',
      selectdate: ['2023-05-01', '2023-05-09'],
    };
  };

  const datatop = ref<any>([]);
  const data1 = ref<any>([]);
  const { loading } = useLoading();
  const orgList = ref<any>([]);
  const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);
  const pagination = { pageSize: 5 };
  const formModel = ref(generateFormModel());
  const percentdate = ref<any>([]);
  const data = ref<any>([]);
  const localdate = ref<any>([]);
  const baoyanglist = ref<any>([]);
  const repairlist = ref<any>([]);
  const baoyangRata = ref<any>([]);
  const repairRata = ref<any>([]);
  const baoyangonerate = ref<number>(0);
  const baoyangtworate = ref<number>(0);
  const waitrate = ref<number>(0);
  const repairingrate = ref<number>(0);
  const finishedrate = ref<number>(0);
  const scrollbar = ref(true);
  const timeNow = ref('');
  const errorMessage = ref('');

  setInterval(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const hours = now.getHours();
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${year}/${month}/${day} ${hours12}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${period}`;

    timeNow.value = formattedTime;
  }, 1000);

  // setInterval(() => {
  //   // timeNow.value = new Date().toString();
  //   const year1 = new Date().getFullYear();
  //   const Month1 = new Date().getMonth() + 1;
  //   const day1 = new Date().getDate();
  //   const Hour1 =
  //     new Date().getHours().toLocaleString().length > 1
  //       ? new Date().getHours()
  //       : `${new Date().getHours()}`;
  //   const Minute1 =
  //     new Date().getMinutes().toLocaleString().length > 1
  //       ? new Date().getMinutes()
  //       : `0${new Date().getMinutes()}`;
  //   const Second1 =
  //     new Date().getSeconds().toLocaleString().length > 1
  //       ? new Date().getSeconds()
  //       : `0${new Date().getSeconds()}`;

  //   timeNow.value = `${year1}/${Month1}/${day1} ${Hour1}:${Minute1}:${Second1}`;
  // }, 1000);

  const scroll = {
    y: 225,
  };

  const columns = [
    {
      title: 'Location',
      dataIndex: 'ADDRESS',
    },
    {
      title: 'DeviceID',
      dataIndex: 'SNID',
    },
    {
      title: 'Device  Name',
      dataIndex: 'DEVICE_NAME',
    },
    {
      title: 'Parts',
      dataIndex: 'BODY_PART',
    },
    {
      title: 'Items',
      dataIndex: 'ITEM',
    },
    {
      title: 'Finish Date',
      dataIndex: 'PLAN_FINISHDATE',
    },
  ];

  const columns1 = [
    {
      title: 'Location',
      dataIndex: 'ADDRESS',
    },
    {
      title: 'Device ID',
      dataIndex: 'SNID',
    },
    {
      title: 'Device  Name',
      dataIndex: 'DEVICE_NAME',
    },
    {
      title: 'Remarks',
      dataIndex: 'BZ_REMARK',
    },
    {
      title: 'Reporter',
      dataIndex: 'BZ_USER',
    },
    {
      title: 'Reporting Date',
      dataIndex: 'BZ_DATE',
    },
  ];

  onMounted(() => {
    // 读取缓存数据
    const getLocalorg = window.sessionStorage.getItem('org_code');
    const getLocaldate = window.sessionStorage.getItem('selectdate');
    console.log(getLocaldate);
    if (getLocalorg != null && getLocaldate != null) {
      formModel.value.selectorg = getLocalorg;
      localdate.value = JSON.parse(getLocaldate);
      formModel.value.selectdate = localdate.value;
    } else {
      const range = ref<any>([]);
      const obj = {
        starttime: '',
        endtime: '',
      };
      // obj.starttime = moment(
      //   moment().week(moment().week()).startOf('week').add(1, 'days').valueOf()
      // ).format('YYYY-MM-DD');
      // obj.endtime = moment(
      //   moment().week(moment().week()).endOf('week').add(1, 'days').valueOf()
      // ).format('YYYY-MM-DD');
      range.value.push(obj.starttime);
      range.value.push(obj.endtime);
      formModel.value.selectdate = range.value;
      // console.log(range);
    }
  });

  const { chartOption } = useChartOption((isDark) => { 
    return {
      legend: {
        left: 'center',
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        textStyle: {
          color: '#fff',
        },
        itemStyle: {
          borderWidth: 0,
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '40%',
            style: {
              text: 'Device_Status',
              textAlign: 'center',
              fill: '#fff',
              fontSize: 14,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: 'Proportion%',
              textAlign: 'center',
              fill: '#fff',
              fontSize: 16,
              fontWeight: 500,
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 14,
            color: '#fff',
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          data: data.value,
        },
      ],
    };
  });
  const option = ref<EChartsOption>();

  option.value = {
    dataset: {
      source: datatop.value,
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    grid: { containLabel: true },
    xAxis: [
      {
        name: 'Quantity',
        axisLabel: {
          color: '#fff',
        },
        axisLine: { lineStyle: { color: '#fff' } },
      },
    ],
    yAxis: [
      {
        type: 'category',
        axisLabel: {
          color: '#fff',
        },
      },
    ],
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 0,
      max: 100,
      text: ['%', 'Percentage'],
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
      textStyle: { color: '#fff' },
    },
    series: [
      {
        type: 'bar',
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: '#fff',
        },
        encode: {
          // Map the "amount" column to X axis.
          x: 'qty',
          // Map the "product" column to Y axis
          y: 'product',
        },
      },
    ],
  };
  const getorglist = async () => {
    const orgdata: any = await Getorg();
    orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  };

  getorglist();
  onMounted(async () => {
    search();
  });

  function setLocal() {
    // 缓存条件在浏览器
    window.sessionStorage.setItem('org_code', formModel.value.selectorg);
    window.sessionStorage.setItem(
      'selectdate',
      JSON.stringify(formModel.value.selectdate)
    );
  }
  const { setLoading } = useLoading();

  const search = async () => {
    debugger;
    setLoading(true);
    try {
      setLocal();

      const datalist1: any = await GetMaintenanceList(formModel.value);
      if (datalist1.list.length > 0 && datalist1 != null) {
        baoyanglist.value = JSON.parse(JSON.stringify(datalist1.list));
      } else {                                                          
        baoyanglist.value = null;
      }
      const datalist2: any = await RepairList(formModel.value);
      repairlist.value = JSON.parse(JSON.stringify(datalist2.list));

      // console.log(datalist2);

      const datalist3: any = await DevicestatusRate(formModel.value);
      percentdate.value = JSON.parse(JSON.stringify(datalist3.list));
      data.value = percentdate.value;

      const datalist4: any = await MaintenanceCompletionRate(formModel.value);
      baoyangRata.value = JSON.parse(JSON.stringify(datalist4.list));
      baoyangRata.value.forEach((item: any) => {
        baoyangonerate.value = Number(item.onerate);
        baoyangtworate.value = Number(item.tworate);
      });

      const datalist5: any = await RepairCompletionRate(formModel.value);
      repairRata.value = JSON.parse(JSON.stringify(datalist5.list));
      repairRata.value.forEach((item: any) => {
        waitrate.value = Number(item.waitrate);
        repairingrate.value = Number(item.repairingrate);
        finishedrate.value = Number(item.finishedrate);
      });

      const datalist: any = await GetToplist();
      data1.value = JSON.parse(JSON.stringify(datalist.list));
      data1.value.forEach((item: any) => {
        datatop.value.push(item);
      });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  function handleClick1() {
    router.push({
      name: 'maintenanceDetails',
      query: {
        selectdate: formModel.value.selectdate,
        selectorg: formModel.value.selectorg,
      },
    });
  }

  function handleClick2() {
    router.push({
      name: 'repairDetails',
      query: {
        selectdate: formModel.value.selectdate,
        selectorg: formModel.value.selectorg,
      },
    });
  }

  setInterval(() => {
    search();
  }, 30000);
</script>

<script lang="ts">
  export default {
    name: 'KanbanDeviceA',
  };
</script>

<style lang="less" scoped>
  h1 {
    color: white;
  }
  .margin_10 {
    margin: 20px;
  }
  .txt_center {
    text-align: center;
  }
  .container {
    background-size: cover;
    background-color: #031a5a;
    background-image: linear-gradient(to bottom, #031a5a, #4c0c76);
    width: 100%;
    height: 1080px;
    background-image: url('@/assets/images/backgroud-1.png');
    // padding-top: 20px;
  }
  .container_outside {
    background-image: url('@/assets/images/bgmain.png');
    width: 100%;
    height: 100%;
    background-size: cover;
    // border: 1px solid red;
    // box-shadow: rgb(213, 210, 113) 0px 0px 30px inset;
    // border-radius: 20px;
  }
  .two .card_content {
    background: rgba(96, 191, 243, 0.1);
    box-shadow: rgb(5, 147, 230) 0px 0px 10px inset;
    border-radius: 10px;
  }
  ::v-deep .arco-card {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
    border: none;
    background: rgba(96, 191, 243, 0.1);
  }
  ::v-deep .arco-card-header {
    border: none;
    box-shadow: rgb(45, 214, 23) 0px 0px 10px inset;
    border-radius: 10px;
  }
  .button {
    box-shadow: rgb(23, 67, 214) 0px 0px 10px inset;
    border-radius: 10px;
  }
  .arco-layout-footer footer {
    display: none;
  }
  .tit {
    text-align: center;
    padding-top: 20px;
    color: rgb(253, 197, 114);
    padding-bottom: 10px;
    // box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    // border-radius: 10px;
    width: 300px;
    margin: 0px auto;
  }
  .tit_1 {
    text-align: center;
    padding-top: 0px;
  }
  .card-demo {
    margin-left: 24px;
    transition-property: all;
  }
  .grid-demo .arco-col {
    text-align: center;
  }
  .grid-demo-background {
    margin-top: 10px;
  }

  a-link {
    display: block;
    height: 100%;
    line-height: 100%;
    text-align: right;
  }

  ::v-deep .one .arco-card-size-medium .arco-card-body {
    background-size: cover;
    border: none;
  }

  ::v-deep .arco-card-header-title {
    color: white;
  }
  .one_top {
    margin-top: 60px;
  }
  .three {
    // margin-top: 10px;
    // border: 1px solid red;
  }
  ::v-deep .one .one_top .arco-card-size-medium .arco-card-body {
    height: 300px;
  }
  ::v-deep .one .one_bottom .arco-card-size-medium .arco-card-body {
    height: 480px;
  }
  ::v-deep .three .arco-card-size-medium .arco-card-body {
    // background-image: url('@/assets/images/bg.png');
    background-size: cover;
    height: 388.5px;
  }

  .one .card_content {
    height: 95%;
    text-align: center;
    margin: 0px auto;
  }
  .one .card_content div {
    text-align: center;
    margin: 0px auto;
    margin-left: 13px;
    margin-top: 5px;
  }
  .two .card_content {
    height: 890px;
    // background-color: rgb(251, 249, 249);
    overflow: hidden;
    color: white;
    margin-top: 10px;
  }
  ::v-deep .arco-table-body {
    background-color: transparent;
  }
  ::v-deep .arco-table-td {
    // border: 1px solid red;
    overflow: hidden;
    font-size: 13px;
    background-color: transparent;
    color: white;
  }
  ::v-deep .arco-table-tr {
    height: 45px;
    overflow: hidden;
    white-space: nowrap;
  }
  ::v-deep .arco-table-header {
    background-color: transparent;
  }
  ::v-deep .arco-table-border .arco-table-container {
    border: none;
  }
  ::v-deep .arco-table-th {
    white-space: normal;
    background-color: transparent;
    color: white;
  }

  ::v-deep .arco-table-tr:hover {
    white-space: normal;
  }
  ::v-deep .arco-table-tr:hover td {
    color: black;
    border-color: blue;
  }
  ::v-deep .arco-pagination-item {
    color: white;
  }
  ::v-deep .arco-pagination-item:hover {
    // color: blue;
    background-color: rgb(var(--arcoblue-3));
  }
  ::v-deep .arco-pagination-item-active,
  .arco-pagination-item-active:hover {
    background-color: rgb(var(--arcoblue-3));
  }
  .box-shadow-4 {
    box-shadow: rgb(82, 150, 246) 0px 0px 10px inset;
    border-radius: 20px;
    // background: rgba(55, 55, 200, 0.2);
  }
  ::v-deep .arco-link {
    color: rgb(164, 164, 156);
  }
  ::v-deep .arco-btn-primary,
  .arco-btn-primary[type='button'],
  .arco-btn-primary[type='submit'] {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 5px;
  }
  ::v-deep .arco-picker {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 5px;
  }
  ::v-deep .arco-select-view-single {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    color: white;
    border-radius: 5px;
  }
  ::v-deep .arco-picker input {
    color: white;
  }
  ::v-deep .arco-picker-suffix-icon {
    // background-color: white;
    color: white;
  }
  ::v-deep .arco-picker-focused .arco-picker-input-active input,
  .arco-picker-focused:hover .arco-picker-input-active input {
    background-color: transparent;
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
    .right-side {
      // display: none;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
</style>
