import Vue from 'vue'
import { Button,Container,Header,Aside,Footer,Main,Menu,Submenu,MenuItem,MenuItemGroup,Dropdown,DropdownMenu,DropdownItem,
  Row,Col,Card,Table,TableColumn} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入store
import store from './vuex/store'

Vue.use(Container)
Vue.use(Button)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)


Vue.config.productionTip = false
import App from './App.vue'

import router from './router'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
