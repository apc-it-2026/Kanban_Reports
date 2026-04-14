<template>
  <div style="width: 100%; height: 100%; background-color: #124e66; padding: 10px">
    <div style="color: red"> {{ errorMessage }}</div>
    <div v-if="curentview === 'buttons'">
      <a-spin tip="loading loading" :loading="loading" style="width: 100%">
        <div>
          <div>
            <div class="headding"> END TO END DECISION MAKING SYSTEM <button
                style="margin-left: 30px;padding: 5px;border-radius: 5px;background-color: white;border: none;cursor: pointer;"
                @click="exportToExcel"> Export Excel </button></div>
          </div>
          <a-row :gutter="[16, 16]">
            <a-col :span="3" :xs="24" :sm="12" :md="3">
              <div ref="dropDownContainer">
                <a-input v-model="formModel.po" placeholder="Enter PO" class="po-input-field" @input="POLISTMethod"
                  @keyup.enter="hideDropdownPOsuggetion" @focus="showDropdownPOSuggetion"
                  @press-enter="selectpoSuggetion" />
                <div v-if="showPOSuggestions" class="po-suggetions">
                  <div v-for="po in POSEIDARTICLELIST" :key="po.CUSTOMER_PO" :value="po.CUSTOMER_PO"
                    class="po-suggetion-items" @click="selectPO(po)">
                    {{ po.CUSTOMER_PO }}
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="3" :xs="24" :sm="12" :md="3">
              <a-select v-model="formModel.year" placeholder="Enter year" @change="NullValuesCRD">
                <a-option v-for="year in yearss" :key="year.CRD" :value="year.CRD">
                  {{ year.CRD }}
                </a-option>
              </a-select>
            </a-col>
            <a-col :span="3" :xs="24" :sm="12" :md="3">
              <a-select v-model="formModel.month" @change="CRDDATa" placeholder="Enter Month">
                <a-option v-for="month in months" :key="month.value" :value="month.value">
                  {{ month.Name }}
                </a-option>
              </a-select>
            </a-col>
            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div class="dropdowncontainer" ref="dropDownContainer">
                <div @click="toggle" class="dropdown">
                  <span>
                    {{
                      formModel.crd.length > 0
                        ? formModel.crd.join(' , ')
                        : 'Select CRD'
                    }}
                  </span>
                </div>
                <div v-if="isdrowdown" class="dropdown-options">
                  <label v-for="crd in crddates" :key="crd.CRD">
                    <input type="checkbox" v-model="formModel.crd" :value="crd.CRD" />
                    {{ crd.CRD }}
                  </label>
                </div>
              </div>
            </a-col>

            <a-col :span="2" :xs="24" :sm="12" :md="2">
              <div>
                <button class="submitbutton" @click="HandleQuery">
                  Submit
                </button>
              </div>
            </a-col>

            <a-col :span="3" :xs="24" :sm="12" :md="3">
              <div><a-button class="pocompletion-button" @click="OpenPOCompletionPercentage"
                  style="background-color: rgb(20, 41, 247);color: white;">
                  PO COMPLETION
                </a-button>
              </div>
            </a-col>

            <a-col :span="3" :xs="24" :sm="12" :md="3">
              <div>
                <a-button class="material-button" @click="OpenMaterialmatching"
                  style="background-color: #f23064;color: white;">
                  Material Matching
                </a-button>
              </div>
            </a-col>
          </a-row>
        </div>

        <div>
          <a-row :gutter="16">
            <a-col :span="12" :xs="24" :sm="12" :md="12">
              <a-card class="a-card">
                <span style="color: #6f118f; font-size: 20px; font-weight: bold">
                  Order Article Quantiy
                </span>
                <Chart :option="chartOption" style="width: 100%; height: 30vh; text-align: start" />
              </a-card>
            </a-col>
            <a-col :span="12" :xs="24" :sm="12" :md="12">
              <a-card class="a-card">
                <span style="color: #6f118f; font-size: 20px; font-weight: bold">
                  Shipment Article Quantity
                </span>
                <Chart :option="FGInboundchart" style="width: 100%; height: 30vh" />
              </a-card>
            </a-col>
          </a-row>
        </div>
        <br />

        <a-card class="a-card">
          <div class="po-header">
            <div class="po-heading-left">
              <h3 class="po-heading">PO Tracking Report From Order to Shipment</h3>
            </div>
            <div class="po-status-right">
              <div class="status-item">COMPLETED <span class="status-dot green"></span></div>
              <div class="status-item">DELAY <span class="status-dot red"></span></div>
              <div class="status-item">ONGOING <span class="status-dot orange"></span></div>
              <div class="status-item">NO PLANDATES <span class="status-dot black"></span></div>
            </div>
          </div>

          <div class="table-container">
            <table class="table_wrapper">
              <thead>
                <tr>
                  <th v-for="column in columns" :key="column.key" style="position: sticky">
                    {{ column.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(po, index) in pos" :key="po.MER_PO" :class="{ 'selected-row': selectedRowIndex === index }">
                  <td @click="DetailViewclick(po)" class="detail-view">
                    <i class="pi pi-eye"></i>
                  </td>
                  <td @click="gotoTimeline(po)">
                    <i class="pi pi-clock"></i>
                  </td>
                  <td>{{ po.MER_PO }}</td>
                  <td>{{ po.SE_ID }}</td>
                  <td style="min-width: 200px; max-width: 600px">{{
                    po.NAME_S
                  }}</td>
                  <td>{{ po.SE_DAY }}</td>
                  <td>{{ po.CR_REQDATE }}</td>
                  <td>{{ po.NLT }}</td>
                  <td>{{ po.SE_QTY }}</td>
                  <td>

                    <div v-if="getBackgroundColorforCutting(po)" :class="getBackgroundColorforCutting(po)">
                    </div>
                    <div v-else>
                      {{ toMonthDayRange(po.WEE_START_DATE, po.WEE_END_DATE) }}
                    </div>

                  </td>
                  <td>
                    <div v-if="getBackgroundColorforStitching(po)" :class="getBackgroundColorforStitching(po)">
                    </div>
                    <div v-else>
                      {{ toMonthDayRange(po.WEE_START_DATE, po.WEE_END_DATE) }}
                    </div>
                  </td>
                  <td>
                    <div v-if="getBackgroundColorforAssembly(po)" :class="getBackgroundColorforAssembly(po)">
                    </div>
                    <div v-else>
                      {{ toMonthDayRange(po.WEE_START_DATE, po.WEE_END_DATE) }}
                    </div>
                  </td>

                  <td>{{ po.SHIPMENT_QTY }}</td>
                  <td>{{ po.POSTING_DATE }}</td>
                  <td style="padding-left: 20px">
                    <div :class="getrowcolor(po)"> </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </a-card>
        <a-modal v-model:visible="visible4" title="PO Completion" :hide-cancel="HideCancel"
          :modal-style="{ backgroundColor: '#def2f1', padding: '20px' }">
          <a-spin :loading="poploading" tip="loading loading" style="width: 100%">
            <div style="height: 400px">
              <Chart :option="chartOption2" />
            </div>
          </a-spin>
        </a-modal>
      </a-spin>

      <div>
        <button class="whatsapp-button" @click="wbuttonclick" v-if="wbutton">
          <i class="pi pi-whatsapp" style="color: green; font-size: 2rem; font-weight: bold"></i>
        </button>
      </div>

      <Teleport to="body">
        <a-card v-if="open" class="modal">
          <div class="close_minimise_buttons">
            <div style="display: flex; gap: 10px">
              <div class="minus" @click="Minimizebuttonclick">
                <i class="pi pi-minus"></i>
              </div>
              <div class="times" @click="closebuttonclick">
                <i class="pi pi-times"></i>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h2> Whatsapp messages </h2>
            </div>
            <textarea v-model="formModel.message" placeholder="Enter your issues here..." class="issue-text"></textarea>
            <a-select v-model="formModel.selectedDepartment" placeholder="Select Department" class="department-text">
              <a-option v-for="group in groups" :key="group.GROUP_ID" :value="group.GROUP_ID">
                {{ group.GROUP_NAME }}
              </a-option>
            </a-select>

            <div>
              <a-input v-model="formModel.phno" class="emp-ph-input-field" placeholder="Search Employee"
                @input="SearchEmpByBarcodeMethod" @keyup.enter="hideDropdown" @focus="showDropdown"
                @press-enter="selectEmployee2" />
              <div v-if="showResults" class="dropdown2">
                <div v-for="emp in Emps" :key="emp.EMP_NO" :value="emp.TEL" class="dropdown-item"
                  @click="selectEmployee(emp)">
                  {{ emp.EMP }}
                </div>
              </div>
            </div>
            <div class="whatsapp-note">
              Note : <br /><br />
              1 . Employee should register in HR <br /><br />
              2 . Don't Use For Personal Purpose
            </div>
            <div :class="{
              'whatsapp-response': true,
              'success': isSuccess,
              'error': isError,
            }">
              {{ WhatsappResponse }}
            </div>

            <div style="margin: 10px 0 10px 0; text-align: center">
              <button class="send-button" @click="handleOk"> Send </button>
            </div>
          </div>
        </a-card>
      </Teleport>
    </div>
    <component :is="components[curentview]" :rowData="clickvaluedata" :onBack="goBack" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, onUnmounted } from 'vue';
