import { ref } from 'vue';

export default function usePOPLoading(initValue = false) { 
  const poploading = ref(initValue);
  const setpopLoading = (value: boolean) => {
    poploading.value = value;
  };
  const toggle = () => {
    poploading.value = !poploading.value;
  };
  return {
    poploading,
    setpopLoading,
    toggle,
  };
} 
