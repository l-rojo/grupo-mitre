import Vue from 'vue'
import './plugins/vuetify'
//import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false
//Configuracion para el Backend De Produccion
axios.defaults.baseURL='https://app.excelenciadigital.online/gm-node/'
//Configuracion para el Backend Local 
//axios.defaults.baseURL='http://localhost:3001/gm-node/'
new Vue({
  router,
  //vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
