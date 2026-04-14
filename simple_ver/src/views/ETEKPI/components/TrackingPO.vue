<template>
  <div>
    <div style="color: red"> {{ errorMessage }} </div>
    <div v-if="currentview === 'buttons'">
      <a-spin :loading="loading" tip="loading loading" style="width: 100%">
        <div>

          <div class="responsive-container">
            <div>
              <button class="submit-button" @click="onBack"> Back </button>
            </div>


            <div class="po-field" ref="dropdownContainer">
              <span> PO </span>
              <a-input placeholder="Enter PO" v-model="poinput" @input="POSuggetionsMethod"
                @keyup.enter="hideDropdownPOsuggetion" @focus="showDropdownPOSuggetion"
                @press-enter="selectpoSuggetion">
              </a-input>
              <div class="po-suggetion" v-if="showposuggetion">
                <div class="po-suggetions-items" v-for="po in POARTICLELIST" :key="po.CUSTOMER_PO"
                  :value="po.CUSTOMER_PO" @click="SelectPO(po)">{{ po.CUSTOMER_PO }}</div>
              </div>
            </div>

            <div class="article-field" ref="dropdownContainer">
              <span> Article </span>
              <a-input placeholder="Enter Article" v-model="articleinput" @input="ArticleSuggetionMethod"
                @keyup.enter="hideDropdownArticleSuggetions" @focus="showDropdownAritcleSuggetion"
                @press-enter="SelectArticleSuggetion"></a-input>
              <div class="article-suggetions" v-if="showarticlesuggetion">

                <div class="article-suggetion-items" v-for="articl in POARTICLELIST" :key="articl.NAME_S"
                  :value="articl.NAME_S" @click="SelectArticle(articl)">
                  {{ articl.NAME_S }} </div>

              </div>
            </div>
            <div>
              <button class="button" @click="SubmitButton">Submit</button>
            </div>
            <div style="text-align: center; flex-grow: 1">
              <h3 class="header-text">
                Status of Customer PO From Order to Shipment

              </h3>
            </div>
          </div>


          <br />
          <div class="card-container">
            <div v-for="(card, index) in cards" :key="index" class="div" :style="{ backgroundColor: card.color }">
              {{ card.title }}
            </div>
          </div>

          <a-card class="table-card">
            <div class="size-container">
              <h3 class="size-headding"> Size-Wise Production Status </h3>
              <div class="table-details">
                <div> Sales Order : <span> {{ SizeTabledata[0]?.SE_ID }} </span> </div>
                <div> PO : <span> {{ SizeTabledata[0]?.PO_NO }} </span></div>
                <div> CRD : <span>{{ SizeTabledata[0]?.CR_REQDATE }} </span> </div>
                <div> PSDD : <span> {{ SizeTabledata[0]?.NLT }} </span> </div>
                <div> ARTICLE : <span> {{ SizeTabledata[0]?.NAMES_S }} </span></div>
              </div>
              <table class="size-table">
                <thead>
                  <tr>
                    <th v-for="column in SizewiseColumns" :key="column.key" style="position: sticky;">{{ column.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="infor in SizeTabledata" :key="infor.SE_ID" :value=infor.SE_ID>
                    <!-- <td>{{ infor.SE_ID }}</td>
                    <td> {{ infor.PO_NO }}</td>
                    <td> {{ infor.CR_REQDATE }}</td>
                    <td> {{ infor.NLT }}</td> 
                    <td style="min-width: 200px;max-width: 300px;">{{ infor.NAMES_S }}</td>  -->
                    <td> {{ infor.ITEM_NO }}</td>
                    <td> {{ infor.ORDER_QTY }}</td>
                    <td> {{ infor.SIZE_NO }}</td>


                    <td>
                      <div class="outputs-status">
                        <div>{{ infor.CQTY }}</div>
                        <div :class="GetColorIndicationForOutputs(infor)['CUTTING']"></div>
                      </div>
                    </td>

                    <td>
                      <div class="outputs-status">
                        <div>{{ infor.SQTY }}</div>
                        <div :class="GetColorIndicationForOutputs(infor)['STITCHING']"></div>
                      </div>
                    </td>
                    <td>
                      <div class="outputs-status">
                        <div>{{ infor.LQTY }}</div>
                        <div :class="GetColorIndicationForOutputs(infor)['ASSEMBLY']"></div>
                      </div>
                    </td>
                    <td>
                      <div class="outputs-status">
                        <div>{{ infor.AQTY }}</div>
                        <div :class="GetColorIndicationForOutputs(infor)['PACKING']"></div>
                      </div>
                    </td>
                    <td>
                      <div class="outputs-status">
                        <div>{{ infor.SHIPMENT_QTY }}</div>
                        <div :class="GetColorIndicationForOutputs(infor)['SHIPMENT_STATUS']"></div>
                      </div>
                    </td>
                    <td> {{ infor.POSTING_DATE }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a-card>


          <a-row :gutter="16">
            <a-col :span="24" :xs="24" :sm="24" :md="24">
              <div>
                <a-card class="timeline-card">
                  <div
                    style="margin-bottom: 10px;display: flex;gap: 20px;cursor: pointer;justify-content: space-between;">
                    <h3 class="title"> Output Details </h3>
                    <h3 style="color: #000;"> 
                      <div> LOS : Left Over Stack </div> 
                      <div> NA : NO Need </div> 
                      </h3>
                  </div>
                  <a-row class="phases-row">

                    <a-col v-for="(phase, index) in qtydata" :key="index" class="phase-column">
                      <div class="phase-card" :style="{ backgroundColor: phase.color }">
                        <div class="phase-name">{{ phase.name }}</div>
                        <div class="phase-date">
                          <a-card>
                            <span>
                              {{ phase.qty }}
                            </span>
                          </a-card>
                        </div>
                      </div>
                    </a-col>

                  </a-row>
                </a-card>
              </div>
            </a-col>

          </a-row>
        </div>
      </a-spin>
    </div>


    <component :is="components[currentview]" :rowData="clickvalueData" :onBack="goBack" />

  </div>
</template>
<script lang="ts" setup>
import useLoading from '@/hooks/loading';
import { ref, computed, onMounted, reactive, onUnmounted } from 'vue';
import {
  GetBOMPURStatusData,
  GetOuputsDetails,
} from '@/api/e2e_biz/order';
import { GetSizewiseSTatus, POARTICLESUGGETIONS } from '@/api/e2e_biz/biz';
// import './tacking.css';
import { Notification } from '@arco-design/web-vue';
import timelines from './timelines.vue';

const errorMessage = ref('');
const { loading, setLoading } = useLoading(false);
const currentview = ref<'buttons' | 'timeline'>('buttons');
const clickvalueData = ref(null);

const components: any = {
  //
  timeline: timelines
};
const goBack = () => {
  currentview.value = 'buttons';
};
const gotoTimeline = () => {
  currentview.value = 'timeline';
};

const props = defineProps<{
  rowData: {
    MER_PO: string;
    CR_REQDATE: string;
    SE_QTY: any;
    SHIPMENT_QTY: any;
    SE_ID: any;
    NLT: any;
    MATERIAL_STATUS: any;
    COM_ASS_QTY: any;
    COM_STIT_QTY: any;
    COMP_CUT_QTY: any;
    CUTFINISHDATE: any;
    STITFINISHDATE: any;
    ASSYFINISHDATE: any;
    COM_PAC_QTY: any;
    NAME_S: any;
  } | null;
  onBack: () => void;
}>();
console.log(props);

const seid: any = computed(() => props.rowData?.SE_ID);

const SizeTabledata: any = ref([]);
const poinput: any = ref('');
const articleinput = ref('');

const cards: any = ref([
  { title: 'Cutting', status: '', color: 'gray' },
  { title: 'Stitching', status: '', color: 'gray' },
  { title: 'Assembly', status: '', color: 'gray' },
  { title: 'FG Inbound', status: '', color: 'gray' }, 
  { title: 'Shipment', status: '', color: 'gray' }, 
]);

const formateDate = (date: any) => {
  const parseDate = new Date(date);
  if (date === "") {
    return ''
  };
  const year = parseDate.getFullYear();
  const month = (parseDate.getMonth() + 1).toString().padStart(2, '0');
  const day = parseDate.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const showposuggetion = ref(false);
const showarticlesuggetion = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);
const POARTICLELIST: any = ref([]);

const POSuggetionsMethod = async () => {
  if (poinput.value.trim() === '') {
    showposuggetion.value = false;
    return;
  }
  const data: any = await POARTICLESUGGETIONS(poinput, articleinput, 'PO');
  POARTICLELIST.value = data.list;
  if (POARTICLELIST.value.length > 0) {
    showposuggetion.value = true;
  } else {
    showposuggetion.value = false;
  }
};
const ArticleSuggetionMethod = async () => {

  if (articleinput.value.trim() === '') {
    showarticlesuggetion.value = false;
    return;
  }
  const data: any = await POARTICLESUGGETIONS(poinput, articleinput, 'ARTICLE');
  POARTICLELIST.value = data.list;
  if (POARTICLELIST.value.length > 0) {
    showarticlesuggetion.value = true;
  } else {
    showarticlesuggetion.value = false;
  }
};

const hideDropdownPOsuggetion = () => {
  showposuggetion.value = false;
};

const hideDropdownArticleSuggetions = () => {
  showarticlesuggetion.value = false;
};

const showDropdownPOSuggetion = () => {
  if (POARTICLELIST.value.length > 0) {
    showposuggetion.value = true;
  }
};

const showDropdownAritcleSuggetion = () => {
  if (POARTICLELIST.value.length > 0) {
    showarticlesuggetion.value = true;
  }
};

const SelectPO = (poo: any) => {
  poinput.value = poo.CUSTOMER_PO;
  showposuggetion.value = false;
};

const selectpoSuggetion = () => {
  if (POARTICLELIST.value.length > 0) {
    SelectPO(POARTICLELIST.value[0])
  }
};

const SelectArticle = (artic: any) => {
  articleinput.value = artic.NAME_S;
  showarticlesuggetion.value = false;
};

const SelectArticleSuggetion = () => {
  if (POARTICLELIST.value.length > 0) {
    SelectArticle(POARTICLELIST.value[0])
  }
};

const handleClickEvent = (event: MouseEvent) => {
  if (dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target as Node)) {
    showposuggetion.value = false;
    showarticlesuggetion.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickEvent);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickEvent);
});

