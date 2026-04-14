<template>
  <div style="background-color: #ded2a4; width: 100%; height: 100%">
    <div style="color: red">{{ errorMessage }}</div>
    <div v-if="currentview == 'buttons'">
  
      <h1
        style="
          color: #2f4f4f;
          text-align: center;
          font-family: 'Times New Roman', Times, serif;
        "
      >
        Production DownTime Dashboard
      </h1>
      
      <a-card style="background-color: #2d383a">
        <a-row class="responsive-row" :gutter="[16, 16]">
          <a-col :span="3" :xs="24" :sm="12" :md="4">
            <a-date-picker
              v-model="formModel.fromDate"
              placeholder="From Date"
              style="width: 100%; border-color: blue"
            />
          </a-col>
          <a-col :span="3" :xs="24" :sm="12" :md="4">
            <a-date-picker
              v-model="formModel.toDate"
              placeholder="To Date"
              style="width: 100%; border-color: blue"
            />
          </a-col>
          <a-col :span="3" :xs="24" :sm="12" :md="4">
            <a-select
              v-model="formModel.selectedCompany"
              placeholder="Select Company"
              style="width: 100%; border-color: blue"
              @change="Getcombovalues1"
            >
              <a-option
                v-for="se in companies"
                :key="se.ORG_NAME"
                :value="se.ORG_CODE"
              >
                {{ se.ORG_NAME }}
              </a-option>
            </a-select>
          </a-col>
          <a-col :span="3" :xs="24" :sm="12" :md="4">
            <a-select
              v-model="formModel.selectedPlant"
              placeholder="Select Plant"
              style="width: 100%; border-color: blue"
            >
              <a-option
                v-for="plant in plants"
                :key="plant.value"
                :value="plant.value"
              >
                {{ plant.NAME }}
              </a-option>
            </a-select>
          </a-col>
          <a-col :span="3" :xs="24" :sm="12" :md="2">
            <a-button
              type="primary"
              style="
                width: 80%;
                background: linear-gradient(135deg, #045e04, #00ffff);
                border-radius: 5px;
                font-family: 'Times New Roman', Times, serif;
              "
              @click="HandleSearch()"
              >Search</a-button
            >
          </a-col>
          <a-col :span="3" :xs="24" :sm="12" :md="4">
            <a-button
              type="primary"
              style="
                width: 80%;
                background: linear-gradient(135deg, #045e04, #00ffff);
                border-radius: 5px;
                font-family: 'Times New Roman', Times, serif;
              "
              @click="goToProductionDowntime(formModel)"
              >Detail view</a-button
            >
          </a-col>
        </a-row>
      </a-card>

      <a-row :gutter="16" style="margin-top: 10px">
        <a-col :span="24" :lg="12" class="bargraphcontainer">
          <a-card style="background-color: #90aead">
            <label
              style="
                color: mediumvioletred;
                font-size: 20px;
                font-family: Georgia, 'Times New Roman', Times, serif;
              "
              >Plantwise Down Time Breakup Detail</label
            >
            <Chart
              style="height: 500px; width: 100%"
              :option="GraphOption"
              class="barchart"
            />
          </a-card>
        </a-col>

        <a-col :span="24" :lg="12" class="piecontainer">
          <a-card style="background-color: #90aead">
            <label
              style="
                color: mediumvioletred;
                font-size: 20px;
                font-family: Georgia, 'Times New Roman', Times, serif;
              "
              >Over All Down Time Breakup Details</label
            >
            <Chart
              style="height: 500px"
              :option="chartOption"
              class="piechart"
              @click="Reasonclick"
            />
          </a-card>
        </a-col>
      </a-row>
      <a-card>
        <DataTable
  v-if="VisibleDatatale"
  :value="Dtreasonlist"
  paginator
  :rows="10"
  sortMode="multiple"
  tableStyle="width: 100%;"
  dataKey="PO"
  responsiveLayout="scroll"
  class="custom-kpi-table"
>
  <Column field="PRODUCTIONLINE_NAME" header="PRODUCTION_LINE" sortable />
  
  <Column field="PAUSEDATE" header="PAUSEDATE" sortable>
    <template #body="slotProps">
      {{ slotProps.data.PAUSEDATE }}
    </template>
  </Column>
  
  <Column field="DTCAUSE" header="DTCAUSE" sortable />
  <Column field="PAUSEREASON" header="PAUSEREASON" sortable />
  <Column field="PUASE_MIN" header="PUASE_MIN" sortable />
  <Column field="EFFCTED_PEOPLE" header="EFFCTED_PEOPLE" sortable />
  <Column field="EFFECTED_MH" header="EFFECTED_MH" sortable />
  <Column field="PO" header="PO" sortable />
  <Column field="DTCAUSE_DURATION" header="DTCAUSE_DURATION" sortable />
</DataTable>

      </a-card>
    </div>
    <component
      v-else
      :is="components[currentview]"
      :rowData="selectedRowData"
      :onBack="goBack"
    />
  </div>
</template>

<script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';
  import { ref, computed, onMounted, Ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    GetCompanies,
    GetPlantsData,
    ProdDownTimePercentage,
    ProdDowntimePercentBarChart,
    DTreasonsDetails,
  } from '@/api/productiondowntime';
  import productiondowntime from '@/views/Production_Down_Time/components/proddowntime.vue';
  // import productiondowntime from '@/views/Production_Down_Time/components/proddowntime.vue';

  // Initialize GraphOption as a reactive ref
  const GraphOption = ref({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow', // Default 'shadow' for bar charts
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category', // xAxis will use categories dynamically
      data: [], // This will be dynamically populated based on the API response
    },
    yAxis: {
      type: 'value', // yAxis remains unchanged
    },
    series: [], // This will be populated dynamically as well
  });

  // Generate default form model
  const errorMessage = ref('');
  const VisibleDatatale = ref(false);
  const companies = ref<any>([]);
  const pdata = ref<any>([]);
  const plants = ref<any>([]);
  const { loading, setLoading } = useLoading(false);

  const generateFormModel = () => {
    const now = new Date();

    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const formattedStartDate = `${startDate.getFullYear()}-${String(
      startDate.getMonth() + 1
    ).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;

    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const formattedEndDate = `${endDate.getFullYear()}-${String(
      endDate.getMonth() + 1
    ).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    interface ProcessOption {
      VALUE: string;
      NAME: string;
    }
    return {
      fromDate: formattedStartDate,
      toDate: formattedEndDate,
      selectedCompany: '',
      selectedPlant: '',
      pievalue: '',
    };
  };
  const formModel = ref(generateFormModel());

  const currentview = ref<'buttons' | 'proddowntime'>('buttons');
  const components = {
    proddowntime: productiondowntime,
  };

  function goBack() {
    currentview.value = 'buttons';
  }
  const selectedRowData = ref(null);

  function goToProductionDowntime(row: any) {
    selectedRowData.value = row;
    console.log(row);
    currentview.value = 'proddowntime';
  }

  // Function to get organization values and plant values
  const Getcombovalues = async () => {
    try {
      const podata: any = await GetCompanies();
      podata.list.unshift({ ORG_CODE: '0000', ORG_NAME: 'All' });
      companies.value = JSON.parse(JSON.stringify(podata.list));
    } catch (error) {
      console.error('Error occurred in Getcombovalues:', error);
    }
  };

  // Function to get organization values and plant values
  const Getcombovalues1 = async () => {
    debugger;
    try {
      const org = formModel.value.selectedCompany;
      const pldata: any = await GetPlantsData(org);
      pldata.list.unshift({ ORG_CODE: '0000', NAME: 'All' });
      plants.value = JSON.parse(JSON.stringify(pldata.list));
    } catch (error) {
      console.error('Error occurred in Getcombovalues:', error);
    }
  };
  const ProdDowntimePercentChart = async () => {
    try {
      setLoading(true);
      const dd: any = await ProdDownTimePercentage(formModel.value);
      const valuesw = dd.list;

      const transformedData = valuesw.map((item: any) => ({
        value: item.VALUE,
        name: item.NAME,
      }));
      console.log(transformedData);

      pdata.value = transformedData;
      console.log(pdata.value);
    } catch (error) {
      errorMessage.value = (error as Error).message;
    } finally {
      setLoading(false);
    }
  };

  // Bar Graph
  const ProdDowntimePercentBarChartMethod = async () => {
    try {
      debugger;
      // Fetch data from the API
      const dd: any = await ProdDowntimePercentBarChart(formModel.value);

      // Debugging
      console.log('API Response:', dd);

      // Validate API response
      if (!dd || !dd.list || !Array.isArray(dd.list)) {
        console.error('Invalid API response format:', dd);
        return;
      }

      const valuesData = dd.list;

      // Extract unique LIABILITYNAME for x-axis (Plant Names)
      const liabilityNames: any = [
        ...new Set(valuesData.map((data: any) => data.LIABILITYNAME)),
      ];

      console.log('Unique Liability Names:', liabilityNames);

      // Extract unique DTCAUSEs
      const dtCauses: any[] = [
        ...new Set(valuesData.map((data: any) => data.DTCAUSE)),
      ];

      // 🔴 Clear previous series data before assigning new data
      const seriesData: any = dtCauses.map((dtCause) => ({
        name: dtCause,
        type: 'bar',
        stack: 'total', // Stacked bar chart
        label: {
          show: true,
          position: 'top',
          formatter: (params: any) =>
            params.value !== null && params.value !== undefined
              ? `${params.value.toFixed(2)}%`
              : '',
        },
        data: liabilityNames.map((liabilityName: any) => {
          const dataForLiability = valuesData.find(
            (data: any) =>
              data.LIABILITYNAME === liabilityName && data.DTCAUSE === dtCause
          );
          return dataForLiability ? dataForLiability.PERC : null;
        }),
      }));

      GraphOption.value = {
        // title: { text: 'Downtime Percentage' }, // Optional title
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'line' }, // axisPointer is required when trigger is 'axis'
        },
        legend: { data: dtCauses }, // Example for `legend` data
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: liabilityNames, // Assuming this comes from your API response
        },
        yAxis: { type: 'value' },
        series: seriesData, // Assuming `seriesData` is an array that you've defined
      };
      console.log('Updated GraphOption:', GraphOption.value);
    } catch (error) {
      console.error(
        'Error occurred in ProdDowntimePercentBarChartMethod:',
        error
      );
    }
  };

  const { chartOption } = useChartOption((isDark) => {
    return {
      legend: {
        left: 'center',
        bottom: -3,
        icon: 'square',
        itemWidth: 10,
        textStyle: {
          color: 'Gold',
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          label: {
            show: true, // Ensure labels are visible
            formatter: '{d}%', // Show name and percentage
            fontSize: 10,
            color: 'cyan',
            position: 'outside', // Display labels outside the pie sections
          },
          labelLine: {
            show: true, // Ensures label lines appear when labels are outside
            length: 10, // Line length from the pie to the label
            length2: 5, // Secondary line length
          },

          data: pdata.value,
        },
      ],
    };
  });

  const HandleSearch = async () => {
    try {
      await ProdDowntimePercentChart();
      await ProdDowntimePercentBarChartMethod();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const Dtreasonlist = ref<any>([]);
  const show = async () => {
    debugger;
    // Visbleornot.value = true;
    const data5: any = await DTreasonsDetails(formModel.value);
    if (data5.list.length < 1) {
      console.log('ERror');
    }

    VisibleDatatale.value = true;

    Dtreasonlist.value = data5.list;
  };

  const Reasonclick = (event: any) => {
    debugger;
    if (event.seriesType === 'pie') {
      const clickedSegment: string = event.name;
      formModel.value.pievalue = clickedSegment;
      show();
    }
  };

  // Lifecycle hook to fetch initial data
  onMounted(async () => {
    debugger;
    await Getcombovalues();
    await ProdDowntimePercentChart();
    await ProdDowntimePercentBarChartMethod();
  });
</script>

<style scoped>
  /* Style wrapper for the entire table */
  ::v-deep(.custom-kpi-table) {
    margin-top: 10px;
  }

  /* Style for table header */
  ::v-deep(.custom-kpi-table thead th) {
    background-color: #3db479;
    color: rgb(219, 32, 32); /* red */
    text-align: center;
    font-weight: bold;
  }
 /* Style for even rows in the table body */
 ::v-deep(.custom-kpi-table tbody td) {
  background-color: rgb(196, 189, 189) !important;
  color: rgb(7, 7, 7) !important;
}
 
</style>
