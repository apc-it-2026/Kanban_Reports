<template>
  <div class="container">
    <div style="color: red">{{ errorMessage }}</div>
    <a-spin :loading="loading" tip="loading...(Loading data...)" style="width: 100%">
      <div>
        <div class="tit">
          <span>{{ $t('menu.list.ChangeOver') }}</span>
        </div>

        <div>
          <a-card class="a-card">
            <a-row :gutter="16">
              <a-col :span="4" :xs="24" :sm="12" :md="4">

                <div class="div-property">

                  <span>{{ $t('ChangeOver.form.org') }}</span>
                  <a-select class="organization" v-model="formModel.selectorg" :style="{ width: '160px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                    <a-option v-for="item in orgList" :key="item.ORG_CODE" :value="item.ORG_CODE">{{ item.ORG_NAME
                    }}</a-option>
                  </a-select>
                </div>

              </a-col>
              <a-col :span="4" :xs="24" :sm="12" :md="4">
                <div class="div-property">
                  <span>{{ $t('ChangeOver.form.plant') }}</span>
                  <a-select :style="{ width: '160px' }" placeholder="select"
                    :trigger-props="{ autoFitPopupMinWidth: true }" v-model="formModel.factory_area" @change="search">
                    <a-option v-for="item in factorylist" :key="item.CODE" :value="item.CODE">
                      {{ item.ORG }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="4" :xs="24" :sm="12" :md="4">
                <div class="div-property">
                  <span>{{ $t('Report.form.b_model') }}</span>
                  <a-select :style="{ width: '160px' }" :trigger-props="{ autoFitPopupMinWidth: true }"
                    v-model="formModel.Bmodel" @change="search">
                    <a-option v-for="item in modellist" :key="item.B_MODEL" :value="item.B_MODEL">
                      {{ item.B_MODEL }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="4" :xs="24" :sm="12" :md="4">
                <div class="div-property">
                  <span>{{ $t('Report.form.a_model') }}</span>
                  <a-select :style="{ width: '160px' }" :trigger-props="{ autoFitPopupMinWidth: true }"
                    v-model="formModel.Amodel" @change="search">
                    <a-option v-for="item in modellist" :key="item.A_MODEL" :value="item.A_MODEL">
                      {{ item.A_MODEL }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>

              <a-col :span="3" :xs="24" :sm="12" :md="3">
                <div class="div-property">
                  <span>{{ $t('ReportDetails.form.type') }}</span>
                  <a-select v-model="formModel.type" :style="{ width: '160px' }"
                    :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                    <a-option v-for="item in typelist" :key="item">
                      {{ item }}
                    </a-option>
                  </a-select>
                </div>
              </a-col>

              <a-col :span="5" :xs="24" :sm="12" :md="5">
                <div class="div-property">
                  <span>{{ $t('ChangeOver.form.daterange') }}</span>
                  <a-range-picker v-model="formModel.selectdate" @change="search" />
                </div>
              </a-col>
            </a-row>
          </a-card>

        </div>

        <a-card class="a-card">
          <a-row :gutter="16">
            <a-col :span="12" :xs="24" :sm="24" :md="12">
              <a-card class="card-chart">
                <div style="display: flex;gap: 10px;align-items: center;justify-content: center;">
                  <h2 style="color: black;">{{ $t('ChangeOver.form.devicestatusPiechart') }}
                    <label> : {{ totallist }}</label>
                  </h2>
                </div>
                <Chart style="height: 300px;" :option="chartOption" @click="statusclick" />
              </a-card>

            </a-col>
            <a-col :span="12" :xs="24" :sm="24" :md="12">
              <a-card class="card-chart">
                <div style="display: flex;gap: 10px;align-items: center;justify-content: center;">
                  <h2 style="color: black;">{{ $t('ChangeOver.form.diagnosiscausesRanking') }} </h2>
                </div>
                <Chart style="height: 300px;" :option="option" @click="Reasonclick" />
              </a-card>

            </a-col>
          </a-row>
        </a-card>








        <!-- <div id="status_hide"> 
          <a-select v-model="formModel.status"> </a-select>
        </div>
        <div id="reason_hide">
          <a-select v-model="formModel.reason"> </a-select>
        </div> -->

        <a-card class="a-card" v-if="Visbleornot">
          <DataTable :value="changeoverlist" paginator :rows="10" sortMode="multiple" tableStyle="min-width: 60rem"
            dataKey="B_MODEL" responsiveLayout="scroll" class="custom-kpi-table">
            <Column field="ORG_ID" header="ORG_ID" sortable />
            <Column field="DEPARTMENT_CODE" header="DEPARTMENT_CODE" sortable />
            <Column field="CO_DATE" header="CO_DATE" sortable />
            <Column field="B_MODEL" header="B_MODEL" sortable />
            <Column field="A_MODEL" header="A_MODEL" sortable />
            <Column field="COT" header="COT" sortable />
            <Column field="COPT" header="COPT" sortable />
            <Column field="RUT" header="RUT" sortable />
            <Column field="RECORD_PROBLEMS" header="RECORD_PROBLEMS" sortable />
            <Column field="CO_STATUS" header="CO_STATUS" sortable />
          </DataTable>
        </a-card>



        <!-- <div class="table_container" id="table">
          <div class="table_scroll">
            <table cellspacing="0" border="1" cellpadding="0">
              <thead>
                <tr>
                  <th v-for="(column, index) in columns" :key="index">{{
                    column
                  }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in changeoverlist" :key="rowIndex">
                  <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->



      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import useChartOption from '@/hooks/chart-option';
import useReasoncharts from '@/hooks/reason_charts';
import useLoading from '@/hooks/loading';
import {
  Getorg,
  ChangeOverRate,
  ReasonRate,
  Getfactory,
  GetModel,
  GetTotalChangeover,
  ChangeoverDetails,
} from '@/api/kanbandevicea';

const Visbleornot = ref(false);
const formatDate = (date: any) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
  return `${year}-${month}-${day}`;
};

const generateFormModel = () => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    selectorg: '0000',
    selectdate: [formatDate(firstDayOfMonth), formatDate(lastDayOfMonth)],
    factory_area: '0000',
    Amodel: 'All',
    Bmodel: 'All',
    TNCO: '0',
    type: 'All',
    status: 'All',
    reason: 'All',
  };
};

const { loading } = useLoading();
const orgList = ref<any>([]);
const formModel = ref(generateFormModel());
const data = ref<any>([]);
const errorMessage = ref('');
const data1 = ref<any>([]);
const factorylist = ref<any>([]);
const modellist = ref<any>([]);
const totallist = ref<any>([]);
const typelist = ['All', 'Unplanned_Changeover', 'Scheduled'];
const changeoverlist = ref<any>([]);
// const columns = [
//   'ORG_ID',
//   'DEPARTMENT_CODE',
//   'CO_DATE',
//   'B_MODEL',
//   'A_MODEL',
//   'COT',
//   'COPT',
//   'RUT',
//   'RECORD_PROBLEMS',
//   'CO_STATUS',
// ];

interface Colors {
  [key: string]: string;
}

const colors: Colors = {
  Not_Started: '#327fe3',
  Completed: '#49750c',
  Delay: '#de3746',
  Ongoing: '#dede2f',
  Cancelled: '#ff0066', // pink (for cancelled)
};

const { chartOption } = useChartOption((isDark) => {
  return {
    legend: {
      left: 'center',
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: 'black',
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
          color: 'black',
        },
        itemStyle: {
          borderColor: 'black',
          borderWidth: 1,
          color: (data: { name: string }) => {
            return colors[data.name] || 'gray';
          },
        },
        data: data.value,
      },
    ],
  };
});