import useLoading from '@/hooks/loading';
import usePOPLoading from '@/hooks/POPloading';
import { Notification, Message } from '@arco-design/web-vue';
import useChartOption from '@/hooks/chart-option';
import * as XLSX from 'xlsx';
import {
  GetCRDData,
  GetYearsValues,
  GetNearestCRDValue,
} from '@/api/e2e_General/e2eFilters';
import {
  GetOrderChartDetails,
  GetPOsCRD,
  ShipmentDetailsData,
  IssueRaise,
} from '@/api/e2e_biz/order';
import {
  SearchEmpByBarcode,
  GroupsForSendWhatsapp,
  POSEIDARTICLESuggetions,
} from '@/api/e2e_biz/biz';
import {
  PoCompletionPercentage,
} from '@/api/e2e_fg/fg';
import 'primeicons/primeicons.css';
import TrackingPO from './TrackingPO.vue';
import Material from './Status.vue';
import timelines from './timelines.vue';
import MaterialCheck from './MaterialCheck.vue';


const { loading, setLoading } = useLoading(false);
const { poploading, setpopLoading } = usePOPLoading(false);
const errorMessage = ref('');
const yearss = ref<any[]>([]);
const crddates: any = ref([]);
const Orderchartlist = ref<any>([]);
const FGList = ref<any>([]);
const pos: any = ref([]);
const isdrowdown = ref(false);
const visible4 = ref(false);
const HideCancel = ref(true);
const Emps = ref<any>([]);
const groups = ref<any>([]);
const WhatsappResponse = ref('');
const showPOSuggestions = ref(false);
const open = ref(false);
const wbutton = ref(true);
const pocompletion = ref('');
const isSuccess = ref(false);
const isError = ref(false);
const POSEIDARTICLELIST = ref<any>([]);
const showResults = ref(false);
const poCompletiondata = ref<any>([]);
const shipmentarticle = ref('');
const selectedRowIndex = ref<number | null>(null);
const dropDownContainer = ref<HTMLElement | null>(null);
const clickvaluedata = ref(null);

