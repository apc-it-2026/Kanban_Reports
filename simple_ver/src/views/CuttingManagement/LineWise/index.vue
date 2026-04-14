<template>
  <div class="headding">
    Line Wise

  </div> 
  <div class="filters">
    <a-row :gutter="16"> 
      <a-col :span="8" :xs="24" :sm="12" :md="8">
        <div style="display: flex;text-align: center;align-items: center;gap: 10px;">
          <span style="font-weight: bold;"> Date Range </span>
          <a-range-picker v-model="daterange" format="YYYY-MM-DD">
          </a-range-picker>
        </div>

      </a-col>
      <a-col :span="4" :xs="24" :sm="12" :md="4"> 
         <a-input placeholder="Enter PO" v-model="Planningsearch" > </a-input> 
      </a-col>
       <a-col :span="4" :xs="24" :sm="12" :md="4"> 
         <a-input placeholder="Enter Status" v-model="statusseaarch"> </a-input>
      </a-col>
       <a-col :span="4" :xs="24" :sm="12" :md="4"> 
         <a-input placeholder="Enter Line" v-model="linesearch"> </a-input>
      </a-col>
      <a-col :span="4" :xs="24" :sm="12" :md="4">
        <button class="submit-buton" @click="GetPlanningDataMethod"> Submit </button>
        
      </a-col>

    </a-row>
  </div>

  <!-- Planning Schedule -->
  <a-row :gutter="16">
    <a-col :span="6" :xs="24" :sm="12" :md="6">
      <div class="total-so"> 📋 Asigned PO's : {{ totalso }} </div>
    </a-col>
    <a-col :span="6" :xs="24" :sm="12" :md="6">
      <div class="fetch-ok"> ✅ Ready to Cutting : {{ fetchok }} </div>
    </a-col>
    <a-col :span="6" :xs="24" :sm="12" :md="6">
      <div class="fetch-not-ok"> ❌ Not Ready : {{ fetchnotok }} </div>
    </a-col>
    <a-col :span="6" :xs="24" :sm="12" :md="6">
      <div class="total-so"> ⚠ Escalated : {{ escaltioncount }} </div>
    </a-col>
  </a-row>
 

  <div class="mat-tables-container">
    <a-card class="mat-card-for-tables">
      <div class="mat-so-data-search-part">
        <div class="data-headding"> Planning Schedule In SAP According to sales order </div>
 
          <div style="color: white; font-weight: bold; ">Selected Row: {{ selectedRowKey }}</div>
        
      </div>
      <DataTable :value="FilterdPlanningSchedule" paginator :rows="12" sortMode="multiple" tableStyle="min-width: 60rem"
        dataKey="SE_ID" responsiveLayout="scroll" class="custom-mat-table" @row-click="onRowclick"
        :rowClass="getRowclass" style="cursor: pointer;">
        <Column field="START_DATE" header="START DATE" sortable style="min-width: 150px;" />
        <Column field="END_DATE" header="END_DATE" sortable style="min-width: 150px;" />
        <Column field="PROD_GROUP" header="Cut Line" sortable style="min-width: 150px;" />
        <Column field="SE_ID" header="Sales Order" sortable style="min-width: 150px;" />
        <!-- <Column field="MER_PO" header="PO" sortable style="min-width: 150px;" /> -->
        <!-- <Column field="MAT_CODE_PROD" header="Material" sortable style="min-width: 150px;" /> -->
        <Column field="MAPO" header="Master PO" sortable style="min-width: 150px;" />
        <Column field="PROD_NO" header="Article" sortable style="min-width: 150px;" />
        <Column field="NAME_S" header="Article Name" sortable style="min-width: 150px;" />
        <Column field="SCHEDULE_QTY" header="Schedule Qty" sortable style="min-width: 150px;" />
        <Column field="SE_QTY" header="Order Qty" sortable style="min-width: 150px;" />
        <Column field="CR_REQDATE" header="CRD" sortable style="min-width: 150px;" />
        <Column field="NLT" header="PSDD" sortable style="min-width: 150px;" />
        <Column field="GRT_DEPT" header="Actual Cutting Completed Line" sortable style="min-width: 150px;" />
        <Column field="CUT_QTY" header="Cutting Quantity" sortable style="min-width: 150px;" />

        <Column header="Fetching Material" field="materialokforfetching" sortable style="min-width: 150px;">
          <template #body="slotProps">
            <div>
              <span v-if="slotProps.data.materialisokornot === 'YES'"> ✅ Ready </span>
              <span v-else> ❌ Short </span>
            </div>
          </template>
        </Column>

        <Column header="Purchase Material" field="materialokforpurchase" sortable style="min-width: 150px;">
          <template #body="slotProps">
            <div>
              <span v-if="slotProps.data.materialisokornot === 'YES'"> ✅ Ready </span>
              <span v-else> ❌ Short </span>
            </div>
          </template>
        </Column>

      </DataTable>
    </a-card>
  </div>

  <!-- Production Order Data -->
  <Modal v-model:visible="showProdorderpopup" header="Production Schedule In SAP According to Production order"
    :modal="true" style="width: 100%;" :closable="true" width="100%" :mask-closable="false">
    <div class="pro-tables-container">
      <a-card class="pro-card-for-tables">
        <div class="pro-so-data-search-part">
          <div class="data-headding"> Production Schedule In SAP According to Production order </div>

          <div style="display: flex;align-items: center;">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText placeholder="Search" v-model="Productionsearch" />
            </span>
            <span style="color: white; font-weight: bold; text-align: center;margin-left: 10px;"> {{ selectedRowKey }}
            </span>
          </div>
        </div>
        <DataTable :value="FilterdProductionSchedule" paginator :rows="10" sortMode="multiple"
          tableStyle="min-width: 60rem" dataKey="PRODUCTION_ORDER" responsiveLayout="scroll" class="custom-prod-table"
          style="cursor: pointer;">
          <Column field="DATE_START_PLAN" header="START DATE" sortable style="min-width: 150px;" />
          <Column field="DATE_FINISH_PLAN" header="END_DATE" sortable style="min-width: 150px;" />
          <Column field="UDF10" header="Article" sortable style="min-width: 150px;" />
          <Column field="SALES_ORDER" header="Sales Order" sortable style="min-width: 150px;" />
          <Column field="UDF03" header="PO" sortable style="min-width: 150px;" />
          <Column field="UDF02" header="Material" sortable style="min-width: 150px;" />
          <Column field="UDF01" header="Ma po" sortable style="min-width: 150px;" />
          <Column field="PRODUCTION_ORDER" header="Production Order" sortable style="min-width: 150px;" />
          <Column field="ITEM_NO" header="item no" sortable style="min-width: 150px;" />
          <Column field="MATERIAL_NO" header="Size Material" sortable style="min-width: 150px;" />
          <Column field="MATERIAL_SPECIFICATIONS" header="Size" sortable style="min-width: 150px;" />
          <Column field="QTY" header="Schedule Qty" sortable style="min-width: 150px;" />
          <!-- <Column header="Material" field="materialfetchingokornot" sortable style="min-width: 150px;" /> -->
          <Column header="Fetching Material" field="materialfetchingokornot" style="min-width: 150px;">
            <template #body="slotProps">
              <div @click="GetFetchingDetailsViewMethod(slotProps.data)" style="cursor: pointer;">
                <span v-if="slotProps.data.materialfetchingokornot === 'OK'">✅ Ready</span>
                <span v-else>❌ Short</span>
              </div>
            </template>
          </Column>

          <Column header="Purchase Material" field="materialisokornot" style="min-width: 150px;"
            onclick="showpurchsematerial = true">
            <template #body="slotProps">
              <div @click="GEtMaterialStatusMethod(slotProps.data)" style="cursor: pointer;">
                <span v-if="slotProps.data.materialisokornot === 'OK'">✅ Ready</span>
                <span v-else>❌ Short</span>
              </div>
            </template>
          </Column>

          <Column header="cut_qty" field="CUT_QTY" sortable style="min-width: 150px;" />
        </DataTable>
      </a-card>
    </div>
  </Modal>


  <!-- Fetching Material Data -->
  <Modal v-model:visible="showfetchingmaterial" header="Fetching Detail View For Each Material" :modal="true"
    style="width: 100%;" :closable="true" width="100%" :mask-closable="false">
    <div class="fetch-tables-container">
      <a-card class="fetch-card-for-tables">
        <div class="fetch-so-data-search-part">
          <div class="data-headding"> Fetching Detail View For Each Material </div>

          <div style="display: flex;align-items: center;">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText placeholder="Search" v-model="fetchingsearch" />
            </span>
            <span style="color: white; font-weight: bold; text-align: center;margin-left: 10px;"> {{
              selectedproductionorder
            }} </span>
          </div>
        </div>
        <DataTable :value="FilterdFetchingMaterial" paginator :rows="10" sortMode="multiple"
          tableStyle="min-width: 60rem" dataKey="FETCHING" responsiveLayout="scroll" class="custom-prod-table"
          style="cursor: pointer;">
          <Column field="SALES_ORDER" header="Sales Order" sortable style="min-width: 150px;" />
          <Column field="ART" header="Article" sortable style="min-width: 150px;" />
          <Column field="FETCHING" header="Fetching" sortable style="min-width: 150px;" />
          <Column field="MAPO" header="Master PO" sortable style="min-width: 150px;" />
          <Column field="DEPT" header="Department" sortable style="min-width: 150px;" />
          <Column field="MAT_NO" header="Material" sortable style="min-width: 150px;" />
          <Column field="FETCHING_CREATION_DATE" header="Creation Date" sortable style="min-width: 150px;" />
          <Column field="FETCHING_ISSUE_TIME" header="Issue Date" sortable style="min-width: 150px;" />
          <Column field="REQ" header="Req Quantity" sortable style="min-width: 150px;" />
          <Column field="ISSUE" header="Issue Quantity" sortable style="min-width: 150px;" />
          <Column field="UNISSUE" header="Unissue Quantity" sortable style="min-width: 150px;" />
        </DataTable>
      </a-card>
    </div>
  </Modal>
  <!-- Purchase Material Data -->

  <Modal v-model:visible="showpurchsematerial" header="Material Purchase Quantity For Each Material" :modal="true"
    style="width: 100%;" :closable="true" width="100%" :mask-closable="false">
    <div class="pur-tables-container">
      <a-card class="pur-card-for-tables">
        <div class="pur-so-data-search-part">
          <div class="data-headding"> Material Purchase Quantity For Each Material </div>

          <div style="display: flex;align-items: center;">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText placeholder="Search" v-model="materialsearch" />
              <span style="color: white; font-weight: bold; text-align: center;margin-left: 10px;"> {{
                selectedproductionorder }} </span>
            </span>
          </div>
        </div>
        <DataTable :value="FilterdPurchaseMaterial" paginator :rows="10" sortMode="multiple"
          tableStyle="min-width: 60rem" dataKey="PRODUCTION_ORDER" responsiveLayout="scroll" class="custom-prod-table"
          style="cursor: pointer;">
          <Column field="STAGE" header="Article" sortable style="min-width: 150px;" />
          <Column field="BOM_STAGE" header="Item NO" sortable style="min-width: 150px;" />
          <Column field="COMPONENT" header="Material" sortable style="min-width: 150px;" />
          <Column field="AVAILABLE_QTY" header="Purchase Quantity" sortable style="min-width: 150px;" />
          <Column field="DOSAGE" header="Dosage" sortable style="min-width: 150px;" />
          <Column field="PURCHASE_BALANCE" header="Available Balance Quantity" sortable style="min-width: 150px;" />
        </DataTable>
      </a-card>
    </div>
  </Modal>

