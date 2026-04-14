<template>
    <div class="container">
       <h1 style="color: greenyellow; text-align: center; font-family: monospace">Production DownTime Dashboard</h1>
      <a-row class="responsive-row" :gutter="[16, 16]">
        <a-col :span="3" :xs="24" :sm="12" :md="4">
          <a-date-picker v-model="formModel.fromDate" placeholder="From Date" style="width: 100%; border-color: blue" />
        </a-col>
        <a-col :span="3" :xs="24" :sm="12" :md="4">
          <a-date-picker v-model="formModel.toDate" placeholder="To Date" style="width: 100%; border-color: blue" />
        </a-col> 
        <a-col :span="3" :xs="24" :sm="12" :md="2">
          <a-button type="primary" style="
              width: 80%;
              background: linear-gradient(135deg, #045e04, #00ffff);  
              border-radius: 5px; 
            " @click="HandleSearch">  
            Search 
          </a-button> 
        </a-col>  
      </a-row>  
      <a-row :gutter="16" style="margin-top: 10px"> 
        <a-col :span="24" :lg="12" class="bargraphcontainer">
          <a-card style="background-color: rgba(255, 255, 255, 0.2); border-radius: 6px">
            <label style="
                color: wheat;
                font-size: 20px;
                font-family: Georgia, 'Times New Roman', Times, serif;
              ">Plantwise Down Time Breakup Details: Aug 2024</label>
            <Chart style="height: 400px;width: 100%;" :option="GraphOption" class="barchart" />  
          </a-card>
        </a-col>
      </a-row>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'; 
  import { ProdDowntimePercentBarChart } from '@/api/productiondowntime'; 
  
  const GraphOption = ref({ 
    legend: {
      selectedMode: false, 
    },
    grid: {
      left: 100,
      right: 100,
      top: 50,
      bottom: 50,
    },
    yAxis: {
      type: 'value',
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    series: [], 
  }); 
  
  const generateFormModel = () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
  
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
  
    return {
      fromDate: formattedStartDate, 
      toDate: formattedEndDate, 
      selectedCompany: '',
      selectedPlant: '',
    };
  };
  const formModel = ref(generateFormModel()) ; 
  
  const ProdDowntimePercentBarChartMethod = async () => {
    try {
      const dd: any = await ProdDowntimePercentBarChart(formModel.value);
      const valuesData = dd.list;
      console.log('API Response:', valuesData);  // Log API response
  
      const liabilityNames: any = [...new Set(valuesData.map((data: any) => data.LIABILITYNAME))];
      const dtCauses: any = [...new Set(valuesData.map((data: any) => data.DTCAUSE))];
  
      console.log('Unique Liability Names:', liabilityNames);  // Log unique liability names  
      console.log('Unique DTCAUSE:', dtCauses);  // Log unique DTCAUSE names
  
      // Reset the GraphOption before updating it
      GraphOption.value = {
        ...GraphOption.value,  // Preserve other configurations like grid and legend
        xAxis: {
          ...GraphOption.value.xAxis,
          data: [],  // Clear the previous xAxis data
        },
        series: [],  // Clear the previous series
      };
  
      // Now we need to group by both LIABILITYNAME and DTCAUSE
      // We will construct the series such that each LIABILITYNAME has bars for each DTCAUSE
      GraphOption.value = {
        ...GraphOption.value,
        xAxis: {
          ...GraphOption.value.xAxis,
          data: liabilityNames,  // Set the liability names as categories for the x-axis
        },
        series: dtCauses.map((dtCause: string) => {
          return {
            name: dtCause,
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            label: {
              show: true,
              formatter: (params: any) => `${Math.round(params.value * 1000) / 10}%`,
            },
            data: liabilityNames.map((liabilityName: string) => {
              const dataForLiability = valuesData.filter(
                (data: any) => data.LIABILITYNAME === liabilityName && data.DTCAUSE === dtCause
              );
              return dataForLiability.length > 0 ? dataForLiability[0].PERC : 0;
            }),
          };
        }),
      };
  
      console.log('Updated GraphOption:', GraphOption.value);  // Log the updated GraphOption
    } catch (error) {
      console.error('Error occurred in ProdDowntimePercentBarChartMethod:', error);
    }
  };
  
  
  
  
  const HandleSearch = async () => {
    await ProdDowntimePercentBarChartMethod();
  };
  
  
  </script> 
  
   
  