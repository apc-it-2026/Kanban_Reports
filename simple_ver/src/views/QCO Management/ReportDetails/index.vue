<template>
  <div class="container">
    <div style="color: red">{{ errorMessage }}</div>
    <a-spin :loading="loading" tip="loadding .....(Loading..)" style="width: 100%">
      <div>
        <div class="tit">
          <span>{{ $t('ReportDetails.form.changeoverdetails') }}</span>
        </div>
        <!-- <div> -->
        <a-card class="a-card">
          <a-row :gutter="16">

            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertyt">
                <span>{{ $t('ReportDetails.form.org') }}</span>
                <a-select v-model="formModel.selectorg" :style="{ width: '160px' }" placeholder="Select"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in orglist" :key="item.ORG_CODE" :value="item.ORG_CODE">
                    {{ item.ORG_NAME }}
                  </a-option>
                </a-select>
              </div>
            </a-col>


            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertyt">
                <span>{{ $t('ReportDetails.form.b_model') }}</span>
                <a-select v-model="formModel.Bmodel" :style="{ width: '160px' }"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in modellist" :key="item.B_MODEL" :value="item.B_MODEL">
                    {{ item.B_MODEL }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertyt">
                <span>{{ $t('ReportDetails.form.a_model') }}</span>
                <a-select v-model="formModel.Amodel" :style="{ width: '160px' }"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in modellist" :key="item.A_MODEL" :value="item.A_MODEL">
                    {{ item.A_MODEL }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertyt">
                <span>{{ $t('ReportDetails.form.status') }}</span>
                <a-select v-model="formModel.status" :style="{ width: '160px' }"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in costatuslist" :key="item.value" :value="item.value"> 
                    {{ item.name }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertyt">
                <span>{{ $t('ReportDetails.form.plant') }}</span>
                <a-select v-model="formModel.factory_area" :style="{ width: '160px' }"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in plantlist" :key="item.CODE" :value="item.CODE">
                    {{ item.ORG }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertyt">
                <span>{{ $t('ReportDetails.form.type') }}</span>
                <a-select v-model="formModel.type" :style="{ width: '160px' }"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in typelist" :key="item">
                    {{ item }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="div-propertyt">
                <span>{{ $t('ReportDetails.form.Date') }}</span>
                <a-range-picker v-model="formModel.selectdate" style="width: 254px" @change="search"></a-range-picker>
              </div>
            </a-col>
            <!--  Export Button  -->


            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <button @click="exportToExcel" class="exportbutton"> Export file </button>
            </a-col>
          </a-row>
        </a-card>
        <a-space direction="vertical" :size="16" style="display: block">
          <a-row>


            <!-- Export Button  -->
          </a-row>
        </a-space>
        <!-- </div> -->

        <a-card>
          <DataTable :value="changeoverlist" paginator :rows="10" sortMode="multiple" tableStyle="min-width: 60rem"
            dataKey="B_MODEL" responsiveLayout="scroll" class="custom-kpi-table">
            <Column field="ORG_ID" header="ORG_ID" sortable />
            <Column field="DEPARTMENT_CODE" header="DEPARTMENT_CODE" sortable />
            <Column field="CO_DATE" header="CHANGEOVERTIME" sortable />
            <Column field="B_MODEL" header="B_MODEL" sortable />
            <Column field="A_MODEL" header="A_MODEL" sortable />
            <Column field="COT" header="COT" sortable />
            <Column field="COPT" header="COPT" sortable />
            <Column field="RUT" header="RUT" sortable />
            <Column field="RECORD_PROBLEMS" header="RECORD_PROBLEMS" sortable />
            <Column field="CO_STATUS" header="CO_STATUS" sortable />
          </DataTable>
        </a-card>
 
      </div>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import useLoading from '@/hooks/loading';
import { ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  Getorg,
  Getfactory,
  ChangeoverDetails,
  Getcostatus,
  GetModel,
} from '@/api/kanbandevicea';
//  Export to Excell 
import * as XLSX from 'xlsx';

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
    selectdate: [formatDate(firstDayOfMonth), formatDate(lastDayOfMonth)],
    selectorg: '0000',
    factory_area: '0000',
    status: 'All',
    Amodel: 'All',
    Bmodel: 'All',
    type: 'All',
  };
};



const { loading, setLoading } = useLoading(true);
const orglist = ref<any>([]);
const plantlist = ref<any>([]);
const formModel = ref(generateFormModel());
const changeoverlist = ref<any>([]);
// const costatuslist = ref<any>([]);
const costatuslist = [
  {name : 'All' , value : 'All'}  ,
  {name : 'Completed' , value : 'Completed'} , 
  {name : 'Not_Started' , value : 'Not_Started'} , 
  {name : 'Ongoing' , value : 'Ongoing'} , 
  {name : 'Cancelled' , value : 'Cancelled'} , 
  {name : 'Delay' , value : 'Delay'} 
]

const localdate = ref<any>([]);
const errorMessage = ref('');
// const columns = [
//   'ORG_ID',
//   'DEPARTMENT_CODE',
//   'CHANGEOVERTIME',
//   'B_MODEL',
//   'A_MODEL',
//   'COT',
//   'COPT',
//   'RUT',
//   'RECORD_PROBLEMS',
//   'CO_STATUS', 

// ];
const modellist = ref<any>([]);
const typelist = ['All', 'Unplanned_Changeover', 'Scheduled'];

function setLocal() {
  window.sessionStorage.setItem('org_code', formModel.value.selectorg);
  window.sessionStorage.setItem(
    'selectdate',
    JSON.stringify(formModel.value.selectdate)
  );
  window.sessionStorage.setItem('factory_area', formModel.value.factory_area);
  window.sessionStorage.setItem('Amodel', formModel.value.Amodel);
  window.sessionStorage.setItem('Bmodel', formModel.value.Bmodel);
  window.sessionStorage.setItem('type', formModel.value.type);
  window.sessionStorage.setItem('status', formModel.value.status);
}

onMounted(() => {
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

const search = async () => {
  debugger;
  setLoading(true);
  setLocal();
  try {
    const data1: any = await ChangeoverDetails(formModel.value);
    if (data1.list.length < 1) {
      alert('No Data ');
    }
    changeoverlist.value = data1.list;
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    // exxist
    setLoading(false);
  }
};

const Getorglist = async () => {

  const orgdata: any = await Getorg();
  orgdata.list.unshift({ ORG_CODE: '0000', ORG_NAME: 'All' });
  orglist.value = JSON.parse(JSON.stringify(orgdata.list));
  const costatusdata: any = await Getcostatus();
  costatusdata.list.unshift({ CODE: '0000', NAME: 'All' });
  // costatuslist.value = JSON.parse(JSON.stringify(costatusdata.list)); 
  debugger;
  const plantdata: any = await Getfactory();
  plantdata.list.unshift({ CODE: '0000', ORG: 'All' });
  plantlist.value = JSON.parse(JSON.stringify(plantdata.list));



  const modeldata: any = await GetModel();
  modeldata.list.unshift({ A_MODEL: 'All', B_MODEL: 'All' });
  modellist.value = JSON.parse(JSON.stringify(modeldata.list));
  search();
};

Getorglist();

/// Export to excell 

const exportToExcel = () => {
  debugger;
  console.log(changeoverlist);
  const dataToExport = changeoverlist.value.map((index: any) => {
    return {

      'ORG_ID': index.ORG_ID,
      'DEPARTMENT_CODE': index.DEPARTMENT_CODE,
      'CO_STATUS': index.CO_STATUS,
      'CO_DATE': index.CO_DATE,
      'COT': index.COT,
      'COPT': index.COPT,
      'A_MODEL': index.A_MODEL,
      'RUT': index.RUT,
      'B_MODEL': index.B_MODEL,
      'RECORD_PROBLEMS': index.RECORD_PROBLEMS,
    };
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(dataToExport);

  XLSX.utils.book_append_sheet(wb, ws, 'FACTORY');

  XLSX.writeFile(wb, 'QCO.xlsx');
};

//  Export to Excell 

onMounted(async () => {
  debugger;
  Getorglist();
});

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
  background-color: #C5CBE3;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

 
}

 
/* Export Excell  */
.exportbutton {
  padding: 10px 20px;
  background-color: #F95CA4;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}


.exportbutton:hover {
  background-color: #e14b90;
  transform: translateY(-2px);
}


.exportbutton:active {
  background-color: #d0417a;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.exportbutton:focus {
  outline: 2px solid #d0417a;
  outline-offset: 2px;
}

::v-deep(.custom-kpi-table) {
    margin-top: 10px;
  }

  /* Style for table header */
  ::v-deep(.custom-kpi-table thead th) {
    background-color: #13cf71;
    color: rgb(235, 20, 38); /* red */
    text-align: center;
    font-weight: bold;
  }
 /* Style for even rows in the table body */
 ::v-deep(.custom-kpi-table tbody td) {
  background-color: rgb(115, 172, 206) !important;
  color: rgb(7, 7, 7) !important;
}

.a-card {
  background-color: rgb(100, 104, 45);
  border-radius: 5px;
}

.div-propertyt {
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
}

/* Export Excell  */
</style>
