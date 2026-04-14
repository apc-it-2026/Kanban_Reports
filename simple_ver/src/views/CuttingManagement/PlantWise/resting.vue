<template>
  <div class="headding">
    Cutting Material Management Process
  </div>
  <a-card class="filterbox">
    <a-row :gutter="16">
      <a-col :span="4" :xs="24" :sm="12" :md="4">
        <div>
          <span style="font-weight: bold;color: blueviolet;">Plant:</span>
          <a-select v-model:value="selectedPlant" placeholder="Select Plant" style="width: 200px; margin-left: 8px;"
            :options="plantoptions" allow-clear @change="GetLinesMethod" />
        </div>
      </a-col>
      <a-col :span="4" :xs="24" :sm="12" :md="4"> 
        <div>
          <span style="font-weight: bold;color: blueviolet;"> LINE : </span>
          <a-select v-model:value="selectedline" placeholder="Select Line" style="width: 200px; margin-left: 8px;"
            :options="lineoptions" allow-clear @change="GetLineValue" />
        </div>
      </a-col> 
      <a-col :span="4" :xs="24" :sm="12" :md="4">
        <div>
          <span style="font-weight: bold;color: blueviolet;"> Year : </span>
          <a-select v-model:value="selectedYear" placeholder="Select Year" style="width: 200px; margin-left: 8px;"
            :options="YearOptions" allow-clear @change="GetMonthsMethod" />
        </div>
      </a-col>
      <a-col :span="5" :xs="24" :sm="12" :md="5">
        <div>
          <span style="font-weight: bold;color: blueviolet;" > Month : </span>
          <a-select v-model:value="selectedMonth" placeholder="Select Month" style="width: 200px; margin-left: 8px;"
            :options="MonthOptions" allow-clear @change="GetWeeksMethod" />
        </div>
      </a-col>
      <a-col :span="4" :xs="24" :sm="12" :md="4">
        <div>
          <span style="font-weight: bold;color: blueviolet;" > Week : </span>
          <a-select v-model:value="selectedWeek" placeholder="Select Week" style="width: 200px; margin-left: 8px;"
            :options="WeekOptions" allow-clear @change="GetWeekvalue" />
        </div>
      </a-col>
      <a-col :span="2" :xs="24" :sm="12" :md="2">
        <div>
          <a-button @click="GetPlanningDataMethod" style="font-weight: bold;color: blueviolet;" > Search </a-button>
        </div>
      </a-col>
    </a-row>
  </a-card>
  <a-card class="filterbox2">
    <a-row :gutter="16">
      <a-col :span="6" :xs="24" :sm="12" :md="6">
        <div>
          <span style="font-weight: bold;color: blueviolet;" > Assigned POs </span>
          <span style="font-weight: bold;color: blueviolet;"> {{ AssignedPos }} </span>
        </div>
      </a-col>
      <a-col :span="6" :xs="24" :sm="12" :md="6">
        <div>
          <span style="font-weight: bold;color: blueviolet;" > Ready to Cutting </span>  
          <span style="font-weight: bold;color: blueviolet;" > {{ ReadyPos }} </span> 
        </div> 
      </a-col>
      <a-col :span="6" :xs="24" :sm="12" :md="6">
        <div>
          <span style="font-weight: bold;color: blueviolet;" > Not Ready For Cutting </span>
          <span style="font-weight: bold;color: blueviolet;" > {{ NotReadypos }} </span>
        </div>
      </a-col>
      <a-col :span="6" :xs="24" :sm="12" :md="6">
        <a-button @click="SendSOListMethod"> Verify Cutting Material Status </a-button>
      </a-col>
    </a-row>

  </a-card>
  <div>
    <DataTable :value="PlanningLIst" paginator :rows="10" sortMode="multiple" tableStyle="min-width: 80rem"
      dataKey="SALES_ORDER" responsiveLayout="scroll" class="custom-table" :loading="loading">
      <Column field="WEEK" header="WEEK" sortable style="min-width: 15rem;" />
      <Column field="SALES_ORDER" header="SALES ORDER" sortable />
      <Column field="SHOE_NAME" header="SHOE NAME" sortable style="min-width: 20rem;" />
      <Column field="CRD" header="CRD" sortable />
      <Column field="TOTAL_LINES" header="TOTAL LINES" sortable />
      <Column field="TOTAL_QTY" header="TOTAL QTY" sortable />
      <!-- <Column field="SCH_LINE" header="SCH LINE" sortable /> -->
      <!-- <Column field="SCH_QTY" header="SCH QTY" sortable /> -->

      <!-- <Column header="MATERIAL STATUS" sortable style="min-width: 15rem;">
        <template #body="slotProps">
          <Button class="view-btn"
            :style="{ backgroundColor: getStatusColor(slotProps.data), color: 'white' }"
            @click="() => handleStatusClick(slotProps.data)">
            {{ slotProps.data.MATERIAL_STATUS }} 
          </Button> 
        </template>
