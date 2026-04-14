<template>
  <div v-if="currentview === 'buttons'">
    <Teleport to="body">
      <div v-if="show" class="modal2"> <button @click="onBack" class="back-arrow"> <i class="pi pi-arrow-left"></i> </button></div>  
    </Teleport> 
  <div style="text-align: center;">
    <!-- <iframe
      title="APC Material Matching"
      width="1600"
      height="800"
      src="https://app.powerbi.com/view?r=eyJrIjoiYTI0NGQwZmQtMmVkNi00OTYwLTkzYzMtOTA4ODVkNWNmZjg0IiwidCI6IjQ4MWExNWMxLTk5OTItNGIyZC05YzdiLTIxMzA2N2Q2MjQ2NCJ9"
      frameborder="0"
      allowFullScreen="true"
    ></iframe> -->
    <iframe
  width="1600"
  height="800"
  src="https://app.powerbi.com/view?r=eyJrIjoiYTI0NGQwZmQtMmVkNi00OTYwLTkzYzMtOTA4ODVkNWNmZjg0IiwidCI6IjQ4MWExNWMxLTk5OTItNGIyZC05YzdiLTIxMzA2N2Q2MjQ2NCJ9"
  frameborder="0"
  allowfullscreen 
></iframe> 
  </div> 
</div> 

<component
      :is="components[currentview]"  
      :onBack="goBack"  
    /> 
</template>  
<script lang="ts" setup > 
import { ref } from 'vue';

const show = ref(true) ; 
const components: any = { 
    //
  };
  const currentview = ref<'buttons'>('buttons');
  const goBack = () => {
    currentview.value = 'buttons';
  };
  const props = defineProps<{
    rowData: {
      MER_PO: string; 
    } | null;
    onBack: () => void; 
  }>();

</script>
<style scoped>
.back-arrow{
  border-radius: 5px;
  background-color: blueviolet;
  color: white;
  font-weight: bold;
  padding: 10px;
}
.modal2 {
  position: fixed;
  top: 100px;
  left: 200px;
}

</style>