
<template>
  <div style="width: 100%; height: 100%; background-color: whitesmoke; padding: 10px">
    <div style="color: red;">{{ errorMessage }}</div>
    <a-spin tip="Loading..." :loading="searchLoading" style="width: 100%">
      <div>

        <!-- Header -->
        <div class="heading"> Production Reports Dashboard </div>                            

        <!-- Filter Section -->
        <a-card class="filterbox">
          <a-row :gutter="[16, 16]">
            <!-- Start Date Filter -->
            <a-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">Start Date</label>
                <a-date-picker
                  v-model="startDate"
                  placeholder="Select Start Date"
                  class="filter-control"
                  format="YYYY-MM-DD"
                />
              </div>   
            </a-col>   
                
            <!-- End Date Filter -->    
              
            <a-col :xs="24" :sm="12" :md="6">  
              <div class="filter-item">

                <label class="filter-label">End Date</label>
                <a-date-picker
                  v-model="endDate"
                  placeholder="Select End Date"
                  class="filter-control"
                  format="YYYY-MM-DD"
                />
              </div>
            </a-col>

            <!-- Action Buttons -->
            <a-col :xs="24" :sm="12" :md="6">
              <div class="filter-actions">
                <a-button 
                  @click="searchData" 
                  type="primary" 
                  :loading="searchLoading"
                  size="large"
                  style="margin-right: 12px;"
                >
                  <template #icon>
                    <SearchOutlined />
                  </template>
                  Search
                </a-button>
                <a-button 
                  @click="resetFilters" 
                  size="large"
                >
                  <template #icon>
                    <ReloadOutlined />
                  </template>
                  Reset
                </a-button>
              </div>
            </a-col>
          </a-row>
        </a-card>

        <!-- KPI Dashboard -->
        <a-card class="kpi-card" v-if="reasonData.length > 0 || searchLoading">
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="8" :md="8">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">📦</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ searchLoading ? 'Loading...' : totalPackQty }}</div>
                  <div class="kpi-label">Total Pack Qty</div>
                </div>
              </div>
            </a-col>
            <a-col :xs="12" :sm="8" :md="8">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">🏭</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ searchLoading ? 'Loading...' : totalFGQty }}</div>
                  <div class="kpi-label">Total FG Qty</div>
                </div>
              </div>
            </a-col>
            <a-col :xs="12" :sm="8" :md="8">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">📈</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ searchLoading ? 'Loading...' : totalDiff }}</div>
                  <div class="kpi-label">Total Difference</div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>         
        <div v-if="reasonData.length > 0 || searchLoading"> 
          <a-row :gutter="[16, 16]">
            <!-- Bar Chart -->
            <a-col :xs="24" :sm="12" :md="12">
              <a-card class="chart-card">
                <h3 class="chart-title">   
                  <span class="chart-icon">📊</span>
                  Pack vs FG Quantity by Plant
                </h3>
                <div class="chart-container">
                  <div ref="barChart"></div>
                </div>
              </a-card>
            </a-col>
            <!-- Pie Chart -->
            <a-col :xs="24" :sm="12" :md="12">
              <a-card class="chart-card">
                <h3 class="chart-title">
                  <span class="chart-icon">🥧</span>
                  Reason Distribution
                </h3>
                <div class="chart-container">
                  <div ref="pieChart"></div>
                </div>
              </a-card>
            </a-col> 
          </a-row> 
        </div>

        <!-- Data Table -->
        <div class="table-container" v-if="reasonData.length > 0 || searchLoading">
          <div class="table-header">
            <h3 class="table-title">
              <span class="table-icon">📋</span>
              Production Reason Details   
            </h3>
            <div class="table-actions"> 
              <a-button  
                size="small"  
                type="text"  
                class="button-class" 
                @click="exportToExcel" 
                :disabled="reasonData.length === 0" 
              > 
                <template #icon><FileExcelOutlined /></template>        
                Export 
              </a-button> 
            </div>
          </div> 
          <DataTable 
            :value="reasonData" 
            paginator 
            :rows="10" 
            sortMode="multiple" 
            tableStyle="min-width: 50rem"
            dataKey="DATEE" 
            responsiveLayout="scroll" 
            class="enhanced-data-table"
            :emptyMessage="getEmptyMessage()"
            :loading="searchLoading"
            :scrollable="true"
            scrollHeight="400px" 
          >
            <Column field="DATEE" header="Date" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="date-cell">
                  {{ formatDate(slotProps.data.DATEE) }}
                </div>
              </template>
            </Column>
            <Column field="LINE" header="Line" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="line-cell">
                  {{ slotProps.data.LINE }}
                </div>
              </template>
            </Column>
            <Column field="PLANT" header="Plant" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="plant-cell">
                  {{ slotProps.data.PLANT }}
                </div>
              </template>
            </Column>
            <Column field="PAC_QTY" header="Pack Qty" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="quantity-cell">
                  {{ slotProps.data.PAC_QTY?.toLocaleString() || 0 }}
                </div>
              </template>
            </Column>
            <Column field="FG_QTY" header="FG Qty" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="quantity-cell">
                  {{ slotProps.data.FG_QTY?.toLocaleString() || 0 }}
                </div>
              </template>
            </Column>
            <Column field="DIFF" header="Difference" sortable style="min-width: 100px;">
              <template #body="slotProps">
                <span 
                  :class="getDifferenceClass(slotProps.data.DIFF)"
                  :style="{
                    backgroundColor: getDifferenceBackgroundColor(slotProps.data.DIFF),
                    color: getDifferenceTextColor(slotProps.data.DIFF),
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontWeight: '700',
                    display: 'inline-block',
                    minWidth: '60px',
                    textAlign: 'center',
                    fontSize: '13px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }"
                >
                  {{ slotProps.data.DIFF?.toLocaleString() || 0 }}
                </span>
              </template>
            </Column>
            <Column field="REASON" header="Reason" sortable style="min-width: 12rem;">
              <template #body="slotProps">
                <div class="reason-cell">
                  {{ slotProps.data.REASON || 'N/A' }} 
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { message } from 'ant-design-vue'
import { SearchOutlined, ReloadOutlined, FileExcelOutlined } from '@ant-design/icons-vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import dayjs from 'dayjs'
import { GetReasonData , GetReasonPieData } from '@/api/fgPacReasonApi' 
import * as echarts from 'echarts'

