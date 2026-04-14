<!-- <template>
    <div>
        <span
                  style="color: #6f118f; font-size: 20px; font-weight: bold"
                >
                  Order Article Quantiy
                </span>
                <Chart
                  :option="chartOption"
                  style="width: 100%; height: 30vh; text-align: start"
                />
    </div>
</template> 
<script lang="ts" setup>
 import { onMounted, ref, reactive, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading'; 
  import { Notification, Message } from '@arco-design/web-vue';
  import useChartOption from '@/hooks/chart-option';
  import {
    GetOrderChartDetails,
  } from '@/api/e2e_biz/order';
 

  const { loading, setLoading } = useLoading(false);
  const errorMessage = ref('');
  const Orderchartlist = ref<any>([]); 

  const OrderChartmethod = async () => {
    try {
      setLoading(true);
      // const dd: any = await GetOrderChartDetails(formModel.value);
      // const valuee = dd.list;
      // const transformedData = valuee.map((item: any) => ({
      //   name: item.NAME,
      //   value: item.VALUE,
      // }));
      Orderchartlist.value = transformedData;
    } catch (error) {
      errorMessage.value = (error as Error).message;
      Notification.error({
        title: 'Order',
        content: errorMessage.value,
      });
    } finally {
      setLoading(false);
    }
  };
  const { chartOption } = useChartOption((isDark) => {
    return {
      tooltip: {
        show: true,
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '70%'],
          itemStyle: {
            itemWidth: 1,
            color: '',
          },
          data: Orderchartlist.value,
        },
      ],
    };
  });
</script> -->