// ==============================================================
// Filters Start  
// ==============================================================

const generateFormModel = () => {
  return {
    year: '',
    month: '',
    crd: [] as string[],
    po: '',
    model: '',
    selectedDepartment: '',
    message: '',
    phno: '',
    selectedtel: '',
    seid: '',
    funpo: '',
    funarticle: '',
  };
};
const formModel = ref(generateFormModel());

const months: any = [
  { Name: 'January', value: 1 },
  { Name: 'February', value: 2 },
  { Name: 'March', value: 3 },
  { Name: 'April', value: 4 },
  { Name: 'May', value: 5 },
  { Name: 'June', value: 6 },
  { Name: 'July', value: 7 },
  { Name: 'August', value: 8 },
  { Name: 'September', value: 9 },
  { Name: 'October', value: 10 },
  { Name: 'November', value: 11 },
  { Name: 'December', value: 12 },
];

const formatCRDDate = (datestring: string) => {
  const date = new Date(datestring);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const GetNearCRDMethod = async () => {
  try {
    setLoading(true);
    const data: any = await GetNearestCRDValue();
    const crdvalue = data.list[0].CR_REQDATE;
    const formattedCRD = formatCRDDate(crdvalue);
    formModel.value.crd = [formattedCRD];
  } catch (error: any) {
    errorMessage.value = error.message;
    Notification.error({
      title: 'CRD',
      content: errorMessage.value
    })
  } finally {
    setLoading(false);
  }
};

const handleClickEvent = (event: MouseEvent) => {
  if (
    dropDownContainer.value &&
    !dropDownContainer.value.contains(event.target as Node)
  ) {
    isdrowdown.value = false;
    showPOSuggestions.value = false;
  }
};

function NullValuesCRD() {
  return formModel.value.month === '';
}

const CRDDATa = async () => {
  try {
    setLoading(true);
    if (formModel.value.year !== '') {
      formModel.value.crd = [];
      formModel.value.po = '';
      formModel.value.model = '';
      const dd: any = await GetCRDData(formModel.value);
      crddates.value = dd.list;
    } else {
      formModel.value.month = '';
      Notification.error({
        content: 'Select Year First',
      });
    }

  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      title: 'CRD DATES ',
      content: errorMessage.value,
    });
  } finally {
    setLoading(false);
  }
};

const GETYears = async () => {
  try {
    setLoading(true);
    const dd: any = await GetYearsValues();
    yearss.value = dd.list;
  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      title: 'Year',
      content: errorMessage.value,
    });
  } finally {
    setLoading(false);
  }
};

const toggle = () => {
  isdrowdown.value = !isdrowdown.value;
};

// ==============================================================
// Filters End  
// ==============================================================

// ==============================================================
// Charts Start  
// ==============================================================

const OrderChartmethod = async () => {
  try {
    setLoading(true);
    const merpo = formModel.value.po.split('&')[0];
    formModel.value.po = merpo;
    const dd: any = await GetOrderChartDetails(formModel.value);
    const valuee = dd.list;
    const transformedData = valuee.map((item: any) => ({
      name: item.NAME,
      value: item.VALUE,
    }));
    Orderchartlist.value = transformedData;
    if (transformedData.length > 0) {
      Notification.success({
        title: 'ORDER ARTICLE QUANTITY',
        content: 'Data Retrived Successfullu'
      })
    }
    else {
      Notification.error({
        title: 'ORDER ARTICLE QUANTITY',
        content: 'No Data'
      })
    }
  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      title: 'Order',
      content: errorMessage.value,
    });
  } finally {
    setLoading(false);
  }
};

