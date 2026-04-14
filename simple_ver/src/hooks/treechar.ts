// Default export for the useChartOption hook
import { ref } from 'vue';

export default function useChartOption(callback: (isDark: boolean) => object) {
  const isDark = ref(false); // or true, based on your theme
  const chartOption = callback(isDark.value);

  return { chartOption };
}
