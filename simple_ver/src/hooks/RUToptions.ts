import { computed } from 'vue';
import { EChartsOption } from 'echarts';
import { useAppStore } from '@/store';

interface optionsFn {
  (isDark: boolean): EChartsOption;
}

export default function useRUTcharts(sourceOption: optionsFn) {
  const appStore = useAppStore();
  const isDark = computed(() => {
    return appStore.theme === 'dark';
  });
  const RUToption = computed<EChartsOption>(() => {
    return sourceOption(isDark.value);
  });
  return {
    RUToption, 
  };
}