const OrdetToShipementStatusMethod = async () => {
  try {
    setLoading(true);
    debugger;
    const data: any = await GetBOMPURStatusData(seid, poinput, articleinput); 
    const productionstatus = [{
      Name: 'CUTTING', index: 0
    },
    {
      Name: 'STITCHING', index: 1
    }, {
      Name: 'ASSEMBLY', index: 2
    }, 
    ];
    productionstatus.forEach((param: any) => {
      const NAME = param.Name;
      const INDEX = param.index;
      if (data.list[0][NAME] === "COMPLETED") {
        cards.value[INDEX].color = 'green';
      } else if (data.list[0][NAME] === "DELAY") {
        cards.value[INDEX].color = 'red';
      } else if (data.list[0][NAME] === "ONGOING") {
        cards.value[INDEX].color = 'orange'
      } else if (data.list[0][NAME] === "NOT STARTED") {
        cards.value[INDEX].color = 'gray'
      } else {
        cards.value[INDEX].color = 'black'
      }
    });
    const fgstatus = [{
      Name: 'FG_STATUS', index: 3
    }, {
      Name: 'SHIPMENT_STATUS', index: 4
    }];
    fgstatus.forEach((param: any) => {
      const NAME = param.Name;
      const INDEX = param.index;
      if (data.list[0][NAME] === "COMPLETED") {
        cards.value[INDEX].color = 'green';
      } else if (data.list[0][NAME] === "DELAY") {
        cards.value[INDEX].color = 'red';
      } else if (data.list[0][NAME] === "ONGOING") {
        cards.value[INDEX].color = 'orange'
      } else if (data.list[0][NAME] === "NOT STARTED") {
        cards.value[INDEX].color = 'gray'
      } else {
        cards.value[INDEX].color = 'black'
      }
    });
  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      content: errorMessage.value,
    });
  } finally {
    setLoading(false);
  }
};

