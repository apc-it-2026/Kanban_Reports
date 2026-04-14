<template>
    <div style="width: 100%; height: 100%; background-color: #124e66; padding: 10px">
        <div style="color: red;"> {{ errorMessage }}</div>
        <a-spin tip="loading loading" :loading="loading" style="width: 100%">
            <div>
                <div class="headding">
                    Planning Schedule Data
                </div>

                <!-- Filters  -->

                <a-row :gutter="[16, 16]" style="margin-top: 10px;margin-left: 10px;">
                    <a-col :span="10" :xs="24" :sm="12" :md="10">
                        <div style="display: flex;align-items: center;">
                            <span style="font-weight: bold;color: white;align-items: center;text-align: center;">
                                SO_Filter__: </span>
                            <a-input v-model="sofilter" placeholder="Please Insert SO" style="margin-left: 50px;" />
                        </div>
                    </a-col>
                    <a-col :span="10" :xs="24" :sm="12" :md="10">
                        <div style="display: flex;align-items: center;">
                            <span style="font-weight: bold;color: white;align-items: center;text-align: center;">
                                Week_Search_Filter__: </span>
                            <a-input v-model="weekfilter" placeholder="Formate : yyyy/mm/dd-yyyy/mm/dd"
                                style="margin-left: 50px;" @change="validateWeek(weekfilter)" />
                        </div>
                    </a-col>
                    <a-col :span="2" :xs="24" :sm="12" :md="2">
                        <div>
                            <a-button @click="EXportExel" style="font-weight: bold;color: blueviolet;">
                                Export Excel
                            </a-button>

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
                                <a-select v-model:value="selectedline" placeholder="Select Line"
                                    style="width: 200px; margin-left: 8px;" :options="lineoptions" allow-clear
                                    @change="GetLineValue" />
                            </div>
                        </a-col>
                        <a-col :span="4" :xs="24" :sm="12" :md="4">
                            <div>
                                <span style="font-weight: bold;color: blueviolet;"> Year : </span>
                                <a-select v-model:value="selectedYear" placeholder="Select Year"
                                    style="width: 200px; margin-left: 8px;" :options="YearOptions" allow-clear
                                    @change="GetMonthsMethod" />
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
                                <a-select v-model:value="selectedWeek" placeholder="Select Week"
                                    style="width: 200px; margin-left: 8px;" :options="WeekOptions" allow-clear
                                    @change="GetWeekvalue" />
                            </div>
                        </a-col>

                        <a-col :span="2" :xs="24" :sm="12" :md="2">
                            <div>
                                <a-button @click="GetPlanningDataMethod" style="font-weight: bold;color: blueviolet;">
                                    Search
                                </a-button>
                            </div>
                        </a-col>
                    </a-row>
                </a-card>
                <!-- Grid View -->
                <div>
                    <DataTable :value="PlanningLIst" paginator :rows="10" sortMode="multiple"
                        tableStyle="min-width: 80rem" dataKey="SALES_ORDER" responsiveLayout="scroll"
                        class="custom-mat-table" :loading="loading" ref="dt">
                        <Column field="WEEK" header="WEEK" sortable />
                        <Column field="SALES_ORDER" header="SALES ORDER" sortable />
                        <Column field="CONO" header="CONO" sortable />
                        <Column field="ART_NO" header="ART NO" sortable />
                        <Column field="SHOE_NAME" header="SHOE NAME" sortable style="min-width: 15rem;" />
                        <Column field="CRD" header="CRD" sortable />
                        <Column field="LPD" header="LPD" sortable />
                        <Column field="PSDD" header="PSDD" sortable />
                        <Column field="LAST_NO" header="LAST NO" sortable />
                        <Column field="MOLD_NO" header="MOLD NO" sortable /> 
                        <Column field="QTY" header="QTY" sortable />
                        <Column field="CLASS_CODE" header="CLASS CODE" sortable />
                        <Column field="DESTINATION" header="DESTINATION" sortable />
                        <Column field="REMARKS1" header="REMARKS1" sortable />
                        <Column field="REMARKS2" header="REMARKS2" sortable />
                        <Column field="LINE" header="LINE" sortable />
                        <Column field="PLANT" header="PLANT" sortable />
                        <Column field="PROCESS" header="PROCESS" sortable /> 
                        <Column header="Check SizeWiseLIne" sortable>
                            <template #body="slotProps">
                                <i class="pi pi-eye" style="font-size: 1.2rem; cursor: pointer;"
                                    @click="openDetails(slotProps.data)">
                                </i>
                            </template> 
                        </Column>
                        <!-- <Column field="LINE1" header="LINE1" sortable />  -->
                        <!-- <Column v-for="size in sizeColumns" :key="size" :field="size" :header="size" sortable
                            style="min-width: 6rem;max-width: 30rem; text-align:center;" />  -->
                    </DataTable>
                </div> 

                <a-modal v-model:visible="OpenMaterial" :hide-cancel="true" title="Size Wise Line Allocation Data For Sales Order And Aritcle" width="100%"> 
                    <div>
                    <DataTable :value="SizePlanningLIst" paginator :rows="10" sortMode="multiple"
                        tableStyle="min-width: 80rem" dataKey="SALES_ORDER" responsiveLayout="scroll"
                        class="custom-mat-table" :loading="loading" ref="dt">
                        <Column field="SHOE_NAME" header="SHOE NAME" sortable />
                        <Column field="SALES_ORDER" header="SALES ORDER" sortable />
                        <Column field="SIZE_NO" header="SIZE NO" sortable />
                        <Column field="SCH_QTY" header="Schedule Quantity" sortable />
                        <Column field="LINE" header="Line" sortable style="min-width: 15rem;" />
                    </DataTable>
                </div>
                </a-modal>  

            </div>
        </a-spin>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { GetPLantsData, GetLines, GetMonths, GetWeeks, GetYears, GetPlanningScheduleData , GetsIZEPlanningScheduleData } from '@/api/CuttingManagement/Plantwise';