const ShipmentDetailsMethod = async () => {
  try {
    setLoading(true);
    const merpo = formModel.value.po.split('&')[0];
    formModel.value.po = merpo;
    const data: any = await ShipmentDetailsData(formModel.value);
    const val = data.list;
    const transformedData = val.map((item: any) => ({
      name: item.NAME,
      value: item.VALUE,
    }));
    FGList.value = transformedData;
    if (transformedData.length > 0) {
      Notification.success({
        title: 'SHIPMENT ARTICLE QTY',
        content: 'Data Retrived Successfullu'
      })
    }
    else {
      Notification.error({
        title: 'SHIPMENT ARTICLE QTY',
        content: 'No Data'
      })
    }
  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      title: 'FG',
      content: errorMessage.value,
    });
  } finally {
    setLoading(false);
  }
};

const { chartOption } = useChartOption((isDark) => {
  return {
    tooltip: {
      show: true,
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['50%', '70%'],
        itemStyle: {
          itemWidth: 1,
          color: '',
        },
        data: Orderchartlist.value,
      },
    ],
  };
});

const { FGInboundchart } = useChartOption((isDark) => {
  return {
    tooltip: {
      show: true,
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['50%', '70%'],
        itemStyle: {
          itemWidth: 1,
          color: '',
        },
        data: FGList.value,
      },
    ],
  };
});

// ============================================================== 
// Charts End 
// ============================================================== 

// ============================================================== 
// Table Part Start  
// ============================================================== 

const PODetails = async (params: any, param: any, sarticle: any) => {
  try {
    setLoading(true);
    formModel.value.model = params;
    const merpo = formModel.value.po.split('&')[0];
    formModel.value.po = merpo;
    const data: any = await GetPOsCRD(formModel.value, param, sarticle);
    if (data.list.length > 0) {
      Notification.success({
        title: 'PO Details',
        content: 'Data return Successfully'
      })
    }
    else {
      Notification.error({
        title: 'PO Details',
        content: 'NO Data'
      })
    }
    pos.value = data.list.map((item: any) => {
      const formatDate = (date: string) => {
        if (date == null) {
          return null;
        }
        const currentDate = new Date(date);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
      };
      return {

        MER_PO: item.MER_PO,
        SE_ID: item.SE_ID,
        NAME_S: item.NAME_S,
        SE_DAY: formatDate(item.SE_DAY),
        CR_REQDATE: formatDate(item.CR_REQDATE),
        NLT: formatDate(item.NLT),
        SE_QTY: item.SE_QTY,
        POSTING_DATE: formatDate(item.POSTING_DATE),
        SHIPMENT_QTY: item.SHIPMENT_QTY,
        CUTFINISHDATE: formatDate(item.CUTFINISHDATE),
        STITFINISHDATE: formatDate(item.STITFINISHDATE),
        ASSYFINISHDATE: formatDate(item.ASSYFINISHDATE),
        NEW_CUT: item.WEEK,
        NEW_ASS: item.NEW_ASS,
        COMP_CUT_QTY: item.COMP_CUT_QTY,
        COM_STIT_QTY: item.COM_STIT_QTY,
        COM_ASS_QTY: item.COM_ASS_QTY,
        WEE_END_DATE: formatDate(item.WEE_END_DATE),
        WEE_START_DATE: formatDate(item.WEE_START_DATE),
        CUT_SCH_QTY: item.C,
        STIT_SCH_QTY: item.S,
        ASS_SCH_QTY: item.A
      };
    });

    console.log(data);

    console.log(pos.value);
  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      title: 'PO Details',
      content: errorMessage.value,
    });
  } finally {
    setLoading(false);
  }
};

