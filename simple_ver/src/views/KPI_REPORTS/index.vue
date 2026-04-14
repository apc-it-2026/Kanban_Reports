<template>

    <div>
        <div class="error"> {{ errorMessage }}</div>
        <a-spin tip="loading loading" :loading="loading" style="width: 100%;">
            <div>
                <div class="headder">
                    <div class="center-title"> KPI DASHBOARD </div>
                    <div class="right-buttons">
                        <Button class="search-button" @click="GetKPIDataTableMethod">Search</Button>
                        <Button class="export-button" @click="exportToExcel"> Export </Button>
                        <Button class="zero-kpi-button" @click="OpenzeroKPI"> ZERO KPI </Button>
                    </div>
                </div>
                <a-row :gutter="16">
                    <a-col :span="6" :xs="24" :sm="12" :md="6">
                        <div class="input">
                            <span> Month </span>
                            <a-select class="a-select" v-model="formModel.month">
                                <a-option v-for="month in bookNoList" :key="month.BOOK_NO" :value="month.BOOK_NO"> {{
                                    month.BOOK_NO }}</a-option>
                            </a-select>
                        </div>
                    </a-col>
                    <a-col :span="6" :xs="24" :sm="12" :md="6">
                        <div class="input">
                            <span> Plant </span>
                            <a-select class="a-select" v-model="formModel.plant" @change="GetInputValuesmethod">
                                <a-option v-for="plant in PlantList" :key="plant.UDF05" :value="plant.UDF05"> {{
                                    plant.UDF05
                                }}</a-option>
                            </a-select>
                        </div>
                    </a-col>
                    <a-col :span="6" :xs="24" :sm="12" :md="6">
                        <div class="input">
                            <span> Type </span>
                            <a-select class="a-select" v-model="formModel.type" @change="GetInputValuesmethod">
                                <a-option v-for="type in Typelist" :key="type.value" :value="type.value"> {{ type.name
                                }}</a-option>
                            </a-select>
                        </div>
                    </a-col>
                    <a-col :span="6" :xs="24" :sm="12" :md="6">
                        <div class="input">
                            <span> Line </span>
                            <a-select class="a-select" v-model="formModel.line">
                                <a-option v-for="line in LineList" :key="line.DEPARTMENT_CODE"
                                    :value="line.DEPARTMENT_CODE"> {{ line.DEPARTMENT_CODE }}</a-option>
                            </a-select>
                        </div>
                    </a-col>
                </a-row>
                <a-card>
                    <div>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <InputText placeholder="search" v-model="search" />
                        </span>
                    </div> 
                    <DataTable :value="filteredItems" paginator :rows="10" sortMode="multiple"
                        tableStyle="min-width: 60rem" dataKey="BOOK_NO" responsiveLayout="scroll"
                        class="custom-kpi-table">
                        <Column header="EXPAND">
                            <template #body="slotProps">
                                <Button label="Expand" class="expand-btn" @click="onExpand(slotProps.data)" />
                            </template>
                        </Column>
                        <Column header="VIEW">
                            <template #body="slotProps">
                                <Button label="View" class="view-btn" @click="onView(slotProps.data)" />
                            </template>
                        </Column>
                        <Column field="BOOK_NO" header="BOOK_NO" sortable />
                        <Column field="PROD_LINE" header="PROD_LINE" sortable />
                        <Column field="OUTPUT_TARGET_PERCENT" header="OUTPUT_TARGET_PERCENT" sortable />
                        <Column field="PO_FINISH_PERCENT" header="PO_FINISH_PERCENT" sortable />
                        <Column field="PO_FINISH_SCORE" header="PO_FINISH_SCORE" sortable />
                        <Column field="B_GRADE_PERCENT" header="B_GRADE_PERCENT" sortable />

                        <Column field="B_GRADE_SCORE" header="B_GRADE_SCORE" sortable />
                        <Column field="RFT" header="RFT" sortable />
                        <Column field="RFT_SCORE" header="RFT_SCORE" sortable />
                        <Column field="REPACKING_PERCENT" header="REPACKING_PERCENT" sortable />
                        <Column field="REPACKING_SCORE" header="REPACKING_SCORE" sortable />
                        <Column field="SIZE_LABEL_COUNT" header="SIZE_LABEL_COUNT" sortable />

                        <Column field="SIZE_LABEL_SCORE" header="SIZE_LABEL_SCORE" sortable />
                        <Column field="REPLACEMENT_PAIRCOST" header="REPLACEMENT_PAIRCOST" sortable />
                        <Column field="REPLACEMENT_SCORE" header="REPLACEMENT_SCORE" sortable />
                        <Column field="KAIZEN_PERCENT" header="KAIZEN_PERCENT" sortable />
                        <Column field="KAIZEN_SCORE" header="KAIZEN_SCORE" sortable />
                        <Column field="HAULTING" header="HAULTING" sortable />

                        <Column field="BONDING_PERCENT" header="BONDING_PERCENT" sortable />
                        <Column field="BONDING_SCORE" header="BONDING_SCORE" sortable />
                        <Column field="IE_PERCENT" header="IE_PERCENT" sortable />
                        <Column field="IE_SCORE" header="IE_SCORE" sortable />
                        <Column field="TOTAL_SCORE" header="TOTAL_SCORE" sortable />


                    </DataTable>
                </a-card>
            </div>

        </a-spin>
    </div>

    <Dialog header="Day Wise KPI Data" v-model:visible="showExpand" :modal="true" :closable="true" style="width: 80%;">
        <div class="suggetions-dialogue">
            <span> Line : {{ SuggetionLine }} </span>
            <span> Month : {{ SuggetionMonth }} </span>
        </div>
        <div>
            <Chart :options="ExpandChart" style="width: 100%; height: 400px;" />
        </div>
        <div class="piechart-options">
            <div v-for="kpi in KPIS" :key="kpi.value" :value="kpi.value" @click="LineGraph(kpi.value)"> {{ kpi.name }}
            </div>
        </div>
    </Dialog>

    <Dialog header="KPI CRITERIA VISUALIZATION" v-model:visible="showView" :modal="true" :closable="true"
        style="width: 100%;">
        <div>
            <div class="piechart-options">
                <div v-for="kpi in KPIS" :key="kpi.value" :value="kpi.value" @click="PercentPieChart(kpi.value)"> {{
                    kpi.name
                    }}
                </div>
            </div>
            <div class="suggetions-dialogue">
                <span> Line : {{ SuggetionLine }} </span>
                <span> Month : {{ SuggetionMonth }} </span>
            </div>
            <Chart :options="ViewGraph3" style="width: 100%; height: 600px;" v-if="Show3Chart" />
            <Chart :options="ViewGraph2" style="width: 100%; height: 600px;" v-if="show2Chart" />
            <!-- <Chart :options="ViewChart" /> -->
        </div>
    </Dialog>

    <Dialog header="ZERO KPI" v-model:visible="showzerokpi" :modal="true" :closable="true" style="width: 90%;">
        <a-card>
            <div>
                <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <InputText placeholder="search" v-model="searchzerokpi" />
                </span>
            </div>
            <DataTable :value="filteredZEROKPIitems" paginator :rows="10" sortMode="multiple"
                tableStyle="min-width: 60rem" dataKey="BOOK_NO" responsiveLayout="scroll" class="custom-kpi-table">

                <Column v-for="col in filteredColumns2" :key="col.field" :field="col.field" :header="col.header"
                    sortable />

            </DataTable>

        </a-card>
        <div class="piechart-options">
            <div v-for="kpi in KPIS" :key="kpi.value" :value="kpi.value" @click="GetKPIlISTSS(kpi)"> {{ kpi.name }}
            </div>
        </div>
    </Dialog>

