import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
import router from './router/router'

Vue.config.productionTip = false
Vue.use(Vuetify)

// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  vuetify,
  template: '<App/>',
  components: { App }
  // render: h => h(App),
  // components: { App }
})