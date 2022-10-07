// 页面控制的相关配置
export default {
    namespaced:true,
    actions:{

    },
    mutations:{
        isCollapseChange(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    state:{
        // 开启关闭侧边栏 boolean
        isCollapse: false,
    }
}