</template>
<script lang="ts" setup>
import { onMounted, ref, computed, nextTick } from 'vue';
import { GetKPIDataTable, GetInputLabels, GetExpandLineChart, GetZEROKPI, GetKPIPiechart } from '@/api/kpi';
import useLoading from '@/hooks/loading';
import { Notification } from '@arco-design/web-vue';
import Dialog from 'primevue/dialog';
import * as XLSX from 'xlsx';


const { loading, setLoading } = useLoading();

const date = new Date();
const year = date.getFullYear();
const monthh = String(date.getMonth() + 1).padStart(2, '0');  
const presentdate = `${year}${monthh}`;

console.log(presentdate);  

const generateFormmodal = () => {
    return {
        month: presentdate,
        line: 'All',
        plant: 'All',
        type: 'All',
    }
};
const formModel = ref(generateFormmodal());
const errorMessage = ref('');
const items = ref<any>([]);
const search = ref('');
const searchzerokpi = ref('');
const bookNoList = ref<any>([]);
const PlantList = ref<any>([]);
const Typelist = ref<any>([
    { name: "All", value: "All" },
    { name: "Cutting", value: "C" },
    { name: "Stitching", value: "S" },
    { name: "Assembly", value: "L" },
    { name: "Stock Fitting", value: "T" },
]);
const LineList = ref<any>([]);
const showExpand = ref(false);
const showView = ref(false);
const showzerokpi = ref(false);
const GetInputValuesmethod = async () => {
    try {
        setLoading(true);
        const data: any = await GetInputLabels(formModel.value);
        bookNoList.value = data.list.BookNumbers;
        bookNoList.value.unshift({ BOOK_NO: "All" });
        PlantList.value = data.list.Plants;
        PlantList.value.unshift({ UDF05: "All" });
        LineList.value = data.list.Departments;
        LineList.value.unshift({ DEPARTMENT_CODE: "All" });
    }
    catch (error: any) {
        errorMessage.value = error.message;
    } finally {
        setLoading(false);
    }
};