const exportToExcel = () => {
  console.log(pos);
  const dataToExport = pos.value.map((item: any) => {
    return {
      MER_PO: item.MER_PO,
      SE_ID: item.SE_ID,
      NAME_S: item.NAME_S,
      SE_DAY: item.SE_DAY,
      CR_REQDATE: item.CR_REQDATE,
      NLT: item.NLT,
      SE_QTY: item.SE_QTY,
      POSTING_DATE: item.POSTING_DATE,
      SHIPMENT_QTY: item.SHIPMENT_QTY,
      CUTFINISHDATE: item.CUTFINISHDATE,
      STITFINISHDATE: item.STITFINISHDATE,
      ASSYFINISHDATE: item.ASSYFINISHDATE,
      NEW_CUT: item.WEEK,
      NEW_ASS: item.NEW_ASS,
      COMP_CUT_QTY: item.COMP_CUT_QTY,
      COM_STIT_QTY: item.COM_STIT_QTY,
      COM_ASS_QTY: item.COM_ASS_QTY,
    };
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(dataToExport);

  XLSX.utils.book_append_sheet(wb, ws, 'SE_ID');

  XLSX.writeFile(wb, 'PODETAILS.xlsx');
};

const columns = reactive([
  { title: 'View', dataIndex: 'Detail_view', key: 'Detail_view' },
  { title: 'Time lines', dataIndex: 'Time_line', key: 'Time_line' },
  { title: 'PO NO', dataIndex: 'MER_PO', key: 'MER_PO' },
  { title: 'Sales Order', dataIndex: 'SE_ID', key: 'SE_ID' },
  { title: 'Article', dataIndex: 'NAME_S', key: 'NAME_S' },
  { title: 'Order date', dataIndex: 'SE_DAY', key: 'SE_DAY' },
  { title: 'CRD', dataIndex: 'CR_REQDATE', key: 'CR_REQDATE' },
  { title: 'PSDD', dataIndex: 'NLT', key: 'NLT' },
  { title: 'Order qty', dataIndex: 'SE_QTY', key: 'SE_QTY' },
  {
    title: 'Cutting',
    dataIndex: 'CUTFINISHDATE',
    key: 'CUTFINISHDATE',
  },
  {
    title: 'Stitching',
    dataIndex: 'STITFINISHDATE',
    key: 'STITFINISHDATE',
  },
  {
    title: 'Assembly',
    dataIndex: 'ASSYFINISHDATE',
    key: 'ASSYFINISHDATE',
  },
  { title: 'Shipment qty', dataIndex: 'SHIPMENT_QTY', key: 'SHIPMENT_QTY' },
  {
    title: 'Shipment Date',
    dataIndex: 'POSTING_DATE',
    key: 'POSTING_DATE',
  },
  { title: 'Status', dataIndex: '', key: '' },
]);

const toMonthDayRange = (start: string, end: string): string => {
  if (!start || !end) return "";

  const parse = (d: string) => {
    const parts = d.split("/");
    return `${parts[1]}/${parts[2]}`;
  };
  return `${parse(start)}-${parse(end)}`;
};

const getBackgroundColor = (
  plannedWeek: string,
  completedQty: number,
  totalQty: number
): string => {

  const weekEnd = plannedWeek ? new Date(plannedWeek) : null; 

  const today = new Date();

  if (totalQty > 0 && completedQty >= totalQty) {
    return "color-green"; // Done
  }

  if (!weekEnd) return "color-black";

  if (completedQty >= 0 && today <= weekEnd) {
    return "color-orange"; // In progress
  }

  if (completedQty >= 0 && today > weekEnd) {
    return "color-red"; // Delay
  }

  return "color-black"; // Default
};

const getBackgroundColorforCutting = (po: any) =>
  getBackgroundColor(po?.WEE_END_DATE, po?.COMP_CUT_QTY, po?.SE_QTY);

const getBackgroundColorforStitching = (po: any) =>
  getBackgroundColor(po?.WEE_END_DATE, po?.COM_STIT_QTY, po?.SE_QTY);

const getBackgroundColorforAssembly = (po: any) =>
  getBackgroundColor(po?.WEE_END_DATE, po?.COM_ASS_QTY, po?.SE_QTY);


const getrowcolor = (po: any) => {
  const today = new Date();
  const crd: any = new Date(po.NLT);

  const cut = getBackgroundColorforCutting(po);
  const st = getBackgroundColorforStitching(po);
  const ass = getBackgroundColorforAssembly(po);

  const groupedData = pos.value.reduce((acc: any, current: any) => {
    const seid = current.SE_ID;
    if (!acc[seid]) acc[seid] = { shipment: 0, order: 0 };
    acc[seid].shipment += current.SHIPMENT_QTY;
    acc[seid].order = current.SE_QTY;
    return acc;
  }, {});

  const { shipment, order } = groupedData[po.SE_ID] || {
    shipment: 0,
    order: 0,
  };

  const allDone =
    cut === "color-green" &&
    st === "color-green" &&
    ass === "color-green" &&
    shipment === order;

  const AnyDone =
    cut === "color-green" ||
    st === "color-green" ||
    ass === "color-green" ;  

    const AnyOngoing =
    cut === "color-orange" ||
    st === "color-orange" ||
    ass === "color-orange" ;  

  const anyDelay =
    cut === "color-red" || st === "color-red" || ass === "color-red";

  const allNotStarted =
    cut === "color-black" &&
    st === "color-black" &&
    ass === "color-black" &&
    shipment === 0;

  // ======================
  // Final Priority Rules
  // ======================

  if (allDone) return "color-green";

  if (shipment === order) return 'color-green';

  if (!anyDelay && shipment > 0 && today <= crd) return "color-orange";

  if (!anyDelay && (AnyDone || AnyOngoing ) && today <= crd) return "color-orange";  

  if (anyDelay || (today > crd && shipment !== order)) return "color-red";

  if (allNotStarted) return "color-black";

  return "color-black";
};

// ============================================================== 
// Table Part End 
// ============================================================== 

// ============================================================== 
// Search End 
// ============================================================== 

const HandleQuery = async () => {
  if (formModel.value.po === '') {
    if (formModel.value.crd.length === 0) {
      Notification.warning({
        title: 'CRD',
        content: 'Please select crd',
      });
    } else {
      pocompletion.value = '';
      await OrderChartmethod();
      await ShipmentDetailsMethod();
      shipmentarticle.value = "";
      await PODetails(formModel.value.model, pocompletion.value, shipmentarticle);
    }
  } else {
    await OrderChartmethod();
    await ShipmentDetailsMethod();
    shipmentarticle.value = "";
    await PODetails(formModel.value.model, pocompletion.value, shipmentarticle);
  }
};

// ============================================================== 
// Search End 
// ============================================================== 

// ==============================================================
// PO Completion Start   
// ==============================================================

const PoCompletionPercent = async () => {
  try {
    setpopLoading(true);
    const dd: any = await PoCompletionPercentage(formModel.value);
    const valuesw = dd.list;
    const transformedData = valuesw.map((item: any) => ({
      value: item.VALUE,
      name: item.NAME,
    }));
    console.log(transformedData);
    poCompletiondata.value = transformedData;
    console.log(poCompletiondata.value);
    if (transformedData.length > 0) {
      Notification.success({
        title: 'PO COMPLETION',
        content: 'Data Retrived Successfullu'
      })
    }
    else {
      Notification.error({
        title: 'PO COMPLETION',
        content: 'No Data'
      })
    }
  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      title: 'PO Completion',
      content: errorMessage.value,
    });
  } finally {
    setpopLoading(false);
  }
};

