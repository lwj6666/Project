// 页面控制的相关配置
export default {
    namespaced: true,
    actions: {

    },
    mutations: {
        isCollapseChange(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectMenu(state, val) {
            // 判断添加的数据是否为首页
            if (val.name !== 'Home') {
                const flag = state.tabsList.some(item => item.name === val.name)//不存在返回false
                // 如果不存在
                if (!flag) {
                    state.tabsList.push(val)
                }
            }
        },
        // 删除指定的tag数据
        closeTab(state, val){
            state.tabsList.splice(val,1)
        }
    },
    state: {
        // 开启关闭侧边栏 boolean
        isCollapse: false,
        // 面包屑数据
        tabsList: [
            {
                path: "/home",
                name: "Home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ]
    }
}