const GetKPIDataTableMethod = async () => {
    try {
        setLoading(true);
        const data: any = await GetKPIDataTable(formModel.value);
        items.value = data.list;
        if (data.list.length <= 0) {
            Notification.error({
                title: 'KPI DATA',
                content: 'NO Data'
            })
        } else {
            Notification.success({
                title: 'KPI DATA',
                content: 'Data Return Successfully'
            })
        }
    } catch (error: any) {
        errorMessage.value = error.message;
    } finally {
        setLoading(false);
    }
}

const filteredItems = computed(() => {
    if (!search.value) return items.value;
    return items.value.filter((item: any) =>
        (item.BOOK_NO?.toLowerCase() || '').includes(search.value.toLowerCase()) ||
        (item.PROD_LINE?.toLowerCase() || '').includes(search.value.toLowerCase())
    );
});

const SuggetionLine = ref('');
const SuggetionMonth = ref('');
const ExpandChart = ref();
const Show3Chart = ref(false);
const show2Chart = ref(false);
// const ViewChart = ref();
const LineGraph = async (kpi: any) => {

    const data: any = await GetExpandLineChart(SuggetionMonth.value, SuggetionLine.value, kpi);
    const months = data.list.map((item: any) => item.BOOK_DATE.split(' ')[0]);
    const values = data.list.map((item: any) => item.SCORE);

    ExpandChart.value = {
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const item = params[0];
                return `Date: ${item.name}<br/>Score: ${item.value}`;
            }
        },
        xAxis: {
            type: 'category',
            data: months
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: values,
                type: 'line'
            }
        ]
    };
};
const onExpand = async (row: any) => {
    console.log('Expand clicked:', row);
    showExpand.value = true;
    const month: any = row.BOOK_NO;
    SuggetionMonth.value = month;
    const line: any = row.PROD_LINE;
    SuggetionLine.value = line;
    LineGraph("");
};


const outputTarget3 = ref([]);
const ViewGraph3 = ref<any>(null);
const selectedConfig3: any = ref([]);
const outputTarget2 = ref([]);
const ViewGraph2 = ref<any>(null);
const selectedConfig2: any = ref([]);