const qtydata: any = ref([
  { name: 'ORDER_QTY', color: '#865d36', qty: '' },
  { name: 'CUTTING_QTY', color: '#865d36', qty: '' },
  { name: 'STITCHING_QTY', color: '#865d36', qty: '' },
  { name: 'ASSEMBLY_QTY', color: '#865d36', qty: '' },
  { name: 'PACKING_QTY', color: '#865d36', qty: '' },
  { name: 'FGIN_QTY', color: '#865d36', qty: '' },
  { name: 'SHIPMENT_QTY', color: '#865d36', qty: '' },
]);

const updateQtyData = (apiData: any) => {
  qtydata.value.forEach((phase: any) => {
    if (!apiData) {
      phase.qty = null;
      return;
    }
    switch (phase.name) {

      case 'ORDER_QTY':
        phase.qty = apiData.ORDER_QTY ?? '';
        break;
      case 'CUTTING_QTY':
        if (apiData.CQTY === 0 && apiData.LQTY === 0 && (apiData.FGINQTY > 0 || apiData.AQTY > 0)) {
          phase.qty = 'LOS';
        } else if (apiData.CQTY === 0 && apiData.LQTY > 0) {
          phase.qty = 'NA';
        } else {
          const percentage = apiData.ORDER_QTY > 0
            ? ((apiData.CQTY / apiData.ORDER_QTY) * 100).toFixed(2)
            : '0.00';
          phase.qty = `${apiData.ORDER_QTY}/${apiData.CQTY} (${percentage}%)`;
        }
        break;


      case 'STITCHING_QTY':
        if (apiData.CQTY === 0 && apiData.LQTY === 0 && (apiData.FGINQTY > 0 || apiData.AQTY > 0)) {
          phase.qty = 'LOS';
        } else if (apiData.SQTY === 0 && apiData.LQTY > 0) {
          phase.qty = 'NA';
        } else {
          const percentage = apiData.ORDER_QTY > 0
            ? ((apiData.SQTY / apiData.ORDER_QTY) * 100).toFixed(2) 
            : '0.00';
          phase.qty = `${apiData.ORDER_QTY}/${apiData.SQTY} (${percentage}%)`;
        }
        break;
      case 'ASSEMBLY_QTY':
        if (apiData.LQTY === 0 && (apiData.FGINQTY > 0 || apiData.AQTY > 0)) {
          phase.qty = 'LOS';
        } else {
          const percentage = apiData.ORDER_QTY > 0
            ? ((apiData.LQTY / apiData.ORDER_QTY) * 100).toFixed(2)
            : '0.00';
          phase.qty = `${apiData.ORDER_QTY}/${apiData.LQTY} (${percentage}%)`;
        }
        break;
      case 'PACKING_QTY':
        if ( apiData.AQTY === 0 && apiData.FGINQTY > 0 ) { 
          phase.qty = 'LOS';
        } else {
          const percentage = apiData.ORDER_QTY > 0
            ? ((apiData.AQTY / apiData.ORDER_QTY) * 100).toFixed(2)
            : '0.00';
          phase.qty = `${apiData.ORDER_QTY}/${apiData.AQTY} (${percentage}%)`;
        }
        break;
      case 'FGIN_QTY':
          phase.qty = `${apiData.ORDER_QTY}/${apiData.FGINQTY} (${apiData.ORDER_QTY > 0
            ? ((apiData.FGINQTY / apiData.ORDER_QTY) * 100).toFixed(2)
            : '0.00'}%)`;
        break;
      case 'SHIPMENT_QTY':
        phase.qty = `${apiData.ORDER_QTY}/${apiData.FGOUT} (${apiData.ORDER_QTY > 0
            ? ((apiData.FGOUT / apiData.ORDER_QTY) * 100).toFixed(2)
            : '0.00'}%)`;
        break;
      default:
        break;
    }
  });
};

