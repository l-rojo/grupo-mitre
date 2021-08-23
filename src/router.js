import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Categoria from './components/Categoria.vue'
import Nomenclador from './components/Nomenclador.vue'
import FacturacionMes from './components/FacturacionMes.vue'
import Facturacion from './components/Facturacion.vue'
import InformeFacturacion from './components/InformeFacturacion.vue'
import Login from './components/Login.vue'
import usuarios from './components/usuarios.vue'
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
        administrador:true,
        mitre:true,
        prestador:true
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
        administrador:true,
        mitre:true
      }
    },
    {
      path: '/obrasocial',
      name: 'obrasocial',
      component: Obrasocial,
      meta : {
        administrador:true,
        mitre:true
      }
    },
    {
      path: '/FacturacionMes',
      name: 'FacturacionMes',
      component: FacturacionMes,
      meta : {
        administrador:true,
        mitre:true,
        prestador:true
      }
    },
    {
      path: '/Facturacion',
      name: 'Facturacion',
      component: Facturacion,
      meta : {
        administrador:true,
        mitre:true,
        prestador:true
      }
    },
    {
      path: '/InformeFacturacion',
      name: 'InformeFacturacion',
      component: InformeFacturacion,
      meta : {
        administrador:true,
        mitre:true,
        prestador:true
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: usuarios,
      meta : {
        administrador:true
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
  } else  if (store.state.usuario && store.state.usuario.rol == 1){
    if (to.matched.some(record => record.meta.administrador)){
      next()
    } 
  }else  if (store.state.usuario && store.state.usuario.rol == 2){
    if (to.matched.some(record => record.meta.mitre)){
      next()
    } 
  }else  if (store.state.usuario && store.state.usuario.rol == 3){
    if (to.matched.some(record => record.meta.prestador)){
      next()
    } 
  }else{
    next({
      name: 'login'
    })
  }

})

export default router