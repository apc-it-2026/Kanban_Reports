<template>
  <div style="width: 100%; height: 100%; background-color: whitesmoke; padding: 10px">
    <div style="color: red;">{{ errorMessage }}</div>
    <a-spin tip="Loading..." :loading="loading" style="width: 100%">
      <div>
        <!-- Header -->
        <div class="heading">FG Pending Dashboard</div>

        <!-- Filter Section -->
        <a-card class="filterbox">
          <a-row :gutter="[16, 16]">
            <!-- Organization Filter -->
            <a-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">Organization</label>
               <a-select 
                  v-model:value="selectedOrg" 
                  placeholder="Select Organization"
                  class="filter-control" 
                  :options="orgOptions" 
                  allow-clear
                  @change="handleOrgChange" 
                /> 
              </div>
            </a-col>

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
                  v-model ="endDate"
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
                  @click="exportToExcel" 
                  type="text"
                  size="large"
                  style="margin-right: 12px;"
                  :disabled="tableData1.length === 0 && tableData2.length === 0"
                >
                  <template #icon>
                    <FileExcelOutlined />
                  </template>
                  Export Excel
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
        <a-card class="kpi-card" v-if="tableData1.length > 0 || tableData2.length > 0 || searchLoading">
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
                  <div class="kpi-value">{{ searchLoading ? 'Loading...' : totalDifference }}</div>
                  <div class="kpi-label">Total Difference</div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>

        <!-- First Table: Date-wise Data -->
        <div class="table-container">
          <div class="table-header">
            <h3 class="table-title">
              <span class="table-icon">📅</span>
              Date-wise Production Data
            </h3>
            <div class="table-actions">
              <a-button 
                size="small" 
                type="text"
                @click="exportTableData('date-wise')"
                :disabled="tableData1.length === 0"
              >
                <template #icon><FileExcelOutlined /></template>
                Export
              </a-button>
            </div>
          </div>
          <DataTable 
            :value="tableData1" 
            paginator 
            :rows="10" 
            sortMode="multiple" 
            tableStyle="min-width: 50rem"
            dataKey="date" 
            responsiveLayout="scroll" 
            class="enhanced-data-table"
            :emptyMessage="getEmptyMessage()"
            :loading="searchLoading"                        
            :scrollable="true"
            scrollHeight="400px" 
          >
            <Column field="date" header="Date" sortable style="min-width: 10rem;">
              <template #body="slotProps">
                <div class="date-cell">
                  {{ formatDate(slotProps.data.date) }}
                </div>
              </template>
            </Column>
            <Column field="pack_qty" header="Pack Qty" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="quantity-cell">
                  {{ slotProps.data.pack_qty?.toLocaleString() || 0 }}
                </div>
              </template>
            </Column>
            <Column field="fg_qty" header="FG Qty" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="quantity-cell">
                  {{ slotProps.data.fg_qty?.toLocaleString() || 0 }}
                </div>
              </template>
            </Column>
            <Column field="diff" header="Difference" sortable style="min-width: 120px;">
              <template #body="slotProps">
                <span 
                  :class="getDifferenceClass(slotProps.data.diff)"
                  :style="{
                    backgroundColor: getDifferenceBackgroundColor(slotProps.data.diff),
                    color: getDifferenceTextColor(slotProps.data.diff),
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
                  {{ slotProps.data.diff?.toLocaleString() || 0 }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- Second Table: Plant-wise Data -->
        <div class="table-container">
          <div class="table-header">
            <h3 class="table-title">
              <span class="table-icon">🏭</span>
              Plant-wise Production Data
            </h3>
            <div class="table-actions">
              <a-button 
                size="small" 
                type="text"
                @click="exportTableData('plant-wise')"
                :disabled="tableData2.length === 0"
              >
                <template #icon><FileExcelOutlined /></template>
                Export
              </a-button>
            </div>
          </div>
          <DataTable 
            :value="tableData2" 
            paginator 
            :rows="10" 
            sortMode="multiple" 
            tableStyle="min-width: 50rem"
            dataKey="plant" 
            responsiveLayout="scroll" 
            class="enhanced-data-table"
            :emptyMessage="getEmptyMessage()"
            :loading="searchLoading"
            :scrollable="true"
            scrollHeight="400px"
          >
            <Column field="plant" header="Plant" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="plant-cell">
                  <strong>{{ slotProps.data.plant }}</strong>
                </div>
              </template>
            </Column>
            <Column field="pack_qty" header="Pack Qty" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="quantity-cell">
                  {{ slotProps.data.pack_qty?.toLocaleString() || 0 }}
                </div>
              </template>
            </Column>
            <Column field="fg_qty" header="FG Qty" sortable style="min-width: 8rem;">
              <template #body="slotProps">
                <div class="quantity-cell">
                  {{ slotProps.data.fg_qty?.toLocaleString() || 0 }}
                </div>
              </template>
            </Column>
            <Column field="diff" header="Difference" sortable style="min-width: 120px;">
              <template #body="slotProps">
                <span 
                  :class="getDifferenceClass(slotProps.data.diff)"
                  :style="{
                    backgroundColor: getDifferenceBackgroundColor(slotProps.data.diff),
                    color: getDifferenceTextColor(slotProps.data.diff),
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
                  {{ slotProps.data.diff?.toLocaleString() || 0 }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { SearchOutlined, ReloadOutlined, FileExcelOutlined } from '@ant-design/icons-vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import dayjs from 'dayjs'
import { getOrganizations, FGTrackingData } from '@/api/fgPacReasonApi'

// Reactive data                       
// Loading states 
const loading = ref(false)
const searchLoading = ref(false)
// Error message
const errorMessage = ref('')
// Selected organization
const selectedOrg = ref('5001')
// Date range
const startDate : any = ref(null)
const endDate : any = ref(null)

// Table data
const tableData1 : any = ref([])
const tableData2 : any = ref([])

// Organization data from API
const organizations = ref([])

// Computed organization options for select 
const orgOptions = computed(() => 
  organizations.value.map((org: any) => ({
    label: org.ORG_NAME , 
    value: org.ORG_CODE 
  }))
) ; 

// KPI Computed Properties
const totalPackQty : any = computed(() => {
  if (searchLoading.value) return 0
  const table1Total : any = 
  tableData1.value.reduce((sum: any, item: any) : any => sum + (item.pack_qty || 0), 0)  
  return table1Total  
}); 

const totalFGQty = computed(() => {
  if (searchLoading.value) return 0
  const table1Total = 
  tableData1.value.reduce((sum: any, item: any) => sum + (item.fg_qty || 0), 0) 
  return table1Total  
}); 

const totalDifference = computed(() => {
  if (searchLoading.value) return 0
  const table1Total = 
  tableData1.value.reduce((sum: any, item: any) => sum + (item.diff || 0), 0) 
  return table1Total  
});    

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
} ; 

const formatDate = (date: string) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
} ; 