const PercentPie2 = async (kpi: string) => {
    const day = outputTarget2.value.map((index: any) => index.DAY.split('T')[0]);
    const colors = [
        '#5470C6',
        '#91CC75',
    ];
    const fields: Record<string, any[]> = {};
    const fieldNames = [
        'SIZE_LABEL_COUNT', 'KAIZEN_PERCENT', 'BONDING_PERCENT', 'IE_PERCENT', 'HAULTING'
    ];

    fieldNames.forEach(name => {
        fields[name] = outputTarget2.value.map((item: any) => item[name]);
    });
    const configMap: Record<string, { yAxis: any[], series: any[] }> = {
        SIZE_LABEL: {
            yAxis: [
                { type: 'value', name: 'SIZE LABEL COUNT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
            ],
            series: [
                { name: 'SIZE LABEL COUNT', type: 'bar', data: fields.SIZE_LABEL_COUNT },
            ]
        },
        KAIZEN: {
            yAxis: [
                { type: 'value', name: 'KAIZEN PERCENT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value} %' } }, 
            ],
            series: [
                { name: 'KAIZEN PERCENT', type: 'bar', data: fields.KAIZEN_PERCENT , tooltip: { valueFormatter: (val: any) => `${val} %` }  }, 
            ]
        },
        BONDING: {
            yAxis: [
                { type: 'value', name: 'BONDING PERCENT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value} %' } },
            ],
            series: [
                { name: 'BONDING PERCENT', type: 'bar', data: fields.BONDING_PERCENT  , tooltip: { valueFormatter: (val: any) => `${val} %` }  },
            ]
        },
        IE: {
            yAxis: [
                { type: 'value', name: 'IE PERCENT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}%' } },
            ],
            series: [
                { name: 'IE PERCENT', type: 'bar', data: fields.IE_PERCENT , tooltip: { valueFormatter: (val: any) => `${val} %` }  },
            ]
        },
        HAULTING: {
            yAxis: [
                { type: 'value', name: 'Haulting', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
            ],
            series: [
                { name: 'Haulting', type: 'bar', data: fields.HAULTING },
            ]
        },
    };
    ViewGraph2.value = {
        color: colors,
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        grid: { right: '20%' },
        toolbox: { feature: { restore: { show: true }, saveAsImage: { show: true } } },
        legend: { data: [] },
        xAxis: [{ type: 'category', axisTick: { alignWithLabel: true }, data: day }],
        yAxis: [],
        series: []
    };
    selectedConfig2.value = configMap[kpi];
    ViewGraph2.value.yAxis = selectedConfig2.value.yAxis;
    ViewGraph2.value.series = selectedConfig2.value.series;
    ViewGraph2.value.legend.data = selectedConfig2.value.series.map((s: any) => s.name);
};

