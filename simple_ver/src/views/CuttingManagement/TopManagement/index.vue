<template> 
  <div>
    <a-input v-model="search"></a-input>
  </div>
  <div>
    <a-button @click="data"> button </a-button> 
  </div>
  
  <DataTable
    :value="filteredItems"
    paginator
    :rows="5" 
    sortMode="multiple"
    tableStyle="min-width: 80rem"
    dataKey="vbeln"
    responsiveLayout="scroll"
    class="custom-table"
  > 
    <Column field="vbeln" header="Sales Order" sortable /> 
    <!-- <Column field="maktx" header="ART Name" sortable />  --> 
    <Column field="satnr" header="Article" sortable />  
    <Column field="idnrk" header="Material NO" sortable />   
    <!-- <Column field="zptnm" header="Part Name" sortable />  --> 
    <!-- <Column field="satnr2" header="Production Scheduling Material" sortable />  --> 
    <!-- <Column field="zmakt1" header="Description" sortable />  --> 
    <!-- <Column field="kwmeng" header="Order Qty" sortable />  --> 
    <Column field="werks" header="Plant" sortable />  
    <Column field="zpno" header="Part No" sortable />  
    <!-- <Column field="zlpd" header="Delivery Date" sortable />  --> 
    <Column field="sortf" header="Process Code" sortable />  
    <Column field="ktext" header="Production Group" sortable />   
    <!-- <Column field="edate" header="Production End Date" sortable />  --> 
    <!-- <Column field="begda" header="Production Input Date" sortable />  --> 
    <Column field="xql" header="Demand Qty" sortable /> 
    <Column field="menge" header="Purchase Qty" sortable /> 
    <Column field="ql" header="Quantity of Material Shortage" sortable /> 
    <Column field="yfl" header="Quantity of Issue Material" sortable /> 
    <Column field="hl" header="Quantity of Material Returning" sortable /> 
    <Column field="kky" header="Deduct Available Inventory" sortable /> 
    <Column field="wfl" header="Quantity of Unissued Material" sortable /> 
     <Column field="kyg" header="Deduct Pre-order Inventory" sortable />  

  </DataTable> 

</template> 


<script lang="ts" setup>
import { ref, onMounted , computed } from 'vue'
import { GetWarehouseStockBySO } from '@/api/CuttingManagement/TopManagement'

const returndata = ref<any[]>([])
const loading = ref(false)
const so = ref('1000242585') ;   
const search = ref('') ; 

const GetWarehouseStockBySOMethod = async () => { 
  loading.value = true
  try {
    const response: any = await GetWarehouseStockBySO(so.value)
    if (typeof response.list === 'string') {
      returndata.value = JSON.parse(response.list) ; 
      
    } else {
      returndata.value = response.list
    } 
  } catch (error) {
    console.error('Error fetching warehouse stock:', error)
  } finally {
    loading.value = false
  }
}

  const filteredItems = computed(() => { 
    if (!search.value) return returndata.value
    return returndata.value.filter((item:any) =>
      item.idnrk.toLowerCase().includes(search.value.toLowerCase())
    )
  }) ; 

  const data = () => {
    console.log(filteredItems) ; 
  }

onMounted(async () => {
  await GetWarehouseStockBySOMethod();
});

</script>