const GetOuputsDetailsMethod = async () => {
  try {
    const dd: any = await GetOuputsDetails(seid, poinput, articleinput);
    const ddd = dd.list[0];
    updateQtyData(ddd);
  } catch (error) {
    errorMessage.value = (error as Error).message;
    Notification.error({
      title: 'Outputs',
      content: errorMessage.value,
    });
  }
};
 
const SizewiseColumns = ref([
  { title: 'Material', dataIndex: 'ITEM_NO', key: 'ITEM_NO' },
  { title: 'Order Qty', dataIndex: 'ORDER_QTY', key: 'ORDER_QTY' },
  { title: 'Size', dataIndex: 'SIZE_NO', key: 'SIZE_NO' },
  { title: 'Cutting', dataIndex: 'CQTY', key: 'CQTY' },
  { title: 'Stitching', dataIndex: 'SQTY', key: 'SQTY' },
  { title: 'Assembly', dataIndex: 'LQTY', key: 'LQTY' },
  { title: 'Packing', dataIndex: 'AQTY', key: 'AQTY' },
  { title: 'Shipment', dataIndex: 'SHIPMENT_QTY', key: 'SHIPMENT_QTY' },
  { title: 'Shipment Date', dataIndex: 'POSTING_DATE', key: 'POSTING_DATE' },
]);

