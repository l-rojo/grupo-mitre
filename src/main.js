import Vue from 'vue'
import './plugins/vuetify'
//import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL='https://app.excelenciadigital.ml/gm-node/facturacionmes'
//axios.defaults.baseURL='http://localhost:3001/api/facturacionMes/'
new Vue({
  router,
  //vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