<div style="margin-top: 15px; padding: 15px; background-color: #fff; border-radius: 8px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);">
  <a-row :gutter="[16, 16]" justify="start">
    
    <!-- Escalations Label -->
    <a-col :xs="24" :sm="8" :md="4" style="display: flex; align-items: center;">
      <span style="font-size: 22px; font-weight: bold; color: #333;">
        Escalations :
      </span>
    </a-col>

    <!-- Sales Order Input -->
    <a-col :xs="24" :sm="12" :md="4">
      <a-input 
        placeholder="Enter Sales Order"
        v-model="so"
        allow-clear
        style="height: 45px; font-weight: bold; border-radius: 6px; border: 1px solid #d9d9d9;"
      />
    </a-col>

    <!-- Material Issue Input -->
    <a-col :xs="24" :sm="12" :md="8">
      <a-input 
        placeholder="Enter Material Issue"
        v-model="issue"
        allow-clear
        style="height: 45px; font-weight: bold; border-radius: 6px; border: 1px solid #d9d9d9;"
      />
    </a-col>

    <!-- Raise Escalation Button -->
    <a-col :xs="24" :sm="12" :md="4">
      <a-button 
        type="primary" 
        block
        @click="RaiseEscalationsMethod"
        style="height: 45px; font-size: 16px; font-weight: bold; background-color: #ff4d4f; border: none; border-radius: 6px;"
      >
        Raise Escalation
      </a-button>
    </a-col>

    <!-- Check Status Button -->
    <a-col :xs="24" :sm="12" :md="4">
      <a-button 
        block
        @click="GEtRiaseissuesDataMethod"
        style="height: 45px; font-size: 16px; font-weight: bold; color: #fff; background-color: #1890ff; border: none; border-radius: 6px;"
      >
        Check Status
      </a-button>
    </a-col>
    
  </a-row>
