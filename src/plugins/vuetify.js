import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md',
})
//export default new Vuetify()
// import Vue from 'vue'
// // import Vuetify from 'vuetify/lib/framework'
// import Vuetify from 'vuetify'
// import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/src/stylus/app.styl'

// Vue.use(Vuetify)

// const colors = {
//   white: '#fff',
//   gray_100: '#f8f9fa',
//   gray_200: '#ebebeb',
//   gray_300: '#dee2e6',
//   gray_400: '#ced4da',
//   gray_500: '#adb5bd',
//   gray_600: '#888',
//   gray_700: '#444',
//   gray_800: '#303030',
//   gray_900: '#222 ',
//   black: '#000',
//   blue: '#375a7f',
//   indigo: '#6610f2',
//   purple: '#6f42c1',
//   violet: '#6f42c1',
//   pink: '#e83e8c',
//   red: '#e74c3c',
//   orange: '#fd7e14',
//   yellow: '#f39c12',
//   green: '#00bc8c',
//   teal: '#20c997',
//   cyan: '#3498db'
// }
// const objd = {
//   theme: {
//     themes: {
//       light: {
//         white: '#fff',
//         gray_100: '#f8f9fa',
//         gray_200: '#ebebeb',
//         gray_300: '#dee2e6',
//         gray_400: '#ced4da',
//         gray_500: '#adb5bd',
//         gray_600: '#888',
//         gray_700: '#444',
//         gray_800: '#303030',
//         gray_900: '#222',
//         black: '#000 ',
//         blue: '#375a7f',
//         indigo: '#6610f2',
//         purple: '#6f42c1',
//         pink: '#e83e8c',
//         red: '#e74c3c',
//         orange: '#fd7e14',
//         yellow: '#f39c12',
//         green: '#00bc8c',
//         teal: '#20c997',
//         cyan: '#3498db',
//         primary: colors.green,
//         secondary: colors.gray_700,
//         success: colors.green,
//         info: colors.cyan,
//         warning: colors.yellow,
//         danger: colors.red,
//         light: colors.gray_500,
//         dark: colors.gray_800
//       },
//       dark: {

//       }
//     }
//   },
//   customProperties: true,
//   icons: {
//     iconfont: 'mdiSvg' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
//   }//,
//   //iconfont: 'md',
// }

// export default new Vuetify(objd)