import * as XLSX from 'xlsx';

const errorMessage = ref('');
const { loading, setLoading } = useLoading(false);
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
const SizePlanningLIst = ref<any>([]);
const sizeColumns = ref<string[]>([]);
const sofilter = ref('');
const weekfilter = ref('');
const dt = ref();

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
        setLoading(true);
        GetFilterStatus();
        if (!returnvalue.value) {
            const data: any = await GetPlanningScheduleData(selectedWeek.value, selectedPlant.value, selectedline.value, sofilter.value, weekfilter.value);
            console.log(data);
            PlanningLIst.value = data.list.map((item: any) => ({
                ...item,
                CRD: formatCRDDate(item.CRD),
                LPD: formatCRDDate(item.LPD),
                PSDD: formatCRDDate(item.PSDD),
            }));
            // if (data.list.length > 0) {
            //     const ignoreKeys = [
            //         'WEEK',
            //         'SALES_ORDER',
            //          'CONO' , 
            //           'ART_NO' , 
            //            'SHOE_NAME' ,  'CRD' , 
            //                'LPD' , 
            //           'PSDD' , 
            //            'LAST_NO' ,  'MOLD_NO' , 
            //                'QTY' , 
            //           'CLASS_CODE' , 
            //            'DESTINATION' ,  'REMARKS1' ,     'LINE' , 
            //           'LINE1' , 
            //            'SALES_ORDER1'
            //     ];

            //     sizeColumns.value = Object.keys(data.list[0]).filter(
            //         key => !ignoreKeys.includes(key)
            //     );
            // }
        }

    } catch (error: any) {
        errorMessage.value = error.Message;
        console.error('Error fetching plannigdata:', error);
    } finally {
        setLoading(false);
    }
};

const EXportExel = () => {
    try {
        if (!PlanningLIst.value || PlanningLIst.value.length === 0) {
            alert('No data available to export!');
            return;
        }

        // Prepare data for Excel export
        const exportData = PlanningLIst.value.map((item: any) => ({
            'WEEK': item.WEEK || '',
            'SALES ORDER': item.SALES_ORDER || '',
            'CONO': item.CONO || '',
            'ART NO': item.ART_NO || '',
            'SHOE NAME': item.SHOE_NAME || '',
            'CRD': item.CRD || '',
            'LPD': item.LPD || '',
            'PSDD': item.PSDD || '',
            'LAST NO': item.LAST_NO || '',
            'MOLD NO': item.MOLD_NO || '',
            'QTY': item.QTY || 0,
            'CLASS CODE': item.CLASS_CODE || '',
            'DESTINATION': item.DESTINATION || '',
            'REMARKS1': item.REMARKS1 || '',
            'REMARKS2': item.REMARKS2 || '',
            'LINE': item.LINE || '',
            'PLANT': item.PLANT || '',
            'PROCESS': item.PROCESS || ''
        }));

        // Create workbook and worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Planning Schedule');

        // Generate filename with current date
        const date = new Date().toISOString().split('T')[0];
        const filename = `Planning_Schedule_${date}.xlsx`;

        // Export to Excel file
        XLSX.writeFile(wb, filename);
        
        console.log('Excel export completed successfully!');
    } catch (error: any) {
        console.error('Error exporting to Excel:', error);
        alert('Failed to export data to Excel. Please try again.');
    }
};
const ParseRowData = ref<any>(null);
const OpenMaterial = ref(false);


const openDetails = async (row: any) => {
    debugger ; 
    console.log("Row details:", row);
    ParseRowData.value = row;
    OpenMaterial.value = true; 
    const line = row.PROCESS ;  
    const so = row.SALES_ORDER ; 
    const data : any = await GetsIZEPlanningScheduleData(line , so ) ;  
    SizePlanningLIst.value = data.list ; 
};

onMounted(() => {
    GetPLantsDataMethod();
    GetYearsMethod();
});

</script>

<style scoped>
.headding {
    background: linear-gradient(to right, #9d72ce, #b7bbce);
    color: #ec0d0d;
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