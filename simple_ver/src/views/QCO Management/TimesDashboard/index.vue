<template>
  <div class="container">
    <div style="color: red">{{ errorMessage }}</div>
    <a-spin :loading="loading" tip="loading...(Loading data...)" style="width: 100%">
      <div class="tit"><span>
          {{ $t('TimesDashboard.form.TimesDashboard') }}
        </span></div>
      <div>
        <a-card class="a-card">
          <a-row :gutter="16">
            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div class="div-propertytyt">
                <span>{{ $t('TimesDashboard.form.org') }}</span>
                <a-select v-model="formModel.selectorg" :style="{ width: '160px' }"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in orgList" :key="item.ORG_CODE" :value="item.ORG_CODE">{{ item.ORG_NAME
                    }}</a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="5" :xs="24" :sm="12" :md="5">
              <div class="div-propertytyt">
                <span>{{ $t('TimesDashboard.form.plant') }}</span>
                <a-select :style="{ width: '160px' }" @change="search" placeholder="select"
                  :trigger-props="{ autoFitPopupMinWidth: true }" v-model="formModel.factory_area">
                  <a-option v-for="item in factorylist" :key="item.CODE" :value="item.CODE">
                    {{ item.ORG }}
                  </a-option>
                </a-select>
              </div>
            </a-col>

            <a-col :span="5" :xs="24" :sm="12" :md="5">
              <div class="div-propertytyt">
                <span>{{
                  $t('TimesDashboard.form.b_model')
                  }}</span>
                <a-select :style="{ width: '160px' }" :trigger-props="{ autoFitPopupMinWidth: true }"
                  v-model="formModel.Bmodel" @change="search">
                  <a-option v-for="item in modellist" :key="item.B_MODEL" :value="item.B_MODEL">
                    {{ item.B_MODEL }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div class="div-propertytyt">
                <span>{{
                  $t('TimesDashboard.form.a_model')
                  }}</span>
                <a-select :style="{ width: '160px' }" :trigger-props="{ autoFitPopupMinWidth: true }"
                  v-model="formModel.Amodel" @change="search">
                  <a-option v-for="item in modellist" :key="item.A_MODEL" :value="item.A_MODEL">
                    {{ item.A_MODEL }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertytyt">
                <span>{{ $t('TimesDashboard.form.daterange') }}</span>
                <a-range-picker v-model="formModel.selectdate" @change="search" />
              </div>
            </a-col>
          </a-row>
        </a-card>


        <a-card style="background-color: #90aead;">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8">
              <a-card class="card-for-rutcotccpt">
                <h2
                  style="text-align: center ; background-color: rosybrown;padding: 5px;border-radius: 5px;color: white;">
                  {{
                    $t('TimesDashboard.form.cot')
                  }}</h2>
                <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
                  <h3>{{ $t('TimesDashboard.form.totalcot') }} :
                    <label>{{ totalcot }} </label>
                  </h3>
                  <h3>{{ $t('TimesDashboard.form.avgcot') }} :
                    <label>{{ avgcot }}</label>
                  </h3>
                </div>

                <Chart style="height: 300px;" :option="chartOption" @click="Rowclick('COT')" />

              </a-card>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-card class="card-for-rutcotccpt">
                <h2
                  style="text-align: center; background-color: rosybrown;padding: 5px;border-radius: 5px;color: white;">
                  {{
                    $t('TimesDashboard.form.copt')
                  }}</h2>
                <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
                  <h3>{{ $t('TimesDashboard.form.totalcopt') }} :<label>{{
                    totalcopt
                      }}</label>
                  </h3>
                  <h3>{{ $t('TimesDashboard.form.avgcopt') }} :<label>{{
                    avgcopt
                      }}</label>
                  </h3>
                </div>

                <Chart style="height: 300px;" :option="option" @click="Rowclick('COPT')" />
              </a-card>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <!-- <a-spin style="width: 100%" :loading="loading"> -->
              <a-card class="card-for-rutcotccpt">
                <h2
                  style="text-align: center ; background-color: rosybrown;padding: 5px;border-radius: 5px;color: white;">
                  {{
                    $t('TimesDashboard.form.rut')
                  }}</h2>
                <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
                  <h3>{{ $t('TimesDashboard.form.totalrut') }} :<label>{{
                    totalrut
                      }}</label>
                  </h3>
                  <h3>{{ $t('TimesDashboard.form.avgrut') }} :<label>{{
                    avgrut
                      }}</label>
                  </h3>
                </div>

                <Chart style="height: 300px;" :option="RUToption" @click="Rowclick('RUT')" />
              </a-card>

              <!-- </a-spin -->
            </a-col>
          </a-row>
        </a-card>


      </div>
      <a-card style="  margin-top: 10px;" v-if="displayofnot">
        <DataTable :value="changeoverlist" paginator :rows="10" sortMode="multiple" tableStyle="min-width: 60rem"
          dataKey="B_MODEL" responsiveLayout="scroll" class="custom-kpi-table">
          <Column field="ORG_ID" header="ORG_ID" sortable />
          <Column field="DEPARTMENT_CODE" header="DEPARTMENT_CODE" sortable />
          <Column field="CO_DATE" header="CHANGEOVERTIME" sortable />
          <Column field="B_MODEL" header="B_MODEL" sortable />
          <Column field="A_MODEL" header="A_MODEL" sortable />
          <Column field="COT" header="COT" sortable v-if="cotcolumn"/>
          <Column field="COPT" header="COPT" sortable v-if="coptcolumn"/> 
          <Column field="RUT" header="RUT" sortable v-if="ruttcolumn" /> 
        </DataTable>
      </a-card>

      

    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useChartOption from '@/hooks/chart-option';
import useReasoncharts from '@/hooks/reason_charts';
// import RUToptioncharts from '@/hooks/RUToptions' ;

import useRUTcharts from '@/hooks/RUToptions';

import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import {
  Getorg,
  Getfactory,
  GetModel,
  GetCotCoptTotal,
  ChangeoverDetails,
  GetCotCoptrut,
} from '@/api/kanbandevicea';
// import { RefSymbol } from '@vue/reactivity';

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
  };
};