const { option } = useReasoncharts((isDark) => {
  return {
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
        },
      ],
    },
    series: [
      {
        type: 'pie',
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: 'black',
        },
        itemStyle: {
          borderColor: 'black',
          borderWidth: 1,
        },
        data: data1.value,
      },
    ],
  };
});

const statusclick = (event: any) => {
  if (event.seriesType === 'pie') {
    formModel.value.reason = '';
    const clickedSegment: string = event.name;
    formModel.value.status = clickedSegment;
    show();
  }
};
const Reasonclick = (event: any) => {
  if (event.seriesType === 'pie') {
    formModel.value.status = '';
    const clickedSegment: string = event.name;
    formModel.value.reason = clickedSegment;
    show();
  }
};

const show = async () => {
  Visbleornot.value = true; 
  const data5: any = await ChangeoverDetails(formModel.value);
  if (data5.list.length < 1) {
    Visbleornot.value = false;
    alert('No Data ');
  }
  changeoverlist.value = data5.list;
};

const hide = async () => {
  const divToHide = document.getElementById('table') as HTMLElement | null;
  if (divToHide) {
    divToHide.style.display = 'none';
  } else {
    console.error('The div element with the specified id does not exist.');
  }
};

const search = async () => {
  setLoading(true);
  setLocal();
  try {
    const datalist1: any = await ChangeOverRate(formModel.value);
    const valuesw = datalist1.list;
    const transformedData = valuesw.map((item: any) => ({
      value: item.VALUE,
      name: item.NAME,
    }));
    if (transformedData.length < 1) {
      alert('No Change over Data ');
    }

    data.value = transformedData;
    console.log(data.value);
    const totaldata: any = await GetTotalChangeover(formModel.value);
    const valuess = totaldata.list;
    totallist.value = valuess[0]?.TOTAL;

    const datalist2: any = await ReasonRate(formModel.value);
    const valueswe = datalist2.list;
    const datatransform = valueswe.map((item: any) => ({
      value: item.VALUE,
      name: item.NAME,
    }));
    if (datatransform.length < 1) {
      alert('No Reason Data ');
    }
    data1.value = datatransform;
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
    hide();
  }
};