const OpenPOCompletionPercentage = async () => {
  if (formModel.value.crd.length !== 0) {
    visible4.value = !visible4.value;
    PoCompletionPercent();
  } else {
    Notification.error({
      title: 'CRD',
      content: 'Select CRD',
    });
  }
};

interface Colors {
  [key: string]: string;
}

const colors: Colors = {
  COMPLETED: '#93CF76',
  REMAINING: '#EE6666',
};

const { chartOption2 } = useChartOption((isDark) => {
  return {
    legend: {
      left: 'center',
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: 'black',
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        label: {
          formatter: '{d}%',
          fontSize: 10,
          color: 'black',
        },
        itemStyle: {
          borderWidth: 1,
          color: (data: { name: string }) => {
            return colors[data.name] || 'Gray';
          },
        },
        data: poCompletiondata.value,
        animation: true,
        animationType: 'scale',
        animationDuration: 1000,
        animationEasing: 'cubicOut',
      },
    ],
  };
});

// ==============================================================
// PO Completion End  
// ==============================================================

// ==============================================================
// WhatsApp Start  
// ==============================================================

const handleOk = async () => {
  const issue = formModel.value.message;
  const dept = formModel.value.selectedDepartment;
  const PHNO = formModel.value.selectedtel;
  WhatsappResponse.value = '';
  if (issue === '' || issue === null) {
    Notification.warning({
      title: 'Issue',
      content: 'Please Enter Issue',
    });
  } else if (dept === '' && PHNO === '') {
    Notification.warning({
      title: 'Department/PHNO',
      content: 'Please select Department Or PHNO',
    });
  } else {
    try {
      setLoading(true);
      interface ApiResponse {
        list: { Status: string; Message: string }[];
      }
      const data: any = await IssueRaise(issue, dept, PHNO);
      console.log('Response Data:', data);
      if (data === 'Success') {
        formModel.value.message = '';
        formModel.value.selectedDepartment = '';
        formModel.value.phno = '';
        Message.success('Message Sent Successfully');
        isSuccess.value = true;
        isError.value = false;
        WhatsappResponse.value = `Message Sent Successfully to ${formModel.value.selectedtel} Mobile Number`;
        formModel.value.phno = '';
        formModel.value.selectedDepartment = '';
        formModel.value.selectedtel = '';
      } else {
        isError.value = true;
        isSuccess.value = false;
        WhatsappResponse.value = `Message Failed to send`;
        Message.error('Message Failed to send');
      }
    } catch (e) {
      console.error('Error occurred in GetTableData:', e);
    } finally {
      setLoading(false);
    }
  }
};

const closebuttonclick = () => {
  formModel.value.message = '';
  formModel.value.phno = '';
  formModel.value.selectedDepartment = '';
  WhatsappResponse.value = '';
  open.value = false;
  wbutton.value = true;
};

const Minimizebuttonclick = () => {
  open.value = false;
  wbutton.value = true;
};