const PercentPie3 = async (kpi: string) => {
    const day = outputTarget3.value.map((index: any) => index.DAY.split('T')[0]);
    const colors = [
        '#5470C6',
        '#91CC75',
        '#FAC858',
    ];
    const fields: Record<string, any[]> = {};
    const fieldNames = [
        'TARGET', 'OUTPUT', 'OUTPUT_TARGET_PERCENT', 'TARGET_PO', 'FINISH_PO', 'PO_FINISH_PERCENT',
        'B_GRADES', 'REPAIRS', 'B_GRADE_PERCENT', 'INSPECTION_QTY', 'QUALIFIED_QTY', 'RFT',
        'REPACKING_QTY', 'REPACKING_PERCENT', 'REPLACEMENT_AMOUNT',
        'REPLACEMENT_PAIRCOST'
    ];

    fieldNames.forEach(name => {
        fields[name] = outputTarget3.value.map((item: any) => item[name]);
    });

    const configMap: Record<string, { yAxis: any[], series: any[] }> = {
        OUTPUT: {

            yAxis: [
                { type: 'value', name: 'Target', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Output', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Percent', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Target', type: 'bar', data: fields.TARGET },
                { name: 'Output', type: 'bar', yAxisIndex: 1, data: fields.OUTPUT },
                { name: 'Percent', type: 'line', yAxisIndex: 2, data: fields.OUTPUT_TARGET_PERCENT, tooltip: { valueFormatter: (val: any) => `${val} %` } }
            ]
        },
        PO_FINISH: {
            yAxis: [
                { type: 'value', name: 'Target PO', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Finish PO', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'PO Finish Percent', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Target PO', type: 'bar', data: fields.TARGET_PO },
                { name: 'Finish PO', type: 'bar', yAxisIndex: 1, data: fields.FINISH_PO },
                { name: 'PO Finish Perc', type: 'line', yAxisIndex: 2, data: fields.PO_FINISH_PERCENT, tooltip: { valueFormatter: (val: any) => `${val} %` } }
            ]
        },
        B_GRADE: {
            yAxis: [
                { type: 'value', name: 'Output', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'B Grades', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'B Grade %', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }

            ],
            series: [
                { name: 'Output', type: 'bar', data: fields.OUTPUT },
                { name: 'B Grades', type: 'bar', yAxisIndex: 1, data: fields.B_GRADES },
                { name: 'B - Grade %', type: 'line', yAxisIndex: 1, data: fields.B_GRADE_PERCENT ,  tooltip: { valueFormatter: (val: any) => `${val} %` }  },

            ]
        },
        RFT: {
            yAxis: [
                { type: 'value', name: 'Inspection Qty', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Qualified Qty', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'RFT', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value}%' } }
            ],
            series: [
                { name: 'Inspection Qty', type: 'bar', yAxisIndex: 1, data: fields.INSPECTION_QTY },
                { name: 'Qualified Qty', type: 'bar', yAxisIndex: 1, data: fields.QUALIFIED_QTY },
                { name: 'RFT', type: 'line', yAxisIndex: 2, data: fields.RFT , tooltip: { valueFormatter: (val: any) => `${val} %` }  }
            ]
        },
        REPACKING: {
            yAxis: [
                { type: 'value', name: 'Output', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'REPQ', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'RPP', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Output', type: 'bar', data: fields.OUTPUT },
                { name: 'RPQ', type: 'bar', yAxisIndex: 1, data: fields.REPACKING_QTY },
                { name: 'RPP', type: 'line', yAxisIndex: 1, data: fields.REPACKING_PERCENT, tooltip: { valueFormatter: (val: any) => `${val} %` } },
            ]
        },
        REPLACEMENT: {
            yAxis: [
                { type: 'value', name: 'Output', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'RPA', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'RPP', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Output', type: 'bar', data: fields.OUTPUT },
                { name: 'REPLACEMENT AMOUNT', type: 'bar', yAxisIndex: 1, data: fields.REPLACEMENT_AMOUNT },
                { name: 'REPLACEMENT PAIRCOST', type: 'line', yAxisIndex: 1, data: fields.REPLACEMENT_PAIRCOST , tooltip: { valueFormatter: (val: any) => `${val} %` } }, 
            ]
        },
    };
    ViewGraph3.value = {
        color: colors,
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        grid: { right: '20%' },
        toolbox: { feature: { restore: { show: true }, saveAsImage: { show: true } } },
        legend: { data: [] },
        xAxis: [{ type: 'category', axisTick: { alignWithLabel: true }, data: day }],
        yAxis: [],
        series: []
    };
    selectedConfig3.value = configMap[kpi];
    ViewGraph3.value.yAxis = selectedConfig3.value.yAxis;
    ViewGraph3.value.series = selectedConfig3.value.series;
    ViewGraph3.value.legend.data = selectedConfig3.value.series.map((s: any) => s.name);

};

const onView = async (row: any) => {
    console.log('View clicked:', row);
    showView.value = true;
    const month: any = row.BOOK_NO;
    SuggetionMonth.value = month;
    const line: any = row.PROD_LINE;
    SuggetionLine.value = line;
    const data: any = await GetKPIPiechart(SuggetionMonth.value, SuggetionLine.value, "");
    outputTarget3.value = data.list.OutputTarget;
    outputTarget2.value = data.list.OutputTarget;
};

const PercentPieChart = (kpi: any) => {
    if (kpi === "REPLACEMENT" || kpi === "OUTPUT" || kpi === "PO_FINISH" || kpi === "B_GRADE" || kpi === "RFT" || kpi === "REPACKING") {

        show2Chart.value = false;
        Show3Chart.value = true;
        PercentPie3(kpi);
    } else {
        Show3Chart.value = false;
        show2Chart.value = true;
        PercentPie2(kpi);
    }
};


const exportToExcel = () => {
    const dataToExport = items.value.map((index: any) => {
        return {
            'BOOK_NO': index.BOOK_NO,
            'PROD_LINE': index.PROD_LINE,
            'OUTPUT_TARGET_PERCENT': index.OUTPUT_TARGET_PERCENT,
            'PO_FINISH_PERCENT': index.PO_FINISH_PERCENT,
            'PO_FINISH_SCORE': index.PO_FINISH_SCORE,
            'B_GRADE_PERCENT': index.B_GRADE_PERCENT,
            'B_GRADE_SCORE': index.B_GRADE_SCORE,
            'RFT': index.RFT,
            'RFT_SCORE': index.RFT_SCORE,
            'REPACKING_PERCENT': index.REPACKING_PERCENT,
            'REPACKING_SCORE': index.REPACKING_SCORE,
            'SIZE_LABEL_COUNT': index.SIZE_LABEL_COUNT,
            'SIZE_LABEL_SCORE': index.PO_FINISH_PERCENT,
            'REPLACEMENT_PAIRCOST': index.PO_FINISH_SCORE,
            'REPLACEMENT_SCORE': index.B_GRADE_PERCENT,
            'KAIZEN_PERCENT': index.B_GRADE_SCORE,
            'KAIZEN_SCORE': index.RFT,
            'HAULTING': index.RFT_SCORE,
            'BONDING_PERCENT': index.PO_FINISH_SCORE,
            'BONDING_SCORE': index.B_GRADE_PERCENT,
            'IE_PERCENT': index.B_GRADE_SCORE,
            'IE_SCORE': index.RFT,
            'TOTAL_SCORE': index.RFT_SCORE,
        };
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, 'KPI');
    XLSX.writeFile(wb, 'KPI.xlsx');
};
const KPIS = ref([
    { name: 'OUTPUT', value: 'OUTPUT' },
    { name: 'PO_FINISH', value: 'PO_FINISH' },
    { name: 'B_GRADE', value: 'B_GRADE' },
    { name: 'RFT', value: 'RFT' },
    { name: 'REPACKING', value: 'REPACKING' },
    { name: 'SIZE_LABEL', value: 'SIZE_LABEL' },
    { name: 'REPLACEMENT', value: 'REPLACEMENT' },
    { name: 'KAIZEN', value: 'KAIZEN' },
    { name: 'BONDING', value: 'BONDING' },
    { name: 'IE', value: 'IE' },
    { name: 'HAULTING', value: 'HAULTING' },
]);

const allColumns = [
    { field: 'BOOK_NO', header: 'BOOK_NO' },
    { field: 'PROD_LINE', header: 'PROD_LINE' },
    { field: 'TARGET', header: 'TARGET' },
    { field: 'OUTPUT', header: 'OUTPUT' },
    { field: 'OUTPUT_TARGET_PERCENT', header: 'OUTPUT_TARGET_PERCENT' },
    { field: 'OUTPUT_TARGET_SCORE', header: 'OUTPUT_TARGET_SCORE' },
    { field: 'TARGET_PO', header: 'TARGET_PO' },
    { field: 'FINISH_PO', header: 'FINISHPO' },
    { field: 'PO_FINISH_PERCENT', header: 'PO_FINISH_PERCENT' },
    { field: 'PO_FINISH_SCORE', header: 'PO_FINISH_SCORE' },
    { field: 'REPAIRS', header: 'REPAIRS' },
    { field: 'B_GRADES', header: 'B_GRADES' },
    { field: 'B_GRADE_PERCENT', header: 'B_GRADE_PERCENT' },
    { field: 'B_GRADE_SCORE', header: 'B_GRADE_SCORE' },
    { field: 'QUALIFIED_QTY', header: 'QUALIFIED_QTY' },
    { field: 'INSPECTIONS_QTY', header: 'INSPECTION_QTY' },
    { field: 'RFT', header: 'RFT' },
    { field: 'RFT_SCORE', header: 'RFT_SCORE' },
    { field: 'REPACKING_QTY', header: 'REPACKING_QTY' },
    { field: 'REPACKING_PERCENT', header: 'REPACKING_PERCENT' },
    { field: 'REPACKING_SCORE', header: 'REPACKING_SCORE' },
    { field: 'SIZE_LABEL_COUNT', header: 'SIZE_LABEL_COUNT' },
    { field: 'SIZE_LABEL_SCORE', header: 'SIZE_LABEL_SCORE' },
    { field: 'REPLACEMENT_AMOUNT', header: 'REPLACEMENT_AMOUNT' },
    { field: 'REPLACEMENT_PAIRCOST', header: 'REPLACEMENT_PAIRCOST' },
    { field: 'REPLACEMENT_SCORE', header: 'REPLACEMENT_SCORE' },
    { field: 'KAIZEN_PERCENT', header: 'KAIZEN_PERCENT' },
    { field: 'KAIZEN_SCORE', header: 'KAIZEN_SCORE' },
    { field: 'HAULTING', header: 'HAULTING' },
    { field: 'BONDING_PERCENT', header: 'BONDING_PERCENT' },
    { field: 'BONDING_SCORE', header: 'BONDING_SCORE' },
    { field: 'IE_PERCENT', header: 'IE_PERCENT' },
    { field: 'IE_SCORE', header: 'IE_SCORE' },
    { field: 'TOTAL_SCORE', header: 'TOTAL_SCORE' }
];
const visibleColumns: any = ref([]); // initially empty or default visible

const GetKPIlISTSS = (kpi: any) => {

    switch (kpi.value) {
        case 'OUTPUT':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'TARGET', 'OUTPUT', 'OUTPUT_TARGET_PERCENT', 'OUTPUT_TARGET_SCORE'];
            break;
        case 'PO_FINISH':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'TARGET_PO', 'FINISH_PO', 'PO_FINISH_PERCENT', 'PO_FINISH_SCORE'];
            break;
        case 'B_GRADE':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'REPAIRS', 'B_GRADES', 'B_GRADE_PERCENT', 'B_GRADE_SCORE'];
            break;
        case 'RFT':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'QUALIFIED_QTY', 'INSPECTIONS_QTY', 'RFT', 'RFT_SCORE'];
            break;
        case 'REPACKING':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'REPACKING_QTY', 'REPACKING_PERCENT', 'REPACKING_SCORE'];
            break;
        case 'SIZE_LABEL':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'SIZE_LABEL_COUNT', 'SIZE_LABEL_SCORE'];
            break;
        case 'REPLACEMENT':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'REPLACEMENT_AMOUNT', 'REPLACEMENT_PAIRCOST', 'REPLACEMENT_SCORE'];
            break;
        case 'KAIZEN':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'KAIZEN_PERCENT', 'KAIZEN_SCORE'];
            break;
        case 'BONDING':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'BONDING_PERCENT', 'BONDING_SCORE'];
            break;
        case 'IE':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'IE_PERCENT', 'IE_SCORE'];
            break;
        case 'HAULTING':
            visibleColumns.value = ['BOOK_NO', 'PROD_LINE', 'HAULTING'];
            break;
        default:
            visibleColumns.value = allColumns.map(col => col.field); // Show all
            break;
    }
};



