<template>
  <div style="width: 100%; height: 100%; background-color: whitesmoke; padding: 10px">
    <div style="color: red;">{{ errorMessage }}</div>
    <a-spin tip="Loading..." :loading="loading" style="width: 100%">
      <div>
        <!-- Heading -->
        <div class="heading">
          FG PAC Reason List
        </div>

        <!-- Filters -->
        <a-card class="filterbox">
          <a-row :gutter="[16, 16]">
            <!-- Organization Filter -->
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <span class="filter-label">Organization:</span>
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
            
            <!-- Plant Filter -->
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <span class="filter-label">Plant:</span>
                <a-select 
                  v-model:value="selectedPlant" 
                  placeholder="Select Plant"
                  class="filter-control" 
                  :options="plantOptions" 
                  allow-clear
                  @change="handlePlantChange" 
                />
              </div>
            </a-col>
            
            <!-- Line Filter -->
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <span class="filter-label">Line:</span>
                <a-select 
                  v-model:value="selectedLine" 
                  placeholder="Select Line"
                  class="filter-control" 
                  :options="lineOptions" 
                  allow-clear
                  @change="handleLineChange" 
                />
              </div>
            </a-col>
          </a-row>
          
          <!-- Date Filters Row -->
          <a-row :gutter="[16, 16]" style="margin-top: 16px;">
            <!-- Start Date Filter -->
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <span class="filter-label">Start Date:</span>
                <a-date-picker 
                  v-model="startDate" 
                  placeholder="Select Start Date"
                  class="filter-control"
                  format="YYYY/MM/DD"
                  style="width: 100%;"
                 
                />
              </div>
            </a-col>
            
            <!-- End Date Filter -->
            <a-col :span="6" :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <span class="filter-label">End Date:</span>
                <a-date-picker 
                  v-model="endDate" 
                  placeholder="Select End Date"
                  class="filter-control"
                  format="YYYY/MM/DD"
                  style="width: 100%;"
                  
                />
              </div>
            </a-col>
            
            <!-- Action Buttons -->
            <a-col :span="12" :xs="24" :sm="24" :md="12">
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
                  :disabled="dataList.length === 0"
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
        <a-card class="kpi-card" v-if="dataList.length > 0">
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="8" :md="4">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">📦</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ totalPackQty }}</div> 
                  <div class="kpi-label">Pack Qty</div>
                </div>
              </div>
            </a-col>
            <a-col :xs="12" :sm="8" :md="4">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">🏭</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ totalFGQty }}</div>
                  <div class="kpi-label">FG Qty</div>
                </div>
              </div>
            </a-col> 
            <a-col :xs="12" :sm="8" :md="4">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">📈</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ totalDifference }}</div>
                  <div class="kpi-label">Difference</div>
                </div>
              </div>
            </a-col>
             <a-col :xs="12" :sm="8" :md="4">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">📊</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ dataList.length }}</div>
                  <div class="kpi-label">Records</div>
                </div>
              </div>
            </a-col>
            <a-col :xs="12" :sm="8" :md="4">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">✅</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ savedRecordsCount }}</div>
                  <div class="kpi-label">Saved Rec</div>
                </div>
              </div>
            </a-col>
             <a-col :xs="12" :sm="8" :md="4">
              <div class="kpi-item">
                <div class="kpi-icon">
                  <span style="font-size: 24px;">⏳</span>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ pendingRecordsCount }}</div>
                  <div class="kpi-label">Pending Rec </div>
                </div> 
              </div>
            </a-col>
            
          </a-row> 
        </a-card>

        <!-- Data Table -->
        <div class="table-container">
          <DataTable 
            :value="dataListWithKeys" 
            paginator 
            :rows="10" 
            sortMode="multiple" 
            tableStyle="min-width: 50rem"
            dataKey="org_id_line_datee" 
            responsiveLayout="scroll" 
            class="custom-data-table" 
            :loading="searchLoading"
            :globalFilterFields="['line', 'datee']"
            v-model:filters="filters"
            :emptyMessage="getEmptyMessage()"
          >
            <Column field="DATEE" header="Date" sortable style="min-width: 10rem;">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.DATEE) }}
              </template>
            </Column>
            <Column field="LINE" header="Line" sortable style="min-width: 8rem;" />
            <Column field="PACK_QTY" header="Pack Qty" sortable style="min-width: 8rem;" />
            <Column field="FG_QTY" header="FG Qty" sortable style="min-width: 8rem;"/>
            <Column field="DIFF" header="Difference" style="min-width: 120px">
              <template #body="slotProps">
                <span 
                  :style="{
                    backgroundColor: getDifferenceBackgroundColor(slotProps.data.DIFF),
                    color: getDifferenceTextColor(slotProps.data.DIFF),
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }"
                >
                  {{ slotProps.data.DIFF }}
                </span>
              </template>
            </Column>
            <Column field="REMARKS" header="Remarks" style="min-width: 10rem;">
              <template #body="slotProps">
                <div v-if="slotProps.data.hasApiRemarks" style="padding: 4px 8px; color: #666; background-color: #f5f5f5; border-radius: 4px; min-height: 24px; display: flex; align-items: center;">
                  {{ getRemarkLabel(slotProps.data.REMARKS) }}
                </div>
                <a-select 
                  v-else
                  v-model:value="slotProps.data.REMARKS" 
                  placeholder="Select Remark"
                  style="width: 100%;"
                  size="small"
                  :options="remarkOptions"
                  @change="handleRemarkChange(slotProps.data, $event)"
                />
              </template>
            </Column>
            <Column header="Actions" style="min-width: 12rem;">
              <template #body="slotProps">
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                  <a-button 
                    type="text" 
                    size="small"
                    @click="viewDetails(slotProps.data)"
                    title="View"
                  >
                    <template #icon><EyeOutlined /></template>
                  </a-button>
                  <a-button 
                    type="text" 
                    size="small"
                    @click="saveItem(slotProps.data)"
                    title="Save"
                    :style="slotProps.data.hasApiRemarks ? 'color: #d9d9d9;' : 'color: #52c41a;'"
                    :disabled="slotProps.data.hasApiRemarks"
                  >
                    <template #icon><SaveOutlined /></template>
                  </a-button>
                  <!-- Debug: {{ slotProps.data.hasApiRemarks }} -->
                  <a-button 
                    type="text" 
                    size="small"
                    @click="updateItem(slotProps.data)"
                    title="Update"
                    style="color: #1890ff;"
                    :disabled="!slotProps.data.hasApiRemarks"
                  >
                    <template #icon><EditOutlined /></template>
                  </a-button>
                </div>
              </template>
            </Column>
            <template #empty>
              <div class="empty-state">
                <div class="empty-icon">📋</div>
                <div class="empty-title">No Data Available</div>
                <div class="empty-description">
                  {{ getEmptyMessage() }}
                </div>
              </div>
            </template>
          </DataTable>
        </div> 
      </div>
    </a-spin>
    
    <!-- Update Confirmation Modal -->
    <a-modal
      v-model:visible="showUpdateConfirm"
      title="Confirm Update"
      @ok="confirmUpdate"
      @cancel="cancelUpdate"
      ok-text="Update"
      cancel-text="Cancel"
      :ok-button-props="{ type: 'primary' }"
      width="500px"
    >
      <div style="padding: 20px 0;">
        <p>Are you sure you want to update this record?</p>
        <div v-if="selectedItem" style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; margin-top: 10px;">
          <p><strong>Date:</strong> {{ formatDate(selectedItem.DATEE) }}</p>
          <p><strong>Line:</strong> {{ selectedItem.LINE }}</p>
          <p><strong>Pack Qty:</strong> {{ selectedItem.PACK_QTY }}</p>
          <p><strong>FG Qty:</strong> {{ selectedItem.FG_QTY }}</p>
          <p><strong>Difference:</strong> {{ selectedItem.DIFF }}</p>
          <p v-if="selectedItem.REMARKS"><strong>Current Remarks:</strong> {{ getRemarkLabel(selectedItem.REMARKS) }}</p>
        </div>
        <div style="margin-top: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;"><strong>New Remarks:</strong></label>
          <a-select 
            v-model="newRemarkValue" 
            placeholder="Select New Remark"
            style="width: 100%;"
            :options="remarkOptions"
          />
        </div>
      </div>
    </a-modal>
    
    <!-- View Details Modal -->
    <a-modal
      v-model:visible="showDetails"
      title="View Details"
      :footer="false"
      width="500px" 
    >
      <div v-if="selectedItem" style="padding: 20px 0;">
        <a-descriptions :column="1" bordered>
          <a-descriptions-item label="Date">
            {{ formatDate(selectedItem.DATEE) }} 
          </a-descriptions-item>
          <a-descriptions-item label="Line">
            {{ selectedItem.LINE }}
          </a-descriptions-item>
          <a-descriptions-item label="Pack Qty">
            {{ selectedItem.PACK_QTY }}
          </a-descriptions-item>
          <a-descriptions-item label="FG Qty">
            {{ selectedItem.FG_QTY }}
          </a-descriptions-item>
          <a-descriptions-item label="Difference">
            {{ selectedItem.DIFF }}
          </a-descriptions-item>
          <a-descriptions-item label="Remarks">
            {{ selectedItem.REMARKS ? getRemarkLabel(selectedItem.REMARKS) : 'No remarks' }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { SearchOutlined, ReloadOutlined, EyeOutlined, SaveOutlined, EditOutlined, FileExcelOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import useLoading from '@/hooks/loading'
import { getOrganizations, LoadPlant, LoadLines, FGTrackingData, InsertReasonData, UpdateReasonData } from '@/api/fgPacReasonApi'
 
// Interfaces
interface Organization {
  ORG_CODE: string
  ORG_NAME: string
}

interface Plant {
  CODE: string
  NAME: string
}

interface Line {
  DEPARTMENT_CODE: string
  DEPARTMENT_NAME: string
}

interface FGTrackingItem {
  LINE: string
  DATEE: string
  PACK_QTY: number
  FG_QTY: number
  DIFF: number
  REMARKS?: string
  hasApiRemarks?: boolean
} 

// Reactive variables
const errorMessage = ref('')
const { loading, setLoading } = useLoading(false)
const searchLoading = ref(false)

// Date filters
const startDate = ref<string>('')
const endDate = ref<string>('')

const organizations = ref<Organization[]>([])
const selectedOrg = ref<string>('5001')
const plants = ref<Plant[]>([])
const selectedPlant = ref<string>('')
const lines = ref<Line[]>([])
const selectedLine = ref<string>('')
const dataList = ref<FGTrackingItem[]>([])
const selectedItem = ref<FGTrackingItem | null>(null)
const showDetails = ref(false)
const showUpdateConfirm = ref(false)
const newRemarkValue = ref<string>('')

// PrimeVue filters
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  line: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  datee: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

// Computed properties
const orgOptions = computed(() => {   
  return organizations.value.map((org: any) => {
    return {
      label: org.ORG_NAME,
      value: org.ORG_CODE
    }
  })
})

const plantOptions = computed(() => 
  plants.value.map((plant) => ({                
    label: plant.NAME,
    value: plant.CODE
  })) 
)

const lineOptions = computed(() => 
  lines.value.map((line) => ({                
    label: line.DEPARTMENT_NAME,
    value: line.DEPARTMENT_CODE
  })) 
)  

// Add computed property for data with composite keys
const dataListWithKeys = computed(() => 
  dataList.value.map(item => ({
    ...item,
    REMARKS: item.REMARKS || '', // Add REMARKS field
    hasApiRemarks: item.hasApiRemarks !== undefined ? item.hasApiRemarks : !!(item.REMARKS && item.REMARKS.trim() !== '') // Preserve existing flag or calculate initial value
  }))
)

// KPI Computed Properties
const savedRecordsCount = computed(() => 
  dataList.value.filter(item => item.hasApiRemarks).length
)

const pendingRecordsCount = computed(() => 
  dataList.value.filter(item => !item.hasApiRemarks).length
)

const totalDifference = computed(() => 
  dataList.value.reduce((sum, item) => sum + (item.DIFF || 0), 0)
)

const totalPackQty = computed(() => 
  dataList.value.reduce((sum, item) => sum + (item.PACK_QTY || 0), 0)
)

const totalFGQty = computed(() => 
  dataList.value.reduce((sum, item) => sum + (item.FG_QTY || 0), 0)
)

const uniqueLinesCount = computed(() => 
  new Set(dataList.value.map(item => item.LINE)).size
)

const recordsWithRemarks = computed(() => 
  dataList.value.filter(item => item.REMARKS && item.REMARKS.trim() !== '').length
)

// Static remark options
const remarkOptions = [
  { label: 'Lack of Packing Lables', value: 'LACK_OF_PACKING_LABLES' },
  { label: 'Without Inner Boxes', value: 'WITHOUT_INNER_BOXES' },
  { label: 'Without Outer Cartons', value: 'WITHOUT_OUTER_CARTONS' },
  { label: 'Without Wrapping paper', value: 'WITHOUT_WRAPPING_PAPER' },
  { label: 'Mixture Packing', value: 'MIXTURE_PACKING' },
  { label: 'Special Packing', value: 'SPECIAL_PACKING' },
  { label: 'With out sockliners', value: 'WITH_OUT_SOCKLINERS' },
  { label: 'With out lace', value: 'WITH_OUT_LACE' },
  { label: 'Customer hold', value: 'CUSTOMER_HOLD' },
  { label: 'Dummy Price Issue', value: 'DUMMY_PRICE_ISSUE' },
  { label: 'Pack Plan not Added', value: 'PACK_PLAN_NOT_ADDED' },
  { label: 'PO Cancel', value: 'PO_CANCEL' },
  { label: 'Shot Shipment Balance Pairs', value: 'SHOT_SHIPMENT_BALANCE_PAIRS' },
  { label: 'Combined Mixtures', value: 'COMBINED_MIXTURES' }
]  
 
// Methods
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

const loadPlants = async () => {
  try {
    setLoading(true)
    if (selectedOrg.value) {
      const response = await LoadPlant(selectedOrg.value)
      plants.value = response.list || []
    } else {
      plants.value = []
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to load plants'
    console.error('Error loading plants:', error)
    plants.value = []
  } finally {
    setLoading(false)
  }
}

const loadLines = async () => {
  try {
    if (selectedOrg.value && selectedPlant.value) {
      const response = await LoadLines(selectedOrg.value, selectedPlant.value, '')
      lines.value = response.list || []
    } else {
      lines.value = []
    }
  } catch (error: any) {
    console.error('Error loading lines:', error)
    lines.value = []
  }
}

const getEmptyMessage = () => {
  if (searchLoading.value) {
    return 'Loading data...'
  }
  if (!selectedOrg.value && !selectedPlant.value && !selectedLine.value && !startDate.value && !endDate.value) {
    return 'Please apply filters to search for data'
  }
  return 'No records found matching your criteria'
}

const formatDate = (dateValue: any) => {
  if (!dateValue) return ''
  
  try {
    // Handle different date formats
    let date: Date
    
    if (typeof dateValue === 'string') {
      // If it's already in YYYYMMDD format, return as is
      if (/^\d{8}$/.test(dateValue)) {
        return dateValue
      }
      // If it's already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return dateValue
      }
      // Parse ISO date string or other formats
      date = new Date(dateValue)
    } else if (dateValue instanceof Date) {
      date = dateValue
    } else {
      return dateValue
    }
    
    // Check if date is valid
    if (Number.isNaN(date.getTime())) {
      return dateValue
    }
    
    // Format to YYYYMMDD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return `${year}/${month}/${day}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateValue
  }
} 

const resetFilters = () => {
  selectedOrg.value = '5001'
  selectedPlant.value = ''
  selectedLine.value = ''
  startDate.value = ''
  endDate.value = ''
  dataList.value = []
  errorMessage.value = ''
  
  // Reload plants for default organization
  loadPlants()
}

// const handleStartDateChange = (date: any, dateString: string) => {
//   console.log('Start date changed:', date, 'Date string:', dateString)
//   startDate.value = dateString
// }

// const handleEndDateChange = (date: any, dateString: string) => {
//   console.log('End date changed:', date, 'Date string:', dateString)
//   endDate.value = dateString
// }

const handleOrgChange = (value: string | number | Record<string, any> | (string | number | Record<string, any>)[]) => {
  debugger ; 
  selectedOrg.value = String(value)
  console.log('selectedOrg set to:', selectedOrg.value)
  // Reset plant and line selection and reload plants for new organization
  selectedPlant.value = ''
  selectedLine.value = ''
  if (selectedOrg.value) {
    loadPlants()
  }
}

const handlePlantChange = (value: string | number | Record<string, any> | (string | number | Record<string, any>)[]) => {
  console.log('Plant change triggered with value:', value, 'type:', typeof value)
  selectedPlant.value = String(value)
  console.log('selectedPlant set to:', selectedPlant.value)
  
  // Reset line selection and reload lines for new plant
  selectedLine.value = ''
  if (selectedPlant.value) {
    loadLines()
  }
}

const handleLineChange = (value: string | number | Record<string, any> | (string | number | Record<string, any>)[]) => {
  console.log('Line change triggered with value:', value, 'type:', typeof value)
  selectedLine.value = String(value)
  console.log('selectedLine set to:', selectedLine.value)
}

const searchData = async () => {
  try {
    debugger; 
    searchLoading.value = true
    errorMessage.value = ''
    
    // Validation: Organization is required
    if (!selectedOrg.value) {
      message.error('Please select an organization')
      return
    } 
    
    // Validation: Plant is required
    if (!selectedPlant.value) {
      message.error('Please select a plant')
      return
    }
    
    // Validation: Start date is required
    if (!startDate.value) {
      message.error('Please select a start date')
      return
    }
    
    // Validation: End date is required
    if (!endDate.value) {
      message.error('Please select an end date')
      return
    }
    
    // Validate date range
    if (startDate.value && endDate.value && new Date(startDate.value) > new Date(endDate.value)) {
      message.error('Start date cannot be after end date')
      return
    }
    
    // Build query parameters
    const params: any = {
      orgId: selectedOrg.value,
      plantId: selectedPlant.value,
      lineId: selectedLine.value
    }
    
    if (startDate.value) {
      params.startDate = startDate.value
    }
    
    if (endDate.value) {
      params.endDate = endDate.value
    }
    
    console.log('Search parameters:', params)
    
    // TODO: Replace with actual API call
    // const response = await fetch('/api/production/packing-fg-diff?' + new URLSearchParams(params))
    // const data = await response.json()
    
    // Simulate API call
   // await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Call the actual API
    const response = await FGTrackingData(params) 
    const processedData = (response.list || []).map((item: any) => ({
      ...item,
      hasApiRemarks: !!(item.REMARKS && item.REMARKS.trim() !== '')
    }))
    dataList.value = processedData
    console.log('Data loaded:', dataList.value)
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to load data'
    console.error('Error searching data:', error)
  } finally {
    searchLoading.value = false
  }
}

const viewDetails = (item: FGTrackingItem) => {
  selectedItem.value = item
  showDetails.value = true
}

const editItem = (item: FGTrackingItem) => {
  console.log('Edit item:', item)
  // Implement edit functionality
}

const handleRemarkChange = (item: any, value: any) => {
  const stringValue = String(value)
  console.log('Remark changed for item:', item, 'to:', stringValue)
  console.log('Before update - hasApiRemarks:', item.hasApiRemarks)
  
  // Update the item's remark in the data
  const index = dataList.value.findIndex(dataItem => 
    dataItem.LINE === item.LINE && 
    dataItem.DATEE === item.DATEE
  )
  
  console.log('Found index:', index)
  
  if (index !== -1) {
    console.log('Before update - dataList[index].hasApiRemarks:', dataList.value[index].hasApiRemarks)
    dataList.value[index].REMARKS = stringValue
    // Set hasApiRemarks to false since user selected a new value
    dataList.value[index].hasApiRemarks = false
    console.log('After update - dataList[index].hasApiRemarks:', dataList.value[index].hasApiRemarks)
    console.log('After update - dataList[index]:', dataList.value[index])
  }
  
  // TODO: Call API to save remark changes
  // await saveRemarkChange(item.org_id, item.line, item.datee, stringValue)
}

const saveItem = async (item: FGTrackingItem) => {
  try {
    debugger; 
    console.log('Save item:', item)
    
    // Validation: Check if remarks are present
    if (!item.REMARKS || item.REMARKS.trim() === '') {
      message.error('Please select a remark before saving!')
      return
    }
    
    // Prepare data for API
    const saveData = {
      line: item.LINE,
      datee: item.DATEE,
      pack_qty: item.PACK_QTY,
      fg_qty: item.FG_QTY,
      diff: item.DIFF,
      REMARKS: item.REMARKS
    }
    
    // Call InsertReasonData API
    const response = await InsertReasonData(saveData)
    console.log('Save response:', response)   
    
    // Show success message
    errorMessage.value = ''
    message.success('Data inserted successfully!')
    
    // After successful save, disable remarks cell and save button
    const index = dataList.value.findIndex(dataItem => 
      dataItem.LINE === item.LINE && 
      dataItem.DATEE === item.DATEE
    )
    
    if (index !== -1) {
      dataList.value[index].hasApiRemarks = true
      console.log('After save - hasApiRemarks set to true for item:', dataList.value[index])
    }
    
  } catch (error: any) {
    console.error('Error saving item:', error)
    errorMessage.value = error.message || 'Failed to save item'
    
    // Show error message box
    message.error(error.message || 'Failed to save item')
  }
}

const updateItem = (item: FGTrackingItem) => {
  console.log('Update item:', item)
  selectedItem.value = item
  newRemarkValue.value = item.REMARKS || ''
  showUpdateConfirm.value = true
}

const confirmUpdate = async () => {
  debugger 
  if (!selectedItem.value) return
  
  try {
    console.log('Updating item:', selectedItem.value)
    
    // Validation: Check if new remark is selected
    if (!newRemarkValue.value || newRemarkValue.value.trim() === '') {
      message.error('Please select a new remark before updating!')
      return
    }
    
    // Prepare data for API with backend field names
    const updateData = {
      LINE: selectedItem.value.LINE,
      DATEE: selectedItem.value.DATEE,
      PAC_QTY: selectedItem.value.PACK_QTY,  // Backend expects PAC_QTY
      FG_QTY: selectedItem.value.FG_QTY,    // Backend expects FG_QTY
      REASON: newRemarkValue.value          // Backend expects REASON (not REMARKS)
    }
    
    console.log('Update API call with data:', updateData) 
    
    // Call UpdateReasonData API
    const response = await UpdateReasonData(updateData)
    console.log('Update response:', response)
    
    // Update item in local data
    const index = dataList.value.findIndex(dataItem => 
      dataItem.LINE === selectedItem.value!.LINE && 
      dataItem.DATEE === selectedItem.value!.DATEE
    )
    
    if (index !== -1) {
      dataList.value[index].REMARKS = newRemarkValue.value
      dataList.value[index].hasApiRemarks = true
      
      console.log('Item updated successfully:', dataList.value[index])
      message.success('Record updated successfully!')
    }
  } catch (error: any) {
    console.error('Error updating item:', error)
    message.error(error.message || 'Failed to update record')
  } finally {
    showUpdateConfirm.value = false
    selectedItem.value = null
    newRemarkValue.value = ''
  }
}

const cancelUpdate = () => {
  showUpdateConfirm.value = false
  selectedItem.value = null
  newRemarkValue.value = ''
}

const getRemarkLabel = (value: string) => {
  const remark = remarkOptions.find(option => option.value === value)
  return remark ? remark.label : value
}

// Helper functions for difference cell styling
const getDifferenceBackgroundColor = (diff: number) => {
  if (diff > 0) {
    return '#ff4d4f' // Red background for positive difference
  }  if (diff < 0) {
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

const exportToExcel = () => { 
  try {
    if (dataList.value.length === 0) {
      message.warning('No data available to export')
      return
    }

    // Prepare data for export with professional formatting
    const exportData = dataList.value.map(item => ({
      'Date': formatDate(item.DATEE),
      'Production Line': item.LINE,
      'Packaging Quantity': item.PACK_QTY,
      'Finished Goods Quantity': item.FG_QTY,
      'Difference': item.DIFF,
      'Remarks': item.REMARKS ? getRemarkLabel(item.REMARKS) : 'No remarks',
      'Status': item.hasApiRemarks ? 'Saved' : 'Pending'
    }))

    // Create professional CSV content with BOM for Excel compatibility
    const BOM = '\uFEFF' // Byte Order Mark for Excel UTF-8 support
    const headers = Object.keys(exportData[0])
    
    // Add metadata header
    const metadata = [
      `FG PAC Reason List Report`,
      `Generated on: ${new Date().toLocaleString()}`,
      `Total Records: ${dataList.value.length}`,
      `Organization: ${selectedOrg.value}`,
      `Plant: ${selectedPlant.value}`,
      `Date Range: ${startDate.value} to ${endDate.value}`,
      '',
      headers.join(',')
    ]
    
    // Format data rows with proper CSV escaping
    const dataRows : any = exportData.map(row => 
      headers.map((header:any) => { 
        const value : any = row[header as keyof typeof row] || ''
        // Properly escape CSV values and handle special characters
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(',')
    )

    // Combine all content
    const csvContent = BOM + [
      ...metadata,
      ...dataRows
    ].join('\n')

    // Create blob with Excel-compatible MIME type
    const blob = new Blob([csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    })
    
    // Generate professional filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
    const filename = `FG_PAC_Reason_List_${timestamp}.csv`
    
    // Create download link
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up URL object
    URL.revokeObjectURL(url)
    
    message.success(`Successfully exported ${dataList.value.length} records to Excel!`)
  } catch (error: any) {
    console.error('Error exporting data:', error)
    message.error('Failed to export data. Please try again.')
  }
} 

// Lifecycle
onMounted(() => {
  loadOrganizations()
  loadPlants()
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

.kpi-item::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.15), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.kpi-item:hover::before {
  animation: shine 0.8s ease;
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
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
  position: relative;
}

.kpi-icon::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.7;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.kpi-content {
  flex: 1;
  min-width: 0;
}

.kpi-value {
  font-size: 32px;
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

.table-container::before {
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

/* Enhanced Data Table */
::v-deep(.custom-data-table) {
  border-radius: 20px;
  overflow: hidden;
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

/* Enhanced Modals */
::v-deep(.p-dialog .p-dialog-header) {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border: none;
  border-radius: 20px 20px 0 0;
}

::v-deep(.p-dialog .p-dialog-content) {
  border-radius: 0 0 20px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: none;
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

/* Enhanced Action Buttons */
::v-deep(.ant-btn-text) {
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

::v-deep(.ant-btn-text:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Empty State Professional */
.empty-state {
  text-align: center;
  padding: 80px 32px;
  color: #666;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 20px;
  margin: 24px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 72px;
  margin-bottom: 24px;
  opacity: 0.6;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

.empty-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.empty-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  max-width: 450px;
  margin: 0 auto;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Form Styles Professional */
.form-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
    font-size: 24px !important;
  }
  
  .kpi-value {
    font-size: 28px;
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

/* Enhanced Select Dropdown */
::v-deep(.ant-select-dropdown) {
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

::v-deep(.ant-select-item-option-active) {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  color: #1e3c72;
}

::v-deep(.ant-select-item-option-selected) {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
}

/* Enhanced Date Picker */
::v-deep(.ant-picker-dropdown) {
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Enhanced Modal */
::v-deep(.ant-modal) {
  border-radius: 20px;
  overflow: hidden;
}

::v-deep(.ant-modal-header) {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
}

::v-deep(.ant-modal-title) {
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

::v-deep(.ant-modal-close) {
  color: white;
  font-size: 20px;
}

::v-deep(.ant-modal-close:hover) {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
}

/* Enhanced Pagination */
::v-deep(.p-paginator) {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 16px;
}

::v-deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  border-radius: 8px;
  margin: 0 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

::v-deep(.p-paginator .p-paginator-pages .p-paginator-page:hover) {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  transform: translateY(-2px);
}

/* Loading States */
.ant-spin-container {
  position: relative;
}

.ant-spin-blur {
  opacity: 0.6;
  filter: blur(2px);
}

/* Success/Error States */
.success-animation {
  animation: successPulse 0.8s ease;
}

@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.error-animation {
  animation: errorShake 0.8s ease;
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

/* Detail Rows Enhanced */
.detail-row {
  margin-bottom: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.detail-row:hover {
  background: rgba(30, 60, 114, 0.05);
  padding-left: 12px;
}

.detail-row:last-child {
  border-bottom: none;
}
</style>