const SearchEmpByBarcodeMethod = async () => {
  if (formModel.value.phno.trim() !== '') {
    formModel.value.phno = formModel.value.phno.toUpperCase();
  }
  if (formModel.value.phno.trim() === '') {
    showResults.value = false;
    return;
  }

  const data: any = await SearchEmpByBarcode(formModel.value);
  Emps.value = data.list;
  if (Emps.value.length <= 0) {
    isError.value = true;
    isSuccess.value = false;
    WhatsappResponse.value = 'Employee Not Registerd in HR';
  } else {
    WhatsappResponse.value = '';
  }
  showResults.value = true;
};

const selectEmployee = (emp: any) => {
  formModel.value.phno = emp.EMP;
  formModel.value.selectedtel = emp.TEL;
  showResults.value = false;
};

const selectEmployee2 = () => {
  if (Emps.value.length > 0) {
    selectEmployee(Emps.value[0]);
  }
};

const hideDropdown = () => {
  showResults.value = false;
};

const showDropdown = () => {
  if (Emps.value.length > 0) {
    showResults.value = true;
  }
};

const GroupsForSendWhatsappMethod = async () => {
  const data: any = await GroupsForSendWhatsapp();
  groups.value = data.list;
};

const wbuttonclick = () => {
  open.value = true;
  wbutton.value = false;
  SearchEmpByBarcodeMethod();
  GroupsForSendWhatsappMethod();
};

// ==============================================================
// WhatsApp End 
// ==============================================================

// ==============================================================
// PO Suggestion Part Start 
// ==============================================================

const POLISTMethod = async () => {
  if (formModel.value.po.trim() === '') {
    showPOSuggestions.value = false;
    return;
  }
  const data: any = await POSEIDARTICLESuggetions(formModel.value, 'PO');
  POSEIDARTICLELIST.value = data.list;
  if (POSEIDARTICLELIST.value.length > 0) {
    showPOSuggestions.value = true;
  } else {
    showPOSuggestions.value = false;
  }
};

const hideDropdownPOsuggetion = () => {
  showPOSuggestions.value = false;
};

const showDropdownPOSuggetion = () => {
  if (POSEIDARTICLELIST.value.length > 0) {
    showPOSuggestions.value = true;
  }
};

const selectPO = (po: any) => {
  formModel.value.po = po.CUSTOMER_PO;
  showPOSuggestions.value = false;
};

const selectpoSuggetion = () => {
  if (POSEIDARTICLELIST.value.length > 0) {
    selectPO(POSEIDARTICLELIST.value[0]);
  }
};

// ===============================================================
// PO Suggestion Part End 
// =============================================================== 

// ===============================================================
// Next Page MOve Start  
// ===============================================================

const curentview = ref<'buttons' | 'Trackpo' | 'MaterialPage' | 'timeline' | 'Material'>('buttons');
const components: any = {
  Trackpo: TrackingPO,
  MaterialPage: Material,
  Material: MaterialCheck,
  timeline: timelines,
};

const gotoTimeline = (row: any) => {
  clickvaluedata.value = row;
  curentview.value = 'timeline';
};

const goBack = () => {
  curentview.value = 'buttons';
};

const DetailViewclick = (row: any) => {
  clickvaluedata.value = row;
  curentview.value = 'Trackpo';
};

const OpenMaterialmatching = () => {
  curentview.value = 'MaterialPage';
};

// ===============================================================
// Next Page MOve End  
// ===============================================================

onMounted(() => {
  document.addEventListener('click', handleClickEvent);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickEvent);
});

onMounted(async () => {
  await GETYears();
  await GetNearCRDMethod();
  await HandleQuery();
});

</script>
<style scoped>
.dropdown {
  padding: 8px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.dropdowncontainer {
  width: 100%;
  max-width: 300px;
  position: relative;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  cursor: pointer;
}

.dropdown-options label {
  display: block;
  margin-bottom: 8px;
}

.dropdown-options input {
  margin-right: 8px;
}

.po_class {
  background-color: blueviolet;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  font-weight: bold;
}

.a-card {
  border-radius: 5px;
  max-height: 38vh;
  width: 100%;
  background-color: #def2f1;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  transition: all 3s ease;
  overflow-y: auto;
  margin-top: 10px;
}

.a-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
}

.table-container {
  width: 100%;
  border-radius: 5px;
}

.table_wrapper {
  width: 100%;
}

tr th {
  background-color: blue;
  color: white;
  font-weight: bold;
  padding: 10px;
  top: 0;
  z-index: 1;
  text-align: center;
  min-width: 100px;
  max-width: 400px;
}

tbody {
  max-height: 250px;
  text-align: center;
}

tbody td,
tr th {
  text-align: center;
  padding: 10px;
}

td {
  background-color: #8697c4;
  font-weight: bold;
  cursor: pointer;
  min-width: 100px;
  text-align: center;
  color: black;
}



