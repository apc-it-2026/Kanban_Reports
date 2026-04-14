import { createApp } from 'vue'; 
import ArcoVue from '@arco-design/web-vue'; 
import ArcoVueIcon from '@arco-design/web-vue/es/icon'; 
import globalComponents from '@/components'; 
import PrimeVue from 'primevue/config';    
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
// import Button from 'primevue/button'
// import Dialog from 'primevue/dialog'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import '@arco-design/web-vue/dist/arco.css'; 
import '@/assets/style/global.less'; 
import '@/api/interceptor';  
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css' ; 
// import  Antd  from 'ant-design-vue' ; 
import 'ant-design-vue/dist/reset.css'; 
import router from './router'; 
import store from './store'; 
import i18n from './locale'; 
import directive from './directive'; 
import './mock'; 
import App from './App.vue'; 

 

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router); 
app.use(store); 
app.use(i18n); 
app.use(globalComponents); 
app.use(directive); 
app.use(PrimeVue) ; 
app.use(ToastService) ; 
// app.use(Antd) ; 
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
// app.component('Button', Button)
// app.component('Dialog', Dialog)
app.component('Toast', Toast)

app.mount('#app');  


