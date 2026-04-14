<template>
  <div style="width: 100%; height: 100%; background-color: #124e66; padding: 10px">
    <div style="color: red;"> {{ errorMessage }}</div>
    <a-spin tip="loading loading" :loading="loading" style="width: 100%">
      <div>
        <!-- Headding  -->
        <div style="display: flex;">
          <div class="headding">  
            Cutting Material Management Process
          </div>
          <div class="escalation-buttons" v-if="wbutton">
            <!-- WhatsApp -->
            <button class="escalation-btn whatsapp" @click="raiseWhatsapp"> 
              <i class="pi pi-whatsapp"></i>
            </button>

            <!-- Email -->
            <button class="escalation-btn email" @click="raiseEmail"> 
              <i class="pi pi-envelope"></i>
            </button>
            <button @click="openPpt">Open</button>
          </div>
        </div>

        <!-- Filters  -->

        <a-row :gutter="[16, 16]" style="margin-top: 10px;margin-left: 10px;">
          <a-col :span="10" :xs="24" :sm="12" :md="10">
            <div style="display: flex;align-items: center;">
              <span style="font-weight: bold;color: white;align-items: center;text-align: center;"> SO_Filter__: </span>
              <a-input v-model="sofilter" placeholder="Please Insert SO" style="margin-left: 50px;" />
            </div>
          </a-col>
          <a-col :span="10" :xs="24" :sm="12" :md="10">
            <div style="display: flex;align-items: center;">
              <span style="font-weight: bold;color: white;align-items: center;text-align: center;">
                Week_Search_Filter__: </span>
              <a-input v-model="weekfilter" placeholder="Formate : yyyy/mm/dd-yyyy/mm/dd" style="margin-left: 50px;"
                @change="validateWeek(weekfilter)" />
            </div>

          </a-col>
        </a-row>

        <a-card class="filterbox">
          <a-row :gutter="[16, 16]">
            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div>
                <span style="font-weight: bold;color: blueviolet;">Plant:</span>
                <a-select v-model:value="selectedPlant" placeholder="Select Plant"
                  style="width: 200px; margin-left: 8px;" :options="plantoptions" allow-clear
                  @change="GetLinesMethod" />
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
                <span style="font-weight: bold;color: blueviolet;"> Month : </span>
                <a-select v-model:value="selectedMonth" placeholder="Select Month"
                  style="width: 200px; margin-left: 8px;" :options="MonthOptions" allow-clear
                  @change="GetWeeksMethod" />
              </div>
            </a-col>

            <a-col :span="4" :xs="24" :sm="12" :md="4">
              <div>
                <span style="font-weight: bold;color: blueviolet;"> Week : </span>
                <a-select v-model:value="selectedWeek" placeholder="Select Week" style="width: 200px; margin-left: 8px;"
                  :options="WeekOptions" allow-clear @change="GetWeekvalue" />
              </div>
            </a-col>

            <a-col :span="2" :xs="24" :sm="12" :md="2">
              <div>
                <a-button @click="GetPlanningDataMethod" style="font-weight: bold;color: blueviolet;"> Search
                </a-button>
              </div>
            </a-col>
          </a-row>
        </a-card>
        <!-- KPI Cards -->
        <a-card class="filterbox2">
          <a-row :gutter="16">
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="total-so">
                <span> 📋 Asigned PO's : </span>
                <span> {{ AssignedPos }} </span>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="fetch-ok">
                <span> ✅ Ready to Cutting :</span>
                <span> {{ ReadyPos }} </span>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="fetch-not-ok">
                <span> ❌ Not Ready : </span>
                <span> {{ NotReadypos }} </span>
              </div>
            </a-col>
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div @click="SendSOListMethod" class="purc-ok"> Verify Cutting Material Status </div>
            </a-col>
          </a-row>
        </a-card>
        <!-- Grid View -->
        <div>
          <DataTable :value="PlanningLIst" paginator :rows="10" sortMode="multiple" tableStyle="min-width: 80rem"
            dataKey="SALES_ORDER" responsiveLayout="scroll" class="custom-mat-table" :loading="loading">
            <Column field="WEEK" header="WEEK" sortable style="min-width: 15rem;" />
            <Column field="SALES_ORDER" header="SALES ORDER" sortable />
            <Column field="SHOE_NAME" header="SHOE NAME" sortable style="min-width: 20rem;" />
            <Column field="CRD" header="CRD" sortable />
            <Column field="TOTAL_LINES" header="TOTAL LINES" sortable />
            <Column field="TOTAL_QTY" header="TOTAL QTY" sortable />

            <Column header="MATERIAL STATUS" sortable style="min-width: 15rem;">
              <template #body="slotProps">
                <Button class="view-btn"
                  :style="{ backgroundColor: getStatusColor(slotProps.data.MATERIAL_STATUS), color: 'white' }"
                  @click="() => handleStatusClick(slotProps.data)">
                  {{ slotProps.data.MATERIAL_STATUS }}
                </Button>
              </template>
            </Column>
            <Column header="Detail View" sortable style="min-width: 10rem;">
              <template #body="slotProps">
                <i class="pi pi-eye" style="font-size: 1.2rem; cursor: pointer;" @click="openDetails(slotProps.data)">
                </i>
              </template>
            </Column>
          </DataTable>
        </div>

        <a-modal v-model:visible="OpenMaterial" :hide-cancel="true" title="Material Status " width="100%">
          <Materila :data="ParseRowData" />
        </a-modal>

      </div>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { GetPLantsData, GetLines, GetMonths, GetWeeks, GetYears, GetPlanningData, VerifyMaterialStatus, SendMailAppAlerts, SendWhatsAppAppAlerts } from '@/api/CuttingManagement/Plantwise';
