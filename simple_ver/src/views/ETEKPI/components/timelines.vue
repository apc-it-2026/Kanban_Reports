<template>
    <div>
        <div> {{ errorMessage }} </div>
        <div v-if="currentview === 'buttons'">
            <div style="display: flex;" class="centered-heading">
                <button @click="onBack" class="back-arrow"> <i class="pi pi-arrow-left"></i> </button>  
                <h3>Timeline For a Customer PO From Order Placing to Shipment</h3>
            </div>
            <a-row :gutter="16" v-if="bizsteps.length || prodsteps.length || fgsteps.length"> 
                <timelinecolumn v-if="bizsteps.length" :steps="bizsteps"/> 
                <timelinecolumn v-if="prodsteps.length" :steps="prodsteps"  />
                <timelinecolumn v-if="fgsteps.length" :steps="fgsteps"  /> 
            </a-row>

        </div>
        <component :is="components[currentview]" :rowData="clickvalueData" :onBack="goBack" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { GetTimelines } from '@/api/e2e_biz/biz';
import timelinecolumn from './timelinecolumn.vue';

const errorMessage = ref('');
const currentview = ref<'buttons'>('buttons');
const clickvalueData = ref(null);
const components: any = {
    //
};
const goBack = () => {
    currentview.value = 'buttons';
};
const props = defineProps<{
    rowData: {
        SE_ID: any;
    } | null;
    onBack: () => void;
}>();

const seid: any = computed(() => props.rowData?.SE_ID);
const orderdate = ref('');
const matreceive = ref('');
const mateplace = ref('');
const cutstart = ref('');
const cutend = ref('');
const stitstart = ref('');
const stitchend = ref('');
const assstart = ref('');
const assend = ref('');
const packstart = ref('');
const packend = ref('');
const fgstart = ref('');
const fgend = ref('');
const shipstart = ref('');
const shipend = ref('');

const bizsteps = computed(() => [
  { name: 'Order Placing', date: orderdate.value || '' , content : 'The Order Placing time for a PO' , process :'Bussiness'},
  { name: 'Material Placing Date', date: mateplace.value || '' , content : 'Material Purchasing Date For a PO' , process :''  },
  { name: 'Material Receiving Date', date: matreceive.value || '' , content : 'Material Receiving Date For a PO' , process :''} 
]);

const prodsteps = computed(() => [
  { name: 'Cutting', date: `${cutstart.value} - ${cutend.value}` , content : 'The date rage of Cutting Process' , process :'Production'},
  { name: 'Stitching', date: `${stitstart.value} - ${stitchend.value}` , content : 'The date rage of Stitching Process' , process :'' },
  { name: 'Assembly', date: `${assstart.value} - ${assend.value}` , content : 'The date rage of Assembly Process' , process :'' },
  { name: 'Packing', date: `${packstart.value} - ${packend.value}` , content : 'The date rage of Packing Process' , process :'' }
]);

const fgsteps = computed(() => [
  { name: 'Finished Goods Entry Date', date: fgstart.value || '' , content : 'The PO First Quantity Entered In Finished Goods Date', process :'FG/Shipment'},
  { name: 'Finished Goods Last Date', date: fgend.value || '' , content : 'The PO Last Quantity Entered in Finished Goods Date', process :'' },
  { name: 'Shipment Start Date', date: shipstart.value || '' , content : 'The PO First Quantity Shipment Date', process :'' },
  { name: 'Shipment End Date', date: shipend.value || '' , content : 'The PO Last Quantity Shipment Date' , process :''}
]);
const process = [{name : 'Business'}] ; 
const formatDate = (dateStr: any) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const GetTimelinesMe = async () => {
  const data: any = await GetTimelines(seid.value);

  // Business dates
  const biz = data.list.Bizoutput?.[0] || {};
  orderdate.value = formatDate(biz.ORDER_DAY);
  mateplace.value = formatDate(biz.MATPLDATE);
  matreceive.value = formatDate(biz.MATRECDATE);

  // Production dates
  const prod = data.list.ProductionOutput?.[0] || {};
  cutstart.value = formatDate(prod.CUT_START_DATE);
  cutend.value = formatDate(prod.CUT_END_DATE);
  stitstart.value = formatDate(prod.STIT_START_DATE);
  stitchend.value = formatDate(prod.STIT_END_DATE);
  assstart.value = formatDate(prod.ASSE_START_DATE);
  assend.value = formatDate(prod.ASSE_END_DATE);
  packstart.value = formatDate(prod.PACK_START_DATE);
  packend.value = formatDate(prod.PACK_END_DATE);

  // Finished goods
  const fg = data.list.FGinOutput?.[0] || {};
  fgstart.value = formatDate(fg.FGSTARTIN);
  fgend.value = formatDate(fg.FGENDIN);

  // Shipment
  const ship = data.list.ShipmentOutput?.[0] || {};
  shipstart.value = formatDate(ship.SHIPDATESTART);
  shipend.value = formatDate(ship.SHIPDATEEND);
};

onMounted(() => {
  GetTimelinesMe();
});


</script>
<style scoped> 
.back-arrow{
  border-radius: 5px;
  background-color: blueviolet;
  color: white;
  font-weight: bold;
  padding: 10px;
}

.centered-heading {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00bcd4;
    margin-bottom: 10px;
    border-radius: 5px;
}
 
body {
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    margin: 0;
    padding: 10px;
}
 
</style>
