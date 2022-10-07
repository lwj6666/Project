import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import pageControlOotions from './pageControl'

export default new Vuex.Store({
    modules: {
        pageControlAbout: pageControlOotions
    }
})