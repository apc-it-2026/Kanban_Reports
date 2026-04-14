<template>
  <div class="container">
    <div style="color: red">{{ errorMessage }}</div>
    <a-spin :loading="loading" tip="Loading...(Loadding .....)" style="width: 100%">
      <div>
        <div class="tit">
          <span>{{ $t('Report.form.changeprocessreport') }}</span>
        </div>
        <a-card class="a-card">
          <a-row :gutter="16">
            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div class="div-propertyty">
                <span style="color: black">
                  {{ $t('Report.form.org') }}
                </span>
                <a-select v-model="formModel.selectorg" :style="{ width: '160px' }" placeholder="Select"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in orgList" :key="item.ORG_CODE" :value="item.ORG_CODE">
                    {{ item.ORG_NAME }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div class="div-propertyty">
                <span style="color: black">{{
                  $t('Report.form.factoryarea')
                }}</span>
                <a-select v-model="formModel.factory_area" :style="{ width: '160px' }" placeholder="Select"
                  :trigger-props="{ autoFitPopupMinWidth: true }" @change="search">
                  <a-option v-for="item in factoryareaList" :key="item.CODE" :value="item.CODE">
                    {{ item.ORG }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div class="div-propertyty">
                <span style="color: black">{{
                  $t('Report.form.b_model')
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
              <div class="div-propertyty">
                <span style="color: black">{{
                  $t('Report.form.a_model')
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
              <div class="div-propertyty">
                <span style="color: black">{{
                  $t('Report.form.daterange')
                }}</span>
                <a-range-picker v-model="formModel.selectdate"
                  @change="search" />
              </div>
            </a-col>
          </a-row>
        </a-card>

         <a-card>
          <DataTable :value="changeoverlist" paginator :rows="10" sortMode="multiple" tableStyle="min-width: 60rem"
            dataKey="B_MODEL" responsiveLayout="scroll" class="custom-kpi-table">
            <Column field="SNO" header="SNO" sortable />
            <Column field="PLANT" header="PLANT" sortable />
            <Column field="TOTAL_LINES" header="TOTAL LINES" sortable />
            <Column field="TOTAL_NOT_STARTED" header="NOT STARTED" sortable />
            <Column field="TOTAL_COMPLETED" header="COMPLETED" sortable />
            <Column field="TOTAL_DELAY" header="DELAY" sortable />
            <Column field="ONGOING" header="ONGOING" sortable />
            <Column field="CANCELLED" header="Cancelled" sortable />
            <Column field="PERCENTAGE" header="PERCENTAGE" sortable />
            <Column field="AFTER_CANCEL_ACCURATE_PERCENTAGE" header="AFTER_CANCEL_ACCURATE_PERCENTAGE" sortable />
          </DataTable>
        </a-card> 
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import {
  Getorg,
  Getfactory,
  QcoDetails,
  GetModel,
} from '@/api/kanbandevicea';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { ref, onMounted } from 'vue';

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

const { loading, setLoading } = useLoading(true);
const formModel = ref(generateFormModel());
const orgList = ref<any>([]);
const factoryareaList = ref<any>([]);
const changeoverlist = ref<any>([]);
const localdate = ref<any>([]);
const modellist = ref<any>([]);
const errorMessage = ref('');
const columns = ["SNO", "PLANT", "TOTAL LINES", "NOT STARTED", "COMPLETED", "DELAY", "ONGOING", "Cancelled", "PERCENTAGE", "AFTER_CANCEL_ACCURATE_PERCENTAGE"];
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
  debugger ; 
  setLoading(true);
  setLocal();
  try {
    const byata1: any = await QcoDetails(formModel.value);
    if (byata1.list.length < 3) {
      alert('No Data ');
    }
    // changeoverlist.value = JSON.parse(JSON.stringify(byata1.list));
    changeoverlist.value = byata1.list;

  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
  }
};

const getorglist = async () => {
  const orgdata: any = await Getorg();
  orgdata.list.unshift({ ORG_CODE: '0000', ORG_NAME: 'All' });
  orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  const factoryareadata: any = await Getfactory();
  factoryareadata.list.unshift({ CODE: '0000', ORG: 'All' });
  factoryareaList.value = JSON.parse(JSON.stringify(factoryareadata.list));
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

onMounted(async () => {
  getorglist();
});
</script>

<script lang="ts">
export default {
  name: 'Report',
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
  background-color: #C2CAD0;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

.a-card {
  background-color: rgb(26, 27, 2);
  border-radius: 5px;
  margin-bottom: 10px; 
}

.div-propertyty {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 5px;
   background-color: rgb(211, 81, 81); 
  color: rgb(226, 5, 5);
  border-radius: 5px;
  gap: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  font-weight: bold;
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
  background-color: rgb(138, 199, 170) !important;
  color: rgb(146, 14, 14) !important;
}
</style>