import Materila from './Materila.vue';

const errorMessage = ref('');
const { loading, setLoading } = useLoading(false);
const OpenMaterial = ref(false);
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
const wbutton = ref(true);
const sofilter = ref('');
const weekfilter = ref('');

const GetPLantsDataMethod = async () => {
  try {
    setLoading(true);
    const data: any = await GetPLantsData();
    plantslist.value = data.list || [];
  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error fetching plants:', error)
  } finally {
    setLoading(false);
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
    setLoading(true);
    plant = 5001 + plant
    const data: any = await GetLines(plant);
    linelist.value = data.list || [];
    selectedPlant.value = plant;
  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error fetching LInes:', error);
  } finally {
    setLoading(false);
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
    setLoading(true);
    const data: any = await GetYears();
    Yearlist.value = data.list || []
  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error fetching Years:', error);
  } finally {
    setLoading(false);
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
    setLoading(true);
    const data: any = await GetMonths(year);
    MonthList.value = data.list || [];
    selectedYear.value = year;
  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error fetching Months:', error);
  } finally {
    setLoading(false);
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
    setLoading(true);
    const year = selectedYear.value;
    const data: any = await GetWeeks(year, month);
    WeekList.value = data.list || [];
  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error fetching weeks:', error);
  } finally {
    setLoading(false);
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
const validateWeek = (value: string) => {
  errorMessage.value = '';
  if (!value) return;

  const pattern = /^\d{4}\/\d{2}\/\d{2}-\d{4}\/\d{2}\/\d{2}$/;

  if (!pattern.test(value)) {
    errorMessage.value = "Invalid format! Use YYYY/MM/DD-YYYY/MM/DD";
    selectedWeek.value = "";
  } else {
    errorMessage.value = '';
  }
};

const GetLineValue = (Line: any) => {
  selectedline.value = Line;
}
const GetAssignedPOs = () => {
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
  if (sofilter.value === '') {
    if (selectedPlant.value === '') {
      alert("Please Enter Plant");
      returnvalue.value = true;
    }
    else if (weekfilter.value === "") {
      if (selectedline.value === '' && selectedWeek.value === '') {
        alert("Please Enter Line or Week");
        returnvalue.value = true;
      }
      else {
        returnvalue.value = false;
      }
    }
    else {
      returnvalue.value = false;
    }

  }
};

const GetPlanningDataMethod = async () => {
  try {
    NotReadypos.value = 0 ; 
    ReadyPos.value = 0 ; 
    setLoading(true);
    GetFilterStatus();
    if (!returnvalue.value) { 
      const data: any = await GetPlanningData(selectedWeek.value, selectedPlant.value, selectedline.value, sofilter.value, weekfilter.value);
      console.log(data);
      PlanningLIst.value = data.list.map((item: any) => {
        return {
          WEEK: item.WEEK,
          SALES_ORDER: item.SALES_ORDER,
          SHOE_NAME: item.SHOE_NAME,
          CRD: formatCRDDate(item.CRD),
          TOTAL_LINES: item.TOTAL_LINES,
          TOTAL_QTY: item.TOTAL_QTY,
          MATERIAL_STATUS: item.MATERIAL_STATUS,
        }
      });
      console.log(data);
      GetAssignedPOs();
    }

  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error fetching plannigdata:', error);
  } finally {
    setLoading(false);
  }
};

const processedOrders = new Set<string>();

const SendSOListMethod = async () => {
  try {
    setLoading(true);
    loading.value = true;
    const soList = PlanningLIst.value
      .filter((item: any) => item.MATERIAL_STATUS === "Not Verified")
      .map((item: any) => ({
        SALES_ORDER: item.SALES_ORDER,
        MATERIAL_STATUS: item.MATERIAL_STATUS
      }));
    if (soList.length === 0) {
      alert("please Note :  so list is zero");
    }
    
    const data: any = await VerifyMaterialStatus(soList);
    const statusMap: Record<string, string> = {};
    data.list.forEach((entry: string) => {
      const parts = entry.split(":").map(p => p.trim());
      const so = parts[0];
      const status = parts[2];
      statusMap[`${so}`] = status;
    });
    PlanningLIst.value = PlanningLIst.value.map((item: any) => {
      const key = `${item.SALES_ORDER}`;
      return {
        ...item,
        MATERIAL_STATUS: statusMap[key] || item.MATERIAL_STATUS
      };
    });

    Object.entries(statusMap).forEach(([key, status]) => {
      debugger ; 
      if (processedOrders.has(key)) return ;  
       processedOrders.add(key) ;  

      if (status === "Material Shortage" || status === "Unknown / Need Review" || status === "Partially Available") {
        NotReadypos.value += 1;
      } else {
        ReadyPos.value += 1;
      }
    });

  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error updating material status:', error);
  } finally {
    setLoading(false);
    loading.value = false;
  }
};  

const getStatusColor = (status: string) => {
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
    debugger ; 
    setLoading(true);
    loading.value = true;

    const soList = rowData.MATERIAL_STATUS === "Not Verified"
      ? [
        {
          SALES_ORDER: rowData.SALES_ORDER,
          MATERIAL_STATUS: rowData.MATERIAL_STATUS
        }
      ]
      : [];

    if (soList.length === 0) {
      alert("please Note :  so is Already Verified");
      return;
    } 

    const data: any = await VerifyMaterialStatus(soList);
    const statusMap: Record<string, string> = {};
    data.list.forEach((entry: string) => {
      const parts = entry.split(":").map(p => p.trim());
      const so = parts[0];
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

    Object.entries(statusMap).forEach(([key, status]) => {
      if (processedOrders.has(key)) return;
      processedOrders.add(key);
      debugger ; 
      if (status === "Material Shortage" || status === "Unknown / Need Review" || status === "Partially Available") {
        NotReadypos.value += 1;
      } else {
        ReadyPos.value += 1;
      }
    });
  } catch (error: any) {
    errorMessage.value = error.Message;
    console.error('Error updating material status:', error);
  } finally {
    setLoading(false);
    loading.value = false;
  }
};

const ParseRowData = ref<any>(null); 

const openDetails = (row: any) => {
  console.log("Row details:", row);
  ParseRowData.value = row;
  OpenMaterial.value = true;
};

const raiseWhatsapp = async () => {
  if (PlanningLIst.value.length === 0) {
    alert("Don't Have Verified POs");
    return;
  } 
  const data: any = await SendWhatsAppAppAlerts(PlanningLIst.value); 
  alert("WhatsApp Alert Sent Successfully");  
};

const raiseEmail = async () => {
  if (PlanningLIst.value.length === 0) {
    alert("Don't Have Verified POs");
    return;
  }
  const data: any = await SendMailAppAlerts(PlanningLIst.value);
    alert("Mail Alert Sent Successfully");
};  
 const openPpt = () => {
  window.open('/pptx/demo.pptx', '_blank'); 
};
onMounted(() => {
  GetPLantsDataMethod();
  GetYearsMethod();
});  

</script>
<style scoped>

.headding {
  background: linear-gradient(to right, #2e5d23, #b7e08f);
  color: #002060;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 90%;
  /* display: flex; */
}

.filterbox {
  margin: 10px;
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
  cursor: pointer;
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

::v-deep(.custom-mat-table thead th) {
  background-color: #65367e;
  color: white;
}

::v-deep(.custom-prod-table thead th) {
  background-color: #745fec;
  color: white;
}

.view-btn {
  padding: 6px 12px !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  border-radius: 6px !important;
  border: none !important;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  text-transform: uppercase;
}

.view-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}

.view-btn:active {
  transform: scale(0.95);
}

.escalation-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.escalation-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  font-size: 1.4rem;
}

.escalation-btn i {
  color: white;
  font-size: 1.4rem;
}

/* WhatsApp */
.escalation-btn.whatsapp {
  background-color: #25D366;
}

.escalation-btn.whatsapp:hover {
  background-color: #1ebe5b;
}

/* Email */
.escalation-btn.email {
  background-color: #0078ff;
}

.escalation-btn.email:hover {
  background-color: #0065d5;
}
</style>