const GetSizewieStatus = async () => {
  try {
    setLoading(true);
    const data: any = await GetSizewiseSTatus(seid, poinput, articleinput);
    if (data.list.length <= 0) {
      Notification.error({
        title: 'SIZE WISE OUTPUTS',
        content: 'No Data'
      })
    }
    console.log(data);
    SizeTabledata.value = data.list.map((item: any) => {
      return {
        SE_ID: item.SE_ID,
        PO_NO: item.PO_NO,
        CR_REQDATE: formateDate(item.CR_REQDATE),
        NLT: formateDate(item.NLT),
        NAMES_S: item.NAME_S,
        ORDER_QTY: item.ORDER_QTY,
        SIZE_NO: item.SIZE_NO,
        ITEM_NO: item.ITEM_NO,
        CQTY: item.CQTY,
        SQTY: item.SQTY,
        LQTY: item.LQTY,
        AQTY: item.AQTY,
        SHIPMENT_QTY: item.SHIPMENT_QTY,
        POSTING_DATE: formateDate(item.POSTING_DATE),
        CUTTING: item.CUTTING,
        STITCHING: item.STITCHING,
        ASSEMBLY: item.ASSEMBLY,
        PACKING: item.PACKING,
        SHIPMENT_STATUS: item.SHIPMENT_STATUS
      }
    });
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    setLoading(false)
  }
};

const ArrayofOutputstatus = [
  { index: 'CUTTING' },
  { index: 'STITCHING' },
  { index: 'ASSEMBLY' },
  { index: 'PACKING' },
  { index: 'SHIPMENT_STATUS' }
];

const GetColorIndicationForOutputs = (infor: any) => {
  const result: Record<string, string> = {};

  ArrayofOutputstatus.forEach(({ index }) => {
    const status = infor[index];

    if (status === "COMPLETED") {
      result[index] = "indication-green";
    } else if (status === "DELAY") {
      result[index] = "indication-red";
    } else if (status === "ONGOING") {
      result[index] = "indication-yellow";
    } else if (status === "NOT STARTED" || status === "NOPROGRESS") {
      result[index] = "indication-gray";
    } else {
      result[index] = "indication-black";
    }
  });
  return result;
};


const SubmitButton = async () => {

  await OrdetToShipementStatusMethod();
  await GetSizewieStatus();
  await GetOuputsDetailsMethod();
};

onMounted(() => {
  SubmitButton();
});

</script>
<style scoped>

.card-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
  margin-left: 100px;
}

.div {
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 50%;
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 12px solid white;
  cursor: pointer;
}

.submit-button {
  background: #ff4742;
  border: 1px solid #ff4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, 'proxima nova', sans-serif;
  font-size: 16px;
  font-weight: 600;
  outline: 0;
  padding: 10px 10px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 150px;
  border: 2px solid yellowgreen;
}

.submit-button:hover,
.submit-button:active {
  background-color: initial;
  background-position: 0 0;
  color: #ff4742;
}


.timeline-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px #000000;
  background-color: #def2f1;
  color: #5d7504;
  max-height: 400px;
  overflow-y: auto;

}

.timeline-card2 {
  border-radius: 8px;
  box-shadow: 0 4px 8px #000000;
  background-color: #def2f1;
  color: #5d7504;
  max-height: 400px;
  overflow-y: auto;
}

