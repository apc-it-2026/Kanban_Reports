<template>
  
    <div>
      <a-row :gutter="[16, 16]">
        <a-col :span="3" :xs="24" :sm="12" :md="8">
          <a-button @click="onBack" class="back-button">
            
              <span class="back-icon">➔</span>
              <span>BACK</span>
            </a-button>

        </a-col>
        <a-col :span="3" :xs="24" :sm="12" :md="8" >
          <h2 style="color: greenyellow; text-align: center;">Production DownTime Breakup Details</h2>
        </a-col>
        <a-col :span="3" :xs="24" :sm="12" :md="8">
          <a-button @click="ExportToExcel" class="download-button">
              <span><icon-download />Export file</span>
            
            </a-button>
        </a-col>
      </a-row>


          </div>

     
      <div class="table-container">
        <table>
          <thead>
            <!-- <tr> -->
              <th v-for="column in columns" :key="column.key" style="background-color:#5AB9B9;color:whitesmoke;">{{
                column.title
              }}</th>
            <!-- </tr> -->
          </thead>
          <tbody >
            <tr v-for="row in paginatedRows" :key="row.ROWNUM"> 
              <td>{{ row.ROWNUM}}</td>
              <td>{{ row.PRODUCTIONLINE_NAME}}</td>
              <td>{{ row.PAUSEDATE }}</td>
              <td>{{ row.SHOETYPENAME }}</td>
              <td>{{ row.ART }}</td>
              <td>{{ row.MOLDNO}}</td>
              <td>{{ row.PROCESSNAME }}</td> 
              <td>{{ row.PARTNAME }}</td>
              <td>{{ row.LIABILITYNAME }}</td> 
              <td>{{ row.PAUSEREASON }}</td>
              <td>{{ row.PAUSEHOUR }}</td>
              <td>{{ row.INFLUPEOPLE }}</td>
              <td>{{ row.PAUSEALLHOUR }}</td>
              <td>{{ row.INFLUYIELD }}</td>
              <td>{{ row.REMARKS}}</td>
              <td>{{ row.STATUS}}</td>
              <td>{{ row.DTCAUSE}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <!-- Back button for previous rows -->
        <button @click="loadPreviousPage" :disabled="currentPage === 1" style="color: wheat">
          Back
        </button>
  
        <!-- Display current page range and page number -->
        <span style="color: wheat">{{ rowRange }}</span><span style="color: wheat">(Page {{ currentPage }})</span> 
  
        <!-- Forward button for next rows -->
        <button @click="loadNextPage" :disabled="!hasMoreRows" style="color: wheat">
          Next Page
        </button>
        <a-select
          v-model="rowsPerPage"
          placeholder="Select rows per page"
          style="width: 150px; margin-top: 10px; margin-left: 10px"
        >
          <a-option value="10">10 rows </a-option>
          <a-option value="20">20 rows </a-option>
        </a-select>
      </div>
    </template>
    
    <script lang="ts" setup>
    import { defineProps } from 'vue';
    import { ref, reactive, computed, onMounted } from 'vue';
    import useLoading from '@/hooks/loading';
    import {ProdDowntimeDetailView} from '@/api/productiondowntime';
    import * as XLSX from 'xlsx';
  
    const props = defineProps<{
    
      rowData: {
        fromDate: string;
        toDate: string;
        selectedCompany: string;
        selectedPlant: string;
        ponumber: string;
        modelname:string;
      } | null;
    
     
      onBack: () => void;
    }>();
    const rawData = ref<any>([]);
    const fdate = computed(() => props.rowData?.fromDate);
    const tdate = computed(() => props.rowData?.toDate);
    const com = computed(() => props.rowData?.selectedCompany);
    const plant = computed(() => props.rowData?.selectedPlant);

    const GenerateFormModal = () => {
      return {
        From_Date:fdate,
        To_Date:tdate,
        Company:com,
        Plant:plant,
     
      };
    };
    const { loading, setLoading } = useLoading(false);  
    const tableData = ref<any>([]);
    const formModal1 = ref(GenerateFormModal());
      // Pagination state
      const rowsPerPage = ref(10);
    const currentPage = ref(1);
  
  
      // Define a type for your data rows
      interface DataType {
        ROWNUM: string;
        PRODUCTIONLINE_NAME: string;
        PAUSEDATE: string;
        SHOETYPENAME: string;
        ART: string;
        MOLDNO: string;
        PROCESSNAME: string;
        PARTNAME: string;
        LIABILITYNAME: string;
        PAUSEREASON: string;
        PAUSEHOUR: string;
        INFLUPEOPLE: string;
        INFLUYIELD:string;
        REMARKS:string;
        STATUS:string;
        PAUSEALLHOUR:string;
        DTCAUSE:string; 
    }  

    const columns = reactive([
      { title: 'ROWNUM', dataIndex: 'ROWNUM', key: 'ROWNUM' },
      { title: 'PRODUCTIONLINE_NAME', dataIndex: 'PRODUCTIONLINE_NAME', key: 'PRODUCTIONLINE_NAME' },
      { title: 'PAUSEDATE', dataIndex: 'PAUSEDATE', key: 'PAUSEDATE' },
      { title: 'SHOETYPENAME', dataIndex: 'SHOETYPENAME', key: 'SHOETYPENAME' },
      { title: 'ART', dataIndex: 'ART', key: 'ART' },
      { title: 'MOLDNO', dataIndex: 'MOLDNO', key: 'MOLDNO' },
      { title: 'PROCESSNAME', dataIndex: 'PROCESSNAME', key: 'PROCESSNAME' },
      { title: 'PARTNAME', dataIndex: 'PARTNAME', key: 'PARTNAME' },
      { title: 'LIABILITYNAME', dataIndex: 'LIABILITYNAME', key: 'LIABILITYNAME' },
      { title: 'PAUSEREASON', dataIndex: 'PAUSEREASON', key: 'PAUSEREASON' },
      { title: 'PAUSE_MIN', dataIndex: 'PAUSEHOUR', key: 'PAUSEHOUR' },
      { title: 'EFFECTED_PEOPLE', dataIndex: 'INFLUPEOPLE', key: 'INFLUPEOPLE' },
      { title: 'PAUSE_MH', dataIndex: 'PAUSEALLHOUR', key: 'PAUSEALLHOUR' },
      { title: 'EFFECTED_SHOES', dataIndex: 'INFLUYIELD', key: 'INFLUYIELD' },
      { title: 'REMARKS', dataIndex: 'REMARKS', key: 'REMARKS' },
      { title: 'STATUS', dataIndex: 'STATUS', key: 'STATUS' },
      { title: 'DTCAUSE', dataIndex: 'DTCAUSE', key: 'DTCAUSE' },
    ]);
    const dataSource = reactive<DataType[]>([]);
    // Computed properties for pagination
    const paginatedRows = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value;
      return dataSource.slice(start, start + rowsPerPage.value);
    });
    const hasMoreRows = computed(() => {
      return currentPage.value * rowsPerPage.value < dataSource.length;
    });
    const rowRange = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value + 1;
      const end = Math.min(
        currentPage.value * rowsPerPage.value,
        dataSource.length
      );
      return `${start}-${end} of ${dataSource.length}`;
    });
  
    // Function to get table data
    const GetTableData = async () => {
      debugger;
      console.log(formModal1);
  
      try {
        const data: any = await ProdDowntimeDetailView(formModal1.value);
        console.log(data) ; 
        tableData.value = data.list;
        // console.log(data);
        rawData.value = data.list.map((item: any) => ({
          ROWNUM: item.ROW_NUMBER,
          PRODUCTIONLINE_NAME: item.PRODUCTION_LINE,
          PAUSEDATE: item.PAUSE_DATE,
          SHOETYPENAME:item.SHOE_TYPE,
          ART: item.ART,
          MOLDNO: item.MOLDNO,
          PROCESSNAME: item.PROCESS_NAME,
          PARTNAME: item.PART_NAME,
          LIABILITYNAME: item.PRODUCTION_LINE,
          PAUSEREASON: item.PAUSE_REASON,
          PAUSEHOUR:item.PAUSE_MIN,
          INFLUPEOPLE: item.EFFECTED_PEOPLE,
          PAUSEALLHOUR: item.EFFECTED_MH,
          INFLUYIELD: item.EFFCTED_SHOES,
          REMARKS: item.REMARKS,
          STATUS: item.STATUS,
          DTCAUSE: item.DTCAUSE,
         
        }));
        dataSource.splice(0, dataSource.length, ...rawData.value);
      } catch (error) {
        console.error('Error occurred in GetTableData:', error);
      }
    };

    const ExportToExcel = () => {
      debugger;
    console.log(tableData);
    const dataToExport = tableData.value.map((index: any) => {
      return {
        'ROWNUM': index.ROWNUM,
        'PRODUCTIONLINE_NAME': index.PRODUCTIONLINE_NAME,
        'PAUSEDATE': index.PAUSEDATE,
        'SHOETYPENAME': index.SHOETYPENAME,
        'MOLDNO': index.MOLDNO,
        'PROCESSNAME': index.PROCESSNAME,
        'PARTNAME': index.PARTNAME,
        'LIABILITYNAME': index.LIABILITYNAME, 
        'PAUSEREASON': index.PAUSEREASON,
        'PAUSEHOUR':index.PAUSEHOUR,
        'INFLUPEOPLE': index.INFLUPEOPLE,
          'PAUSEALLHOUR': index.PAUSEALLHOUR,
          'INFLUYIELD': index.INFLUYIELD,
          'REMARKS': index.REMARKS,
          'STATUS': index.STATUS,
          'DTCAUSE': index.DTCAUSE 
      };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    const headerCells = Object.keys(dataToExport[0]);
    headerCells.forEach((cell, index) => {
      const cellRef = XLSX.utils.encode_cell({ c: index, r: 0 });
      ws[cellRef].s = {
        fill: {
          fgColor: { rgb: 'FFFF00' },
        },
        font: {
          bold: true,
          color: { rgb: '000000' },
          sz: 14,
        },
      };
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Cutting');
    XLSX.writeFile(wb, 'Production Downtime Details.xlsx');
  };
      // Load the previous page
      const loadPreviousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };
  
    // Load the next page
    const loadNextPage = () => {
      if (hasMoreRows.value) {
        currentPage.value += 1;
      }
    };
  
  //     // Handle the query
  //     const HandleQuery = async () => {
  //     debugger;
  //     try {
  //       debugger;
  //       setLoading(true);
  //        await GetTableData();
    
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
    // Lifecycle hook to fetch initial data
    onMounted(async () => {
      debugger;
      setLoading(true);
   
       GetTableData();
   
    });


 
    </script>
    <style lang="css" scoped>
  .back-button {
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      font-weight: bold;
      color: white;
      background: linear-gradient(45deg, #ff6a00, #ee0979);
      border: none;
      border-radius: 20px;
    }
  
    .back-button .back-icon {
      margin-left: 8px;
      font-size: 1.2em;
      transform: rotate(180deg); /* Rotate the arrow to point left */
    }
  
    .back-button:hover {
      opacity: 0.9;
    }

    .download-button {
      /* display: inline-flex; */
      /* align-items: center; */
      /* padding: 8px 16px; */
      font-weight: bold;
      /* color: white; */
      background: linear-gradient(45deg, #f5f7b5, #eb91bc);
      border: none;
      border-radius: 20px;
      /* margin-left: 370px; */
 
     
    }
  .table-container {
    overflow-x: auto;
    border-radius: 10px;
    margin-top: 20px;
   
  }
  table {
    width: 100%;
    /* border-collapse: collapse; */

  }


  th,
  td {
    
    padding: 8px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.2);
    color:whitesmoke;
  
    
  }



  /* tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
    
  } */

  /* tbody tr:nth-child(even) {
    background-color: #ffffff;
 
  } */
  th, td {
  padding: 12px;
  text-align: center;
}

  tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.2);
    font-size: medium;
 

  }
  table,
  th {
    background-color: #00004d;
 
  color: white;
  width: 20px;
}

  table,
  th,
  td {

    border-bottom: 1px solid #5c5a5a;

  }


  /* Responsive styles for tablets */
@media screen and (max-width: 1024px) {
  .download-button{
    display: flex;
    flex-direction: row !important;
    }

}

/* Responsive styles for mobiles */
@media screen and (max-width: 768px) {
  .download-button{
 
    margin-left: auto;
  }

}


  /* Web View (Larger Screens) */
  @media (min-width: 769px) {
    .download-button{
      margin-left: 370px; 
    }
  }

  </style>