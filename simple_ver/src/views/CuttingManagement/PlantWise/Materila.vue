<template>
    <div style="width: 100%; height: 100%; background-color: white; padding: 10px">
        <div>{{ errorMessage }}</div>

        <a-spin tip="loading loading" :loading="loading" style="width: 100%">
            <a-card class="info-card">
                <div class="info-title">
                    Material Status for: <b>{{ props.data?.SALES_ORDER }}</b>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">Article Name</span>
                        <span class="value">{{ ArticleName }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">Article</span>
                        <span class="value">{{ Article }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">Upper Material</span>
                        <span class="value">{{ UpperMaterial }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">Upper Material Name</span>
                        <span class="value">{{ UpperMaterialName }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">Org</span>
                        <span class="value">{{ Org }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">Process</span>
                        <span class="value">{{ Process }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">CRD</span>
                        <span class="value">{{ CRD }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">Production Input Date</span>
                        <span class="value">{{ ProductionIDate }}</span>
                    </div>

                    <div class="info-item">
                        <span class="label">Production End Date</span>
                        <span class="value">{{ ProdEDate }}</span>
                    </div>
                </div>
            </a-card>

            <div>
                <DataTable :value="WarehouseGridList" paginator :rows="10" sortMode="multiple"
                    tableStyle="min-width: 80rem" dataKey="SALES_ORDER" responsiveLayout="scroll"
                    class="custom-mat-table" :loading="loading">
                    <Column field="idnrk" header="Material" sortable style="min-width: 5rem;" />
                    <Column field="zpno" header="Part" sortable style="min-width: 5rem;" />
                    <Column field="zptnm" header="Name" sortable style="min-width: 15rem;" />
                    <Column field="xql" header="Demand Qty" sortable style="min-width: 5rem;" />
                    <Column field="menge" header="Purchase Qty" sortable style="min-width: 5rem;" />
                    <Column field="hl" header="Returning Qty" sortable style="min-width: 5rem;" />
                    <Column field="yfl" header="Issue Qty" sortable style="min-width: 5rem;" />
                    <Column field="wfl" header="Un Issue Qty" sortable style="min-width: 5rem;" />
                    <Column field="kky" header="Available Inventory" sortable style="min-width: 5rem;" />
                    <Column field="kyg" header="Pre order Inventory" sortable style="min-width: 5rem;" />
                    <Column field="ql" header="Shortage Qty" sortable style="min-width: 5rem;" />
                    <Column field="materialStatus" header="Material Status"></Column>
                    <Column field="ColorIndication" header="Indication" style="min-width: 5rem">
                        <template #body="slotProps">
                            <span :style="{
                                display: 'inline-block',
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: slotProps.data.ColorIndication
                            }"></span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </a-spin>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { GetWarehouseStockBySO } from "@/api/CuttingManagement/Plantwise";
import useLoading from "@/hooks/loading";

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const errorMessage = ref('');
const {loading , setLoading } = useLoading(false); 

const WarehouseGridList = ref<any>([]);

const ArticleName = ref('');
const Article = ref('');
const UpperMaterial = ref('');
const UpperMaterialName = ref('');
const Org: any = ref('');
const Process: any = ref('');
const CRD: any = ref('');
const ProductionIDate: any = ref('');
const ProdEDate: any = ref('');

const resetAllFields = () => {
    WarehouseGridList.value = [];
    ArticleName.value = '';
    Article.value = '';
    UpperMaterial.value = '';
    UpperMaterialName.value = '';
    Org.value = '';
    Process.value = '';
    CRD.value = '';
    ProductionIDate.value = '';
    ProdEDate.value = '';
};

const toNumber = (value: any) => {
    const num = parseFloat(value);
    return Number.isNaN(num) ? 0 : num;
};

const getMaterialStatus = (DQ: any, PQ: any, RQ: any, SQ: any, IQ: any, DAI: any, DPI: any) => {
    const totalAvailable = RQ + DAI + DPI;

    if (IQ >= DQ)
        return "Completely Issued";

    if (totalAvailable >= DQ && IQ > 0 && IQ < DQ)
        return "Partially Issued";

    if (totalAvailable >= DQ && IQ === 0)
        return "Material Received - Not Issued";

    if (totalAvailable > 0 && totalAvailable < DQ)
        return "Partially Available";

    if (PQ === 0 || PQ < DQ)
        return "Purchase Pending";

    if (SQ > 0)
        return "Shortage";
    return "Unknown / Need Review";
}; 


const getColorIndication = (status: string) => {
        switch (status) {
        case "Completely Issued":
            return "green";

        case "Partially Issued":
            return "orange";

        case "Material Received - Not Issued":
            return "lightgreen";

        case "Partially Available":
            return "yellow";

        case "Purchase Pending":
            return "blue";

        case "Shortage":
            return "red";

        default:
            return "black"; // Unknown
    } 
}; 

const GetWarehouseData = async (row: any) => {
    try {
        setLoading(true) ;         
        const data: any = await GetWarehouseStockBySO(row.SALES_ORDER); 
        if (!data.list || data.list.length === 0) {
            resetAllFields();
            return;
        } 
        WarehouseGridList.value = data.list.map((roww: any) => {
            const DQ = toNumber(roww.xql);
            const PQ = toNumber(roww.menge);
            const RQ = toNumber(roww.hl);
            const SQ = toNumber(roww.ql);
            const IQ = toNumber(roww.yfl);
            const DAI = toNumber(roww.kky);
            const DPI = toNumber(roww.kyg);

            const materialStatus = getMaterialStatus(DQ, PQ, RQ, SQ, IQ, DAI, DPI);
            const ColorIndication = getColorIndication(materialStatus);

            return {
                ...roww,
                materialStatus,
                ColorIndication   // 🔥 add new column
            };
        });

       const first = WarehouseGridList.value[0];
        ArticleName.value = first?.maktx || "";
        Article.value = first?.satnr2 || "";
        UpperMaterial.value = first?.zmakt1 || "";
        UpperMaterialName.value = first?.werks || "";
        Org.value = first?.sortf || "";
        Process.value = "C";
        CRD.value = first?.satnr || "";
        ProductionIDate.value = first?.begda || "";
        ProdEDate.value = first?.edate || "";
    } catch (error: any) {
        errorMessage.value = error.Message;
    } finally {
        setLoading(false) ; 
    }
} 
 
watch(
    () => props.data,
    (newVal) => {
        if (!newVal) {
            resetAllFields();
            return;
        }
        GetWarehouseData(newVal);
    },
    { immediate: true }
);
  
</script>
<style scoped>
::v-deep(.custom-mat-table thead th) {
    background-color: #65367e;
    color: white;
    margin-top: 10px;
}

::v-deep(.custom-prod-table thead th) {
    background-color: #745fec;
    color: white;
}

.info-card {
    padding: 18px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.info-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 18px;
    color: #333;
    border-left: 4px solid #1677ff;
    padding-left: 10px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px 22px;
}

.info-item {
    display: flex;
    flex-direction: column;
}

.label {
    font-size: 13px;
    color: #888;
    margin-bottom: 4px;
}

.value {
    font-size: 15px;
    font-weight: 600;
    color: #333;
}
</style>