.title {
  font-weight: bold;
  color: #ec1fca;
}

.phases-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.phase-column {
  flex: 1 1 180px;
  max-width: 220px;
}

.phase-card {
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.phase-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.phase-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.phase-date {
  font-size: 14px;
  font-weight: bold;
  color: black;
}

.phase-date span {
  font-weight: bold;
}

.table {
  font-weight: bold;
  padding: 10px;
  width: 100%;
  text-align: center;
}

.th {
  background-color: #fc19e6;
  padding: 10px;
  color: white;
}

.td {
  color: black;
  background-color: #9ff79c;
}

.header-text {
  color: #ff33cc;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.4;
  padding: 10px 20px;
  background: linear-gradient(135deg, #e0f053, #32eeee);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }

.header-text:hover {
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #4656eb, #32eeee);
}

 


.size-container {
 
  border-radius: 12px;
 
  max-height: 400px;
}

.size-table {
  width: 100%;
 
}

.size-table th,
.size-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #080808;
}

.size-table th {
  background-color: #d1f506;
  font-weight: 600;
   color: #1014f5;
  position: sticky;
}

.size-table td {
  background-color: white;
}

.size-table tr:hover {
  background-color: #0b80f5;
}

.size-table tr:last-child td {
  border-bottom: none;
}

.buttons-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
  justify-content: flex-start;
}

.table-card {
  border-radius: 5px;
  max-height: 50vh;
  width: 100%;
  background-color: #3f8a86;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  transition: all 3s ease;
  overflow-y: auto;
  margin-bottom: 10px;
}

.po-field {
  margin: 0px 10px 0px 10px;
  border: 2px solid rgb(247, 242, 242);
  border-radius: 5px;
  display: flex;
  color: white;
  gap: 10px;
  align-items: center;
  font-weight: bold;
  padding-left: 10px;
}

.article-field {
  margin: 0px 10px 0px 10px;
  border: 2px solid white;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: white;
  font-weight: bold;
  padding-left: 10px;
}

.responsive-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
}

.size-headding {
  color: #f7f71e;
  margin: 0 0 10px 0;
}

.po-suggetion {
  position: absolute;
  width: auto;
  z-index: 1000;
  background: rgb(206, 49, 49);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow-y: auto;
  max-height: 200px;
  margin-top: 240px;
  padding: 10px;
  scrollbar-width: none;
}

.po-suggetions-items {
  padding: 10px;
  cursor: pointer;
  margin: 10px 30px 10px 30px;
}

.po-suggetions-items:hover {
  background-color: #15be2c;
  border-radius: 5px;
}

.article-suggetions {
  position: absolute;
  width: auto;
  z-index: 1000;
  background: rgb(206, 49, 49);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow-y: auto;
  max-height: 200px;
  margin-top: 240px;
  padding: 10px;
  scrollbar-width: none;
}

.article-suggetion-items {
  padding: 5px;
  cursor: pointer;
  margin: 10px 30px 10px 30px;
}

.article-suggetion-items:hover {
  background-color: #15be2c;
  border-radius: 5px;
}

.button {
  background-color: rgb(187, 243, 34);
  padding: 10px;
  min-width: 100px;
  border-radius: 5px;
  border: 2px solid greenyellow;
  color: rgb(20, 20, 20);
  font-weight: bold;
  cursor: pointer;
}

.button:hover {
  background-color: rgb(122, 243, 52);
  border: 2px solid yellow;
}

.outputs-status {
  display: flex;
  gap: 10px;
}

.indication-green,
.indication-gray,
.indication-yellow,
.indication-red,
.indication-black {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.indication-green {
  background-color: rgb(11, 231, 11);
}

.indication-gray {
  background-color: gray;
}

.indication-red {
  background-color: rgb(245, 24, 24);
}

.indication-yellow {
  background-color: rgb(241, 166, 26);
}

.indication-black {
  background-color: black;
} 
 .table-details {
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    font-weight: bold;
    color: white;
    font-size: 16px;
    margin-bottom:10px ;
    margin-top: 10px;
  }
  .table-details span {
    background-color: rgb(243, 170, 170);
    padding: 5px;
    border: none;
    border-radius: 5px;
    color: black;
  }

</style>