</Column> -->
      <Column header="MATERIAL STATUS" sortable style="min-width: 15rem;">
        <template #body="slotProps">
          <Button class="view-btn"
            :style="{ backgroundColor: getStatusColor(slotProps.data.MATERIAL_STATUS), color: 'white' }"
            @click="() => handleStatusClick(slotProps.data)">
            {{ slotProps.data.MATERIAL_STATUS }}
          </Button>
        </template>
      </Column>
      <!-- <Column field="COMPLETION_QTY" header="COMPLETION QTY" sortable />
      <Column field="COMPLETION_LINE" header="COMPLETION LINE" sortable />
      <Column field="COMPLETION_PERCENTAGE" header="COMPLETION PERCENTAGE" sortable /> --> 
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { GetPLantsData, GetLines, GetMonths, GetWeeks, GetYears, GetPlanningData, VerifyMaterialStatus } from '@/api/CuttingManagement/Plantwise';


const plantslist = ref<{ CODE: string; EN: string }[]>([])
const selectedPlant = ref<string>('');

const linelist = ref<{ CODE: string; NAME: string }[]>([])
const selectedline = ref<string>('');

const Yearlist = ref<{ YEAR: string; }[]>([])
const selectedYear = ref<string>('');

const MonthList = ref<{ MONTH_NO: string; MONTH_NAME: string }[]>([])
const selectedMonth = ref<string>('');

const WeekList = ref<{ WEEK: string; }[]>([])
const selectedWeek = ref<string>('');

const PlanningLIst = ref<any>([]);

const AssignedPos: any = ref(0);
const ReadyPos: any = ref(0);
const NotReadypos: any = ref(0);

const loading = ref(false);
const GetPLantsDataMethod = async () => {
  try {
    const data: any = await GetPLantsData()
    plantslist.value = data.list || []
  } catch (error) {
    console.error('Error fetching plants:', error)
  }
}
const plantoptions = computed(() =>
  plantslist.value.map((plant) => ({
    label: plant.EN,
    value: plant.CODE
  }))
);

const GetLinesMethod = async (plant: any) => {
  try {
    debugger;
    plant = 5001 + plant
    const data: any = await GetLines(plant);
    linelist.value = data.list || [];
    selectedPlant.value = plant;
  } catch (error) {
    console.error('Error fetching LInes:', error);
  }
};
const lineoptions = computed(() =>
  linelist.value.map((plant) => ({
    label: plant.NAME,
    value: plant.CODE
  }))
);

const GetYearsMethod = async () => {
  try {
    const data: any = await GetYears();
    Yearlist.value = data.list || []
  } catch (error) {
    console.error('Error fetching Years:', error);
  }
};
const YearOptions = computed(() =>
  Yearlist.value.map((index) => ({
    label: index.YEAR,
    value: index.YEAR
  }))
);

const GetMonthsMethod = async (year: any) => {
  try {
    const data: any = await GetMonths(year);
    MonthList.value = data.list || [];
    selectedYear.value = year;
  } catch (error) {
    console.error('Error fetching Months:', error);
  }
};
const MonthOptions = computed(() =>
  MonthList.value.map((index) => ({
    label: index.MONTH_NAME,
    value: index.MONTH_NO
  }))
);

const GetWeeksMethod = async (month: any) => {
  try {
    debugger;
    const year = selectedYear.value;
    const data: any = await GetWeeks(year, month);
    WeekList.value = data.list || [];

  } catch (error) {
    console.error('Error fetching weeks:', error);
  }
};
const WeekOptions = computed(() =>
  WeekList.value.map((index) => ({
    label: index.WEEK,
    value: index.WEEK
  }))
);

const GetWeekvalue = (Week: any) => {
  selectedWeek.value = Week;
};
const GetLineValue = (Line: any) => {
  selectedline.value = Line;
}
const GetAssignedPOs = () => {
  debugger;
  AssignedPos.value = [... new Set(PlanningLIst.value.map((item: any) => item.SALES_ORDER))].length;
};
const formatCRDDate = (datestring: string) => {
  const date = new Date(datestring);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};
const returnvalue = ref(false);
const GetFilterStatus = () => {
  if (selectedPlant.value === '') {
    alert("Please Enter Plant");
    returnvalue.value = true;
  } 
  else if (selectedline.value === '') {
    alert("Please Enter Line");
    returnvalue.value = true;
  }
  else if (selectedWeek.value === '') {
    alert("Please Enter Week");
    returnvalue.value = true;
  }
  else {
    returnvalue.value = false;
  }
};