const getEmptyMessage = () => {
  if (searchLoading.value) {
    return 'Loading data...'
  }
  if (
    !selectedOrg.value && 
    !startDate.value && 
    !endDate.value
  ) {
    return 'Please apply filters to search for data'
  }
  return 'No records found matching your criteria'
} ; 

const setLoading = (state: boolean) => {
  loading.value = state
} ; 

const loadOrganizations = async () => {
  try {
    setLoading(true)
    const data: any = await getOrganizations() 
    organizations.value = data.list || []
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to load organizations'
    console.error('Error loading organizations:', error)
  } finally {
    setLoading(false)
  }
}

// Handle organization change
const handleOrgChange = (value: any) => {
  selectedOrg.value = value
}

// Search data
const searchData = async () => {
  try {
    searchLoading.value = true
    errorMessage.value = ''
    
    // Validation
    if (!selectedOrg.value) {
      message.error('Please select an organization')
      return
    }
    
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
    
    // Call FGTrackingData API
    const params = {
      orgId: selectedOrg.value,
      startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
      endDate: dayjs(endDate.value).format('YYYY-MM-DD'),
      lineId: '', // Not used in FGPending
      plantId: ''  // Not used in FGPending
    }
    
    const response: any = await FGTrackingData(params)
    const apiData = response.list || []
    
    // Process data for Table 1 (Date-wise aggregation)
    const dateWiseMap = new Map()
    apiData.forEach((item: any) => {
      const date = item.DATEE || item.date || 'Unknown'
      const packQty = parseFloat(item.PACK_QTY || item.pack_qty || 0)
      const fgQty = parseFloat(item.FG_QTY || item.fg_qty || 0)
      const diff = parseFloat(item.DIFF || item.diff || 0)
      
      if (dateWiseMap.has(date)) {
        const existing = dateWiseMap.get(date)
        existing.pack_qty += packQty
        existing.fg_qty += fgQty
        existing.diff += diff
      } else {
        dateWiseMap.set(date, {
          date,
          pack_qty: packQty,
          fg_qty: fgQty,
           diff
        })
      }
    })
    
    tableData1.value = Array.from(dateWiseMap.values())
    
    // Process data for Table 2 (Plant-wise aggregation)
    const plantWiseMap = new Map()
    apiData.forEach((item: any) => {
      const line = item.LINE || item.line || ''
      // Extract plant code from line name (e.g., AP11L01 -> AP11, AP1L01 -> AP1)
      const plant = line.includes('L') ? line.split('L')[0] : line || 'Unknown Plant'
      const packQty = parseFloat(item.PACK_QTY || item.pack_qty || 0)
      const fgQty = parseFloat(item.FG_QTY || item.fg_qty || 0)
      const diff = parseFloat(item.DIFF || item.diff || 0)
      
      if (plantWiseMap.has(plant)) {
        const existing = plantWiseMap.get(plant)
        existing.pack_qty += packQty
        existing.fg_qty += fgQty
        existing.diff += diff
      } else {
        plantWiseMap.set(plant, {
          plant,
          pack_qty: packQty,
          fg_qty: fgQty,
          diff
        })
      }
    })
    
    tableData2.value = Array.from(plantWiseMap.values())
    
    message.success('Data loaded successfully!')
  } catch (error: any) {
    console.error('Error searching data:', error)
    errorMessage.value = error.message || 'Failed to load data. Please try again.'
    message.error('Failed to load data')
  } finally {
    searchLoading.value = false
  }
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

// Export individual table data
const exportTableData = (tableType: 'date-wise' | 'plant-wise') => {
  try {
    const data = tableType === 'date-wise' ? tableData1.value : tableData2.value
    if (data.length === 0) {
      message.warning(`No ${tableType} data available to export`)
      return
    }

    // Prepare data for export
    const exportData = [
      // Table headers
      [`${tableType === 'date-wise' ? 'Date-wise' : 'Plant-wise'} Production Data`],
      tableType === 'date-wise' 
        ? ['Date', 'Pack Qty', 'FG Qty', 'Difference']
        : ['Plant', 'Pack Qty', 'FG Qty', 'Difference'],
      // Table data
      ...data.map((item: any) => [ 
        tableType === 'date-wise' 
          ? formatDate(item.date)
          : item.plant,
        item.pack_qty?.toLocaleString() || 0,
        item.fg_qty?.toLocaleString() || 0,
        item.diff?.toLocaleString() || 0
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
    link.setAttribute('download', `FG_Pending_${tableType}_Data_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
    
    message.success(`${tableType === 'date-wise' ? 'Date-wise' : 'Plant-wise'} data exported successfully!`)
  } catch (error: any) {
    console.error(`Error exporting ${tableType} data:`, error)
    message.error(`Failed to export ${tableType} data`)
  }
}

// Reset filters
const resetFilters = () => {
  selectedOrg.value = organizations.value.length > 0 ? (organizations.value[0] as any).ORG_CODE || '5001' : '5001' 
  startDate.value = null
  endDate.value = null
  tableData1.value = []
  tableData2.value = []
  errorMessage.value = '' 
  message.info('Filters reset successfully')
}

// Export to Excel
const exportToExcel = () => {
  try {
    if (tableData1.value.length === 0 && tableData2.value.length === 0) {
      message.warning('No data available to export')
      return
    }

    // Prepare data for export
    const exportData = [
      // Table 1 headers
      ['Date-wise Production Data'],
      ['Date', 'Pack Qty', 'FG Qty', 'Difference'],
      // Table 1 data
      ...tableData1.value.map((item: any) => [
        formatDate(item.date),
        item.pack_qty,
        item.fg_qty,
        item.diff
      ]),
      // Empty row
      [],
      // Table 2 headers
      ['Plant-wise Production Data'],
      ['Plant', 'Pack Qty', 'FG Qty', 'Difference'],
      // Table 2 data
      ...tableData2.value.map((item: any) => [
        item.plant,
        item.pack_qty,
        item.fg_qty,
        item.diff
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
    link.setAttribute('download', `FG_Pending_Data_${new Date().toISOString().split('T')[0]}.csv`)
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
  loadOrganizations()
})
</script>

<style scoped>
/* Professional Enterprise Design */

/* Main Container */
.heading {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  padding: 20px 32px;
  border: none;
  border-radius: 16px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 12px 40px rgba(30, 60, 114, 0.4);
  margin: 0 16px 24px 16px;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  overflow: hidden;
}

.heading::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  animation: shimmer 4s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Filter Section */
.filterbox {
  margin: 0 16px 24px 16px;
  border-radius: 20px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
}

.filterbox::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1e3c72, #2a5298, #1e3c72);
  background-size: 200% 100%;
  animation: gradient 4s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.filterbox .ant-card-body {
  padding: 32px;
  background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%);
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
  color: #34495e;
}

.filter-control {
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  border: 2px solid #e8ecf0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.filter-control:hover {
  border-color: #1e3c72;
  box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.1);
  transform: translateY(-1px);
}

.filter-control:focus {
  border-color: #1e3c72;
  box-shadow: 0 0 0 6px rgba(30, 60, 114, 0.15);
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

/* Professional Buttons */
.ant-btn {
  border-radius: 12px;
  font-weight: 600;
  height: 44px;
  padding: 0 28px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ant-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ant-btn:hover::before {
  width: 400px;
  height: 400px;
}

.ant-btn-primary {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  box-shadow: 0 8px 24px rgba(30, 60, 114, 0.4);
}

.ant-btn-primary:hover {
  background: linear-gradient(135deg, #172b4d 0%, #224072 100%);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(30, 60, 114, 0.5);
}

.ant-btn:not(.ant-btn-primary):not(.ant-btn-danger) {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  color: #1e3c72;
  border: 2px solid #1e3c72;
}

.ant-btn:not(.ant-btn-primary):not(.ant-btn-danger):hover {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(30, 60, 114, 0.4);
}

/* KPI Dashboard Professional */
.kpi-card {
  margin: 0 16px 24px 16px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(30, 60, 114, 0.3);
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
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

.kpi-item {
  display: flex;
  align-items: center;
  padding: 24px;
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
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 8px;
  word-break: break-all;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.kpi-label {
  font-size: 13px;
  opacity: 0.95;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Table Container Professional */
.table-container {
  margin: 0 16px 24px 16px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
}

/* Enhanced Data Table */
::v-deep(.custom-data-table) {
  border-radius: 20px;
  overflow: hidden;
  margin-top: 5px;
}

::v-deep(.custom-data-table .p-datatable-header) {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border: none;
  padding: 20px 24px;
}

::v-deep(.custom-data-table thead th) {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 20px 16px;
  border: none;
  position: relative;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

::v-deep(.custom-data-table thead th::after) {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
  background-size: 200% 100%;
  animation: gradient 4s ease infinite;
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 20px 16px;
  border-bottom: 1px solid #f5f7fa;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

::v-deep(.p-datatable .p-datatable-tbody > tr:hover > td) {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  transform: scale(1.01);
  box-shadow: 0 4px 16px rgba(30, 60, 114, 0.1);
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td:hover) {
  background: rgba(30, 60, 114, 0.05);
}

/* Enhanced Ant Design Components */
::v-deep(.ant-card) {
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}

::v-deep(.ant-select-selector) {
  border-radius: 12px;
  border: 2px solid #e8ecf0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px;
  background: white;
}

::v-deep(.ant-select-selector:hover) {
  border-color: #1e3c72;
  box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.1);
  transform: translateY(-1px);
}

::v-deep(.ant-select-focused .ant-select-selector) {
  border-color: #1e3c72;
  box-shadow: 0 0 0 6px rgba(30, 60, 114, 0.15);
  transform: translateY(-1px);
}

::v-deep(.ant-picker) {
  border-radius: 12px;
  width: 100%;
  border: 2px solid #e8ecf0;
  min-height: 44px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

::v-deep(.ant-picker:hover) {
  border-color: #1e3c72;
  box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.1);
  transform: translateY(-1px);
}

::v-deep(.ant-picker-focused) {
  border-color: #1e3c72;
  box-shadow: 0 0 0 6px rgba(30, 60, 114, 0.15);
  transform: translateY(-1px);
}

/* Responsive Design Professional */
@media (max-width: 768px) {
  .heading {
    font-size: 22px;
    padding: 16px 24px;
    margin: 0 12px 20px 12px;
    letter-spacing: 2px;
  }
  
  .filterbox, .kpi-card, .table-container {
    margin: 0 12px 20px 12px;
  }
  
  .filter-actions {
    justify-content: center;
    margin-top: 20px;
    gap: 16px;
  }
  
  .filter-actions .ant-btn {
    flex: 1;
    max-width: 150px;
    min-height: 48px;
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
  
  .kpi-icon span {
    font-size: 18px !important;
  }
  
  .kpi-value {
    font-size: 18px;
  }
  
  .kpi-label {
    font-size: 12px;
  }
}

@media (max-width: 576px) {
  .heading {
    font-size: 20px;
    padding: 14px 20px;
    letter-spacing: 1px;
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
  
  .kpi-item {
    padding: 16px;
    min-height: 80px;
  }
  
  .kpi-icon {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }
  
  .kpi-icon span {
    font-size: 22px !important;
  }
  
  .kpi-value {
    font-size: 24px;
  }
  
  .kpi-label {
    font-size: 11px;
  }
}
</style>