const filteredColumns2 = computed(() =>
    allColumns.filter(col => visibleColumns.value.includes(col.field))
);

const zerokpilist = ref<any>([]);
const GetZEROKPIMethod = async () => {
    try {

        setLoading(true);
        const data: any = await GetZEROKPI(formModel.value);
        console.log(data);
        zerokpilist.value = data.list;
        if (data.list.length <= 0) {
            Notification.error({
                title: 'ZERO KPI DATA',
                content: 'NO Data'
            })
        } else {
            Notification.success({
                title: 'ZERO KPI DATA',
                content: 'Data Return Successfully'
            })
        }
    }
    catch (error: any) {
        errorMessage.value = error.message;
    } finally {
        setLoading(false);
    }
};

const filteredZEROKPIitems = computed(() => {
    if (!searchzerokpi.value) return zerokpilist.value;
    return zerokpilist.value.filter((item: any) =>
        (item.BOOK_NO?.toLowerCase() || '').includes(searchzerokpi.value.toLowerCase()) ||
        (item.PROD_LINE?.toLowerCase() || '').includes(searchzerokpi.value.toLowerCase())
    );
});
const OpenzeroKPI = () => {
    showzerokpi.value = true;
    GetZEROKPIMethod();
    GetKPIlISTSS("");
};

