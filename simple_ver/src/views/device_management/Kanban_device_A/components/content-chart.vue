<template>
  <div>
    <a-spin style="width: 100%" :loading="loading">
      <onebottomone :option="option"></onebottomone>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ECharts, EChartsOption, init } from 'echarts';
  import { ref, watch, onMounted, onUpdated } from 'vue';
  import { GetToplist } from '@/api/kanbandevicea';
  import onebottomone from './onebottomone.vue';

  const { loading } = useLoading();
  const datatop = ref<any>([]);
  const data1 = ref<any>([]);
  // data.value = [
  //   { score: '10', qty: '100', product: '针车' },
  //   { score: '20', qty: '5212', product: '贴底' },
  //   { score: '30', qty: '5822', product: '内线机' },
  //   { score: '40', qty: '5822', product: '冷冻机' },
  //   { score: '50', qty: '8212', product: '烘箱' },
  //   { score: '60', qty: '5812', product: '水压机' },
  //   { score: '70', qty: '5212', product: '排冲机' },
  //   { score: '80', qty: '5212', product: '前帮机' },
  //   { score: '90', qty: '5821', product: '后跟定型机' },
  //   { score: '100', qty: '5212', product: '鞋头定型机' },
  // ];
  const getlist = async () => {
    const datalist: any = await GetToplist();
    data1.value = JSON.parse(JSON.stringify(datalist.list));
    data1.value.forEach((item: any) => {
      datatop.value.push(item);
    });
  };
  getlist();
  const option = ref<EChartsOption>();
  option.value = {
    dataset: {
      source: datatop.value,
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    grid: { containLabel: true },
    xAxis: [
      {
        name: '数量',
        axisLabel: {
          color: '#fff',
        },
        axisLine: { lineStyle: { color: '#fff' } },
      },
    ],
    yAxis: [
      {
        type: 'category',
        axisLabel: {
          color: '#fff',
        },
      },
    ],
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 0,
      max: 100,
      text: ['%', '百分比'],
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
      textStyle: { color: '#fff' },
    },
    series: [
      {
        type: 'bar',
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: '#fff',
        },
        encode: {
          // Map the "amount" column to X axis.
          x: 'qty',
          // Map the "product" column to Y axis
          y: 'product',
        },
      },
    ],
  };
</script>
