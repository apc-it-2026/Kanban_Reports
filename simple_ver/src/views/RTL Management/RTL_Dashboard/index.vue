<template>
  <div class="container">
    <div style="color: red">{{ errorMessage }}</div>
    <a-spin
      :loading="loading"
      tip="loadding .....(Loading..)"
      style="width: 100%"
    >
      <div>
        <div class="tit">
          <div>
            <h1>{{ $t('RTLDashboard.form.RTLDashboard') }}</h1>
          </div>

          <div>
            <button @click="exportToExcel" id="export_excel"
              >EXPORT FILE</button
            >
          </div>
        </div>
        <div>
          <a-space direction="vertical" :size="16" style="display: block">
            <a-row>
              <a-col :span="4.5" class="a-col">
                <div>
                  <span
                    ><abbr
                      :title="$t('RTLDashboard.form.org')"
                      style="text-decoration: none"
                      >{{ $t('RTLDashboard.form.org') }}</abbr
                    ></span
                  >
                  <a-select
                    v-model="formModel.selectorg"
                    :style="{ width: '200px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }"
                    @change="search"
                  >
                    <a-option
                      v-for="item in orglist"
                      :key="item.ORG_CODE"
                      :value="item.ORG_CODE"
                    >
                      {{ item.ORG_NAME }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="4.5" class="a-col">
                <div>
                  <span
                    ><abbr
                      :title="$t('RTLDashboard.form.plant')"
                      style="text-decoration: none"
                      >{{ $t('RTLDashboard.form.plant') }}</abbr
                    ></span
                  >
                  <a-select
                    v-model="formModel.factory_area"
                    :style="{ width: '200px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }"
                    @change="search"
                  >
                    <a-option
                      v-for="item in plantlist"
                      :key="item.CODE"
                      :value="item.CODE"
                    >
                      {{ item.NAME }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="4.5" class="a-col">
                <div>
                  <span
                    ><abbr
                      :title="$t('RTLDashboard.form.line')"
                      style="text-decoration: none"
                      >{{ $t('RTLDashboard.form.line') }}</abbr
                    ></span
                  >
                  <a-select
                    v-model="formModel.selectline"
                    :style="{ width: '200px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }"
                    @change="search"
                  >
                    <a-option
                      v-for="item in linelist"
                      :key="item.CODE"
                      :value="item.CODE"
                    >
                      {{ item.NAME }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="4.5" class="a-col">
                <div>
                  <span
                    ><abbr
                      :title="$t('RTLDashboard.form.Start_of_production_date')"
                      style="text-decoration: none"
                      >{{ $t('RTLDashboard.form.Sopd') }}</abbr
                    ></span
                  >
                  <a-select
                    v-model="formModel.selectproductiondate"
                    :style="{ width: '200px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }"
                    @change="search"
                  >
                    <a-option
                      v-for="item in productionlist"
                      :key="item.CODE"
                      :value="item.CODE"
                    >
                      {{ item.NAME }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="4.5" class="a-col">
                <div>
                  <span
                    ><abbr
                      :title="$t('RTLDashboard.form.Order_lead_time')"
                      style="text-decoration: none"
                      >{{ $t('RTLDashboard.form.Olt') }}</abbr
                    ></span
                  >
                  <a-select
                    v-model="formModel.selectorderleadtime"
                    :style="{ width: '200px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }"
                    @change="search"
                  >
                    <a-option
                      v-for="item in orderleadtimelist"
                      :key="item.CODE"
                      :value="item.CODE"
                    >
                      {{ item.NAME }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="4.5" class="a-col">
                <div>
                  <span
                    ><abbr
                      :title="$t('RTLDashboard.form.Art_no')"
                      style="text-decoration: none"
                      >{{ $t('RTLDashboard.form.Art_no') }}</abbr
                    ></span
                  >
                  <a-select
                    v-model="formModel.selectartno"
                    :style="{ width: '200px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }"
                    @change="search"
                  >
                    <a-option
                      v-for="item in Artnolist"
                      :key="item.CODE"
                      :value="item.CODE"
                    >
                      {{ item.NAME }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
            </a-row>
          </a-space>
        </div>

        <div>
          <div id="scrolling">
            <table cellspacing="0" border="1" cellpadding="0">
              <thead>
                <tr>
                  <th v-for="(column, index) in columns" :key="index">{{
                    column
                  }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, rowIndex) in RTLDetailslist"
                  :key="rowIndex"
                  :style="{
                    color: row.SIGNAL_LIGHT === 'OFF' ? 'red' : 'green',
                  }"
                  @click="openModal(row)"
                >
                  <td v-for="(value, key) in row" :key="key">
                    {{ value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <g-dialog v-model="modalVisible" width="90rem">
            <div class="model">
              <div id="grid">
                <div class="row">
                  <label
                    >LINE :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.LINE
                    }}</span>
                  </label>
                </div>

                <div class="row">
                  <label
                    >CR REQDATE :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.CR_REQDATE
                    }}</span></label
                  >
                </div>
                <div class="row">
                  <label
                    >SALES ORDER :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.SE_ID
                    }}</span></label
                  >
                </div>
                <div class="row">
                  <label
                    >SHOE NAME :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.SHOE_NAME
                    }}</span></label
                  >
                </div>
                <div class="row">
                  <label
                    >ART NO :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.ART_NO
                    }}</span>
                  </label>
                </div>
                <div class="row">
                  <label
                    >ORDER QTY :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.ORDER_QTY
                    }}</span>
                  </label>
                </div>
                <div class="row">
                  <label
                    >OUTPUT QTY :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.OUTPUT_QTY
                    }}</span>
                  </label>
                </div>
                <div class="row">
                  <label
                    >REMAINING QTY :
                    <span :class="{ 'selected-value': selectedRow }">{{
                      selectedRow?.REMAINING_QTY
                    }}</span>
                  </label>
                </div>
              </div>
              <div id="scrollparts">
                <table>
                  <thead>
                    <tr>
                      <th v-for="(column, index) in partcolumns" :key="index">
                        {{ column }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, rowIndex) in PartsDetailslist"
                      :key="rowIndex"
                    >
                      <td v-for="(value, key) in row" :key="key">
                        {{ value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </g-dialog>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
  import red from '@/assets/images/red.png';
  import useLoading from '@/hooks/loading';
  import { ref, onMounted, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    Org,
    Plants,
    Line,
    Productiondates,
    OrderLeadtime,
    Artno,
    RTLDetails,
    PartsDetails,
  } from '@/api/RTL';
  import { Getorg } from '@/api/kanbandevicea';
  import debug from '@/utils/env';
  import icon from '@arco-design/web-vue/es/icon';
  import { plugin as dialogPlugin } from 'gitart-vue-dialog';
  import 'gitart-vue-dialog/dist/style.css';
  import { GDialog } from 'gitart-vue-dialog';
  import * as XLSX from 'xlsx';

  const generateFormModel = () => {
    return {
      selectdate: ['2024-04-01', '2024-04-30'],
      selectorg: '0000',
      factory_area: '0000',
      selectline: '0000',
      selectartno: '0000',
      selectorderleadtime: '0000',
      selectproductiondate: '0000',
    };
  };

  // const generateFormModelforparts = () => {
  //   return {
  //      salesorder: selectedRow.value?.SE_ID,
  //    // salesorder : '0000' ,
  //   };
  // };

  // const formModelforpars = ref(generateFormModelforparts());

  const { loading, setLoading } = useLoading(true);
  const formModel = ref(generateFormModel());
  const errorMessage = ref('');

  const columns = [
    'LINE',

    'CR REQDATE',
    'SALES ORDER',
    'SHOE NAME',
    'ART NO',
    'ORDER QTY',
    'OUTPUT QTY',
    'LIGHT',
    'REMAINING QTY',
  ];

  const partcolumns = [
    'LINE ',
    'SALES ORDER',
    'ART NO',
    'PART NAME ',
    'PART NO ',
    'SIZE NO',
    'ORDER QTY',
  ];
  const RTLDetailslist = ref<any>([]);
  const PartsDetailslist = ref<any>([]);
  const orglist = ref<any>([]);
  const linelist = ref<any>([]);
  const plantlist = ref<any>([]);
  const productionlist = ref<any>([]);
  const orderleadtimelist = ref<any>([]);
  const Artnolist = ref<any>([]);
  const localdate = ref<any>([]);
  const modalVisible = ref(false);

  interface RowData {
    LINE: string;
    CR_REQDATE: string;
    SE_ID: string;
    SHOE_NAME: string;
    ART_NO: string;
    ORDER_QTY: string;
    OUTPUT_QTY: string;
    SIGNAL_LIGHT: string;
    SIZE_NO: string;
    PART_NAME: string;
    PART_NO: string;
    REMAINING_QTY: string;
    [key: string]: any;
  }
  const selectedRow = ref<RowData | null>(null);

  function setLocal() {
    window.sessionStorage.setItem('org_code', formModel.value.selectorg);
    window.sessionStorage.setItem(
      'selectdate',
      JSON.stringify(formModel.value.selectdate)
    );
    window.sessionStorage.setItem('factory_area', formModel.value.factory_area);
    window.sessionStorage.setItem('line', formModel.value.selectline);
  }

  onMounted(() => {
    try {
      const getLocalorg = window.sessionStorage.getItem('org_code');
      const getLocaldate = window.sessionStorage.getItem('selectdate');
      const getLocalplant = window.sessionStorage.getItem('code');
      const getLocalline = window.sessionStorage.getItem('code');

      if (
        getLocalorg != null &&
        getLocaldate != null &&
        getLocalplant != null &&
        getLocalline != null
      ) {
        formModel.value.selectorg = getLocalorg;
        localdate.value = JSON.parse(getLocaldate);
        formModel.value.selectdate = localdate.value;
        formModel.value.factory_area = getLocalplant;
        formModel.value.selectline = getLocalline;
      }
    } catch (err) {
      Message.error(String(err));
    } finally {
      setLoading(false);
    }
  });

  const search = async () => {
    debugger;
    setLoading(true);
    setLocal();
    try {
      const data1: any = await RTLDetails(formModel.value);
      if (data1.list.length < 1) {
        alert('No Data ');
      }
      RTLDetailslist.value = data1.list;
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // exxist
      setLoading(false);
    }
  };

  const Getcombovalues = async () => {
    debugger;
    const orgdata: any = await Getorg();
        
    orgdata.list.unshift({ ORG_CODE: '0000', ORG_NAME: 'All' });
    orglist.value = JSON.parse(JSON.stringify(orgdata.list));

    const plantdata: any = await Plants(formModel.value);
    plantdata.list.unshift({ CODE: '0000', NAME: 'All' });
    plantlist.value = JSON.parse(JSON.stringify(plantdata.list));

    const linedata: any = await Line(formModel.value);
    linedata.list.unshift({ CODE: '0000', NAME: 'All' });
    linelist.value = JSON.parse(JSON.stringify(linedata.list));

    const productiondata: any = await Productiondates(formModel.value);
    productiondata.list.unshift({ CODE: '0000', NAME: 'All' });
    productionlist.value = JSON.parse(JSON.stringify(productiondata.list));

    const orderleadtimedata: any = await OrderLeadtime(formModel.value);
    orderleadtimedata.list.unshift({ CODE: '0000', NAME: 'All' });
    orderleadtimelist.value = JSON.parse(
      JSON.stringify(orderleadtimedata.list)
    );

    const artnodata: any = await Artno(formModel.value);
    artnodata.list.unshift({ CODE: '0000', NAME: 'All' });
    Artnolist.value = JSON.parse(JSON.stringify(artnodata.list));

    search();
  };

  // const Getparts = async () => {
  //   const data1: any = await PartsDetails(formModelforpars.value);
  //   PartsDetailslist.value = data1.list;
  // };

  const openModal = async (row: RowData) => {
    debugger;
    selectedRow.value = row;
    const seid = row.SE_ID;
    modalVisible.value = true;
    const data1: any = await PartsDetails(seid);
    PartsDetailslist.value = data1.list;
    // Getparts();
  };

  const closeModal = async () => {
    modalVisible.value = false;
  };

  onMounted(() => {
    Getcombovalues();
  });
  

  function allert() {
    window.alert('hello');
  }

  const exportToExcel = () => {
    debugger;
    console.log(RTLDetailslist);
    const dataToExport = RTLDetailslist.value.map((index: any) => {
      return {
        'LINE': index.LINE,

        'CR REQDATE': index.CR_REQDATE,
        'SALES ORDER': index.SE_ID,
        'SHOE NAME': index.SHOE_NAME,
        'ART NO': index.ART_NO,
        'ORDER QTY': index.ORDER_QTY,
        'OUTPUT QTY': index.OUTPUT_QTY,
        'LIGHT': index.LIGHT,
        'REMAINING QTY': index.REMAINING_QTY,
      };
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, 'RTL');
    XLSX.writeFile(wb, 'RTL.xlsx');
  };
</script>

<script lang="ts">
  export default {
    name: 'RTLDashboard',
  };
</script>
<style scoped>
  .tit {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    font-weight: bold;
    color: #6f42f5;
  }
  table {
    width: 100%;
    font-size: 1rem;
    text-align: center;
    border-collapse: collapse;
    margin-top: 2rem;
  }

  table tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
  table tr:nth-child(even) {
    background-color: #ffffff;
  }

  table th {
    border: 1px solid black;
    padding: 10px;
    background-color: #d4c9f5;
  }

  table td {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
  }
  .table_container {
    overflow: hidden;
    margin-top: 10px;
  }
  .table_scroll {
    max-width: 150rem;
    overflow-y: auto;
    overflow-x: auto;
  }

  tbody {
    max-height: 40rem;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }

  /*  
  thead,
  tbody {
    display: block;
  }
  thead {
    width: 100%;
  }

 
  th,
  td {
    width: 200px;
    box-sizing: border-box;
    border: 1px solid #000;
  }

  thead th {
    background: #f1f1f1;
    padding: 10px;
  }

  tbody {
    max-height: 40rem;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }
   tbody::-webkit-scrollbar {
    display: none;
  }   */

  .container {
    width: 100%;
    height: 100%;
    /* background-image: url('@/assets/images/blue.jpg');
    background-repeat: no-repeat;
    background-size: cover; */
    background-color: #d3d9d4;
  }
  .a-col {
    margin-left: 1rem;
    font-weight: bold;
  }
  .model {
    width: 90rem;
    color: black;
    font-weight: bold;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .model > div {
    padding: 0rem 0rem 1rem 0rem;
  }
  .row {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    flex: 1;
  }
  .selected-value {
    color: #9c1c31;
    flex: 2;
    text-align: center;
  }
  #scrolling {
    max-width: 100%; /* Ensure the div does not exceed the parent width */
    overflow-x: auto; /* Enable horizontal scrolling */
    border: none; /* Optional: Add a border for better visibility */
    padding: 10px; /* Optional: Add some padding */
    max-height: 50rem; /* Set a max height for the container */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  #scrolling table {
    width: 100%; /* Make the table take the full width of the container */
    table-layout: fixed; /* Fix the table layout */
  }

  #scrolling th,
  #scrolling td {
    text-align: left; /* Align text to the left */
    padding: 8px; /* Add some padding to cells */
  }
  #scrollparts {
    max-width: 100%;
    overflow-x: auto;
    border: none;
    padding: 10px;
    max-height: 15rem;
    overflow-y: auto;
  }
  #scrollparts table {
    width: 100%; /* Make the table take the full width of the container */
    table-layout: fixed; /* Fix the table layout */
  }

  #scrollparts th,
  #scrollparts td {
    text-align: left; /* Align text to the left */
    padding: 8px; /* Add some padding to cells */
  }

  #grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 3 columns */
    gap: 3rem; /* space between grid items */
  }
  #export_excel {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    background-color: #ed7845;
  }
</style>