const GetPlanningDataMethod = async () => {
  try {
    debugger;
    GetFilterStatus();
    if (!returnvalue.value) {
      const data: any = await GetPlanningData(selectedWeek.value, selectedPlant.value, selectedline.value , "" ,"");
      console.log(data);
      PlanningLIst.value = data.list.map((item: any) => {
        return {
          WEEK: item.WEEK,
          SALES_ORDER: item.SALES_ORDER,
          SHOE_NAME: item.SHOE_NAME,
          CRD: formatCRDDate(item.CRD),
          TOTAL_LINES: item.TOTAL_LINES,
          TOTAL_QTY: item.TOTAL_QTY,
          SCH_LINE: item.SCH_LINE,
          SCH_QTY: item.SCH_QTY,
          MATERIAL_STATUS: item.MATERIAL_STATUS,
          COMPLETION_QTY: item.QTY,
          COMPLETION_LINE: item.LINE,
          COMPLETION_PERCENTAGE: (((Number(item.QTY) || 0) / (Number(item.SCH_QTY) || 0)) * 100)
        }
      });
      console.log(data);
      GetAssignedPOs();
    }

  } catch (error) {
    console.error('Error fetching plannigdata:', error);
  }
};
const processedOrders = new Set<string>();

const SendSOListMethod = async () => {
  try {
    loading.value = true;
    const soList = PlanningLIst.value.map((item: any) => ({
      SALES_ORDER: item.SALES_ORDER,
      LINE: item.SCH_LINE
    }));
    debugger ; 
    const data: any = await VerifyMaterialStatus(soList);
    debugger ; 
    const statusMap: Record<string, string> = {};
    data.list.forEach((entry: string) => {
      const parts = entry.split(":").map(p => p.trim());
      const so = parts[0];
      // const line = parts[1];
      const status = parts[2];
     statusMap[`${so}`] = status;
    });
    PlanningLIst.value = PlanningLIst.value.map((item: any) => {
      debugger;
      const key = `${item.SALES_ORDER}`;
      return {
        ...item,
        MATERIAL_STATUS: statusMap[key] || item.MATERIAL_STATUS
      };
    });

    Object.entries(statusMap).forEach(([key, status]) => {
      debugger;
      const [so] = key ; 
      if (processedOrders.has(so)) return;

      processedOrders.add(so);

      if (status === "Material Shortage") {
        NotReadypos.value += 1;
      } else {
        ReadyPos.value += 1; 
      }
    });

  } catch (error) {
    console.error('Error updating material status:', error);
  } finally {
    loading.value = false;
  }
};

const getStatusColor = (status: string) => {
  debugger;
  switch (status) {
    case 'Completely Issued':
      return 'green';
    case 'Partially Issued':
      return 'orange';
    case 'Waiting for Issue':
      return 'yellow';
    case 'Material Shortage':
      return 'red';
    case 'Partially Available':
      return 'blue';
    case 'Unknown / Need Review':
      return 'black';
    default:
      return 'gray';
  }
};

const handleStatusClick = async (rowData: any) => {
  try {
    loading.value = true;
    const soList = [{
      SALES_ORDER: rowData.SALES_ORDER
      // LINE: rowData.SCH_LINE
    }];

    const data: any = await VerifyMaterialStatus(soList);
    const statusMap: Record<string, string> = {};
    data.list.forEach((entry: string) => {
      const parts = entry.split(":").map(p => p.trim());
      const so = parts[0];
     // const line = parts[1];
      const status = parts[2];
      statusMap[`${so}`] = status;
    });
    PlanningLIst.value = PlanningLIst.value.map((item: any) => {
      const key = `${item.SALES_ORDER}`;
      return {
        ...item,
        MATERIAL_STATUS: statusMap[key] || item.MATERIAL_STATUS,
      };
    });
    debugger;

    Object.entries(statusMap).forEach(([key, status]) => {
      debugger;
      const [so] = key;
      if (processedOrders.has(so)) return;

      processedOrders.add(so);

      if (status === "Material Shortage") {
        NotReadypos.value += 1;
      } else {
        ReadyPos.value += 1;
      }
    });

  } catch (error) {
    console.error('Error updating material status:', error);
  } finally {
    loading.value = false;
  }
};




onMounted(() => {
  GetPLantsDataMethod();
  GetYearsMethod();
});

</script>

<style scoped>
span {
  font-weight: 500;
}

.headding {
  background: linear-gradient(to right, #2e5d23, #b7e08f);
  /* Green gradient */
  color: #002060;
  /* Dark blue text */
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.filterbox {
  margin: 10px;
}

.filterbox2 {
  margin: 10px;
}
</style>