// Reactive data
const searchLoading = ref(false)
const errorMessage = ref('')
const startDate: any = ref(null)
const endDate: any = ref(null)
const reasonData: any = ref([])

// Chart refs
const barChart = ref(null)
const pieChart = ref(null)

// Chart instances
let barChartInstance: echarts.EChartsType | null = null
let pieChartInstance: echarts.EChartsType | null = null

// Reactive data for pie chart
const pieData: any = ref([])

// KPI Computed Properties
const totalPackQty = computed(() => {
  if (searchLoading.value) return 0
  return reasonData.value.reduce((sum: any, item: any) => sum + (item.PAC_QTY || 0), 0)
})

const totalFGQty = computed(() => {
  if (searchLoading.value) return 0
  return reasonData.value.reduce((sum: any, item: any) => sum + (item.FG_QTY || 0), 0)
})

const totalDiff = computed(() => {
  if (searchLoading.value) return 0
  return reasonData.value.reduce((sum: any, item: any) => sum + (item.DIFF || 0), 0)
})

// Helper functions for difference cell styling
const getDifferenceBackgroundColor = (diff: number) => {
  if (diff > 0) {
    return '#ff4d4f' // Red background for positive difference
  }
  if (diff < 0) {
    return '#8c8c8c' // Gray background for negative difference
  }
  return 'transparent' // No background for zero difference
}

const getDifferenceTextColor = (diff: number) => {
  if (diff > 0) {
    return 'white' // White text for red background
  }
  if (diff < 0) {
    return 'white' // White text for gray background
  }
  return 'inherit' // Default text color for zero difference
}

const getDifferenceClass = (diff: number) => {
  if (diff > 0) {
    return 'diff-positive'
  }
  if (diff < 0) {
    return 'diff-negative'
  }
  return 'diff-zero'
}

// Format date
const formatDate = (date: string) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}