const generatecotcoptrtu = () => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    selectdate: [formatDate(firstDayOfMonth), formatDate(lastDayOfMonth)],
    cotcoptrtuvalue: '',
  };
};

const modelvalues = ref(generatecotcoptrtu());

const { loading } = useLoading();
const orgList = ref<any>([]);
const formModel = ref(generateFormModel());
const data = ref<any>([]);

const data3 = ref<any>([]);
const errorMessage = ref('');
const totalcot = ref<any>([]);
const factorylist = ref<any>([]);
const modellist = ref<any>([]);
const data2 = ref<any>([]);
const avgcot = ref<any>([]);
const avgcopt = ref<any>([]);
const avgrut = ref<any>([]);
const totalcopt = ref<any>([]);
const totalrut = ref<any>([]);
const localdate = ref<any>([]);
const changeoverlist = ref<any>([]);

 

const { RUToption } = useRUTcharts((isDark) => {
  const colors = isDark ? ['#ff9933'] : ['#ff9933'];
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'AVG RUT',
        type: 'pie',
        radius: ['40%', '70%'],
        startAngle: 200,
        endAngle: 100,
        label: {
          show: false,
        },
        data: data3.value,
        color: colors,
      },
    ],
  };
});

const { chartOption } = useChartOption((isDark) => {
  const colors = isDark ? ['#ff80aa'] : ['#ff80aa'];
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'AVG COT',
        type: 'pie',
        radius: ['40%', '70%'],
        startAngle: 200,
        endAngle: 100,
        label: {
          show: false,
        },
        data: data.value,
        color: colors,
      },
    ],
  };
});

const { option } = useReasoncharts((isDark) => {
  const colors = isDark ? ['#66a3ff'] : [' #66a3ff'];
  return {
    tooltip: {
      trigger: 'item',
    },

    legend: {
      show: true,
    },
    series: [
      {
        name: 'AVG COPT',
        type: 'pie',
        radius: ['40%', '70%'],
        startAngle: 180,
        endAngle: 90,
        label: {
          show: false,
        },
        data: data2.value,
        color: colors,
      },
    ],
  };
});

 const cotcolumn = ref(false) ; 
