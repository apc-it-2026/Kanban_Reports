<template>
  <a-config-provider :locale="locale">
    <!-- Wrap the component from the router-view with <keep-alive> -->
    <router-view v-slot="{ Component }"> 
      <keep-alive :key="componentKey"> 
        <component :is="Component" /> 
      </keep-alive> 
    </router-view> 
    <global-setting /> 
  </a-config-provider>    
</template>

<script lang="ts" setup>  
  import { computed, ref, watchEffect } from 'vue';  
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';  
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';   
  import GlobalSetting from '@/components/global-setting/index.vue';   
  import useLocale from '@/hooks/locale';   

  const { currentLocale } = useLocale();  

  const locale = computed(() => {  
    switch (currentLocale.value) { 
      case 'zh-CN':
        return zhCN;
      case 'en-US': 
        return enUS; 
      default: 
        return enUS; 
    }  
  });      
  
  // A key to help Vue keep track of which components are cached
  const componentKey:any = ref(''); 

  // Watch for route changes and update the key to ensure cache is properly handled
  watchEffect(() => {
    componentKey.value = Math.random(); // This will create a new key for each route change
  });  

</script>  