const getorglist = async () => {
  const orgdata: any = await Getorg();
  orgdata.list.unshift({ ORG_CODE: '0000', ORG_NAME: 'All' });
  orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  const plantdata: any = await Getfactory();
  plantdata.list.unshift({ CODE: '0000', ORG: 'All' });
  factorylist.value = JSON.parse(JSON.stringify(plantdata.list));
  const modeldata: any = await GetModel();
  modeldata.list.unshift({ A_MODEL: 'All', B_MODEL: 'All' });
  modellist.value = JSON.parse(JSON.stringify(modeldata.list));
  search();
};

const { setLoading } = useLoading();

function setLocal() {
  window.sessionStorage.setItem('org_code', formModel.value.selectorg);
  window.sessionStorage.setItem(
    'selectdate',
    JSON.stringify(formModel.value.selectdate)
  );
  window.sessionStorage.setItem('factory_area', formModel.value.factory_area);
  window.sessionStorage.setItem('Amodel', formModel.value.Amodel);
  window.sessionStorage.setItem('Bmodel', formModel.value.Bmodel);
  window.sessionStorage.setItem('TNCO', formModel.value.TNCO);
  window.sessionStorage.setItem('type', formModel.value.type);
  window.sessionStorage.setItem('status', formModel.value.status);
  window.sessionStorage.setItem('reason', formModel.value.reason);
}

const statushide = async () => {
  const divToHide = document.getElementById(
    'status_hide'
  ) as HTMLElement | null;
  if (divToHide) {
    divToHide.style.display = 'none';
  }
};

const reasonhide = async () => {
  const divToHide = document.getElementById(
    'reason_hide'
  ) as HTMLElement | null;
  if (divToHide) {
    divToHide.style.display = 'none';
  }
};
onMounted(async () => {
  getorglist();
  hide();
  statushide();
  reasonhide();

});
</script>

<script lang="ts">
export default {
  name: 'ChangeOver',
};
</script>
<style scoped>
.tit {
  text-align: center;
  color: black;
  margin-bottom: 10px;
  background-color: rgb(94, 205, 233);
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-weight: bold;
  font-size: 20px;

}

.container {
  width: 100%;
  height: 100%;
  background-color: #C4DBF6;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; 
}


.div-property {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: rgb(235, 118, 118);
  color: rgb(252, 248, 248);
  border-radius: 5px;
  gap: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  font-weight: bold;
}

.a-card {
  margin: 5px 0px 5px 0px;
  background-color: rgb(73, 63, 119);
}

.card-chart {
  background-color: rgb(248, 210, 233);
  border-radius: 5px;
  /* color: rgb(226, 26, 26); */
}

::v-deep(.custom-kpi-table) {
    margin-top: 10px;
  }

  /* Style for table header */
  ::v-deep(.custom-kpi-table thead th) {
    background-color: #3db479;
    color: rgb(219, 32, 32); /* red */
    text-align: center;
    font-weight: bold;
  }
 /* Style for even rows in the table body */
 ::v-deep(.custom-kpi-table tbody td) {
  background-color: rgb(196, 189, 189) !important;
  color: rgb(7, 7, 7) !important;
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }

  .right-side {
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>
