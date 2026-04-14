<template>
    <div class="container">
        <div> {{ errorMessage }}</div>
        <div v-if="currentview === 'buttons'">
            <a-spin tip="loading loading" :loading="loading" style="width: 100%;">
                <div class="input-container">
                    <a-row :gutter="16">
                        <a-col :span="1" :xs="6" :sm="4" :md="1">
                            <button @click="onBack" class="back-arrow"> <i class="pi pi-arrow-left"></i> </button>
                        </a-col>
                        <a-col :span="6" :xs="24" :sm="12" :md="6">
                            <div class="mat-header-text"> Material Checking </div>
                        </a-col>
                        <a-col :span="5" :xs="24" :sm="12" :md="5">
                            <div class="so-input-field">
                                <div class="so-label"> YEAR </div>
                                <a-select v-model="formModel.year" placeholder="Enter year" @change="NullValuesCRD"
                                    class="so-input">
                                    <a-option v-for="year in yearss" :key="year.CRD" :value="year.CRD">
                                        {{ year.CRD }}
                                    </a-option>
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :span="5" :xs="24" :sm="12" :md="5">
                            <div class="so-input-field">
                                <div class="so-label"> MONTH </div>
                                <a-select v-model="formModel.month" @change="CRDDATa" placeholder="Enter Month">
                                    <a-option v-for="month in months" :key="month.value" :value="month.value">
                                        {{ month.Name }}
                                    </a-option>
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :span="5" :xs="24" :sm="12" :md="5">
                            <div class="so-input-field">
                                <div class="so-label"> CRD </div>
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
                            </div>
                        </a-col>

                        <a-col :span="2" :sm="12" :xs="24" :md="2"> <Button class="submit-button" @click="submitclick">
                                Submit </Button></a-col>

                    </a-row>
                </div>

                <a-card style=" margin-top: 10px;border-radius: 5px;">
                    <div class="div-for-selections">

                        <div style="display: flex;text-align: center;align-items: center;gap: 10px;">
                            <div style="font-weight: bold;"> Week </div>
                            <a-select v-model="WeekSearch" style="width: 100%" placeholder="Select Week">
                                <a-option v-for="Week in Weeks" :key="Week.VALUE" :value="Week.VALUE">
                                    {{ Week.NAME }}
                                </a-option>
                            </a-select>
                        </div>

                        <div style="display: flex;text-align: center;align-items: center;gap: 10px;">
                            <div style="font-weight: bold;">Material</div>
                            <a-select v-model="Materialsearch" style="width: 100%" placeholder="Select Material Type">
                                <a-option v-for="material in MaterialStatus" :key="material.value"
                                    :value="material.value">
                                    {{ material.name }}
                                </a-option>
                            </a-select>
                        </div>

                        <div style="display: flex;text-align: center;align-items: center;gap: 10px;">
                            <div style="font-weight: bold;">BOTTOM</div>
                            <a-select v-model="bottomSearch" style="width: 100%" placeholder="Select Bottom Type">
                                <a-option v-for="material in MaterialStatus" :key="material.value"
                                    :value="material.value">
                                    {{ material.name }}
                                </a-option>
                            </a-select>
                        </div>

                        <div style="display: flex;text-align: center;align-items: center;gap: 10px;">
                            <div style="font-weight: bold;">UPPER</div>
                            <a-select v-model="UpperSearch" style="width: 100%" placeholder="Select Upper Type">
                                <a-option v-for="material in MaterialStatus" :key="material.value"
                                    :value="material.value">
                                    {{ material.name }}
                                </a-option>
                            </a-select>
                        </div>

                        <!-- <div style="display: flex;text-align: center;align-items: center;gap: 10px;">
                            <div style="font-weight: bold;">LASTS</div>
                            <a-select v-model="LASTSearch" style="width: 100%" placeholder="Select LAST Type">
                                <a-option v-for="material in MaterialStatus" :key="material.value"
                                    :value="material.value">
                                    {{ material.name }}
                                </a-option>
                            </a-select>
                        </div> -->

                        <!-- <div style="display: flex;text-align: center;align-items: center;gap: 10px;">
                            <div style="font-weight: bold;">STOP_LINES </div>
                            <a-select v-model="LIneSearch" style="width: 100%" placeholder="Select Process Type">
                                <a-option v-for="line in Lines" :key="line.value" :value="line.value">
                                    {{ line.name }}
                                </a-option>
                            </a-select>
                        </div> -->
                    </div>
                    <div class="div-for-selections">
                        <div class="so-qty-overal">
                            <div style="font-weight: bold;"> Overal SO Count </div>
                            <div> {{ filteredItemss.length }} </div>
                        </div>
                        <div class="so-qty-overal" :style="{ backgroundColor: getBAckgroundColorMat }">
                            <div style="font-weight: bold;"> Material Available Count </div>
                            <div> {{ MaterialAvailableQty }} </div>
                        </div>
                        <div class="so-qty-overal" :style="{ backgroundColor: getBAckgroundColorBot }">
                            <div style="font-weight: bold;"> Bottom Available Count </div>
                            <div> {{ BottomAvailableQty }} </div>
                        </div>
                        <div class="so-qty-overal" :style="{ backgroundColor: getBAckgroundColorUp }">
                            <div style="font-weight: bold;"> Upper Available Count </div>
                            <div> {{ UpperAvailableQty }} </div>
                        </div>

                        <!-- <div class="so-qty-overal" style="background-color: darksalmon">
                            <div class="clear-class" @click="GetCutingStoplines"> Identify Cutting Stop Lines
                            </div>
                            <div class="clear-class" @click="GEtStitchinStop"> Identify Stitching Stop Lines </div>
                            <div class="clear-class"> Identify Assembly Stop Lines </div>
                            <div class="clear-class" @click="ClearStopLines"> <i class="pi pi-times"></i></div>
                        </div> -->
                        <div style="display: flex;flex-wrap: wrap;gap: 10px;">
                            <div class="stop-lines" @click="GetCutingStoplines" :style="{ backgroundColor : GEtCutStopBacg()}">  
                                Identify Cutting Stop Lines
                            </div>
                            <div class="stop-lines" @click="GEtStitchinStop" :style="{ backgroundColor : GEtStitStopBacg()}">  
                                Identify Stitching Stop Lines
                            </div>
                            <div class="stop-lines" :style="{ backgroundColor : GetAssStopBacg()}" @click="GetAssemStop">
                                <div > Identify Assembly Stop Lines </div>
                            </div>
                            <div class="stop-lines" :style="{backgroundColor : GEtClearStopBacg()}" @click="ClearStopLines" > 
                                <div> <i class="pi pi-times"></i></div>
                            </div>
                        </div>


                    </div>
                </a-card>

                <div class="tables-container">
                    <a-card class="card-for-tables">
                        <div class="so-data-search-part">
                            <div class="data-headding">SO DATA</div>

                            <div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search"></i>
                                    <InputText placeholder="Search" v-model="search" />
                                </span>
                            </div>
                        </div>

                        <DataTable :value="filteredItemss" paginator :rows="10" sortMode="multiple"
                            tableStyle="min-width: 60rem" dataKey="SE_ID" responsiveLayout="scroll"
                            class="custom-mat-table">
                            <Column field="SE_ID" header="Sales order" sortable style="min-width: 150px;"/>
                            <Column field="MER_PO" header="PO" sortable style="min-width: 150px;"/>
                            <Column field="NAME_S" header="Article" sortable style="min-width: 150px;" />
                            <Column field="CR_REQDATE" header="CRD" sortable style="min-width: 150px;"/>
                            <Column field="NLT" header="PSDD" sortable style="min-width: 150px;"/>
                            <Column field="SE_QTY" header="Order Quantity" sortable style="min-width: 150px;"/>
                            <Column field="CUTTING_LINE" header="CuttingLIne" sortable style="min-width: 150px;" />
                            <Column field="WEEK" header="Cut And Stit Week" sortable style="min-width: 150px;" />
                            <Column field="STITCHING_LINE" header="Stitching line" sortable style="min-width: 150px;" />
                            <Column field="ASS_WEEK" header="Assembly Week" sortable style="min-width: 150px;" />
                            <Column field="ASSEMBLY_LINE" header="Assembly Line" sortable style="min-width: 150px;" /> 
                            <Column field="MATERIAL" header="MATERIAL" sortable >
                                <template #body="slotProps">
                                    <div style="display: flex;gap: 10px;">
                                        <div :class="GetMaterialStatus(slotProps)">
                                        </div>
                                        <div>
                                            <button class="click-button" @click="GotoMaterial(slotProps.data)"> Click
                                            </button>
                                        </div>
                                    </div>

                                </template>
                            </Column>
                            <Column field="TREATMENT_STATUS" header="Treatement Outsourcing" sortable>
                                <template #body="slotProps">
                                    <div :class="GetTreatmentOutsourcing(slotProps)">
                                    </div>
                                </template>
                            </Column>
                            <Column field="CQTY" header="Cutting qty" sortable/>
                            <Column field="SQTY" header="Stitching qty" sortable/>
                            <Column field="UPPER" header="UPPER" sortable>
                                <template #body="slotProps">
                                    <div :class="GetUpperStatusColor(slotProps)">
                                    </div>
                                </template>
                            
                            </Column>
                            <Column field="BOTTOM" header="BOTTOM" sortable>
                                <template #body="slotProps">
                                    <div :class="GetBottomStatus(slotProps)">
                                    </div>
                                </template>
                            </Column>

                            <!-- <Column field="LASTS_STATUS" header="Lasts" sortable>
                                <template #body="slotProps">
                                    <div :class="GetLastsStatus(slotProps)">

                                    </div>
                                </template>
                            </Column> --> 

                            <!-- <Column field="OUT_SOLE" header="OUT_SOLE" sortable /> -->


                        </DataTable>
                        <div style="display: flex;flex-wrap: wrap; gap: 1rem;margin-top: 10px; ">
                            <div style="display: flex;gap: 10px;">
                                <div class="availble-color"></div>
                                <div class="available-text"> Available </div>
                            </div>
                            <div style="display: flex;gap: 10px;">
                                <div class="notavailble-color"></div>
                                <div class="available-text"> Not Available </div>

                            </div>
                            <div style="display: flex;gap: 10px;">
                                <div class="nodata-color"></div>
                                <div class="available-text"> No Data </div>

                            </div>
                        </div>


                    </a-card>
                </div>
            </a-spin>
        </div>
        <component :is="components[currentview]" :rowData="clickvalueData" :onBack="goBack" />
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { Notification } from '@arco-design/web-vue';
import {
    GetCRDData,
    GetYearsValues,
    GetNearestCRDValue,
} from '@/api/e2e_General/e2eFilters';
import { GetWarehouseWeeks } from '@/api/e2e_fg/fg';
import { GetSODetails } from '@/api/e2e_biz/biz';
import material from './material.vue';

