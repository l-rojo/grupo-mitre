import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Categoria from './components/Categoria.vue'
import Nomenclador from './components/Nomenclador.vue'
import FacturacionMes from './components/FacturacionMes.vue'
import Login from './components/Login.vue'
import Obrasocial from './components/Obrasocial.vue'
import store from './store'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta : {
        libre: true
      }
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: Categoria,
      meta : {
        libre: true
      }
    },
    {
      path: '/nomenclador',
      name: 'nomenclador',
      component: Nomenclador,
      meta : {
        libre: true
      }
    },
    {
      path: '/obrasocial',
      name: 'obrasocial',
      component: Obrasocial,
      meta : {
        libre: true
      }
    },
    {
      path: '/FacturacionMes',
      name: 'FacturacionMes',
      component: FacturacionMes,
      meta : {
        libre: true
      }
    },
   
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta : {
        libre: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.libre)){
    next()
  } 
  else  if (store.state.usuario){
    next()
  }else{
    next({
      name: 'login'
    })
  }
})

export default router