// Get empty message
const getEmptyMessage = () => {
  if (searchLoading.value) {
    return 'Loading data...'
  }
  if (!startDate.value && !endDate.value) {
    return 'Please select date range to search for data'
  }
  return 'No records found matching your criteria'
}

// Prepare data for plant-wise charts
const preparePlantData = () => {
  const plantMap = new Map()
  
  reasonData.value.forEach((item: any) => {
    const plant = item.PLANT || 'Unknown'
    if (plantMap.has(plant)) {
      const existing = plantMap.get(plant)
      existing.packQty += item.PAC_QTY || 0
      existing.fgQty += item.FG_QTY || 0
      existing.diff += item.DIFF || 0
      existing.totalQty += (item.PAC_QTY || 0) + (item.FG_QTY || 0)
    } else {
      plantMap.set(plant, {
        packQty: item.PAC_QTY || 0,
        fgQty: item.FG_QTY || 0,
        diff: item.DIFF || 0,
        totalQty: (item.PAC_QTY || 0) + (item.FG_QTY || 0)
      })
    }
  })

  const plants = Array.from(plantMap.keys())
  return {
    labels: plants,
    packQty: plants.map(plant => plantMap.get(plant).packQty),
    fgQty: plants.map(plant => plantMap.get(plant).fgQty),
    diff: plants.map(plant => plantMap.get(plant).diff),
    totalQty: plants.map(plant => plantMap.get(plant).totalQty)
  }
}

