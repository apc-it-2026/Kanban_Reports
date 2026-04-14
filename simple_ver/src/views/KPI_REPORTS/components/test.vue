
<template>
    <div class="card">
      <DataTable
        :value="filteredItems"
        paginator
        :rows="5"
        sortMode="multiple"
        tableStyle="min-width: 60rem"
        dataKey="id"
        responsiveLayout="scroll"
        class="custom-table"
      >
        <Column field="id" header="ID" sortable />
        <Column field="name" header="Name" sortable />
        <Column field="age" header="Age" sortable />
        <Column field="country" header="Country" sortable />
      </DataTable>
  
      <Toast />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useToast } from 'primevue/usetoast'
  
  const toast = useToast()
  
  type Person = {
    id: number
    name: string
    age: number
    country: string
  }
  
  const items = ref<Person[]>([
    { id: 1, name: 'Alice', age: 25, country: 'USA' },
    { id: 2, name: 'Bob', age: 30, country: 'Canada' },
    { id: 3, name: 'Charlie', age: 28, country: 'UK' },
    { id: 4, name: 'David', age: 35, country: 'Australia' },
    { id: 5, name: 'Eva', age: 22, country: 'India' },
  ])
  
  const search = ref('')
  
  const filteredItems = computed(() => {
    if (!search.value) return items.value
    return items.value.filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  </script>
  
  <style scoped>
 
  ::v-deep(.custom-table thead th) {
    background-color: #007bff;  
    color: white;              
  }
  ::v-deep(.custom-table tbody td){
    background-color: red;
  }
  </style>
  





  <!-- 
  const PercentPie = async (kpi: any) => {
    debugger;
    const data: any = await GetKPIPiechart(SuggetionMonth.value, SuggetionLine.value); 
    const day = data.list.OutputTarget.map((index: any) =>
        index.DAY.split('T')[0]
    ); 
    const target = data.list.OutputTarget.map((item: any) => item.TARGET);
    const output = data.list.OutputTarget.map((item: any) => item.OUTPUT);
    const outputtargper = data.list.OutputTarget.map((item: any) => item.OUTPUT_TARGET_PERCENT); 
    const targetpo = data.list.OutputTarget.map((item: any) => item.TARGET_PO); 
    const finishpo = data.list.OutputTarget.map((item: any) => item.FINISH_PO);
    const finishpoper = data.list.OutputTarget.map((item: any) => item.PO_FINISH_PERCENT); 
    const bgrades = data.list.OutputTarget.map((item: any) => item.B_GRADES);
    const repairs = data.list.OutputTarget.map((item: any) => item.REPAIRS);
    const bgradeper = data.list.OutputTarget.map((item: any) => item.B_GRADE_PERCENT);
    const insqty = data.list.OutputTarget.map((item: any) => item.INSPECTION_QTY);
    const quaqty = data.list.OutputTarget.map((item: any) => item.QUALIFIED_QTY);
    const rft = data.list.OutputTarget.map((item: any) => item.RFT);
    const repacqty = data.list.OutputTarget.map((item: any) => item.REPACKING_QTY);
    const repacper = data.list.OutputTarget.map((item: any) => item.REPACKING_PERCENT); 
    const sizelblcount = data.list.OutputTarget.map((item: any) => item.SIZE_LABEL_COUNT); 
    const repamount = data.list.OutputTarget.map((item: any) => item.REPLACEMENT_AMOUNT);
    const repparconst = data.list.OutputTarget.map((item: any) => item.REPLACEMENT_PAIRCOST);
    const kaiper = data.list.OutputTarget.map((item: any) => item.KAIZEN_PERCENT);
    const bonper = data.list.OutputTarget.map((item: any) => item.BONDING_PERCENT);
    const ieper = data.list.OutputTarget.map((item: any) => item.IE_PERCENT);
    const haulting = data.list.OutputTarget.map((item: any) => item.HAULTING);  

    const colors = ['#5470C6', '#91CC75', '#EE6666', '#FFA500'];
    let series: any[] = [];
    let yAxis: any[] = [];  

    if(kpi === "OUTPUT"){ 
        yAxis = [
      {
        type: 'value',
        name: 'Target',
        position: 'right',
        axisLine: { lineStyle: { color: colors[0] } },
        axisLabel: { formatter: '{value}' }
      },
      {
        type: 'value',
        name: 'Output',
        position: 'right',
        offset: 80,
        axisLine: { lineStyle: { color: colors[1] } },
        axisLabel: { formatter: '{value}' }
      },
      {
        type: 'value',
        name: 'Percent',
        position: 'left',
        axisLine: { lineStyle: { color: colors[2] } },
        axisLabel: { formatter: '{value} %' }
      }
    ];

    series = [
      {
        name: 'Target',
        type: 'bar',
        data: target
      },
      {
        name: 'Output',
        type: 'bar',
        yAxisIndex: 1,
        data: output
      },
      {
        name: 'Percent',
        type: 'line',
        yAxisIndex: 2,
        data: outputtargper,
        tooltip: {
          valueFormatter: (val: any) => `${val} %`
        }
      }
    ];

    }  

    if(kpi === "PO_FINISH"){ 
        yAxis = [
      {
        type: 'value',
        name: 'Target PO',
        position: 'right',
        axisLine: { lineStyle: { color: colors[0] } },
        axisLabel: { formatter: '{value}' }
      },
      {
        type: 'value',
        name: 'finish PO',
        position: 'right',
        offset: 80,
        axisLine: { lineStyle: { color: colors[1] } },
        axisLabel: { formatter: '{value}' }
      },
      {
        type: 'value',
        name: 'PO Finish Percent',
        position: 'left',
        axisLine: { lineStyle: { color: colors[2] } },
        axisLabel: { formatter: '{value} %' }
      }
    ];

    series = [
      {
        name: 'Target PO',
        type: 'bar',
        data: targetpo
      },
      {
        name: 'Finish PO',
        type: 'bar',
        yAxisIndex: 1,
        data: finishpo
      },
      {
        name: 'PO Finish Perc', 
        type: 'line',
        yAxisIndex: 2,
        data: finishpoper,
        tooltip: {
          valueFormatter: (val: any) => `${val} %`
        }
      }
    ];
    } 
    if(kpi === "B_GRADE")
    { 
    yAxis = [
      {
        type: 'value',
        name: 'Output',
        position: 'right',
        axisLine: { lineStyle: { color: colors[0] } },
        axisLabel: { formatter: '{value}' }
      },
      {
        type: 'value',
        name: 'B Grades',
        position: 'right',
        offset: 80,
        axisLine: { lineStyle: { color: colors[1] } },
        axisLabel: { formatter: '{value}' }
      },
      {
        type: 'value',
        name: 'B Grade %',
        position: 'left',
        axisLine: { lineStyle: { color: colors[2] } },
        axisLabel: { formatter: '{value} %' }
      }
    ];

    series = [
      {
        name: 'Output',
        type: 'bar',
        data: output
      },
      {
        name: 'B Grades',
        type: 'bar',
        yAxisIndex: 1,
        data: bgrades
      },
      {
        name: 'Repairs',
        type: 'bar',
        yAxisIndex: 1,
        data: repairs
      },
      {
        name: 'B Grade %',
        type: 'line',
        yAxisIndex: 2,
        data: bgradeper , 
        tooltip: {
          valueFormatter: (val: any) => `${val} %`
        }
      }
    ];
    } 
  // Finally assign to chart
  ViewGraph.value = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    grid: {
      right: '20%'
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: series.map(s => s.name)
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { alignWithLabel: true },
        data: day
      }
    ],
    yAxis,
    series
  };
};     
  -->


  <!-- 
  const outputTarget = ref([]);
