<template>
  <div class="planning-schedule-container">
    <!-- Header -->
    <div class="header">
      <h1>Planning Manual Schedule Upload</h1>
    </div>

    <!-- Main Content with Tabs -->
    <a-tabs v-model:activeKey="activeTab" class="planning-tabs">
      <!-- Planning Schedule Tab -->
      <a-tab-pane key="planning" title="Planning Schedule">
        <!-- Filter Section -->
        <div class="filter-section">
          <a-row :gutter="16">
            <a-col :span="6">
              <div class="form-group">
                <label>Factory:</label>
                <a-select
                  v-model="selectedFactory"
                  class="dropdown"
                  :disabled="loading"
                  placeholder="Select Factory"
                  @change="onFactoryChange"
                >
                  <a-option value="">Select Factory</a-option>
                  <a-option
                    v-for="factory in factoryList"
                    :key="factory.value"
                    :value="factory.value"
                  >
                    {{ factory.label }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Plant:</label>
                <a-select
                  v-model="selectedPlant"
                  class="dropdown"
                  :disabled="loading || !selectedFactory"
                  placeholder="Select Plant"
                  @change="onPlantChange"
                >
                  <a-option value="">Select Plant</a-option>
                  <a-option
                    v-for="plant in plantList"
                    :key="plant.value"
                    :value="plant.value"
                  >
                    {{ plant.label }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Process:</label>
                <a-select
                  v-model="selectedProcess"
                  class="dropdown"
                  :disabled="loading"
                  placeholder="Select Process"
                  @change="onProcessChange"
                >
                  <a-option value="">Select Process</a-option>
                  <a-option value="C">C</a-option>
                  <a-option value="S">S</a-option>
                  <a-option value="L">L</a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Lines:</label>
                <a-select
                  v-model="selectedLines"
                  class="dropdown"
                  :disabled="loading || !selectedProcess"
                  multiple
                  placeholder="Select Lines"
                >
                  <a-option
                    v-for="line in lineList"
                    :key="line.value"
                    :value="line.value"
                  >
                    {{ line.label }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
          </a-row>

          <a-row :gutter="16" style="margin-top: 16px">
            <a-col :span="6">
              <div class="form-group">
                <label>Start Date:</label>
                <a-date-picker
                  v-model="startDate"
                  class="dropdown"
                  format="YYYY-MM-DD"
                />
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>End Date:</label>
                <a-date-picker
                  v-model="endDate"
                  class="dropdown"
                  format="YYYY-MM-DD"
                />
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Sales Order IDs:</label>
                <a-textarea
                  v-model="salesOrderIds"
                  class="dropdown"
                  placeholder="Enter Sales Order IDs (comma separated)"
                  :rows="3"
                />
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Assembly Status:</label>
                <a-checkbox v-model="assemblyStatus">
                  Include Assembly Status
                </a-checkbox>
              </div>
            </a-col>
          </a-row>

          <!-- Action Buttons -->
          <a-row :gutter="16" style="margin-top: 20px">
            <a-col :span="3">
              <a-button
                type="primary"
                :loading="searching"
                class="action-button search-button"
                @click="searchData"
              >
                <template #icon>
                  <icon-search />
                </template>
                Search
              </a-button>
            </a-col>
            <a-col :span="3">
              <a-button
                type="primary"
                :loading="saving"
                class="action-button save-button"
                @click="saveData"
              >
                <template #icon>
                  <icon-save />
                </template>
                Save/Update
              </a-button>
            </a-col>
            <a-col :span="3">
              <a-button
                type="primary"
                :loading="deleting"
                class="action-button delete-button"
                @click="deleteData"
              >
                <template #icon>
                  <icon-delete />
                </template>
                Delete
              </a-button>
            </a-col>
            <a-col :span="3">
              <a-button
                type="outline"
                class="action-button check-so-button"
                @click="checkSalesOrders"
              >
                <template #icon>
                  <icon-check-circle />
                </template>
                {{ getCheckSOButtonText() }}
              </a-button>
            </a-col>
            <a-col :span="3">
              <a-button
                type="secondary"
                class="action-button export-button"
                @click="exportToExcel"
              >
                <template #icon>
                  <icon-download />
                </template>
                Export
              </a-button>
            </a-col>
            <a-col :span="3">
              <a-button
                type="secondary"
                class="action-button clear-button"
                @click="clearFilters"
              >
                <template #icon>
                  <icon-refresh />
                </template>
                Clear Filters
              </a-button>
            </a-col>
            <a-col :span="3">
              <a-button
                type="outline"
                class="action-button target-button"
                @click="checkTargets"
              >
                <template #icon>
                  <icon-check-circle />
                </template>
                Check Targets
              </a-button>
            </a-col>
            <a-col :span="3">
              <a-button
                type="outline"
                class="action-button reschedule-button"
                @click="navigateToReschedule"
              >
                <template #icon>
                  <icon-calendar />
                </template>
                Reschedule
              </a-button>
            </a-col>
          </a-row>
        </div>

        <!-- Data Grid -->
        <div class="data-grid-section">
          <a-card class="data-card">
            <template #title>
              <div class="grid-header">
                <span>Planning Data</span>
                <span v-if="planningData.length > 0" class="record-count">
                  ({{ planningData.length }} records)
                </span>
              </div>
            </template>

            <a-table
              :data="planningData"
              :columns="tableColumns"
              :pagination="{ pageSize: 20, showTotal: true }"
              :scroll="{ x: 2000, y: 400 }"
              :loading="searching"
              row-key="UNIQUE_ID"
              :row-selection="rowSelection"
              class="planning-table"
              @row-click="onRowClick"
              @cell-click="onCellClick"
            >
              <template #cell="{ column, record }">
                <template
                  v-if="
                    column.dataIndex === 'CRDVAL' ||
                    column.dataIndex === 'LPDVAL' ||
                    column.dataIndex === 'PSDDVAL'
                  "
                >
                  {{ formatDate(record[column.dataIndex]) }}
                </template>
                <template v-else-if="column.dataIndex === 'QTYVAL'">
                  {{ formatNumber(record[column.dataIndex]) }}
                </template>
                <template v-else-if="column.dataIndex === 'UPDSTATVAL'">
                  <a-tag
                    :color="getStatusColor(record[column.dataIndex])"
                    class="status-tag"
                  >
                    {{ getStatusText(record[column.dataIndex]) }}
                  </a-tag>
                </template>
              </template>
            </a-table>
          </a-card>
        </div>
      </a-tab-pane>

      <!-- Target Management Tab -->
      <a-tab-pane key="targets" title="Target Management">
        <div class="target-section">
          <a-row :gutter="16">
            <a-col :span="8">
              <div class="form-group">
                <label>Select Lines:</label>
                <a-select
                  v-model="targetLines"
                  class="dropdown"
                  multiple
                  placeholder="Select Lines for Targets"
                >
                  <a-option
                    v-for="line in lineList"
                    :key="line.value"
                    :value="line.value"
                  >
                    {{ line.label }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="form-group">
                <label> Start Week:</label>
                <a-date-picker
                  v-model="targetWeek"
                  class="dropdown"
                  format="YYYY-MM-DD"
                />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="form-group">
                <label>End Week:</label>
                <a-date-picker
                  v-model="targetEndWeek"
                  class="dropdown"
                  format="YYYY-MM-DD"
                />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="form-group">
                <label>Actions:</label>
                <div class="target-actions">
                  <a-button
                    type="primary"
                    :loading="loadingTarget"
                    class="target-button"
                    @click="getDayWiseTarget"
                  >
                    Get Day Wise Target
                  </a-button>
                  <a-button
                    :type="editMode ? 'primary' : 'secondary'"
                    class="target-button"
                    @click="toggleEditMode"
                  >
                    {{ editMode ? 'Exit Edit Mode' : 'Enable Edit Mode' }}
                  </a-button>
                  <a-button
                    type="primary"
                    :loading="savingTarget"
                    class="target-button"
                    @click="saveTargetData"
                  >
                    Save Targets
                  </a-button>
                </div>
              </div>
            </a-col>
          </a-row>

          <!-- Target Data Grid -->
          <div class="target-grid-section">
            <a-card class="data-card">
              <template #title>
                <div class="grid-header">
                  <span>Target Data</span>
                  <span v-if="targetData.length > 0" class="record-count">
                    ({{ targetData.length }} records)
                  </span>
                </div>
              </template>

              <div v-if="loadingTarget" class="loading-container">
                <a-spin :size="40" />
              </div>
              <div v-else class="custom-table-container">
                <table class="custom-target-table">
                  <thead>
                    <tr>
                      <th class="fixed-column">Line</th>
                      <th v-for="column in dateColumns" :key="column.date" class="date-column">
                        {{ column.displayDate }}<br>{{ column.dayOfWeek }}
                      </th>
                      <th class="fixed-column total-column">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in targetData" :key="row.LINE">
                      <td class="fixed-column">{{ row.LINE }}</td>
                      <td v-for="(column, colIndex) in dateColumns" :key="column.date" class="editable-cell">
                        <a-input-number
                          v-if="editMode"
                          v-model="row[column.date]"
                          size="small"
                          :precision="0"
                          style="width: 100%"
                          @keydown="handleCellKeyNavigation($event, targetData.indexOf(row), colIndex)"
                          @focus="handleInputFocus($event, targetData.indexOf(row), colIndex)"
                          tabindex="0"
                        />
                        <span v-else>{{ row[column.date] || 0 }}</span>
                      </td>
                      <td class="fixed-column total-column">{{ row.TOTAL || 0 }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </a-card>
          </div>
        </div>
      </a-tab-pane>

      <!-- Reschedule Tab -->
      <a-tab-pane key="reschedule" title="Reschedule">
        <div class="reschedule-section">
          <a-row :gutter="16">
            <a-col :span="6">
              <div class="form-group">
                <label>Factory:</label>
                <a-select
                  v-model="rescheduleFactory"
                  class="dropdown"
                  placeholder="Select Factory"
                >
                  <a-option
                    v-for="factory in factoryList"
                    :key="factory.value"
                    :value="factory.value"
                  >
                    {{ factory.label }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Plant:</label>
                <a-select
                  v-model="reschedulePlant"
                  class="dropdown"
                  placeholder="Select Plant"
                >
                  <a-option
                    v-for="plant in plantList"
                    :key="plant.value"
                    :value="plant.value"
                  >
                    {{ plant.label }}
                  </a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Process:</label>
                <a-select
                  v-model="rescheduleProcess"
                  class="dropdown"
                  placeholder="Select Process"
                >
                  <a-option value="C">Cutting</a-option>
                  <a-option value="S">Stitching</a-option>
                  <a-option value="L">Assembly</a-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="form-group">
                <label>Week:</label>
                <a-date-picker
                  v-model="rescheduleWeek"
                  class="dropdown"
                  picker="week"
                  format="YYYY-ww"
                />
              </div>
            </a-col>
          </a-row>

          <a-row :gutter="16" style="margin-top: 16px">
            <a-col :span="12">
              <a-button
                type="primary"
                :loading="loadingReschedule"
                class="action-button"
                @click="getReschedulePO"
              >
                Get Reschedule PO
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button
                type="primary"
                :loading="processingReschedule"
                class="action-button"
                @click="processReschedule"
              >
                Process Reschedule
              </a-button>
            </a-col>
          </a-row>

          <!-- Reschedule Data Grid -->
          <div class="reschedule-grid-section">
            <a-card class="data-card">
              <template #title>
                <div class="grid-header">
                  <span>Reschedule Data</span>
                  <span v-if="rescheduleData.length > 0" class="record-count">
                    ({{ rescheduleData.length }} records)
                  </span>
                </div>
              </template>

              <a-table
                :data="rescheduleData"
                :columns="rescheduleColumns"
                :pagination="{ pageSize: 20, showTotal: true }"
                :scroll="{ x: 1800, y: 300 }"
                :loading="loadingReschedule"
                row-key="id"
                :row-selection="rescheduleRowSelection"
                class="reschedule-table"
              />
            </a-card>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- Loading and Error States -->
    <div v-if="loading" class="loading-overlay">
      <a-spin :size="40" />
      <p>Loading data...</p>
    </div>

    <div v-if="error" class="error-message">
      <a-alert type="error" :message="error" closable @close="error = ''" />
    </div>
  </div>

  <!-- Target Checking Modal -->
  <a-modal
    v-model:visible="showTargetModal"
    title="Check Target"
    :width="800"
    @ok="fetchTargetData"
    @cancel="closeTargetModal"
  >
    <div class="target-modal-content">
      <div class="form-group">
        <label>Enter Line:</label>
        <a-input
          v-model="targetLineInput"
          placeholder="Please enter line number"
          style="width: 100%; margin-bottom: 16px"
        />
      </div>

      <div v-if="targetDataForModal.length > 0" class="target-results">
        <h4>Target Data for Line: {{ targetLineInput }}</h4>
        <a-table
          :data="targetDataForModal"
          :columns="[
            { title: 'Day', dataIndex: 'day', width: 100 },
            { title: 'Target', dataIndex: 'target', width: 120 },
            { title: 'Actual', dataIndex: 'actual', width: 120 },
            { title: 'Variance', dataIndex: 'variance', width: 120 },
          ]"
          :pagination="false"
          size="small"
        />
      </div>

      <div v-else-if="targetLineInput" class="no-data">
        <a-empty description="No target data found for this line" />
      </div>
    </div>
  </a-modal>

  <!-- SO Validation Modal -->
  <a-modal
    v-model:visible="showSOModal"
    title="Sales Order Validation"
    :width="800"
    @ok="validateSOs"
    @cancel="closeSOModal"
  >
    <div class="so-modal-content">
      <div v-if="missingSOs.length > 0" class="missing-so-section">
        <h4>Missing Sales Orders</h4>
        <a-textarea
          :model-value="missingSOs.join('\n')"
          readonly
          :rows="10"
          style="width: 100%; margin-bottom: 16px; font-family: monospace"
        />
      </div>

      <div v-if="existingSOs.length > 0" class="existing-so-section">
        <h4>Valid Sales Orders ({{ existingSOs.length }})</h4>
        <a-textarea
          :model-value="existingSOs.join('\n')"
          readonly
          :rows="10"
          style="width: 100%; margin-bottom: 16px; font-family: monospace"
        />
      </div>

      <div v-if="soValidationData.length > 0" class="validation-details">
        <h4>Validation Results</h4>
        <a-table
          :data="soValidationData"
          :columns="[
            { title: 'Sales Order', dataIndex: 'sales_order', width: 150 },
            { title: 'Status', dataIndex: 'status', width: 100 },
            { title: 'Message', dataIndex: 'message', width: 200 },
          ]"
          :pagination="false"
          size="small"
        />
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, h } from 'vue';
import {
  GetFactoryList,
  GetPlantList,
  GetLineList,
  SearchPlanningData,
  SaveOrUpdatePlanningData,
  DeletePlanningData,
  GetLineDayWiseTarget,
  GetStaticLineDayWiseTarget,
  SaveTargetData,
  GetReschedulePO,
  RescheduleMethod,
  GetSizeWiseReschedule,
  VerifySOOKNot,
  VerifyScheduleOKNot,
  GetValuesBySO,
  GetTargetHolidays,
  PolicyListRes
} from '@/api/CuttingManagement/PlanSchedule';
import {
  IconSearch,
  IconSave,
  IconDelete,
  IconDownload,
  IconRefresh,
  IconCheckCircle,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';

// Reactive data
const activeTab = ref('planning');
const loading = ref(false);
const searching = ref(false);
const saving = ref(false);
const deleting = ref(false);
const loadingTarget = ref(false);
const savingTarget = ref(false);
const editMode = ref(false);
const currentFocusedCell = ref({ row: 0, col: 0 });
const holidays = ref<string[]>([]);
const error = ref('');

// Check SO button state management
const buttonValue = ref('CheckSOValidOrNot'); // CheckSOValidOrNot, CheckSchedule, Upload

// Form data
const selectedFactory = ref('');
const selectedPlant = ref('');
const selectedProcess = ref('');
const selectedLines = ref<string[]>([]);
const startDate = ref('');
const endDate = ref('');
const salesOrderIds = ref('');
const assemblyStatus = ref(false);

// Dropdown options
const factoryList = ref<any[]>([]);
const plantList = ref<any[]>([]);
const lineList = ref<any[]>([]);

// Table data
const planningData = ref<any[]>([]);
const selectedRowKeys = ref<string[]>([]);

// Target management
const targetLines = ref<string[]>([]);
const targetWeek = ref('');
const targetEndWeek = ref('');
const targetData = ref<any[]>([]);

// Reschedule
const rescheduleFactory = ref('');
const reschedulePlant = ref('');
const rescheduleProcess = ref('');
const rescheduleWeek = ref('');
const rescheduleData = ref<any[]>([]);
const loadingReschedule = ref(false);
const processingReschedule = ref(false);
const selectedRescheduleKeys = ref<string[]>([]);

// Table columns
const tableColumns = [
  { title: 'Factory', dataIndex: 'ORG', width: 100 },
  { title: 'Plant', dataIndex: 'PLANT', width: 100 },
  { title: 'Line', dataIndex: 'LINE', width: 100 },
  { title: 'Week', dataIndex: 'WEEK', width: 100 },
  { title: 'Sales Order', dataIndex: 'SALES_ORDER', width: 120 },
  { title: 'Company', dataIndex: 'CONO', width: 100 },
  { title: 'Article', dataIndex: 'ART_NO', width: 120 },
  { title: 'Shoe Name', dataIndex: 'SHOE_NAME', width: 150 },
  { title: 'CRD', dataIndex: 'CRD', width: 120 },
  { title: 'LPD', dataIndex: 'LPD', width: 120 },
  { title: 'PSDD', dataIndex: 'PSDD', width: 120 },
  { title: 'Last No', dataIndex: 'LAST_NO', width: 100 },
  { title: 'Mold No', dataIndex: 'MOLD_NO', width: 100 },
  { title: 'Quantity', dataIndex: 'QTY', width: 100 },
  { title: 'Class Code', dataIndex: 'CLASS_CODE', width: 120 },
  { title: 'Destination', dataIndex: 'DESTINATION', width: 120 },
  { title: 'Remarks 1', dataIndex: 'REMARKS1', width: 150 },
  { title: 'Remarks 2', dataIndex: 'REMARKS2', width: 150 },
  { title: 'Status', dataIndex: 'STATUS', width: 100 },
];

// Recalculate total for a row
const recalculateRowTotal = (row: any) => {
  let total = 0;
  
  // Sum all date columns (exclude LINE and TOTAL)
  Object.keys(row).forEach(key => {
    if (key !== 'LINE' && key !== 'TOTAL') {
      total += parseFloat(row[key]) || 0;
    }
  });
  
  row.TOTAL = total;
};

// Handle cell editing for input components
const handleCellEdit = (record: any, dataIndex: string, value: number | string) => {
  // Prevent editing for non-editable columns
  if (dataIndex === 'LINE' || dataIndex === 'TOTAL') {
    return;
  }

  // Update the value in the data
  const rowIndex = targetData.value.findIndex(row => row.LINE === record.LINE);
  if (rowIndex !== -1) {
    // Convert to number for target values
    const numericValue = parseFloat(String(value)) || 0;
    targetData.value[rowIndex][dataIndex] = numericValue;
    
    // Recalculate TOTAL for this row
    recalculateRowTotal(targetData.value[rowIndex]);
  }
};

// Generate date columns for custom table
const dateColumns = computed(() => {
  const columns = [];
  
  if (targetWeek.value && targetEndWeek.value) {
    const start = new Date(targetWeek.value);
    const end = new Date(targetEndWeek.value);

    // Generate date range columns (excluding Sundays for now)
    const currentDate = new Date(start);
    // Create end date that includes the full day
    const endDatee = new Date(end);
    endDatee.setHours(23, 59, 59, 999); // End of the selected end date
    
    while (currentDate <= endDatee) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const isSunday = currentDate.getDay() === 0;
      const isHoliday = holidays.value.includes(dateStr);
      
      if (!isSunday && !isHoliday) { // Exclude Sundays and holidays
        const displayDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }); // MM/DD
        const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
        
        columns.push({
          date: dateStr,
          displayDate,
          dayOfWeek
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  return columns;
});

const rescheduleColumns = [
  { title: 'Sales Order', dataIndex: 'se_id', width: 120 },
  { title: 'Article', dataIndex: 'article', width: 120 },
  { title: 'Line', dataIndex: 'line', width: 100 },
  { title: 'Week', dataIndex: 'week', width: 100 },
  { title: 'Original Date', dataIndex: 'original_date', width: 120 },
  { title: 'New Date', dataIndex: 'new_date', width: 120 },
  { title: 'Quantity', dataIndex: 'quantity', width: 100 },
  { title: 'Reason', dataIndex: 'reason', width: 150 },
];

// Row selection
const rowSelection: any = computed(() => ({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
  selectedRowKeys: selectedRowKeys.value,
  onSelect: (rowKeys: string[], rowKey: string, record: any) => {
    selectedRowKeys.value = rowKeys;
  },
  onSelectAll: (checked: boolean) => {
    selectedRowKeys.value = checked
      ? planningData.value.map((item) => item.UNIQUE_ID || '')
      : [];
  },
}));

const rescheduleRowSelection: any = computed(() => ({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
  selectedRowKeys: selectedRescheduleKeys.value,
  onSelect: (rowKeys: string[], rowKey: string, record: any) => {
    selectedRescheduleKeys.value = rowKeys;
  },
  onSelectAll: (checked: boolean) => {
    selectedRescheduleKeys.value = checked
      ? rescheduleData.value.map((item) => item.id)
      : [];
  },
}));

// Methods
const loadFactories = async () => {
  loading.value = true;
  error.value = '';

  try {
    const result: PolicyListRes = await GetFactoryList();
    factoryList.value = result.list.map((factory: any) => ({
      value: factory.ORG_CODE,
      label: factory.ORG_NAME,
    }));
  } catch (err: any) {
    error.value = 'Failed to load factories';
    console.error('Error loading factories:', err);
  } finally {
    loading.value = false;
  }
};

const loadPlants = async () => {
  if (!selectedFactory.value) return;

  try {
    const result: PolicyListRes = await GetPlantList(selectedFactory.value);
    plantList.value = result.list.map((plant: any) => ({
      value: plant.CODE,
      label: plant.NAME,
    }));
  } catch (err: any) {
    error.value = 'Failed to load plants';
    console.error('Error loading plants:', err);
  }
};

const onFactoryChange = async () => {
  selectedPlant.value = '';
  selectedLines.value = [];
  plantList.value = [];
  lineList.value = [];

  if (selectedFactory.value) {
    await loadPlants();
  }
};
const loadLines = async () => {
  if (!selectedFactory.value || !selectedPlant.value || !selectedProcess.value)
    return;


  try {
    const result: PolicyListRes = await GetLineList(
      selectedFactory.value,
      selectedPlant.value,
      selectedProcess.value
    );

    if (result.list && result.list.length > 0) {
      lineList.value = result.list.map((line: any) => ({
        value: line.DEPARTMENT_CODE,
        label: line.DEPARTMENT_NAME,
      }));
    } else {
      lineList.value = [];
    }
  } catch (err: any) {
    error.value = 'Failed to load lines';
    console.error('Error loading lines:', err);
  }
};

const onPlantChange = async () => {
  selectedLines.value = [];
  lineList.value = [];

  if (selectedFactory.value && selectedPlant.value && selectedProcess.value) {
    await loadLines();
  }
};

const onProcessChange = async () => {
  selectedLines.value = [];
  lineList.value = [];

  if (selectedFactory.value && selectedPlant.value && selectedProcess.value) {
    await loadLines();
  } else {
    ///   
  }
};

const searchData = async () => {
  if (!selectedPlant.value || !selectedProcess.value) {
    Message.error('Please select Plant and Process first');
    return;
  }

  searching.value = true;
  error.value = '';

  try {
    const searchParams = {
      startdate: startDate.value,
      enddate: endDate.value,
      seid: salesOrderIds.value,
      orgid: selectedFactory.value,
      plant: selectedPlant.value,
      process: selectedProcess.value,
      line: selectedLines.value.join(','),
      orderbyvalue: 'CRD',
    };

    const result: PolicyListRes = await SearchPlanningData(searchParams);
    planningData.value = result.list.map((item: any) => ({
      ...item,
      UNIQUE_ID: item.UNIQUE_ID || Math.random().toString(36).substr(2, 9),
    }));

    Message.success(`Found ${planningData.value.length} records`);
  } catch (err: any) {
    error.value = 'Failed to search data';
    console.error('Error searching data:', err);
  } finally {
    searching.value = false;
  }
};

const saveData = async () => {
  if (selectedRowKeys.value.length === 0) {
    Message.warning('Please select records to save');
    return;
  }

  saving.value = true;

  try {
    const selectedData = planningData.value.filter((item) =>
      selectedRowKeys.value.includes(item.UNIQUE_ID || '')
    );

    const saveParams = {
      planning: selectedData,
      ipaddress: '127.0.0.1',
      Process: selectedProcess.value,
      assemblystatus: assemblyStatus.value,
    };

    await SaveOrUpdatePlanningData(saveParams);
    Message.success('Data saved successfully');
    await searchData();
  } catch (err: any) {
    error.value = 'Failed to save data';
    console.error('Error saving data:', err);
  } finally {
    saving.value = false;
  }
};

const deleteData = async () => {
  if (selectedRowKeys.value.length === 0) {
    Message.warning('Please select records to delete');
    return;
  }

  deleting.value = true;

  try {
    const selectedData = planningData.value.filter((item) =>
      selectedRowKeys.value.includes(item.UNIQUE_ID || '')
    );

    const deleteParams = {
      planning: selectedData,
      ipaddress: '127.0.0.1',
      Process: selectedProcess.value,
    };

    await DeletePlanningData(deleteParams);
    Message.success('Data deleted successfully');
    await searchData();
  } catch (err: any) {
    error.value = 'Failed to delete data';
    console.error('Error deleting data:', err);
  } finally {
    deleting.value = false;
  }
};

const exportToExcel = () => {
  // Implementation for Excel export
  Message.info('Excel export functionality to be implemented');
};

const clearFilters = () => {
  selectedFactory.value = '';
  selectedPlant.value = '';
  selectedProcess.value = '';
  selectedLines.value = [];
  startDate.value = '';
  endDate.value = '';
  salesOrderIds.value = '';
  assemblyStatus.value = false;
  planningData.value = [];
  selectedRowKeys.value = [];
};

// Modal state for target checking
const showTargetModal = ref(false);
const targetLineInput = ref('');
const targetDataForModal = ref<any[]>([]);

const checkTargets = () => {
  showTargetModal.value = true;
  targetLineInput.value = '';
  targetDataForModal.value = [];
};

const fetchTargetData = async () => {
  if (!targetLineInput.value.trim()) {
    Message.warning('Please enter a line number');
    return;
  }

  try {
    const result: PolicyListRes = await GetLineDayWiseTarget(
      targetLineInput.value.trim()
    );

    if (result.list && result.list.length > 0) {
      targetDataForModal.value = result.list;
      Message.success(`Target data loaded for line ${targetLineInput.value}`);
    } else {
      targetDataForModal.value = [];
      Message.warning('No target data found for this line');
    }
  } catch (err: any) {
    Message.error('Failed to load target data');
    console.error('Error loading target data:', err);
  }
};

const closeTargetModal = () => {
  showTargetModal.value = false;
  targetLineInput.value = '';
  targetDataForModal.value = [];
};

// Check SO functionality
const showSOModal = ref(false);
const soValidationData = ref<any[]>([]);
const missingSOs = ref<string[]>([]);
const existingSOs = ref<string[]>([]);

const validateSOs = async (soList: string[]) => {
  try {
    const params = {
      SOList: soList,
      org: selectedFactory.value,
    };

    const result: PolicyListRes = await VerifySOOKNot(params);

    if (result.list && result.list.length > 0) {
      const missingList = result.list
        .filter((item: any) => item.status === 'missing')
        .map((item: any) => item.sales_order);

      if (missingList.length > 0) {
        missingSOs.value = missingList;
        existingSOs.value = soList.filter((so) => !missingList.includes(so));

        const msg = `The following Sales Orders are Not Exist:\n${missingList.join(
          '\n'
        )}`;
        Message.warning(msg);

        // Update SO textarea to show only existing SOs
        salesOrderIds.value = existingSOs.value.join('\n');
      } else {
        Message.success('All sales orders exist. ✅');
      }
    } else {
      Message.error('Error validating sales orders');
    }
  } catch (err: any) {
    Message.error('Failed to validate sales orders');
    console.error('Error validating SOs:', err);
  }
};

const closeSOModal = () => {
  showSOModal.value = false;
  missingSOs.value = [];
  existingSOs.value = [];
  soValidationData.value = [];
};

const navigateToReschedule = () => {
  activeTab.value = 'reschedule';
};

// Helper function to get button text based on current state
const getCheckSOButtonText = () => {
  switch (buttonValue.value) {
    case 'CheckSOValidOrNot':
      return 'Check SO';
    case 'CheckSchedule':
      return 'Check';
    case 'Upload':
      return 'Upload';
    default:
      return 'Check SO';
  }
};

// Helper function to parse SO list from textarea
const getSOList = (): string[] => {
  return salesOrderIds.value
    .split(/[\n,;,]/)
    .map((so) => so.trim())
    .filter((so) => so.length > 0);
};


// Helper function to get total target from Target Management grid
const getTotalTarget = (): number => {
  if (!targetData.value || targetData.value.length === 0) {
    return 0;
  }
  
  // Sum the TOTAL column values from all rows in the target grid
  const totalTarget = targetData.value.reduce((sum, row) => {
    const rowTotal = parseFloat(row.TOTAL) || 0;
    return sum + rowTotal;
  }, 0);
  
  
  return totalTarget;
};

// Check SO Valid Or Not function
const checkSOValidOrNot = async () => {
  debugger ; 
  const soList = getSOList();
  if (soList.length === 0) {
    Message.error('Please enter at least one Sales Order!');
    return;
  }

  try {
    const params = {
      SOList: soList,
      org: selectedFactory.value,
    };

    const result: PolicyListRes = await VerifySOOKNot(params);
    
    // Handle different response scenarios
    if (!result.list || result.list.length === 0) {
      // Case 1: Empty list - all sales orders exist
      Message.success('All sales orders exist.');
      buttonValue.value = 'CheckSchedule';
    } else {
      // Case 2: List has items - check for missing sales orders
      const missingSOList = result.list
        .filter((item: any) => item.status === 'missing')
        .map((item: any) => item.sales_order);


      if (missingSOList.length > 0) {
        // Some sales orders are missing
        const msg = `The following Sales Orders do not exist:\n\n${missingSOList.join('\n')}`;
        Message.warning(msg);

        // Update SO textarea to show only existing SOs
        const remainingSOs = soList.filter((so) => !missingSOList.includes(so));
        salesOrderIds.value = remainingSOs.join('\n');
        
        // Don't proceed to next stage if there are missing SOs
      } else {
        // All sales orders exist (list might contain existing SOs with different status)
        Message.success('All sales orders exist.');
        buttonValue.value = 'CheckSchedule';
      }
    }
  } catch (err: any) {
    Message.error(err.message);
  }
}; 

// Check Schedule function
const checkSchedule = async () => {
  const soList = getSOList();
  if (soList.length === 0) {
    Message.error('Please enter at least one Sales Order!');
    return;
  }

  try {
    const params = {
      SOList: soList,
      process: selectedProcess.value,
    };

    const result: PolicyListRes = await VerifyScheduleOKNot(params);

    if (result.list && result.list.length > 0) {
      const scheduledSOList = result.list
        .filter((item: any) => item.status === 'scheduled')
        .map((item: any) => item.sales_order);

      if (scheduledSOList.length > 0) {
        const msg = `The following Sales Orders are already Scheduled:\n\n${scheduledSOList.join(
          '\n'
        )}`;
        Message.warning(msg);

        // Update SO textarea to show only non-scheduled SOs
        const remainingSOs = soList.filter(
          (so) => !scheduledSOList.includes(so)
        );
        salesOrderIds.value = remainingSOs.join('\n');
      } else {
        Message.success('All sales orders need to be scheduled.  ');
        buttonValue.value = 'Upload';
      }
    } else {
      Message.error('Error from server');
    }
  } catch (err: any) {
    Message.error(err.message);
  }
};

// Get Sales Order Details function
const getSalesOrderDetails = async () => { 
  debugger ; 
  const inputText = salesOrderIds.value.trim();
  if (!inputText) {
    Message.error('Please enter at least one SO!');
    return;
  }

  try {
    const soList = inputText
      .split(/[\n,;,]/)
      .map((so) => so.trim())
      .filter((so) => so.length > 0)
      .filter((so, index, arr) => arr.indexOf(so) === index); // Remove duplicates

    if (soList.length === 0) {
      Message.error('No valid SOs found!');
      return;
    }

    const salesorders = soList.map((so) => [so]);
    const params = {
      seid: '', // Will be populated from SO data or left empty if not needed
      article: '', // Will be populated from SO data or left empty if not needed
      org: selectedFactory.value,
      salesorders,
    };

    const result: PolicyListRes = await GetValuesBySO(params); 
    console.log(result) ; 
    if (result.list && result.list.length > 0) {
      // Add the new data to planningData
      const totalTarget = getTotalTarget();

      result.list.forEach((row: any) => {
        if (!row.QTYVAL || Number.isNaN(Number(row.QTYVAL))) return;

        const orderQty = Number(row.QTYVAL);
        let remainingQty = orderQty;
        let weekCount = 0;
        const weekStart = new Date(startDate.value);
        const weekEnd = new Date(endDate.value);

        while (remainingQty > 0) {
          weekCount += 1;
          const allocatedQty =
            remainingQty > totalTarget ? totalTarget : remainingQty;

          // Create single row with combined lines and week range
          const newRow = {
            ORG: selectedFactory.value,
            PLANT: selectedPlant.value,
            LINE: selectedLines.value.join(','), // Combined lines: AP3C01,AP3C02
            SALES_ORDER: row.SEIDVAL,
            CONO: row.CONOVAL,
            ART_NO: row.ARTNOVAL,
            SHOE_NAME: row.SHOENAMEVAL,
            CRD: row.CRDVAL,
            LPD: row.LPDVAL,   
            PSDD: row.PSDDVAL,
            MOLD_NO: row.MOLDNOVAL,
            QTY: allocatedQty,
            DESTINATION: row.DESTINATIONVAL,
            WEEK: `${startDate.value.split('-').join('/')}-${endDate.value.split('-').join('/')}`, // Format: 2026/04/05-2026/04/11
            UNIQUE_ID: `${row.SEIDVAL}_${selectedLines.value.join(',')}_${weekCount}_${Date.now()}`,
            STATUS: 'New',
            CLASS_CODE: '', // Will be populated if available
            REMARKS1: '', // Will be populated if available
            REMARKS2: '', // Will be populated if available
            LAST_NO: '', // Will be populated if available
          };

          planningData.value.push(newRow); 






          





          remainingQty -= allocatedQty; 

          // Move to next week
          weekStart.setDate(weekStart.getDate() + 7);
          weekEnd.setDate(weekEnd.getDate() + 7);
        }
      });

      Message.success('Sales order details loaded successfully');

      buttonValue.value = 'CheckSOValidOrNot';

    } else {

      Message.error('No data found for this Process'); 

    }
  } catch (err: any) {
    Message.error(err.message);
  }
};

// Main Check SO function that routes to appropriate sub-function
const checkSalesOrders = () => {
  // Validate required fields (same as C# validation)
  if (!selectedFactory.value) {
    Message.error('Please Select Factory!');
    return;
  }
  if (!selectedPlant.value) {
    Message.error('Please Select Plant!');
    return;
  }
  if (!selectedProcess.value) {
    Message.error('Please Select Process!');
    return;
  }
  if (!selectedLines.value || selectedLines.value.length === 0) {
    Message.error('Please Select at least one line!');
    return;
  }
  if (!salesOrderIds.value.trim()) {
    Message.error('Please Select at least one SO!');
    return;
  }
  if (!startDate.value || !endDate.value) {
    Message.error('Please Select the proper week!');
    return;
  }
  if (targetData.value.length === 0) {
    Message.error('Please Get Target First!');
    return;
  }

  // Route to appropriate function based on button value
  if (buttonValue.value === 'CheckSOValidOrNot') {
    checkSOValidOrNot();
  } else if (buttonValue.value === 'CheckSchedule') {
    checkSchedule();
  } else if (buttonValue.value === 'Upload') {
    getSalesOrderDetails();
  }
};  


const processTargetData = async (apiData: any[], start: Date, end: Date) => {
  debugger ; 
 
  const processedRows: any[] = [];  
  
  // Get unique lines from API data
  const uniqueLines = [...new Set(apiData.map(item => item.LINE))];
  
  // Generate date range and create date columns in mm/dd format
  const dateColumnss: string[] = [];
  const currentDate = new Date(start);
  const endDatee = new Date(end);
  endDatee.setHours(23, 59, 59, 999);
  
  
  while (currentDate <= endDatee) {
    const dateStr = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format for API matching
    const displayDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }); // mm/dd format
    dateColumnss.push(dateStr);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  
  // Create processed rows for each line
  uniqueLines.forEach(line => {
    const row: any = { LINE: line };
    let total = 0;
    
    // Initialize all date columns with 0
    dateColumnss.forEach(dateStr => {
      row[dateStr] = 0;
    });
    
    // Find and bind target values for this line
    apiData.forEach(item => {
      if (item.LINE === line) {
        
        // Parse the TARGETDATE properly - handle different date formats without timezone issues
        let itemDate: string;
        try {
          // Manual parsing to avoid timezone conversion issues
          const dateStr = item.TARGETDATE.split(' ')[0]; // Get date part only
          const [year, month, day] = dateStr.split('/');
          itemDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } catch (errorr) {
          console.error(`Error parsing date ${item.TARGETDATE}:`, errorr);
          return;
        }
        
        const columnIndex = dateColumnss.indexOf(itemDate);
        
        if (columnIndex !== -1) {
          const targetValue = parseFloat(item.TARGET) || 0;
          row[itemDate] = targetValue;
          total += targetValue;
        } else {
          console.warn(`Date ${itemDate} not found in date range for line ${line}. Available dates:`, dateColumnss);
        }
      }
    });
    
    row.TOTAL = total;
    processedRows.push(row);
  });
  
  return processedRows;
};   
 
const getDayWiseTarget = async () => {
  debugger ; 
  // Validate inputs
  if (!targetLines.value || targetLines.value.length === 0) {
    Message.error('Please select at least one line for target');
    return;
  }

  if (!targetWeek.value || !targetEndWeek.value) {
    Message.error('Please select start and end week dates');
    return;
  }

  // Validate date range
  const start = new Date(targetWeek.value);
  const end = new Date(targetEndWeek.value);

  if (start > end) {
    Message.error('Start date cannot be after end date');
    return;
  }

  try {
    // Call API using existing function
    debugger ; 
    const result: PolicyListRes = await GetStaticLineDayWiseTarget(
      targetLines.value
    );
     debugger ; 
    if (!result.list || result.list.length === 0) {
      Message.warning('No target data found for selected lines');
      return;
    }
    debugger ; 
    // Process API response and bind to grid with dynamic columns
    const processedData = await processTargetData(result.list, start, end);
    targetData.value = processedData;
    Message.success('Target data loaded successfully');
    debugger ; 
  } catch (err: any) {
    Message.error(err.message);
  }
}; 

// Toggle edit mode for target grid
const toggleEditMode = () => {
  editMode.value = !editMode.value;
  if (editMode.value) {
    Message.info('Edit mode enabled - You can now edit target values');
  } else {
    Message.info('Edit mode disabled - Grid is now read-only');
  }
};

// Keyboard navigation for moving to next cell
const handleCellKeyNavigation = (event: KeyboardEvent, rowIndex: number, colIndex: number) => {
  if (!editMode.value) return;
  
  const totalRows = targetData.value.length;
  const totalCols = dateColumns.value.length;
  
  let nextRowIndex = rowIndex;
  let nextColIndex = colIndex;
  
  if (event.key === 'Tab' || event.key === 'Enter' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    
    // Move to next cell
    if (event.key === 'Tab' && !event.shiftKey) {
      // Tab: Move right or to next row
      nextColIndex += 1;
      if (nextColIndex >= totalCols) {
        nextColIndex = 0;
        nextRowIndex += 1;
        if (nextRowIndex >= totalRows) {
          nextRowIndex = 0;
        }
      }
    } else if (event.key === 'Tab' && event.shiftKey) {
      // Shift+Tab: Move left or to previous row
      nextColIndex -= 1;
      if (nextColIndex < 0) {
        nextColIndex = totalCols - 1;
        nextRowIndex -= 1;
        if (nextRowIndex < 0) {
          nextRowIndex = totalRows - 1;
        }
      }
    } else if (event.key === 'Enter') {
      // Enter: Move to next row (same column)
      nextRowIndex += 1;
      if (nextRowIndex >= totalRows) {
        nextRowIndex = 0;
      }
    } else if (event.key === 'ArrowRight') {
      // Right Arrow: Move right or to next row
      nextColIndex += 1;
      if (nextColIndex >= totalCols) {
        nextColIndex = 0;
        nextRowIndex += 1;
        if (nextRowIndex >= totalRows) {
          nextRowIndex = 0;
        }
      }
    } else if (event.key === 'ArrowLeft') {
      // Left Arrow: Move left or to previous row
      nextColIndex -= 1;
      if (nextColIndex < 0) {
        nextColIndex = totalCols - 1;
        nextRowIndex -= 1;
        if (nextRowIndex < 0) {
          nextRowIndex = totalRows - 1;
        }
      }
    } else if (event.key === 'ArrowDown') {
      // Down Arrow: Move to next row (same column)
      nextRowIndex += 1;
      if (nextRowIndex >= totalRows) {
        nextRowIndex = 0;
      }
    } else if (event.key === 'ArrowUp') {
      // Up Arrow: Move to previous row (same column)
      nextRowIndex -= 1;
      if (nextRowIndex < 0) {
        nextRowIndex = totalRows - 1;
      }
    }
    
    // Focus the next cell
    setTimeout(() => {
      const nextCell = document.querySelector(
        `input[data-row="${nextRowIndex}"][data-col="${nextColIndex}"]`
      ) as HTMLInputElement;
      
      if (nextCell) {
        nextCell.focus();
        nextCell.select();
      }
    }, 10);
  }
};

// Handle input focus for keyboard navigation
const handleInputFocus = (event: FocusEvent, rowIndex: number, colIndex: number) => {
  const input = event.target as HTMLInputElement;
  input.setAttribute('data-row', rowIndex.toString());
  input.setAttribute('data-col', colIndex.toString());
  
  // Update current focused cell tracking
  currentFocusedCell.value = { row: rowIndex, col: colIndex };
};

// Watch targetData for automatic total recalculation
watch(targetData, (newData) => {
  if (newData.length > 0) {
    newData.forEach(row => {
      recalculateRowTotal(row);
    });
  }
}, { deep: true });

// Global keyboard event handler for tab navigation
const handleGlobalKeyNavigation = (event: KeyboardEvent) => {
  if (!editMode.value) return;
  
  // Only handle tab keys when not focused on an input
  if (event.target instanceof HTMLInputElement) return;
  
  if (event.key === 'Tab') {
    event.preventDefault();
    
    const totalRows = targetData.value.length;
    const totalCols = dateColumns.value.length;
    
    if (totalRows === 0 || totalCols === 0) return;
    
    let nextRowIndex = 0;
    let nextColIndex = 0;
    
    // Check if any cell is currently focused
    const currentFocused = document.activeElement as HTMLInputElement;
    const hasFocusedCell = currentFocused && currentFocused.getAttribute('data-row') && currentFocused.getAttribute('data-col');
    
    if (hasFocusedCell) {
      // Use current focused cell position
      nextRowIndex = parseInt(currentFocused.getAttribute('data-row') || '0', 10);
      nextColIndex = parseInt(currentFocused.getAttribute('data-col') || '0', 10);
      
      if (event.key === 'Tab' && !event.shiftKey) {
        // Tab: Move right or to next row
        nextColIndex += 1;
        if (nextColIndex >= totalCols) {
          nextColIndex = 0;
          nextRowIndex += 1;
          if (nextRowIndex >= totalRows) {
            nextRowIndex = 0;
          }
        }
      } else if (event.key === 'Tab' && event.shiftKey) {
        // Shift+Tab: Move left or to previous row
        nextColIndex -= 1;
        if (nextColIndex < 0) {
          nextColIndex = totalCols - 1;
          nextRowIndex -= 1;
          if (nextRowIndex < 0) {
            nextRowIndex = totalRows - 1;
          }
        }
      }
    } else {
      // No cell focused, start with first cell
      nextRowIndex = 0;
      nextColIndex = 0;
    }
    
    // Update current focused cell tracking
    currentFocusedCell.value = { row: nextRowIndex, col: nextColIndex };
    
    // Focus the next cell
    setTimeout(() => {
      const nextCell = document.querySelector(
        `input[data-row="${nextRowIndex}"][data-col="${nextColIndex}"]`
      ) as HTMLInputElement;
      
      if (nextCell) {
        nextCell.focus();
        nextCell.select();
      }
    }, 10);
  }
};

// Add global keyboard event listener when edit mode is enabled
watch(editMode, (newEditMode) => {
  if (newEditMode) {
    document.addEventListener('keydown', handleGlobalKeyNavigation);
  } else {
    document.removeEventListener('keydown', handleGlobalKeyNavigation);
  }
});

const saveTargetData = async () => {
  if (targetData.value.length === 0) {
    Message.warning('No target data to save');
    return;
  }

  savingTarget.value = true;

  // Convert targetData to match C# DataGridView structure with mm/dd date format
  const gridData = targetData.value.map(row => {
    const convertedRow: any = {};
    Object.keys(row).forEach(key => {
      if (key === 'LINE') {
        convertedRow[key] = row[key]?.toString() ?? "";
      } else if (key === 'TOTAL') {
        convertedRow[key] = row[key]?.toString() ?? "";
      } else if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Convert ISO date format (yyyy-mm-dd) to mm/dd format (without year)
        const dateParts = key.split('-');
        const dateKey = `${dateParts[1]}/${dateParts[2]}`; // mm/dd format
        convertedRow[dateKey] = row[key]?.toString() ?? "";
      } else {
        convertedRow[key] = row[key]?.toString() ?? "";
      }
    });
    return convertedRow;
  });

  const targetParams = {
    GridData: gridData, 
    stitching: false,
  };

  try {
   debugger ; 
    const response = await SaveTargetData(targetParams); 
    debugger ; 
    // Success response handling
    if (response.list && response.list.length > 0) {  
        Message.success({
          content: 'Target data saved successfully!',
          duration: 3000
        } as any);
        // Optional: Clear edit mode after successful save
        if (editMode.value) {
          editMode.value = false;
          Message.info('Edit mode disabled after successful save');
        }
        // Refresh target data after successful save
        await getDayWiseTarget();
      } else {
        // Handle case where IsSuccess is true but return data is missing
        const errorMessage = 'Save completed but no return data received';
        Message.warning({
          content: errorMessage,
          duration: 5000
        });
        console.warn('Save completed but no return data:', response);
      }
    }  catch(errorr) {
      console.error('Error saving target data:', errorr);
      Message.error({
        content: 'Failed to save target data',
        duration: 5000
      });
    } finally {
      savingTarget.value = false;
    }
  }; 

const getReschedulePO = async () => {
  if (
    !rescheduleFactory.value ||
    !reschedulePlant.value ||
    !rescheduleProcess.value ||
    !rescheduleWeek.value
  ) {
    Message.warning('Please fill all reschedule fields');
    return;
  }

  loadingReschedule.value = true;

  try {
    const params = {
      OrgId: rescheduleFactory.value,
      Plant: reschedulePlant.value,
      Process: rescheduleProcess.value,
      line: '',
      week: rescheduleWeek.value,
    };

    const result: PolicyListRes = await GetReschedulePO(params);
    rescheduleData.value = result.list;
    Message.success('Reschedule data loaded successfully');
  } catch (err: any) {
    error.value = 'Failed to load reschedule data';
    console.error('Error loading reschedule data:', err);
  } finally {
    loadingReschedule.value = false;
  }
};

const processReschedule = async () => {
  if (selectedRescheduleKeys.value.length === 0) {
    Message.warning('Please select records to reschedule');
    return;
  }

  processingReschedule.value = true;

  try {
    const selectedData = rescheduleData.value.filter((item) =>
      selectedRescheduleKeys.value.includes(item.id)
    );

    const rescheduleParams = {
      week: rescheduleWeek.value,
      dataSource: selectedData,
      ipaddress: '127.0.0.1',
      reason: 'Schedule reschedule',
    };

    await RescheduleMethod(rescheduleParams);
    Message.success('Reschedule processed successfully');
  } catch (err: any) {
    error.value = 'Failed to process reschedule';
    console.error('Error processing reschedule:', err);
  } finally {
    processingReschedule.value = false;
  }
};

const onRowClick = (record: any) => {
};

const onCellClick = (record: any, column: any) => {
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatNumber = (num: number) => {
  if (num === null || num === undefined) return '';
  return new Intl.NumberFormat().format(num);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case '1':
      return 'green';
    case '2':
      return 'orange';
    default:
      return 'blue';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case '1':
      return 'Updated';
    case '2':
      return 'Modified';
    default:
      return 'New';
  }
};
// Watch for tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'reschedule') {
    rescheduleFactory.value = selectedFactory.value;
    reschedulePlant.value = selectedPlant.value;
    rescheduleProcess.value = selectedProcess.value;
  } else if (newTab === 'targets') {
    // Auto-sync lines from Planning Schedule to Target Management
    if (selectedLines.value.length > 0) {
      targetLines.value = [...selectedLines.value];
    }

    // Auto-sync dates from Planning Schedule to Target Management
    if (startDate.value && endDate.value) {
      // Direct date sync in YYYY-MM-DD format
      targetWeek.value = startDate.value;
      targetEndWeek.value = endDate.value;
    }
  }
});

// Watch for changes in Planning Schedule lines to sync to Target Management
watch(selectedLines, (newLines) => {
  if (activeTab.value === 'targets' && newLines.length > 0) {
    targetLines.value = [...newLines];
  }
});

// Watch for changes in Planning Schedule dates to sync to Target Management
watch([startDate, endDate], ([newStart, newEnd]) => {
  if (activeTab.value === 'targets' && newStart && newEnd) {
    // Direct date sync in YYYY-MM-DD format
    targetWeek.value = newStart;
    targetEndWeek.value = newEnd;
  }
});

// Initialize
onMounted(async () => {
  await loadFactories();
});
</script>

<style scoped>
.planning-schedule-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  background: linear-gradient(to right, #2e5d23, #b7e08f);
  color: #002060;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.planning-tabs {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.dropdown {
  width: 100%;
  border-radius: 6px;
}

.action-button {
  width: 100%;
  height: 40px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.search-button {
  background: #52c41a;
  border-color: #52c41a;
}

.save-button {
  background: #1890ff;
  border-color: #1890ff;
}

.delete-button {
  background: #ff4d4f;
  border-color: #ff4d4f;
}

.export-button {
  background: #fa8c16;
  border-color: #fa8c16;
}

.clear-button {
  background: #722ed1;
  border-color: #722ed1;
}

.target-button {
  background: #13c2c2;
  border-color: #13c2c2;
}

.reschedule-button {
  background: #eb2f96;
  border-color: #eb2f96;
}

.data-grid-section {
  margin-top: 20px;
}

.data-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #333;
}

.record-count {
  color: #666;
  font-size: 12px;
  font-weight: normal;
}

.planning-table {
  border-radius: 8px;
  overflow: hidden;
}

.planning-table :deep(.arco-table-th) {
  background: #4f7979;
  color: white;
  font-weight: 600;
}

.planning-table :deep(.arco-table-tr:hover) {
  background-color: #f0f8ff;
}

.status-tag {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
}

.target-section,
.reschedule-section {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.target-actions {
  display: flex;
  gap: 10px;
}

.target-grid-section,
.reschedule-grid-section {
  margin-top: 20px;
}

.target-table,
.reschedule-table {
  border-radius: 8px;
  overflow: hidden;
}

.target-table :deep(.arco-table-th) {
  background: #745fec;
  color: white;
  font-weight: 600;
}

.reschedule-table :deep(.arco-table-th) {
  background: #65367e;
  color: white;
  font-weight: 600;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-overlay p {
  margin-top: 16px;
  font-size: 16px;
  color: #333;
}

.error-message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  max-width: 400px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .planning-schedule-container {
    padding: 10px;
  }

  .header {
    font-size: 18px;
    padding: 10px;
  }

  .filter-section {
    padding: 15px;
  }

  .action-button {
    height: 35px;
    font-size: 12px;
  }
}

/* Animation */
.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-button:active {
  transform: translateY(0);
}

/* Custom scrollbar */
.planning-table :deep(.arco-table-container)::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.planning-table :deep(.arco-table-container)::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.planning-table :deep(.arco-table-container)::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.planning-table :deep(.arco-table-container)::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Custom Target Table Styles */
.custom-table-container {
  overflow-x: auto;
  max-height: 450px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.custom-target-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.custom-target-table th,
.custom-target-table td {
  border: 1px solid #e8e8e8;
  padding: 12px 8px;
  text-align: center;
  vertical-align: middle;
  transition: all 0.2s ease;
}

.custom-target-table th {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #2c3e50;
  font-weight: 600;
  font-size: 12px;
  position: sticky;
  top: 0;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #2c3e50;
}

.custom-target-table .fixed-column {
  position: sticky;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  z-index: 5;
  font-weight: 600;
}

.custom-target-table .fixed-column:first-child {
  left: 0;
  min-width: 120px;
  text-align: left;
  padding-left: 16px;
  color: #2c3e50;
  border-right: 2px solid #667eea;
}

.custom-target-table .total-column {
  right: 0;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  font-weight: 700;
  min-width: 100px;
  border-left: 2px solid #28a745;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
}

.custom-target-table .date-column {
  min-width: 85px;
  background: #fafbfc;
}

.custom-target-table .editable-cell {
  padding: 6px 4px;
  background: #fff;
}

.custom-target-table .editable-cell:hover {
  background: #f0f8ff;
  box-shadow: inset 0 0 0 2px #007bff;
}

.custom-target-table .editable-cell .arco-input-number {
  width: 100%;
  border-radius: 4px;
}

.custom-target-table .editable-cell .arco-input-number:focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  border-color: #007bff;
}

.custom-target-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.custom-target-table tbody tr:hover {
  background-color: #e3f2fd;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-target-table tbody tr:focus-within {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: white;
}

/* Enhanced input styling */
.custom-target-table .arco-input-number {
  border: 2px solid #e1e4e8;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.custom-target-table .arco-input-number:hover {
  border-color: #007bff;
  transform: scale(1.02);
}

.custom-target-table .arco-input-number:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* Cell focus indicator */
.custom-target-table .editable-cell:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
  background: #fff;
  z-index: 10;
  position: relative;
}
</style>
