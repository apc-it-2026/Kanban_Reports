<template>
    <div class="container">
      <div style="color: red">{{ errorMessage }}</div>
      <div v-if="currentview == 'buttons'">
        <h1 style="color: greenyellow; text-align: center; font-family: monospace"
          >Production DownTime Dashboard</h1
        >
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
              "
              @click="goToProductionDowntime(formModel)"
              >Detail view</a-button
            >
          </a-col>
        </a-row>
        <a-row :gutter="16" style="margin-top: 10px">
          <a-col :span="24" :lg="12" class="bargraphcontainer">
            <a-card
              style="
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 6px;
              "
            >
              <label
                style="
                  color: wheat;
                  font-size: 20px;
                  font-family: Georgia, 'Times New Roman', Times, serif;
                "
                >Plantwise Down Time Breakup Details:Aug 2024</label
              >
              <Chart
                style="height: 400px;width: 100%;"
                :option="GraphOptioon"
                class="barchart"
              />
            </a-card>
          </a-col>
  
          <a-col :span="24" :lg="12" class="piecontainer">
            <a-card
              style="
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 6px;
              "
            >
              <label
                style="
                  color: wheat;
                  font-size: 20px;
                  font-family: Georgia, 'Times New Roman', Times, serif;
                "
                >Down Time Breakup Details:Aug 2024</label
              >
              <Chart style="height: 400px;" :option="chartOption" class="piechart" />
            </a-card>
          </a-col>
        </a-row>
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
    } from '@/api/productiondowntime';
    import productiondowntime from '@/views/Production_Down_Time/components/proddowntime.vue';
  
    const errorMessage = ref('');
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
  
    const plant = ref<any>([]);
    const dtcauses = ref<any>([]);
    const perc = ref<any>([]);
  
    const processChartData = (data: any[]) => {
      debugger;
      const uniquePlants = [...new Set(data.map((item) => item.LIABILITYNAME))];
      const uniqueCauses = [
        ...new Set(data.map((item) => item.DTCAUSE ?? 'Unknown')),
      ];
      plant.value = '';
      dtcauses.value = '';
      plant.value = [...uniquePlants];
      dtcauses.value = [...uniqueCauses];
  
      const seriesData = uniqueCauses.map((cause) => {
        return {
          name: cause,
          type: 'bar',
          stack: 'total',
          data: uniquePlants.map((plantName) => {
            const item = data.find(
              (entry) =>
                entry.LIABILITYNAME === plantName &&
                (entry.DTCAUSE ?? 'Unknown') === cause
            );
            return item?.PERC ?? 0;
          }),
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) =>
              params.value && params.value !== 0 ? params.value : '', // Hide labels for 0 values
          },
        };
      });
  
      return seriesData;
    };
  
    // const processChartData = (data: any[]) => {
    //   debugger;
    //   const uniquePlants = [...new Set(data.map((item) => item.LIABILITYNAME))];
    //   const uniqueCauses = [...new Set(data.map((item) => item.DTCAUSE ?? "Unknown"))];
  
    //   plant.value = uniquePlants;
    //   dtcauses.value = "";
    //   dtcauses.value = uniqueCauses;
  
    //   // Create series dynamically for each cause
    //   const seriesData = uniqueCauses.map((cause) => {
    //     return {
    //       name: cause,
    //       type: 'bar',
    //       stack: 'total',
    //       data: uniquePlants.map((plantName) => {
    //         const item = data.find(
    //           (entry) => entry.LIABILITYNAME === plantName && (entry.DTCAUSE ?? "Unknown") === cause
    //         );
    //         return item && item.PERC != null ? item.PERC : 0;  // Handle null values by setting 0
    //       }),
    //       label: {
    //         show: true,
    //         position: 'inside',
    //         formatter: (params: any) => (params.value && params.value !== 0 ? params.value : ""), // Hide labels for 0 values
    //       },
    //     };
    //   });
  
    //   return seriesData;
    // };
  
    // const GraphOptioon:Ref = ref({
    //   xAxis: {
    //     type: 'category',
    //     data: plant.value,
    //   },
    //   yAxis: {
    //     type: 'value',
    //   },
    //   series: [],
    //   tooltip: {
    //     trigger: 'axis',
    //   },
    //   legend: {
    //     icon: 'square',
    //     textStyle: {
    //       color: 'Gold',
    //     },
    //     data: dtcauses.value,
    //   },
  
    // });
  
    const GraphOptioon: Ref = ref({
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        icon: 'square',
        textStyle: {
          color: 'Gold',
        },
        data: [],
      },
    });
  
    // const ProdDowntimePercentBarChartMethod = async () => {
    //   try {
    //     setLoading(true);
    //     debugger;
    //     const dd: any = await ProdDowntimePercentBarChart(formModel.value);
    //     const valuesData:any = dd.list;
    //     console.log(valuesData);
    //     debugger;
    //     // Process data into a format that supports stacked bars
    //     GraphOptioon.value.series = processChartData(valuesData);
    //     console.log(GraphOptioon.value.series);
    //     GraphOptioon.value.xAxis.data = "" ;
    //     GraphOptioon.value.xAxis.data = plant.value;
    //     GraphOptioon.value.legend.data = "" ;
    //     GraphOptioon.value.legend.data = dtcauses.value;
    //   } catch (error) {
    //     errorMessage.value = (error as Error).message;
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  
    const ProdDowntimePercentBarChartMethod = async () => {
      try {
        setLoading(true);
        debugger;
  
        const dd: any = await ProdDowntimePercentBarChart(formModel.value);
        const valuesData: any = dd.list;
        console.log(valuesData);
        debugger;
  
        // Process data and ensure no duplicates by completely replacing previous values
        GraphOptioon.value = {
          ...GraphOptioon.value, // Keep existing structure
          xAxis: {
            ...GraphOptioon.value.xAxis,
            data: [...plant.value], // Ensure complete replacement
          },
          legend: {
            ...GraphOptioon.value.legend,
            data: [...dtcauses.value], // Ensure complete replacement
          },
          series: processChartData(valuesData), // Fully update series
        };
  
        console.log(GraphOptioon.value.series);
      } catch (error) {
        errorMessage.value = (error as Error).message;
      } finally {
        setLoading(false);
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
  
    // Handle the query
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
  
    // Lifecycle hook to fetch initial data
    onMounted(async () => {
      debugger;
      await Getcombovalues();
      await ProdDowntimePercentChart();
      await ProdDowntimePercentBarChartMethod();
    });
  </script>
  <style lang="css" scoped>
    .container {
      width: 100%;
      height: 100%;
      /* background-image: url(@/assets/images/ENEMES.jpg); */
      /* background-size: cover; */
      background-color: #00004d;
      padding: 20px;
      /* animation: backgroundChange 10s infinite alternate; */
    }
  
    .bargraphcontainer {
      margin-top: 20px;
    }
    .piecontainer {
      margin-top: 20px;
    }
    .piechart {
      margin-top: 20px;
    }
    .barchart {
      margin-top: 20px;
    }
  
    /* Responsive styles for mobiles */
    @media screen and (max-width: 768px) {
      .custom-col {
        flex: 0 0 100%; /* One column per row for mobiles */
        max-width: 100%;
      }
      .custom-chart {
        min-height: 100px; /* Smaller chart height for mobiles */
      }
      .custom-col {
        margin-top: 5px;
      }
      .piecontainer {
        min-width: 100%;
        margin-top: 20px;
      }
    }
  
    /* Responsive styles for tablets */
    @media screen and (max-width: 1024px) {
      .custom-row {
        flex-wrap: wrap; /* Allow wrapping for smaller screens */
      }
      .custom-col {
        flex: 0 0 50%; /* Two columns per row for tablets */
        max-width: 50%;
      }
      .custom-chart {
        min-height: 150px; /* Smaller chart height for tablets */
      }
      .bargraphcontainer {
        min-width: 100%;
        margin-top: 20px;
      }
      .progresscard {
        margin-top: 10px;
      }
      .piecontainer {
        min-width: 100%;
        margin-top: 20px;
      }
    }
  
    /* Responsive styles for mobiles */
    @media screen and (max-width: 768px) {
      .custom-col {
        flex: 0 0 100%; /* One column per row for mobiles */
        max-width: 100%;
      }
      .custom-chart {
        min-height: 100px; /* Smaller chart height for mobiles */
      }
      .custom-col {
        margin-top: 5px;
      }
    }
  
    /* Mobile and Tablet Adjustments (smaller than 768px) */
    @media (max-width: 768px) {
    }
  
    /* Web View (Larger Screens) */
    @media (min-width: 769px) {
    }
  </style>
  