const ViewGraph = ref<any>([]);
const PercentPie = async (kpi: string) => {

    const day = outputTarget.value.map((index: any) => index.DAY.split('T')[0]);
    const colors = [
        '#5470C6', // blue
        '#91CC75', // green
        '#EE6666', // red
        '#FAC858', // yellow
        '#73C0DE', // teal
        '#3BA272', // dark green
        '#FC8452', // orange
        '#9A60B4', // purple
        '#EA7CCC', // pink
        '#FF7F50', // coral
        '#8B4513', // brown
        '#00CED1', // dark turquoise
        '#DC143C', // crimson
        '#7B68EE', // medium slate blue
        '#6A5ACD', // slate blue
        '#20B2AA', // light sea green
        '#FFD700', // gold
        '#40E0D0', // turquoise
        '#DA70D6', // orchid
        '#32CD32', // lime green
        '#FF69B4'  // hot pink
    ];

    const fields: Record<string, any[]> = {};
    const fieldNames = [
        'TARGET', 'OUTPUT', 'OUTPUT_TARGET_PERCENT', 'TARGET_PO', 'FINISH_PO', 'PO_FINISH_PERCENT',
        'B_GRADES', 'REPAIRS', 'B_GRADE_PERCENT', 'INSPECTION_QTY', 'QUALIFIED_QTY', 'RFT',
        'REPACKING_QTY', 'REPACKING_PERCENT', 'SIZE_LABEL_COUNT', 'REPLACEMENT_AMOUNT',
        'REPLACEMENT_PAIRCOST', 'KAIZEN_PERCENT', 'BONDING_PERCENT', 'IE_PERCENT', 'HAULTING'
    ];

    fieldNames.forEach(name => {
        fields[name] = outputTarget.value.map((item: any) => item[name]);
    });

    const configMap: Record<string, { yAxis: any[], series: any[] }> = {
        OUTPUT: {
            yAxis: [
                { type: 'value', name: 'Target', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Output', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Percent', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Target', type: 'bar', data: fields.TARGET },
                { name: 'Output', type: 'bar', yAxisIndex: 1, data: fields.OUTPUT },
                { name: 'Percent', type: 'line', yAxisIndex: 2, data: fields.OUTPUT_TARGET_PERCENT, tooltip: { valueFormatter: (val: any) => `${val} %` } }
            ]
        },
        PO_FINISH: {
            yAxis: [
                { type: 'value', name: 'Target PO', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Finish PO', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'PO Finish Percent', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Target PO', type: 'bar', data: fields.TARGET_PO },
                { name: 'Finish PO', type: 'bar', yAxisIndex: 1, data: fields.FINISH_PO },
                { name: 'PO Finish Perc', type: 'line', yAxisIndex: 2, data: fields.PO_FINISH_PERCENT, tooltip: { valueFormatter: (val: any) => `${val} %` } }
            ]
        },
        B_GRADE: {
            yAxis: [
                { type: 'value', name: 'Output', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'B Grades', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Repairs', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'B Grade %', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Output', type: 'bar', data: fields.OUTPUT },
                { name: 'B Grades', type: 'bar', yAxisIndex: 1, data: fields.B_GRADES },
                { name: 'Repairs', type: 'bar', yAxisIndex: 1, data: fields.REPAIRS },
                { name: 'B Grade %', type: 'line', yAxisIndex: 2, data: fields.B_GRADE_PERCENT, tooltip: { valueFormatter: (val: any) => `${val} %` } }
            ]
        },
        RFT: {
            yAxis: [
                { type: 'value', name: 'Inspection Qty', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'Qualified Qty', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'RFT', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value}' } }
            ],
            series: [
                { name: 'Inspection Qty', type: 'bar', yAxisIndex: 1, data: fields.INSPECTION_QTY },
                { name: 'Qualified Qty', type: 'bar', yAxisIndex: 1, data: fields.QUALIFIED_QTY },
                { name: 'RFT', type: 'line', yAxisIndex: 2, data: fields.RFT }
            ]
        },
        REPACKING: {
            yAxis: [
                { type: 'value', name: 'Output', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'REPACKING QTY', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'REPACKING PERCENT', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Output', type: 'bar', data: fields.OUTPUT },
                { name: 'REPACKING QTY', type: 'bar', yAxisIndex: 1, data: fields.REPACKING_QTY },
                { name: 'REPACKING PERCENT', type: 'bar', yAxisIndex: 1, data: fields.REPACKING_PERCENT },
            ]
        },
        SIZE_LABEL: {
            yAxis: [
                { type: 'value', name: 'SIZE LABEL COUNT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
            ],
            series: [
                { name: 'SIZE LABEL COUNT', type: 'bar', data: fields.SIZE_LABEL_COUNT },
            ]
        },
        REPLACEMENT: {
            yAxis: [
                { type: 'value', name: 'Output', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'REPLACEMENT AMOUNT', position: 'right', offset: 80, axisLine: { lineStyle: { color: colors[1] } }, axisLabel: { formatter: '{value}' } },
                { type: 'value', name: 'REPLACEMENT PAIRCOST', position: 'left', axisLine: { lineStyle: { color: colors[2] } }, axisLabel: { formatter: '{value} %' } }
            ],
            series: [
                { name: 'Output', type: 'bar', data: fields.OUTPUT },
                { name: 'REPLACEMENT AMOUNT', type: 'bar', yAxisIndex: 1, data: fields.REPLACEMENT_AMOUNT },
                { name: 'REPLACEMENT PAIRCOST', type: 'bar', yAxisIndex: 1, data: fields.REPLACEMENT_PAIRCOST },
            ]
        },
        KAIZEN: {
            yAxis: [
                { type: 'value', name: 'KAIZEN PERCENT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
            ],
            series: [
                { name: 'KAIZEN PERCENT', type: 'bar', data: fields.KAIZEN_PERCENT },
            ]
        },
        BONDING: {
            yAxis: [
                { type: 'value', name: 'BONDING PERCENT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
            ],
            series: [
                { name: 'BONDING PERCENT', type: 'bar', data: fields.BONDING_PERCENT },
            ]
        },
        IE: {
            yAxis: [
                { type: 'value', name: 'IE PERCENT', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
            ],
            series: [
                { name: 'IE PERCENT', type: 'bar', data: fields.IE_PERCENT },
            ]
        },
        HAULTING: {
            yAxis: [
                { type: 'value', name: 'Haulting', position: 'right', axisLine: { lineStyle: { color: colors[0] } }, axisLabel: { formatter: '{value}' } },
            ],
            series: [
                { name: 'Haulting', type: 'bar', data: fields.HAULTING },
            ]
        },

    };
    debugger;
    const selectedConfig = configMap[kpi];
    if (!selectedConfig) {
        console.warn(`No configuration found for KPI: ${kpi}`);
        ViewGraph.value = {};
        return;
    }
    ViewGraph.value = {};
    ViewGraph.value = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: selectedConfig.series.map(s => s.name)
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { alignWithLabel: true },
                data: day
            }
        ],
        yAxis: selectedConfig.yAxis,
        series: selectedConfig.series
    };
};

const onView = async (row: any) => {
    console.log('View clicked:', row);
    showView.value = true;
    const month: any = row.BOOK_NO;
    SuggetionMonth.value = month;
    const line: any = row.PROD_LINE;
    SuggetionLine.value = line;
    const data: any = await GetKPIPiechart(SuggetionMonth.value, SuggetionLine.value);
    outputTarget.value = data.list.OutputTarget;
    PercentPie("All");
};
 -->