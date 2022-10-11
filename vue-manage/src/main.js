import Vue from 'vue'

// 引入store
import store from './vuex/store'

// 按需引入elementUI
import "./static/elementUI/elementUI"

Vue.config.productionTip = false
import App from './App.vue'

import router from './router'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