const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const dropDownContainer = ref<HTMLElement | null>(null);
const isdrowdown = ref(false);
const yearss = ref<any[]>([]);
const crddates: any = ref([]);
const props = defineProps<{
    rowData: {
        SE_ID: any;
        CR_REQDATE: any;
    } | null;
    onBack: () => void;
}>();
const seid: any = computed(() => props.rowData?.SE_ID);
const crreq: any = computed(() => props.rowData?.CR_REQDATE);
const search = ref('');
const Materialsearch = ref('');
const WeekSearch = ref('');
const bottomSearch = ref('');
const UpperSearch = ref('');
const LASTSearch = ref('');
const CutLIneSearch = ref('');
const StitLIneSearch = ref('');
const AssLineSearch = ref('') ;  
const currentview = ref<'buttons' | 'mat'>('buttons');

const components: any = {
    //
    mat: material
};
const goBack = () => {
    currentview.value = 'buttons';
};
const clickvalueData = ref(null);

const GotoMaterial = (dataa: any) => {
    clickvalueData.value = dataa;
    currentview.value = 'mat';
};


const generateFormModel = () => {
    return {
        year: '',
        month: '',
        crd: [] as string[],
        seid: '',
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
const MaterialStatus = [
    { name: "Available", value: 'green-color' },
    { name: "Not Available", value: 'red-color' },
    { name: "NO Data", value: 'black-color' },
    { name: "Clear", value: '' }
];

const handleClickEvent = (event: MouseEvent) => {
    if (
        dropDownContainer.value &&
        !dropDownContainer.value.contains(event.target as Node)
    ) {
        isdrowdown.value = false;
    }
};


onMounted(() => {
    document.addEventListener('click', handleClickEvent);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickEvent);
});

function NullValuesCRD() {
    return formModel.value.month === '';
}

const CRDDATa = async () => {
    try {
        setLoading(true);
        if (formModel.value.year !== '') {
            formModel.value.crd = [];
            formModel.value.seid = '';
            const dd: any = await GetCRDData(formModel.value);
            crddates.value = dd.list;
        } else {
            formModel.value.month = '';
            Notification.error({
                content: 'Enter CRD First',
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
const formatDate = (date: any) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
};

const filteredItems = ref<any[]>([]);


const GetMaterialStatus = (param: any) => {

    const materiall = param.data.MATERIAL;
    if (materiall === "Available") {
        return 'green-color';
    }
    if (materiall === "Not Available") {
        return 'red-color';
    }
    return 'black-color';
};
const GetTreatmentOutsourcing = (param: any) => {

    const treat = param.data.TREATMENT_STATUS;
    if (treat === "Matched") {
        return 'green-color';
    }
    if (treat === "Not Matched") {
        return 'red-color';
    }
    return 'black-color';
};

const GetBottomStatus = (param: any) => {

    const bottom = param.data.BOTTOM;
    if (bottom === "OK") {
        return 'green-color';
    }
    if (bottom === "Not OK") {
        return 'red-color';
    }
    return 'black-color';
};
const GetLastsStatus = (param: any) => {

    const bottom = param.data.LASTS_STATUS;
    if (bottom === "OK") {
        return 'green-color';
    }
    if (bottom === "Not OK") {
        return 'red-color';
    }
    return 'black-color';
};

const GetUpperStatusColor = (param: any) => {

    const sqty = param.data.SE_QTY;
    const cutting = param.data?.CQTY;
    const stitching = param.data?.SQTY;
    if (sqty === stitching && sqty === cutting) {
        return 'green-color';
    }
    if (sqty !== cutting || sqty !== stitching) {
        return 'red-color';
    }
    return 'black-color';
};

const GetCutLineStopDetails = (param: any) => {
    const materiale = param.data?.MATERIAL;
    const line = param.data?.CUTTING_LINE;
    const week = param.data?.WEEK;
    const cutqty = param.data?.CQTY;
    const ordqty = param.data?.SE_QTY;
    debugger;
    if ((materiale === "Not Available"
        || materiale === "No Data"

    ) && line !== "" && (week !== "" || week === null || week === undefined) && cutqty !== ordqty) {
        const currentYear = new Date().getFullYear();
        const [startStr, endStr] = week.split('-');
        const parseDate = (mmdd: string) => {
            debugger;
            const [month, day] = mmdd.split('/').map(Number);
            const today = new Date();
            const year = (month < today.getMonth() + 1) ? today.getFullYear() + 1 : today.getFullYear();
            return new Date(year, month - 1, day);
        };
        const weekEnd: any = ref('');
        if (endStr) {
            const matcTh = endStr.match(/^(\d{2})\/(\d{2})$/);
            if (matcTh) {
                const monthT = parseInt(matcTh[1], 10);
                const dayT = parseInt(matcTh[2], 10);
                if (monthT >= 1 && monthT <= 12 && dayT >= 1 && dayT <= 31) {
                    weekEnd.value = parseDate(endStr);
                }
            }
        }

        for (let i = 1; i <= 3; i += 1) {

            const targetDate: any = new Date();
            const daysDiff: any = (weekEnd.value - targetDate) / (1000 * 60 * 60 * 24);
            targetDate.setDate(targetDate.getDate() + i);
            if (daysDiff >= 0 && daysDiff <= 3) { 
                return 'cutting';
            }
        }
    }
    return '';
}; 

const GetStitLineStopDetails = (param: any) => {
    const treate = param.data?.TREATMENT_STATUS;  
    const line = param.data?.STITCHING_LINE;  
    const week = param.data?.WEEK;  
    const cutqty = param.data?.CQTY;
    const ordqty = param.data?.SE_QTY;
    const stitqty = param.data?.SQTY ; 

    debugger;
    if (treate === 'Not Matched' && line !== "" && week !== "" && ordqty !== stitqty ) {   
        const currentYear = new Date().getFullYear();
        const [startStr, endStr] = week.split('-');
        const parseDate = (mmdd: string) => {
            debugger;
            const [month, day] = mmdd.split('/').map(Number);
            const today = new Date();
            const year = (month < today.getMonth() + 1) ? today.getFullYear() + 1 : today.getFullYear();
            return new Date(year, month - 1, day);
        };
        const weekEnd: any = ref('');
        if (endStr) {
            const matcTh = endStr.match(/^(\d{2})\/(\d{2})$/);
            if (matcTh) {
                const monthT = parseInt(matcTh[1], 10);
                const dayT = parseInt(matcTh[2], 10);
                if (monthT >= 1 && monthT <= 12 && dayT >= 1 && dayT <= 31) {
                    weekEnd.value = parseDate(endStr);
                }
            }
        }

        for (let i = 1; i <= 3; i += 1) {

            const targetDate: any = new Date();
            const daysDiff: any = (weekEnd.value - targetDate) / (1000 * 60 * 60 * 24);
            targetDate.setDate(targetDate.getDate() + i);
            if (daysDiff >= 0 && daysDiff <= 3) {
               return 'stitching';  
            } 
        } 
    } 
    return ''; 
};   

const AssStopLineDetails = (param : any) => {
   const cutqty = param.data?.CQTY ; 
   const stiqty = param.data?.SQTY ; 
   const ordqty = param.data?.SE_QTY ; 
   const week = param.data?.ASS_WEEK ; 
   const botoom = param.data?.BOTTOM ; 
   // const lasts = param.data?.LASTS_STATUS ; 
   if(cutqty !== ordqty || stiqty !== ordqty || botoom === 'NA' || botoom === 'Not OK' 
   // lasts === 'Not OK' || lasts === 'No Data'
    )   
   {
        const currentYear = new Date().getFullYear();
        const [startStr, endStr] = week.split('-');
        const parseDate = (mmdd: string) => {
            debugger;
            const [month, day] = mmdd.split('/').map(Number);
            const today = new Date();
            const year = (month < today.getMonth() + 1) ? today.getFullYear() + 1 : today.getFullYear();
            return new Date(year, month - 1, day);
        };
        const weekEnd: any = ref('');
        if (endStr) {
            const matcTh = endStr.match(/^(\d{2})\/(\d{2})$/);
            if (matcTh) {
                const monthT = parseInt(matcTh[1], 10);
                const dayT = parseInt(matcTh[2], 10);
                if (monthT >= 1 && monthT <= 12 && dayT >= 1 && dayT <= 31) {
                    weekEnd.value = parseDate(endStr);
                }
            }
        } 
        for (let i = 1; i <= 3; i += 1) {
            const targetDate: any = new Date();
            const daysDiff: any = (weekEnd.value - targetDate) / (1000 * 60 * 60 * 24);
            targetDate.setDate(targetDate.getDate() + i);
            if (daysDiff >= 0 && daysDiff <= 3) {
               return 'assembly';   
            } 
        }  
   } 
   return '' ; 
} ;  

const GetCutingStoplines = () => {
    StitLIneSearch.value = '';
    AssLineSearch.value = '' ; 
    CutLIneSearch.value = 'cutting';
};

const GEtCutStopBacg = () => {
    if(CutLIneSearch.value === 'cutting'){ 
       return 'black' ;
    } 
    return '#0e5f69' ; 
} ; 

const GEtStitStopBacg = () => {
    if(StitLIneSearch.value === 'stitching'){ 
       return 'black' ;
    } 
    return '#0e5f69' ; 
} ; 

const GEtClearStopBacg = () => { 
    if(StitLIneSearch.value === 'stitching' || CutLIneSearch.value === 'cutting' || AssLineSearch.value === 'assembly'){  
       return 'black' ;
    } 
    return '#0e5f69' ; 
} ;  

const GetAssStopBacg = () => {  
    if(AssLineSearch.value === 'assembly'){
        return 'black' ; 
    }
    return '#0e5f69' ; 
} ;  

const ClearStopLines = () => {
    CutLIneSearch.value = '';
    StitLIneSearch.value = '';
    AssLineSearch.value = '' ; 
};

const GEtStitchinStop = () => {
    CutLIneSearch.value = '';
    AssLineSearch.value = '' ; 
    StitLIneSearch.value = 'stitching';
};

const GetAssemStop = () => {
   CutLIneSearch.value = '' ; 
   StitLIneSearch.value = '' ; 
   AssLineSearch.value = 'assembly' ; 
   
} ; 

const filteredItemss = computed(() => {
    return filteredItems.value.filter((item: any) => {
        const matchesSearch = item.SE_ID?.toLowerCase().includes(search.value.toLowerCase()) || item.MER_PO?.toLowerCase().includes(search.value.toLowerCase());
        const matchesMaterial = Materialsearch.value ? GetMaterialStatus({ data: item }) === Materialsearch.value : true;
        const MatchesBotom = bottomSearch.value ? GetBottomStatus({ data: item }) === bottomSearch.value : true;

        const MatchesUpper = UpperSearch.value ? GetUpperStatusColor({ data: item }) === UpperSearch.value : true;
        const Weeks = item.WEEK?.toLowerCase().includes(WeekSearch.value.toLowerCase());
        const MatchesLasts = LASTSearch.value ? GetLastsStatus({ data: item }) === LASTSearch.value : true;
        const CutLineMatces = CutLIneSearch.value ? GetCutLineStopDetails({ data: item }) === CutLIneSearch.value : true;
        const StitcLIneMatch: any = StitLIneSearch.value ? GetStitLineStopDetails({ data: item }) === StitLIneSearch.value : true;
        const AssemblyLineMatch : any = AssLineSearch.value ? AssStopLineDetails( { data : item } ) === AssLineSearch.value : true ; 
        return matchesSearch && matchesMaterial && MatchesBotom && MatchesUpper && Weeks && CutLineMatces && MatchesLasts && StitcLIneMatch && AssemblyLineMatch;
    });
});

const MaterialAvailableQty = computed(() => {
    return filteredItemss.value.filter((item => item.MATERIAL === "Available")).length;
});
const BottomAvailableQty = computed(() => {
    return filteredItemss.value.filter((item => item.BOTTOM === "OK")).length;
});
const UpperAvailableQty = computed(() => {
    return filteredItemss.value.filter((item => item.CQTY === item.SE_QTY && item.SQTY === item.SE_QTY
    )).length;
});

const getBAckgroundColorMat = computed(() => {
    const solength = filteredItemss.value.length;
    const availableQty = MaterialAvailableQty.value;

    if (solength === availableQty) {
        return "green";
    }
    return 'red';
});
const getBAckgroundColorBot = computed(() => {
    const solength = filteredItemss.value.length;
    const availableQty = BottomAvailableQty.value;

    if (solength === availableQty) {
        return "green";
    }
    return 'red';
});
const getBAckgroundColorUp = computed(() => {
    const solength = filteredItemss.value.length;
    const availableQty = UpperAvailableQty.value;

    if (solength === availableQty) {
        return "green";
    }
    return 'red';
});
const GetSoDetailsMethod = async () => {
    try {
        setLoading(true);
        console.log("crd ", formModel.value.crd);
        const data: any = await GetSODetails(formModel.value);
        console.log(data);

        filteredItems.value = data.list.map((item: any) => ({
            ...item,
            CR_REQDATE: formatDate(item.CR_REQDATE),
            NLT: item.NLT ? formatDate(item.NLT) : null
        }));
    } catch (error) {
        console.error("Error fetching SO details:", error);
    } finally {
        setLoading(false);
    }
};
const Weeks = ref<any>([]);


const GetWarehouseWeeksMethod = async () => {
    const data: any = await GetWarehouseWeeks(formModel.value);
    Weeks.value = data.list;
    data.list.unshift({ VALUE: "", NAME: "All" });
    console.log(Weeks.value);
};

const Lines = [
    { name: 'Cutting', value: 'cutting' },
    { name: "Stitching", value: 'stitching' },
    { name: "Assembly", value: 'assembly' },
    { name: "Clear", value: '' }
];
const submitclick = async () => {
    await GetSoDetailsMethod();
    GetWarehouseWeeksMethod();
};
onMounted(async () => {
    await GETYears();
    formModel.value.crd = [crreq.value];
    await GetSoDetailsMethod();
    GetWarehouseWeeksMethod();
    search.value = seid.value;
    console.log(search.value);
})
</script>
<style scoped>
.back-arrow {
    border-radius: 5px;
    background-color: blueviolet;
    color: white;
    font-weight: bold;
    padding: 10px;
}

.container {
    width: 100%;
    height: 100%;
}

.mat-header-text {
    color: #ff33cc;
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    line-height: 1.4;
    padding: 10px 20px;
    background: linear-gradient(135deg, #e0f053, #32eeee);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.mat-header-text:hover {
    color: white;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #4656eb, #32eeee);
}

.so-col {
    padding: 0 !important;
}

.so-input-field {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: bold;
    font-size: 16px;
    background-color: #7c7ef1;
    border-radius: 5px;
    padding: 5px;
}

.so-label {
    white-space: nowrap;
    margin-right: 8px;
    flex-shrink: 0;
    margin-left: 10px;
}

.so-input {
    flex: 1;
    border-radius: 5px;
    border: 2px solid white;
    background-color: white;
}

.submit-button {
    padding: 10px;
    background-color: #115c5c;
    border: 2px solid white;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
}


.tables-container {
    margin-top: 10px;
}

.card-for-tables {
    background-color: #4f7979;
    padding: 10px;
    /* margin: 10px; */
    border-radius: 5px;
}

.data-headding {
    color: white;
    font-weight: bold;
    margin-bottom: 10px;
}

::v-deep(.custom-mat-table thead th) {
    background-color: #65367e;
    color: white;
}

::v-deep(.custom-mat-table tbody tr:nth-child(even) td) {
    background-color: rgb(248, 223, 223);
    color: black;
}

::v-deep(.custom-mat-table tbody tr:nth-child(odd) td) {
    background-color: rgb(202, 197, 197);
    color: black;
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
    margin-left: 20px;
}

.po-suggetion-items {
    padding: 5px 10px;
    cursor: pointer;
}

.po-suggetion-items:hover {
    background-color: #e6f7ff;
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

.dropdown {
    padding: 6px;
    font-size: 16px;
    background-color: white;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    /* scrollbar-width: none; */
}

.dropdowncontainer {
    width: 100%;
    max-width: 300px;
    position: relative;
}

.p-input-icon-left {
    display: flex;
    gap: 10px;
    text-align: center;
    align-items: center;
    color: white;
    font-weight: bold;

}

.so-data-search-part {
    display: flex;
    flex-direction: row;
    gap: 40px;
    text-align: center;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
}



.div-for-selections {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
}

.so-qty-overal {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
    background-color: rgb(139, 91, 252);
    color: white;
    font-weight: bold;
    border-radius: 5px;
}

.stop-lines {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
    /* background-color: rgb(45, 191, 248); */
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer; 
}

.bc-for-so {
    background-color: #115c5c;
}

.red-color {
    background-color: red;
    width: 25px;
    height: 25px;
    border-radius: 10px;
}

.green-color {
    background-color: rgb(67, 230, 75);
    width: 25px;
    height: 25px;
    border-radius: 10px;
}

.black-color {
    background-color: rgb(19, 17, 17);
    width: 25px;
    height: 25px;
    border-radius: 10px;
}

.click-button {
    background-color: white;
    border-radius: 4px;
    border: none;
    padding: 5px;
    font-weight: bold;
}

.availble-color,
.nodata-color,
.notavailble-color {
    width: 20px;
    height: 20px;
    border-radius: 5px;
}

.availble-color {
    background-color: rgb(102, 243, 97);
}

.nodata-color {
    background-color: rgb(18, 19, 18);
}

.notavailble-color {
    background-color: rgb(238, 39, 39);
}

.available-text {
    font-weight: bold;
    font-size: 16px;
    color: white;
}

.clear-class {
    /* background-color: rgb(199, 130, 130); */
    font-weight: bold;
    padding: 5px;
    color: rgb(247, 241, 241);
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}
</style>
