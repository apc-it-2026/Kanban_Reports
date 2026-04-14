<template>
  <div class="container"> 
    <div style="color: red">{{ errorMessage }}</div> 
    <div v-if="currentview == 'buttons'">
      <a-spin :loading="loading"
      tip="loading...(Loading data...)"
      style="width: 100%">
      <a-row class="responsive-row" :gutter="[16, 16]"> 
        <a-col :span="12" :xs="24" :sm="24" :md="12">
              <a-row>
                <a-col
                  :span="5"
                  :xs="24"
                  :sm="12"
                  :md="5"
                  style="margin-left: 10px"
                >
                  <a-select
                    v-model="formModel.year"
                    placeholder="Enter year"
                    @change="NullValuesCRD"
                  >
                    <a-option
                      v-for="year in yearss"
                      :key="year.CRD"
                      :value="year.CRD"
                    >
                      {{ year.CRD }}
                    </a-option>
                  </a-select>
                </a-col>
                <a-col
                  :span="5"
                  :xs="24"
                  :sm="12"
                  :md="5"
                  style="margin-left: 10px"
                >
                  <a-select
                    v-model="formModel.month"
                    @change="CRDDATa"
                    placeholder="Enter Month"
                  >
                    <a-option
                      v-for="month in months"
                      :key="month.value"
                      :value="month.value"
                    >
                      {{ month.Name }}
                    </a-option>
                  </a-select>
                </a-col>
                <a-col
                  :span="12"
                  :xs="24"
                  :sm="12"
                  :md="12"
                  style="margin-left: 10px"
                >
                  <div class="dropdowncontainer">
                    <div @click="toggle" class="dropdown">
                      <span>
                        {{
                          formModel.crd.length > 0
                            ? formModel.crd.join(' , ')
                            : 'Select CRD'
                        }}
                      </span>
                    </div>
                    <div v-if="isdrowdown" class="dropdown-options">
                      <label v-for="crd in crddates" :key="crd.CRD">
                        <input
                          type="checkbox"
                          v-model="formModel.crd"
                          :value="crd.CRD"
                        />
                        {{ crd.CRD }}
                      </label>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
        <a-col :span="3" :xs="24" :sm="12" :md="4">   
          <a-input  
            v-model="formModel.modelname" 
            placeholder="Model Name" 
            style="width: 100%; border-color: blue" 
          /> 
        </a-col>  
        <a-col :span="3" :xs="24" :sm="12" :md="3" :lg="3">  
          <a-input
            v-model="formModel.ponumber"
            placeholder="PO Number"
            style="width: 100%; border-color: blue"
          />
        </a-col>
        <a-col :span="3" :xs="24" :sm="12" :md="2">
          <a-button
            type="primary"
            style="
              width: 80%;
              background: linear-gradient(135deg, #045e04, #00ffff);
              border-radius: 5px;
            "
            @click="HandleQuery()"
            >Submit</a-button
          >
        </a-col>
      </a-row> 

      <a-row class="custom-row">
        <a-col 
        class="custom-col"
        >
          <a-card class="custom-card">
            <label
              style="
                color: wheat;
                font-size: 20px;
                font-family: Georgia, 'Times New Roman', Times, serif;
              "
              >PO Completion Percentage</label
            >
            <Chart
              style="height: 310px;"
              :option="chartOption"
             />
          </a-card>
        </a-col>
        <a-col class="custom-col">
          <a-card class="custom-card">
            <label
              style="
                color: wheat;
                font-size: 20px;
                font-family: Georgia, 'Times New Roman', Times, serif;
              "
              >FG Inbound</label
            >
            <Chart
              style="height: 310px;"
              :option="FGInboundchart"  
             />
          </a-card>
        </a-col>
        <a-col class="custom-col">
          <a-card class="custom-card">
            <label
              style="
                color: wheat;
                font-size: 20px;
                font-family: Georgia, 'Times New Roman', Times, serif;
              "
              >Production</label
            >
            <Chart
              style="height: 310px;"
              :option="Productionchart"
             />
          </a-card>
        </a-col>
        <a-col class="custom-col">
          <a-card class="custom-card">
            <label
              style="
                color: wheat;
                font-size: 20px;
                font-family: Georgia, 'Times New Roman', Times, serif;
              "
              >Monthly Sales</label
            >
            <Chart style="height: 310px;" :option="MonthlySalesChart" />
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="16" style="margin-top: 10px">
        <a-col :span="24" class="bargraphcontainer" :xs="24" :sm="24" :md="24">
          <a-card
            class="bargraph"
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
              >Plantwise C/ S/ A/ P</label
            >
            <Chart
              :option="PlantWisecslaGraphOptioon"
            />
          </a-card>
        </a-col>

       
      </a-row>
      <div>
        <a-row>
          <Drawer></Drawer>
        </a-row>
      </div>
    </a-spin>
    </div>
    <component
      v-else
      :is="components[currentview]"
      :rowData="clickvalueData"
      :onBack="goBack"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import useChartOption from '@/hooks/chart-option';
  import whatsapp from '@/assets/images/whatsapp.png';
  import { Notification } from '@arco-design/web-vue';
  import { GetPlantsData, GetOrgData , IssueRaise } from '@/api/e2e_General/e2eFilters';
  import {
    PlantWiseCSLAOutput,
    ProductionChartData,
  } from '@/api/e2e_production/production';
  import {
    GetFGChartDataMethod,
    PoCompletionPercentage,
    GetMonthlySalesData,
  } from '@/api/e2e_fg/fg';
  import { GetYearsValues , GetCRDData } from '@/api/e2e_General/e2eFilters';
   import useLoading from '@/hooks/loading';
  import production from './components/production.vue';
  import pocompletion from './components/pocompletion.vue';
  import fginbound from './components/fginbound.vue'; 

  const { loading, setLoading } = useLoading(false);

  const generateFormModel = () => {
    return {
      year: '' , 
      month: '' , 
      crd: [] , 
      ponumber: '',
      modelname: '',
    };
  }; 

  const formModel = ref(generateFormModel());
  const Organizationlist = ref<any>([]);
  const fgPielist = ref<any>([]);
  const poCompletiondata = ref<any>([]);
  const monthlysalesdata = ref<any>([]);
  const Prodlist = ref<any>([]);
  const visible = ref(false);
  const errorMessage = ref('');
  const PlantwiseGraphList = ref<any>([]);
  const PlantwiseList = ref({
    Cutting: [],
    Stitching: [],
    Assembly: [],
    Packing: [],
  });
  const yearss = ref<any>([]) ; 
    const crddates: any = ref([]);
    const GETYears = async () => {
    try {
      setLoading(true);
      const dd: any = await GetYearsValues(); 
      yearss.value = dd.list;
    } catch (error) {
      errorMessage.value = (error as Error).message;
      Notification.error({
        title: 'Year',
        content: errorMessage.value,
      });
    } finally {
      setLoading(false);
    }
  };
  function NullValuesCRD() {
    return formModel.value.month === '';
  }
  const CRDDATa = async () => {
    try {
      debugger ; 
      setLoading(true);
      formModel.value.crd = [];
      formModel.value.ponumber = '';
      const dd: any = await GetCRDData(formModel.value);
      crddates.value = dd.list;
    } catch (error) {
      errorMessage.value = (error as Error).message;
      Notification.error({
        title: 'CRD DATES ',
        content: errorMessage.value,
      });
    } finally {
      setLoading(false);
    }
  };
  const months: any = [
    { Name: 'January', value: 1 },
    { Name: 'February', value: 2 },
    { Name: 'March', value: 3 },
    { Name: 'April', value: 4 },
    { Name: 'May', value: 5 },
    { Name: 'June', value: 6 },
    { Name: 'July', value: 7 },
    { Name: 'August', value: 8 },
    { Name: 'September', value: 9 },
    { Name: 'October', value: 10 },
    { Name: 'November', value: 11 },
    { Name: 'December', value: 12 },
  ];
  const isdrowdown = ref(false);

  const toggle = () => {
    isdrowdown.value = !isdrowdown.value;
  };

  const currentview = ref<'buttons' | 'prod' | 'pocomp' | 'fg'>('buttons');
   
  const components = {
    prod: production,
    pocomp: pocompletion,
    fg: fginbound,
  };

  function goBack() {
    currentview.value = 'buttons';
  }
  const clickvalueData = ref(null);

  function goToProduction(row: any) {
    clickvalueData.value = row;
    console.log(row);
    currentview.value = 'prod';
  }

  function goToPocompletion(row1: any) {
    clickvalueData.value = row1;
    console.log(row1);
    currentview.value = 'pocomp';
  }

  function goToFginbound(row2: any) {
    clickvalueData.value = row2;
    console.log(row2);
    currentview.value = 'fg';
  }
 
  const FgPieChartdata = async () => {
    try {
      setLoading(true);
      const dd: any = await GetFGChartDataMethod(formModel.value);
      if(dd.length < 0) 
    {
      Notification.error({
        title:'FG Inbound' , 
        content: 'NO FG Inbound Data'
      })  
    }
    else {
      const valuesw = dd.list;
      const transformedData = valuesw.map((item: any) => ({
        value: item.VALUE,
        name: item.NAME,
      }));
      console.log(transformedData);
   
      fgPielist.value = transformedData;
      console.log(fgPielist.value);
      Notification.success({
        title: 'FG Inbound' , 
        content : 'Data Successfull'
      }) 
    } 
    } catch (error) {
      errorMessage.value = (error as Error).message;
      Notification.error({
        title: 'FG Inbound' , 
        content: errorMessage.value , 
      }) 
    } finally {
      setLoading(false);
    }
  };   

  const PoCompletionPercent = async () => {
    try {
      debugger ; 
      setLoading(true);
      const dd: any = await PoCompletionPercentage(formModel.value);
      const valuesw = dd.list;
      const transformedData = valuesw.map((item: any) => ({
        value: item.VALUE,
        name: item.NAME,
      }));
      console.log(transformedData);
      poCompletiondata.value = transformedData;
      console.log(poCompletiondata.value);
    } catch (error) { 
      errorMessage.value = (error as Error).message;
      Notification.error({
        title: 'PO Completion' , 
        content: errorMessage.value
      })
    } finally { 
      setLoading(false); 
    } 
  };  

  const GetMonthlySalesChartData = async () => {
    try {
      setLoading(true);
      const dd: any = await GetMonthlySalesData(formModel.value);
      const valuesw = dd.list;
      const transformedData = valuesw.map((item: any) => ({
        value: item.VALUE,
        name: item.NAME,
      }));
      console.log(transformedData);
      monthlysalesdata.value = transformedData;
      console.log(monthlysalesdata.value);
    } catch (error) {
      errorMessage.value = (error as Error).message;
      Notification.error({
        title: 'Shipment' , 
        content: errorMessage.value
      })
    } finally {
      setLoading(false);
    }
  }; 

  const GetProductionChart = async () => {
    try {
      setLoading(true);
      const dd: any = await ProductionChartData(formModel.value);
      const valuesw = dd.list;
      const transformedData = valuesw.map((item: any) => ({
        value: item.OUTPUT,
        name: item.PROCESS_NO,
      }));
      console.log(transformedData);
      Prodlist.value = transformedData;
      console.log(Prodlist.value);
    } catch (error) {
      errorMessage.value = (error as Error).message;
      Notification.error({
        title:'Production' , 
        content: errorMessage.value
      })
    } finally {
      setLoading(false);
    }
  };  

  interface Colors {
    [key: string]: string;
  }
  const colors: Colors = {
    COMPLETED: '#93CF76',
    REMAINING: '#EE6666',
  };

  const { chartOption } = useChartOption((isDark) => {
    return {
      legend: {
        left: 'center',
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
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
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 10,
            color: 'cyan',
          },
          itemStyle: {
            borderWidth: 1,
            color: (data: { name: string }) => {
              return colors[data.name] || 'Gray';
            },
          },
          data: poCompletiondata.value,
          animation: true, 
          animationType: 'scale', 
          animationDuration: 1000, 
          animationEasing: 'cubicOut', 
        },
      ],
    };
  });

  const { FGInboundchart } = useChartOption((isDark) => { 
    return {
      legend: {
        left: 'center',
        bottom: -3,
        icon: 'circle',
        itemWidth: 8,
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
         label: {
            formatter: '{d}%',
            fontSize: 10,
            color: 'cyan',
          },
          type: 'pie',
          data: fgPielist.value,
        },
      ],
    };
  }); 

  const { Productionchart } = useChartOption((isDark) => {
    return {
      legend: {
        left: 'center',
        bottom: -20,
        icon: 'circle',
        itemWidth: 8,
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
          label: {
            fontSize: 10,
            color: 'cyan',
          },
          type: 'pie',
          data: Prodlist.value,
          roseType: 'area',
        },
      ],
    };
  });  
  

  interface Colors1 {
    [key: string]: string;
  } 
  const colors1: Colors1 = {
    SHIPMENT: '  #5470C6',
    REMAINING: '  #FAC858',
  };
  const { MonthlySalesChart } = useChartOption((isDark) => {
    return {
      legend: {
        left: 'center',
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
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
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 10,
            color: 'cyan',
          },
          itemStyle: {
            // borderColor: 'black',
            borderWidth: 1,
            color: (data: { name: string }) => {
              return colors1[data.name] || 'Gray';
            },
          },
          // data: [
          //   { name: 'total_sales', value: 60 },
          //   { name: 'total_oders', value: 80 }, // Removed extra space
          // ],
          data: monthlysalesdata.value,
          animation: true, // Enable animation
          animationType: 'scale', // Type of animation ('scale', 'expansion', etc.)
          animationDuration: 1000, // Duration of animation in milliseconds
          animationEasing: 'cubicOut', // Easing effect ('linear', 'cubicIn', 'cubicOut', etc.)
        }, 
      ], 
    }; 
  });  

  const PlantWisecslaGraphOptioon = ref({ 
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        color: 'white', // Set x-axis label color to white
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'white', // Set y-axis label color to white
      },
    },
    label: {
      fontSize: 10,
      color: 'white', // Set bar label color to white
    },
    series: [
      {
        name: 'Cutting',
        type: 'bar',
        data: [],
      },
      {
        name: 'Stitching',
        type: 'bar',
        data: [],
      },
      {
        name: 'Assembly',
        type: 'bar',
        data: [],
      },
      {
        name: 'Packing',
        type: 'bar',
        data: [],
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Optional: if you want to change the tooltip background
      textStyle: {
        color: 'white', // Set tooltip text color to white
      },
    },
    legend: {
      data: ['Cutting', 'Stitching', 'Assembly', 'Packing'], 
      textStyle: {
        color: 'white', // Set legend text color to white
      },
    },
  });

  const GetPlantWiseCSLAOutput = async () => {
    try {
       setLoading(true);
      const data: any = await PlantWiseCSLAOutput(formModel.value);  
      console.log(data);  

      if (data && data.list && Array.isArray(data.list)) {
        PlantwiseGraphList.value = data.list.map((item: any) => item.PLANT);
        PlantwiseList.value = {
          Cutting: data.list.map((item: any) => item.CQTY),
          Stitching: data.list.map((item: any) => item.SQTY),
          Assembly: data.list.map((item: any) => item.LQTY),
          Packing: data.list.map((item: any) => item.AQTY),
        };

        // Dynamically update the GraphOption values
        PlantWisecslaGraphOptioon.value = {
          ...PlantWisecslaGraphOptioon.value,
          xAxis: {
            ...PlantWisecslaGraphOptioon.value.xAxis,
            data: PlantwiseGraphList.value,
          },
          series: [
            {
              name: 'Cutting',
              type: 'bar',
              data: PlantwiseList.value.Cutting,
            },
            {
              name: 'Stitching',
              type: 'bar',
              data: PlantwiseList.value.Stitching,
            },
            {
              name: 'Assembly',
              type: 'bar',
              data: PlantwiseList.value.Assembly,
            },
            {
              name: 'Packing',
              type: 'bar',
              data: PlantwiseList.value.Packing,
            },
          ],
        };
      } else {
        console.error('Invalid data format');
      }
    } catch (error) {
      console.error(error);
    } finally {
       setLoading(false);
    }
  }; 

 
  const HandleQuery = async () => {   
    await PoCompletionPercent();
    await FgPieChartdata();
     await GetProductionChart();
     await GetMonthlySalesChartData();
    await GetPlantWiseCSLAOutput();

  };   

  onMounted(async () => {
    await GETYears() ;  
  }); 