const coptcolumn = ref(false) ; 
const ruttcolumn = ref(false) ; 
const displayofnot = ref(false) ; 
const Rowclick = async (cot: any) => {
  debugger;
  displayofnot.value = true ; 
  if (cot === 'RUT') {
    ruttcolumn.value = true;
     coptcolumn.value = false;
         cotcolumn.value = false; 
         modelvalues.value.cotcoptrtuvalue = 'RUT' ; 
  }
  if (cot === 'COPT') {
    coptcolumn.value = true;
        cotcolumn.value = false; 
            ruttcolumn.value = false;
         modelvalues.value.cotcoptrtuvalue = 'COPT' ; 
  }
  if (cot === 'COT') {
    cotcolumn.value = true; 
      ruttcolumn.value = false;
     coptcolumn.value = false;
              modelvalues.value.cotcoptrtuvalue = 'COT' ; 
  } 
    const data = await GetCotCoptrut(modelvalues.value);
     const formattedData = data.list.map(item => {
      const date = new Date(item.CO_DATE);  // Convert the string to a Date object
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}/${month}/${day}`; // Format as 'yyyy/mm/dd'
      return {
        ...item,
        CO_DATE: formattedDate  
      };
    });
    changeoverlist.value = formattedData;
 
};

 

const hide = async () => {
  const divToHide = document.getElementById('table') as HTMLElement | null;
  if (divToHide) {
    divToHide.style.display = 'none';
  } else {
    console.error('The div element with the specified id does not exist.');
  }
};

onMounted(async () => {
  try {
    const getLocalorg = window.sessionStorage.getItem('org_code');
    const getLocaldate = window.sessionStorage.getItem('selectdate');
    const getLocalplant = window.sessionStorage.getItem('code');
    const getLocalAmodel = window.sessionStorage.getItem('a_model');
    const getLocalBmodel = window.sessionStorage.getItem('b_model');
    if (
      getLocalorg != null &&
      getLocaldate != null &&
      getLocalplant != null &&
      getLocalAmodel != null &&
      getLocalBmodel != null
    ) {
      formModel.value.selectorg = getLocalorg;
      localdate.value = JSON.parse(getLocaldate);
      formModel.value.selectdate = localdate.value;
      formModel.value.factory_area = getLocalplant;
      formModel.value.Amodel = getLocalAmodel;
      formModel.value.Bmodel = getLocalBmodel;
    }
  } catch (err) {
    Message.error(String(err));
  } finally {
    setLoading(false);
  }
});

const { setLoading } = useLoading();

const search = async () => {
  debugger;
  setLoading(true);
  setLocal();
  try {
    const datalist1: any = await GetCotCoptTotal(formModel.value);
    debugger;
    console.log(datalist1);
    totalcot.value = datalist1.list[0].TOTAL;
    debugger;
    avgcot.value = datalist1.list[0].AVERAGE;
    avgcopt.value = datalist1.list[1].AVERAGE;
    totalcopt.value = datalist1.list[1].TOTAL;
    totalrut.value = datalist1.list[2].TOTAL;
    avgrut.value = datalist1.list[2].AVERAGE;
    const valueforcot = datalist1.list.slice(0, 1);
    const valueforcopt = datalist1.list.slice(1, 2);
    const valueforrut = datalist1.list.slice(2, 3);
    // const valueee = datalist1.list ;

    const transformedData = valueforcot.map((item: any) => ({
      value: item.ROUNDEDAVERAGE,
      name: item.METRIC,
    }));

    if (transformedData[0].value === null) {
      alert('No COT Data ');
    }

    const avgdata = valueforcopt.map((item: any) => ({
      value: item.ROUNDEDAVERAGE,
      name: item.METRIC,
    }));

    if (avgdata[0].value === null) {
      alert('No COPT Data ');
    }
    const rutdata = valueforrut.map((item: any) => ({
      value: item.ROUNDEDAVERAGE,
      name: item.METRIC,
    }));
    if (avgdata[0].value === null) {
      alert('No RUT Data ');
    }

    data.value = transformedData;
    data2.value = avgdata;
    data3.value = rutdata;
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

getorglist();

function setLocal() {
  window.sessionStorage.setItem('org_code', formModel.value.selectorg);
  window.sessionStorage.setItem(
    'selectdate',
    JSON.stringify(formModel.value.selectdate)
  );
  window.sessionStorage.setItem('factory_area', formModel.value.factory_area);
  window.sessionStorage.setItem('Amodel', formModel.value.Amodel);
  window.sessionStorage.setItem('Bmodel', formModel.value.Bmodel);
}

const hasapicall = ref(false);

onMounted(async () => {
  try {
    // Only make the API call if it hasn't been made yet
    if (!hasapicall.value) {
      hasapicall.value = true; // Set the flag to true before making the API call to prevent future calls
      await getorglist(); // Call the API to fetch the organization list
      hide(); // Hide the relevant section
      // search(); // Execute the search
    }
  } catch (error) {
    console.log('Error during API call:', error);
  }
});

//   onMounted(async () => {
//   await Promise.all([getorglist(), hide(), search()]);
// });
</script>
<script lang="ts">
export default {
  name: 'TimesDashboard',
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

.a-card {
  background-color: rgb(100, 104, 45);
  border-radius: 5px;
  margin-bottom: 10px;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #86d1d8;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}



.div-propertytyt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 5px;
  /* background-color: rgb(235, 118, 118); */
  color: rgb(252, 248, 248);
  border-radius: 5px;
  gap: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  flex-direction: column;
}

.card-for-rutcotccpt {
  background-color: rgb(250, 255, 252);
}
::v-deep(.custom-kpi-table) {
  margin-top: 10px;
}

::v-deep(.custom-kpi-table thead th) {
  background-color: #2196f3;
  color: white;
}

::v-deep(.custom-kpi-table tbody tr:nth-child(even) td) {
  background-color: rgb(240, 217, 217);
  color: black;
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