onMounted(async () => {
    await GetInputValuesmethod();
    await GetKPIDataTableMethod();
});

</script>
<style scoped>
.error {
    color: red;
    font-weight: bold;
}

.headder {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #ccc;
    padding: 0 1rem;
}

.center-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 1.2rem;
}

.right-buttons {
    display: flex;
    gap: 1rem
}

.input {
    background-color: rgb(238, 108, 108);
    display: flex;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
    align-items: center;
    gap: 10px;
    font-weight: bold;
}

.a-select {
    border: 2px solid rgb(18, 21, 65);
    border-radius: 5px;
}

.p-input-icon-left {
    display: flex;
    gap: 10px;
    text-align: center;
    align-items: center;

}

.search-button {
    padding: 10px;
    width: auto;
    font-weight: bold;
    background-color: rgb(82, 85, 250);
    border-radius: 5px;
    border: none;
    color: white;
    cursor: pointer;
}

.export-button {
    padding: 10px;
    width: auto;
    font-weight: bold;
    background-color: rgb(237, 94, 250);
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.zero-kpi-button {
    padding: 10px;
    width: auto;
    font-weight: bold;
    background-color: rgb(226, 243, 78);
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.expand-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 10px;
    border-radius: 5px;

}

.view-btn {
    background-color: #2196f3;
    color: white;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 10px;
    border-radius: 5px;
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

.suggetions-dialogue {
    display: flex;
    gap: 10px;
    color: #2196f3;
    font-weight: bold;
}

.piechart-options {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.piechart-options div {
    background-color: rgb(91, 80, 241);
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    color: white;
    min-width: 100px;
    text-align: center;
    cursor: pointer;
}
</style>