</script>

<style lang="css" scoped>
 .dropdown {
    padding: 8px;
    font-size: 16px;
    background-color: white;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
  }

  .dropdowncontainer {
    width: 100%;
    max-width: 300px;
    position: relative;
  }

  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    cursor: pointer;
  }

  .dropdown-options label {
    display: block;
    margin-bottom: 8px;
  }

  .dropdown-options input {
    margin-right: 8px;
  }
  .container {
    width: 100%;
    height: 100%;
    background-color: #00004d;
    padding: 20px;
  }
  .responsive-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  .line {
    height: 4px;
    background: linear-gradient(90deg, #ccc, #888);
    margin: 0 auto;
    border-radius: 2px;
    width: 100%;
  }

  .icon {
    width: 50px;
    height: 50px;
    border: 3px solid #ddd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    margin: 0 auto 10px;
  }

  .icon.kitchen {
    background: #d4f2e8;
    border-color: #4caf50;
  }

  .icon.user {
    background: #c5d8ff;
    border-color: #3d5afe;
  }

  .icon.completed {
    background: #34d399;
    border-color: #059669;
    color: #fff;
  }

  .step-number {
    font-weight: bold;
    font-size: 14px;
    color: black;
  }

  .icon.completed .step-number,
  .icon.user .step-number {
    color: white;
  }

  .label {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: wheat;
  }

  .sub-parts {
    display: flex;
    flex-direction: column;
    margin-top: 4px;
  }

  .sub-label {
    font-size: 12px;
    color: white;
  }
  .filter-container .field-gap {
    margin-bottom: 16px;
  }

  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .icon-button:focus {
    outline: 2px solid #007bff;
  }


  .issue-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .issue-container h2 {
    color: blanchedalmond;
    margin: 0;
  }

  .issue-container textarea {
    height: 40px;
    width: 800px;
    resize: none;
    background-color: rgba(255, 255, 255, 0.2);
    font-display: white;
    color: goldenrod;
    border-radius: 5px;
    margin-top: 20px;
    border: none;
  }

  .issue-container img {
    width: 40px;
    height: 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 100px;
  }

  * Row styling */ .custom-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    justify-content: space-between;
    margin: 16px 0;
    overflow-x: auto;
  }

  .custom-col {
    flex: 0 0 25%;
    max-width: 25%;
    padding: 8px;
    box-sizing: border-box;
    margin-top: 20px;
  }

  .custom-card {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 16px;
    background-color: rgba(255, 255, 255, 0.2);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .custom-card:hover {
    transform: translateY(-4px);
  }

  .custom-chart {
    flex-grow: 1;
    height: auto;
    width: 100%;
    min-height: 200px;
    max-height: 100%;
  }

  .bargraph:hover {
    transform: translateY(-4px);
  }
  .progresscard:hover {
    transform: translateY(-4px);
  }
  /* Responsive styles for tablets */
  @media screen and (max-width: 1024px) {
    .custom-row {
      flex-wrap: wrap;
    }
    .custom-col {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .custom-chart {
      min-height: 150px;
    }
    .bargraphcontainer {
      min-width: 100%;
    }
    .progresscard {
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    .custom-col {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .custom-chart {
      min-height: 100px;
    }
    .custom-col {
      margin-top: 5px;
    }
  }

  @media (max-width: 768px) {
    .ant-steps {
      flex-direction: column !important;
    }

    .ant-steps-item-title,
    .ant-steps-item-description {
      font-size: 12px !important;
    }
    .a-space {
      display: block;
      width: 100%;
    }
    .ant-btn {
      width: 100% !important;
      margin-bottom: 8px;
    }
    /* .progress-tracker1 {
      padding: 0 8px;
    } */
  }

  @media (min-width: 769px) {
    .ant-steps {
      display: flex;
      flex-direction: row !important;
      justify-content: space-between;
    }

    .ant-steps-item-title,
    .ant-steps-item-description {
      font-size: 14px !important;
    }
    .a-space {
      display: inline-block;
    }
    .ant-btn {
      width: auto;
      margin-bottom: 0;
    }
  }
</style>