</div>


  <Modal v-model:visible="showesca" header="Raise Escalations List " :modal="true" style="width: 100%;" :closable="true"
    width="100%" :mask-closable="false">
    <DataTable :value="RaisData" paginator :rows="10" sortMode="multiple" tableStyle="min-width: 60rem" dataKey="SE_ID"
      responsiveLayout="scroll" class="custom-mat-table" style="cursor: pointer;">
      <Column field="SE_ID" header="Sales Order" sortable style="min-width: 150px;" />
      <Column field="ISSUE" header="ISSUE" sortable style="min-width: 150px;" />
      <Column field="STATUS" header="STATUS" sortable style="min-width: 150px;" />
      <Column field="ISSUE_DATE" header="Issue Date" sortable style="min-width: 150px;" />
      <Column field="SOLVE_DATE" header="Solve Date" sortable style="min-width: 150px;" />
    </DataTable>
  </Modal>


</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { GetPlanningData, GetBOMAndPurchaseStatus, GetFetchingStatus, 
  GEtMaterialStatus, GetFetchingDetailsView,
   RaiseEscalations, GEtRiaseissuesData , EscalationsCount , 
  } from '@/api/CuttingManagement/LIneWise';
import { Modal } from '@arco-design/web-vue';

const escaltioncount = ref('') ; 
const Planningsearch = ref(''); 
const statusseaarch = ref(''); 
const linesearch = ref('') ; 
// const Planningsearch = ref('');
// const Planningsearch = ref('');
const ActualPlanningScheduleData = ref<any[]>([]);
const Productionsearch = ref('');
const materialsearch = ref('');
const fetchingsearch = ref('');
const DSPS = ref('');
const ActualProductionScheduleData = ref<any[]>([]);
const MaterialPurchaseQtyForEachmat = ref<any>([]);
const FetchingMaterial = ref<any>([]);
const today = new Date();
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
const showProdorderpopup = ref(false);
const showpurchsematerial = ref(false);
const showesca = ref(false);
const showfetchingmaterial = ref(false);