tr:hover {
  color: white;
  background-color: red;
}

.table_wrapper th,
.table_wrapper td {
  box-sizing: border-box;
}

.submitbutton,
.material-button,
.pocompletion-button {
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  padding: 7px 20px 7px 20px;
  text-align: center;

}

.submitbutton:hover,
.material-button:hover,
.pocompletion-button:hover {
  background-color: rgb(55, 41, 247);
  color: white;
}

.submitbutton {
  background: #7f06f0;
}

.material-button {
  background-color: #874f41;
}

.pocompletion-button {
  background-color: #6f118f;
}

.whatsapp-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 40px;
  right: 10px;
  z-index: 1000;
  border: 2px solid white;
  background: white;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s;
}

.whatsapp-button:hover {
  background-color: blueviolet;
}

.whatsapp-button i {
  color: green;
  font-size: 2rem;
}

.modal {
  position: fixed;
  z-index: 999;
  bottom: 5%;
  right: 1%;
  width: 500px;
  margin-left: -150px;
  background-color: rgba(73, 218, 223, 0.8);
  transition: calc(0);
  border-radius: 5px;
  border: 2px solid rgb(64, 176, 221);
  box-shadow: #32e721;
}

.FunctionModal {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(99, 81, 197, 0.8);
  transition: all 0.3s ease;
  border-radius: 5px;
  border: 2px solid rgb(64, 176, 221);
  box-shadow: 0 0 10px #32e721;
  overflow-x: auto;
}

h2 {
  color: #e40b0b;
  text-align: center;
  margin-top: 30px;
}

.minus:hover {
  background-color: aliceblue;
  color: rgb(14, 15, 15);
}

.times:hover {
  background-color: aliceblue;
  color: rgb(7, 7, 7);
}

.close_minimise_buttons {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}

.minus,
.times {
  padding: 5px;
  cursor: pointer;
  transition: background 0.3s;
  color: black;
  font-weight: bold;
  font-size: 15px;
}

.minus:hover,
.times:hover {
  background-color: aliceblue;
}

.dropdown2 {
  position: absolute;
  width: 100%;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 5px;
  margin: 20px;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.dropdown-item:hover {
  background: lightblue;
}

.send-button {
  padding: 5px 30px 5px 30px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  border: 2px solid #0c40ec;
  cursor: pointer;
  background-color: #0c40ec;
  color: white;
  width: 200px;
}

.emp-ph-input-field {
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0 5px 0;
}

.whatsapp-response {
  font-weight: bold;
  padding: 10px;
  margin: 10px 0px 10px 0px;
}

.whatsapp-response.success {
  color: green;
}

.whatsapp-response.error {
  color: rgb(231, 10, 10);
}

.whatsapp-note {
  color: black;
  font-weight: bold;
  padding: 10px;
}

.detail-view {
  font-weight: bold;
  font-size: 20px;
}

.detail-view:hover {
  background-color: rgb(230, 114, 20);
}

.selected-row {
  color: red;
}

.mouse-over {
  background-color: red;
}

.po-input-field {
  border-radius: 5px;
}

.article-input-field {
  border-radius: 5px;
}

.po-suggetions {
  position: absolute;
  width: auto;
  z-index: 1000;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow-y: auto;
  max-height: 200px;
  margin-top: 10px;
  padding: 10px;
  scrollbar-width: none;
}

.po-suggetion-items {
  padding: 10px;
  cursor: pointer;
  margin: 10px 30px 10px 30px;
}

.po-suggetion-items:hover {
  background-color: #15be2c;
  border-radius: 5px;
}

.color-red {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(245, 9, 9);
}

.color-black {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
}

.color-green {
  width: 30px; 
  height: 30px;
  border-radius: 50%;
  background-color: rgb(32, 219, 7);
}

.color-orange {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(233, 130, 13);
}

.headding {
  background-color: rgb(48, 128, 233);
  padding: 10px;
  color: rgb(97, 241, 14);
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
}

.issue-text {
  height: 200px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid blue;
  font-size: 14px;
  margin-top: 20px;
}

.department-text {
  width: 100%;
  border: 1px solid blue;
  margin: 10px 0 10px 0px;
  border-radius: 5px;
  padding: 5px;
}

.po-headding {
  color: #15be2c;
  font-size: 16px;
  margin-bottom: 10px;
}

.button-style {
  font-weight: bold;
  border-radius: 5px;
  width: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
}



.po-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
}

.po-heading-left {
  flex: 1;
  position: sticky;
}

.po-heading {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: rgb(58, 52, 38);
  margin-bottom: 10px;
  position: sticky;
}

.po-status-right {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  font-weight: bold;
}

.status-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 5px;
}

.status-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.green {
  background-color: rgb(43, 240, 43);
}

.status-dot.red {
  background-color: red;
}

.status-dot.orange {
  background-color: orange;
}

.status-dot.black {
  background-color: black;
}
</style>
