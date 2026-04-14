<template>
  <div>
    <div>{{ errorMessage }}</div>
    <div v-if="currentview == 'buttons'">
      <div class="responsive-container-material">
        <div><button @click="onBack" class="back-arrow-material"> <i class="pi pi-arrow-left"></i> </button></div>

        <div class="po-field-material">
          <span> SO </span>
          <a-input placeholder="Enter PO" v-model="poinput" @press-enter="getMaterialData2">
          </a-input>
        </div>
        <div class="head-div">
          <div class="head">Material Status Reported by Sales order
          </div>
          <div :class="getSalesOrderBackgroundColor()"
            style="height: 30px;width: 30px;border-radius: 10px;">
          </div>
        </div>
      </div>
      <!-- Material table  -->

      <a-card class="mat-table-card">
        <div class="mat-size-container">
          <h3 class="mat-size-headding"> Materia Status Reported by Sales order and Material Code </h3>
          <div class="table-details">
            <div> Sales Order : <span> {{ MaterialData[0]?.SALES_ORDER }} </span> </div>
            <div> CRD : <span>{{ MaterialData[0]?.CRD }} </span> </div>
         
          </div>
          <table class="mat-size-table">
            <thead>
              <tr>
                <th v-for="column in MaterialColumns" :key="column.key" style="position: sticky;">{{ column.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="infor in MaterialData" :key="infor.SE_ID" :value=infor.SE_ID>
                <td> {{ infor.MATERIAL_CODE }}</td>
                <td> {{ infor.QTY }}</td>
                <td> {{ infor.ETA }}</td>
                <td> {{ infor.INVOICE }}</td>
                <td>
                  <div style="width: 30px;height: 30px;border-radius: 10px;" :class="getbackgroundcolorForMat(infor)">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-card>
    </div>
    <component :is="components[currentview]" :rowData="clickvalueData" :onBack="goBack" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { CheckMaterialStatus } from '@/api/e2e_biz/biz';
// import './material.css';

const errorMessage = ref('');
const clickvalueData = ref(null);
const currentview = ref<'buttons'>('buttons');
const components: any = {
  //
};
const goBack = () => {
  currentview.value = 'buttons';
};

const props = defineProps<{
  rowData: {
    MER_PO: string;
    SE_ID: any;
  } | null;
  onBack: () => void;
}>();
const po = computed(() => props.rowData?.MER_PO);
const seid: any = computed(() => props.rowData?.SE_ID);

const poinput: any = ref('');
const MaterialColumns = ref([
  { title: 'MATERIAL', dataIndex: 'MATERIAL_CODE', key: 'MATERIAL_CODE' },
  { title: 'Quantity', dataIndex: 'QTY', key: 'QTY' },
  { title: 'ETA', dataIndex: 'ETA', key: 'ETA' },
  { title: 'INVOICE', dataIndex: 'INVOICE', key: 'INVOICE' },
  { title: 'Status', dataIndex: 'Status', key: 'Status' },
]);
const MaterialData = ref<any>([]);
const formateDate = (date: any) => { 
  const parseDate = new Date(date); 
  if (date === "") {
    return ''
  };
  const year = parseDate.getFullYear();
  const month = (parseDate.getMonth() + 1).toString().padStart(2, '0');
  const day = parseDate.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const getMaterialData = async () => {
  debugger;
  const data: any = await CheckMaterialStatus(seid);
  MaterialData.value = data.list.map((item: any) => {
    return {
      SALES_ORDER: item.SALES_ORDER,
      CRD: formateDate(item.CRD),
 
      MATERIAL_CODE: item.MATERIAL_CODE,
      QTY: item.QTY,
      ETA: item.ETA,
      INVOICE: item.INVOICE
    }
  });
};

const getMaterialData2 = async () => {
  debugger;
  const data: any = await CheckMaterialStatus(poinput);
  MaterialData.value = data.list.map((item: any) => {
    return {
      SALES_ORDER: item.SALES_ORDER,
      CRD: formateDate(item.CRD),
      LPD: formateDate(item.LPD),
      ART_NAME: item.ART_NAME,
      MATERIAL_CODE: item.MATERIAL_CODE,
      QTY: item.QTY,
      ETA: item.ETA,
      INVOICE: item.INVOICE
    }
  });
};
 
const getbackgroundcolorForMat = (item: any) => {
  const invoiceno = item.INVOICE;
  const eta = item.ETA;
  const weekdate = item.WEEK_END_DATE;

  const isGreen = (
    item.INVOICE === 'STOCK' ||
    (invoiceno !== 'STOCK' &&
      ((weekdate === "" || weekdate === null || weekdate === undefined) || eta < weekdate)) &&
    item.INVOICE !== 'NO INVOICE'
  );

  return isGreen ? 'green-background' : 'red-background';
};

 const hasAnyRed = computed(() => {
  return MaterialData.value.some((item: any) => {
    const color = getbackgroundcolorForMat(item);
    return color === 'red-background';
  });
});

const getSalesOrderBackgroundColor = () => {
  return hasAnyRed.value ? 'red-background' : 'green-background';
};


onMounted(() => {
  getMaterialData();
});

</script>
<style scoped>

.back-arrow-material{
    border-radius: 5px;
    background-color: blueviolet;
    color: white;
    font-weight: bold;
    padding: 10px;
  }
  .po-field-material {
    margin: 0px 10px 0px 10px;
    border: 2px solid rgb(247, 242, 242); 
    border-radius: 5px;
    display: flex;
    color: white;
    gap: 10px;
    align-items: center;
    font-weight: bold;
    padding-left: 10px;
  } 


  .responsive-container-material {
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    gap: 1rem;
  } 

  .mat-table-card {
    border-radius: 5px;
    max-height: 70vh;
    width: 100%;
    background-color: #34aaa4;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    color: #ffffff;
    transition: all 3s ease;
    overflow-y: auto;
    margin: 10px; 
  } 
  .mat-size-container {
  border-radius: 12px;
  max-height: 800px;
  } 
  
  .mat-size-headding{
    color: #aa34c7;
    margin: 0 0 10px 0;
  } 
  .mat-size-table {
    width: 100%;
  }
  
  .mat-size-table th,
  .mat-size-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
    color: #080808;
  }
  
  .mat-size-table th {
    background-color: #bd84eb;
    font-weight: 600;
    color: #3a3ce9;
    position: sticky;
  }
  
  .mat-size-table td {
    background-color: white;
  }
  
  .mat-size-table tr:hover {
    background-color: #0b80f5;
  }
  
  .mat-size-table tr:last-child td {
    border-bottom: none;
  } 
  .green-background {
    background-color: rgb(12, 192, 12);
  } 
  .red-background {
    background-color: rgb(221, 21, 21); 
  }
  .head-div {
    display: flex;
    gap: 10px;
    border: 2px solid rgb(238, 232, 232);
    background-color: white; 
    padding: 0px  10px 0px 0px ;
    border-radius: 4px ;
    align-items: center;      
    justify-content: center;   
    text-align: center; 
   
  }
  .head {
    color: rgb(14, 13, 13);
    font-size: 16px;
    font-weight: bold;
    background-color: #6d97f0;
    padding: 10px 20px; 
    border-radius: 4px;
  }
  .table-details {
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    font-weight: bold;
    color: white;
    font-size: 16px;
    margin-bottom:10px ;
    margin-top: 10px;
  }
  .table-details span {
    background-color: rgb(243, 170, 170);
    padding: 5px;
    border: none;
    border-radius: 5px;
    color: black;
  }
    
</style>