const totalso: any = ref('');
const fetchok: any = ref('');
const fetchnotok: any = ref('');
const purchok: any = ref('');
const purchnotok: any = ref('');

const so: any = ref('');
const issue: any = ref('');

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const daterange: any = ref([
  formatDate(startOfMonth),
  formatDate(endOfMonth),
])
const selectedRowKey = ref<string | null>(null)


const GetPlanningDataMethod = async () => {
  const data: any = await GetPlanningData(daterange);
debugger ; 
  ActualPlanningScheduleData.value = data.list.map((item: any) => ({
    START_DATE: item.START_DATE ? formatDate(new Date(item.START_DATE)) : '',
    END_DATE: item.END_DATE ? formatDate(new Date(item.END_DATE)) : '',
    PROD_GROUP: item.PROD_GROUP,
    SE_ID: item.SE_ID,
    MER_PO: item.MER_PO,
    MAT_CODE_PROD: item.MAT_CODE_PROD,
    MAPO: item.MAPO,
    PROD_NO: item.PROD_NO,
    NAME_S: item.NAME_S,
    SCHEDULE_QTY: item.SCHEDULE_QTY,
    SE_QTY: item.SE_QTY,
    CR_REQDATE: item.CR_REQDATE ? formatDate(new Date(item.CR_REQDATE)) : '',
    NLT: item.NLT ? formatDate(new Date(item.NLT)) : '',
    GRT_DEPT: item.GRT_DEPT,
    CUT_QTY: item.CUT_QTY,
    materialokforpurchase: item.materialokforpurchase,
    materialokforfetching: item.materialokforfetching
  }));
  totalso.value = new Set(ActualPlanningScheduleData.value.map((item: any) => item.SE_ID)).size;
  purchok.value = ActualPlanningScheduleData.value.filter(
    (item: any) => item.materialokforpurchase === 'YES'
  ).length;
  fetchok.value = ActualPlanningScheduleData.value.filter((item: any) =>
    item.materialokforfetching === 'YES').length;
  purchnotok.value = totalso.value - purchok.value;
  fetchnotok.value = totalso.value - fetchok.value;
  console.log(data);
}


