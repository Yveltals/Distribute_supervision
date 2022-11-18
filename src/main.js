import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css'; 
import store from './store/index';
import 'font-awesome/css/font-awesome.min.css'

import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import printJS from 'print-js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