// Create charts
const createCharts = () => {
  if (!reasonData.value || reasonData.value.length === 0) return

  // Prepare data for charts
  const plantData = preparePlantData()

  nextTick(() => {
    // Create Bar Chart
    if (barChart.value) {
      barChartInstance = echarts.init(barChart.value)
      const barOption = {
        title: {
          left: 'center',
          textStyle: {
            color: '#2c3e50',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Pack Quantity', 'FG Quantity', 'Difference'],
          top: 5,
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: plantData.labels,
          axisLabel: {
            color: '#666',
            fontSize: 11,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#666',
            fontSize: 11
          }
        },
        series: [
          {
            name: 'Pack Quantity',
            type: 'bar',
            data: plantData.packQty,
            itemStyle: {
              color: '#36a2eb'
            }
          },
          {
            name: 'FG Quantity',
            type: 'bar',
            data: plantData.fgQty,
            itemStyle: {
              color: '#ff6384'
            }
          },
          {
            name: 'Difference',
            type: 'bar',
            data: plantData.diff,
            itemStyle: {
              color: '#4bc0c0'
            }
          }
        ]
      }
      barChartInstance.setOption(barOption)
    }

    // Create Pie Chart
    if (pieChart.value) {
      pieChartInstance = echarts.init(pieChart.value)
      const pieOption = {
        title: {
          left: 'center',
          textStyle: {
            color: '#2c3e50',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            name: 'Reason Distribution',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
            data: pieData.value.map((item:any) => ({
              value: item.VALUE,
              name: item.NAME
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)' 
              }
            },
            label: {
              show: true,
              fontSize: 11
            }
          }
        ]
      }
      pieChartInstance.setOption(pieOption)
    }

    // Responsive charts
    window.addEventListener('resize', () => {
      if (barChartInstance) barChartInstance.resize()
      if (pieChartInstance) pieChartInstance.resize()
    })
  })
}

// Load pie chart data
const loadPieChartData = async () => {
  try {
    const params = {
      startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
      endDate: dayjs(endDate.value).format('YYYY-MM-DD')
    }
    
    const response: any = await GetReasonPieData(params)
    pieData.value = response.list || []
    console.log('Pie chart data loaded:', pieData.value)
  } catch (error: any) {
    console.error('Error loading pie chart data:', error)
  }
}

// Search data
const searchData = async () => {
  try {
    searchLoading.value = true
    errorMessage.value = ''
    
    // Validation
    if (!startDate.value) {
      message.error('Please select a start date')
      return
    }
    
    if (!endDate.value) {
      message.error('Please select an end date')
      return
    }
    
    // Validate date range
    if (startDate.value && endDate.value && new Date(startDate.value) > new Date(endDate.value)) {
      message.error('Start date cannot be after end date')
      return
    }
    
    // Call GetReasonData API
    const params = {
      startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
      endDate: dayjs(endDate.value).format('YYYY-MM-DD')
    }
    
    const response: any = await GetReasonData(params)
    reasonData.value = response.list || []
    
    // Load pie chart data
    await loadPieChartData()
    
    // Create charts after data is loaded
    createCharts()
    
    message.success('Data loaded successfully!')
  } catch (error: any) {
    console.error('Error searching data:', error)
    errorMessage.value = error.message || 'Failed to load data. Please try again.'
    message.error('Failed to load data')
  } finally {
    searchLoading.value = false
  }
}

// Reset filters
const resetFilters = () => {
  startDate.value = null
  endDate.value = null
  reasonData.value = []
  pieData.value = []
  errorMessage.value = ''
  
  // Dispose charts
  if (barChartInstance) barChartInstance.dispose()
  if (pieChartInstance) pieChartInstance.dispose()
  
  message.info('Filters reset successfully')
}

// Export to Excel
const exportToExcel = () => {
  try {
    if (reasonData.value.length === 0) {
      message.warning('No data available to export')
      return
    }

    // Prepare data for export
    const exportData = [
      // Table headers
      ['Production Reason Details'],
      ['Date', 'Line', 'Plant', 'Pack Qty', 'FG Qty', 'Difference', 'Reason'],
      // Table data
      ...reasonData.value.map((item: any) => [
        formatDate(item.DATEE),
        item.LINE || '',
        item.PLANT || '',
        item.PAC_QTY || 0,
        item.FG_QTY || 0,
        item.DIFF || 0,
        item.REASON || 'N/A'
      ])
    ]

    // Create CSV content
    const csvContent = exportData.map((row: any) => 
      row.map((cell: any) => `"${cell}"`).join(',')
    ).join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `Production_Reports_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
    
    message.success('Data exported successfully!')
  } catch (error: any) {
    console.error('Error exporting data:', error)
    message.error('Failed to export data')
  }
}

// Lifecycle
onMounted(() => {
  // Initialize with empty charts
  nextTick(() => {
    createCharts()
  })
})
</script>

<style scoped>
/* Dashboard Heading */
.heading {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 24px;
  margin: 0 0 20px 0;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Filter Box */
.filterbox {
  border-radius: 20px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  margin-bottom: 24px;
  border: none;
  overflow: hidden;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-label {
  font-weight: 500;
  color: #2c3e50;
  font-size: 12px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.filter-control {
  width: 100%;
  min-height: 36px;
  border-radius: 8px;
  border: 2px solid #e8ecf0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.filter-control:hover {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.filter-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.15);
  transform: translateY(-1px);
}

.filter-actions {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 20px;
  height: 100%;
  padding-bottom: 6px;
}

/* KPI Dashboard */
.kpi-card {
  margin: 0 0 24px 0;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  overflow: hidden;
  position: relative;
}

.kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff6b6b);
  background-size: 300% 100%;
  animation: gradient 4s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.kpi-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100px;
  position: relative;
  overflow: hidden;
  color: white;
}

.kpi-item:hover {
  transform: translateY(-6px) scale(1.03);
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.kpi-icon {
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.kpi-content {
  flex: 1;
  min-width: 0;
}

.kpi-value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 4px;
  word-break: break-all;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.kpi-label {
  font-size: 11px;
  opacity: 0.95;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Chart Cards */
.chart-card {
  border-radius: 20px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  margin-bottom: 24px;
  border: none;
  overflow: hidden;
}

.chart-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chart-icon {
  font-size: 18px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.chart-container {
  height: 400px;
  padding: 10px;
  position: relative;
  width: 100%;
}

.chart-container div {
  width: 100% !important;
  height: 380px !important;
  min-height: 380px !important;
  max-height: 380px !important;
}

/* Table Container */
.table-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: white;
  border: 1px solid #e8ecf0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.table-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom: 3px solid #667eea;
}

.table-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.table-icon {
  font-size: 18px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.table-actions {
  display: flex;
  gap: 12px;
} 

/* Enhanced Data Table */
::v-deep(.enhanced-data-table) {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e8ecf0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

::v-deep(.enhanced-data-table .p-datatable-thead > tr > th) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 12px 16px;
  border: none;
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 10;
}

::v-deep(.enhanced-data-table .p-datatable-tbody > tr:hover) {
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
  transform: scale(1.01);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

::v-deep(.enhanced-data-table .p-datatable-tbody > tr:nth-child(even)) {
  background: #fafbfc;
}

/* Cell Styling */
.date-cell, .line-cell, .plant-cell, .quantity-cell, .reason-cell {
  font-weight: 500;
  color: #2c3e50;
  padding: 6px 12px;
  border-radius: 6px;
  text-align: center;
  min-width: 70px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8ecf0;
  font-size: 12px;
}

.plant-cell {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-size: 11px;
}

.line-cell {
  background: linear-gradient(135deg, #e8f4fd 0%, #d4e4ff 100%);
}

.reason-cell {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  text-align: left;
  font-size: 11px;
}

.quantity-cell {
  font-family: 'Courier New', monospace;
  text-align: right;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 4px;
  border: 1px solid #e8ecf0;
  min-width: 70px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 11px;
}

/* Difference Cell Classes */
.diff-positive {
  background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%) !important;
  color: white !important;
  font-weight: 700 !important;
  border: 2px solid #ff4d4f !important;
  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3) !important;
}

.diff-negative {
  background: linear-gradient(135deg, #8c8c8c 0%, #bfbfbf 100%) !important;
  color: white !important;
  font-weight: 700 !important;
  border: 2px solid #8c8c8c !important;
  box-shadow: 0 4px 12px rgba(140, 140, 140, 0.3) !important;
}

.diff-zero {
  background: linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%) !important;
  color: #2c3e50 !important;
  font-weight: 600 !important;
  border: 2px solid #e8ecf0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

/* Professional Buttons */
.ant-btn {
  border-radius: 8px;
  font-weight: 500;
  height: 36px;
  padding: 0 20px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ant-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.ant-btn-primary:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
}

.ant-btn:not(.ant-btn-primary) {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  color: #667eea;
  border: 2px solid #667eea;
}

.ant-btn:not(.ant-btn-primary):hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}
.button-class {
  color: white;
} 
/* Responsive Design */
@media (max-width: 768px) {
  .heading {
    font-size: 16px;
    padding: 12px 20px;
    margin: 0 12px 20px 12px;
  }
  
  .filterbox, .kpi-card, .chart-card, .table-container {
    margin: 0 12px 20px 12px;
  }
  
  .chart-container {
    height: 300px;
  }
  
  .kpi-item {
    padding: 20px;
    min-height: 90px;
  }
  
  .kpi-icon {
    width: 56px;
    height: 56px;
    margin-right: 20px;
  }
  
  .kpi-value {
    font-size: 20px;
  }
  
  .kpi-label {
    font-size: 10px;
  }
}

@media (max-width: 576px) {
  .heading {
    font-size: 14px;
    padding: 12px 16px;
  }
  
  .filter-item {
    margin-bottom: 16px;
  }
  
  .filter-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .filter-actions .ant-btn {
    margin-bottom: 12px;
    margin-right: 0 !important;
    min-height: 52px;
  }
  
  .chart-container {
    height: 250px;
  }
  
  .kpi-item {
    padding: 16px;
    min-height: 80px;
  }
  
  .kpi-icon {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }
  
  .kpi-value {
    font-size: 18px;
  }
  
  .kpi-label {
    font-size: 9px;
  }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .filterbox {
    padding: 16px;
  }
  
  .filter-item {
    margin-bottom: 12px;
  }
  
  .filter-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-actions .ant-btn {
    width: 100%;
    min-height: 44px;
  }
} 

/* Additional responsive adjustments for very small screens */
@media (max-width: 480px) {
  .filterbox {
    padding: 12px;
  }
  
  .filter-item {
    margin-bottom: 10px;
  }
  
  .filter-actions .ant-btn {
    min-height: 48px;
    font-size: 14px;
  }
}

</style>  