const FilterdPlanningSchedule = computed(() => {
  return ActualPlanningScheduleData.value.filter((item: any) => {
    // Search by SE_ID
    const matchesSearch = item.SE_ID?.toLowerCase().includes(Planningsearch.value.toLowerCase());

    // Search by Status (check both columns if needed)
    const statusSearching =
      item.materialokforfetching?.toLowerCase().includes(statusseaarch.value.toLowerCase())  ; 
      const linesearching = item.PROD_GROUP?.toLowerCase().includes(linesearch.value.toLowerCase()) ; 

    return matchesSearch && statusSearching && linesearching ;
  });
});



const FilterdProductionSchedule = computed(() => {
  return ActualProductionScheduleData.value.filter((item: any) => {
    const matchesSearch = item.PRODUCTION_ORDER?.toLowerCase().includes(Productionsearch.value.toLowerCase());
    return matchesSearch;
  });
});

const FilterdPurchaseMaterial = computed(() => {
  return MaterialPurchaseQtyForEachmat.value.filter((item: any) => {
    const matchesSearch = item.COMPONENT?.toLowerCase().includes(materialsearch.value.toLowerCase());
    return matchesSearch;
  });
});

const FilterdFetchingMaterial = computed(() => {
  return FetchingMaterial.value.filter((item: any) => {
    const matchesSearch = item.FETCHING?.toLowerCase().includes(fetchingsearch.value.toLowerCase());
    return matchesSearch;
  });
});


const getCompositeKey = (rowData: any) => {
  return `${rowData.SE_ID}__${rowData.PROD_GROUP}`
}


const GetBOMAndPurchaseStatusMethod = async (seid: any) => {
  debugger;
  const data: any = await GetBOMAndPurchaseStatus(seid);
  ActualProductionScheduleData.value = data.list;

};
const fetchingdata: any = ref([]);

const GetFetchingStatusmethod = async (seid: any) => {
  debugger;
  const data: any = await GetFetchingStatus(seid);
  fetchingdata.value = data.list;
  debugger;
  // Create a map of PRO_ORD → materialfetchingokornot
  const fetchingMap = new Map<string, string>();

  fetchingdata.value.forEach((row: any) => {
    fetchingMap.set(row.PRO_ORD, row.materialfetchingokornot);
  });
  ActualProductionScheduleData.value = ActualProductionScheduleData.value.map((row: any) => {
    debugger;
    const status = fetchingMap.get(String(row.PRODUCTION_ORDER)) || '⚠ Unknown';
    return {
      ...row,
      materialfetchingokornot: status,
    };
  });

};


const onRowclick = async (event: any) => {
  debugger;
  selectedRowKey.value = getCompositeKey(event.data)
  console.log(selectedRowKey.value);
  const SEID = selectedRowKey.value?.split('_')[0];
  ActualProductionScheduleData.value = [];
  fetchingdata.value = [];
  await GetBOMAndPurchaseStatusMethod(SEID);
  await GetFetchingStatusmethod(SEID);
  showfetchingmaterial.value = false;
  showpurchsematerial.value = false;
  showProdorderpopup.value = true;

}

const getRowclass = (rowData: any) => {
  // ✅ If the row is selected → highlight it first
  if (getCompositeKey(rowData) === selectedRowKey.value) {
    return 'highlight-row';
  }

  // ✅ Otherwise → color based on SE_ID
  switch (rowData.SE_ID) {
    case '1000245091':
      return 'row-1';
    case '1000245137':
      return 'row-2';
    case '1000245116':
      return 'row-3';
    case '1000256083':
      return 'row-4';
    default:
      return '';
  }
};


