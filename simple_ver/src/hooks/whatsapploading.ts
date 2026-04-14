import { ref } from 'vue';

export default function usewhatsappLoading(initValue = false) { 
  const wloading = ref(initValue);
  const whatsapploading = (value: boolean) => {
    wloading.value = value;
  };
  const toggle = () => {
    wloading.value = !wloading.value;
  };
  return {
    wloading,
    whatsapploading,
    toggle,
  };
} 