const GEtMaterialStatusMethod = async (rowData: any) => {
  debugger;
  const seid = rowData.SALES_ORDER;
  const prodOrder = rowData.ITEM_NO;
  showpurchsematerial.value = true;
  MaterialPurchaseQtyForEachmat.value = [];
  try {
    const data: any = await GEtMaterialStatus(prodOrder, seid);
    console.log("Material status for", prodOrder, seid, data);
    MaterialPurchaseQtyForEachmat.value = data.list;
  } catch (err) {
    console.error("Error fetching material status", err);
  }
};

const selectedproductionorder = ref('');
const GetFetchingDetailsViewMethod = async (rowData: any) => {
  const seid = rowData.SALES_ORDER;
  const prodOrder = rowData.PRODUCTION_ORDER;
  selectedproductionorder.value = prodOrder;
  showfetchingmaterial.value = true;
  FetchingMaterial.value = [];
  try {
    const data: any = await GetFetchingDetailsView(prodOrder, seid);
    console.log("Material status for", prodOrder, seid, data);
    FetchingMaterial.value = data.list;
  } catch (err) {
    console.error("Error fetching material status", err);
  }
};

const RaiseEscalationsMethod = async () => {
  debugger;
  const data: any = await RaiseEscalations(so.value, issue.value);
  console.log(data);
  debugger;
  alert(data);
}

const RaisData: any = ref([]);

 
const GEtRiaseissuesDataMethod = async () => { 
  const data: any = await GEtRiaseissuesData(so.value);
  RaisData.value = data.list; 
  showesca.value = true ; 
}
const EscalationsCountMethod= async () => {
  const data : any = await EscalationsCount() ; 
  escaltioncount.value = data ; 
  }

onMounted(async () => {
  await GetPlanningDataMethod();
  await EscalationsCountMethod() ; 
});

</script>

<style scoped>
.headding {
    background: linear-gradient(to right, #2e5d23, #b7e08f); /* Green gradient */
    color: #002060; /* Dark blue text */
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: Arial, Helvetica, sans-serif;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.tables-container,
.mat-tables-container,
.fetch-tables-container,
.pur-tables-container {
  margin-top: 10px;
}

.card-for-tables,
.mat-card-for-tables,
.fetch-card-for-tables,
.pur-card-for-tables {
  background-color: #4f7979;
  padding: 10px;
  border-radius: 5px;
}

.so-data-search-part,
.mat-so-data-search-part,
.fetch-so-data-search-part,
.pur-so-data-search-part {
  display: flex;
  flex-direction: row;
  gap: 40px;
  text-align: center;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.data-headding {
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
}

.filters {
  /* background-color: rgb(155, 233, 207); */
  padding: 10px;
  /* margin: 10px; */
}

.submit-buton {
  background-color: #4f7979;
  padding: 10px;
  min-width: 100px;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

::v-deep(.highlight-row) {
  background-color: #0d0d0e !important;
  color: white !important;
}

::v-deep(.row-1) {
  background-color: #6688ac !important;
  color: white !important;
}

::v-deep(.row-2) {
  background-color: #5d7e38 !important;
  color: white !important;
}

::v-deep(.row-3) {
  background-color: #6daaec !important;
  color: white !important;
}

::v-deep(.row-4) {
  background-color: #f16060 !important;
  color: white !important;
}

::v-deep(.highlight-rowpoD) {
  background-color: #007bff !important;
  color: white !important;
}

::v-deep(.custom-mat-table thead th) {
  background-color: #65367e;
  color: white;
}

::v-deep(.custom-prod-table thead th) {
  background-color: #745fec;
  color: white;
}

.kpi-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  justify-content: space-between;

}

 

.total-so,
.fetch-ok,
.fetch-not-ok,
.purc-ok,
.purc-not-ok {
  padding: 20px;
  background-color: rgb(229, 128, 128);
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  border-radius: 5px;
  color: white;
}

.total-so {
  background-color: rgb(229, 128, 128);
}

.fetch-ok {
  background-color: rgb(124, 37, 37);
}

.fetch-not-ok {
  background-color: rgb(107, 106, 31);
}

.purc-ok {
  background-color: rgb(82, 19, 63);
}

.purc-not-ok {
  background-color: rgb(20, 66, 109);
}
</style>
